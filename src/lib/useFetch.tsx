/**
 * @todo polling option
 * @todo work on READ.ME
 */

import { useRef, useEffect, useReducer } from "react";

import FetchWorker from './fetch_worker.js?worker&inline'
import PollingWorker from './polling_worker.js?worker&inline'
import { useStore } from "./useStore";
import { cleanupWorker, dataExpired, DAY, methodType } from "./utils";

type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined
type WorkerResponseType = MessageEvent<{
    type: string;
    data?: UnknownDataResponseType
}>

export interface FetchWorkerProps {
    cache?: boolean
    fetchOptions?: RequestInit | undefined
    maxAge: number
    // middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType
    url: RequestInfo | URL
}
/**
 * useFetch is a React hook that can be initialized with no params.
 * @example const { data, error, loading, fetchWorker } = useFetch()
 * 
 */
export function useFetch() {
    const { del, get, set } = useStore()
    const [state, dispatch] = useReducer(reducer, initialState);
    const sharedRef = useRef<{ worker?: Worker; controller?: AbortController }>({ worker: undefined, controller: new AbortController() });
    let { worker, controller } = sharedRef.current;
    const fetchWorker = async ({ url, fetchOptions, cache = false, maxAge = DAY }: FetchWorkerProps) => {
        cleanupWorker(worker);
        let method = methodType(fetchOptions)
        let next = method.isGet ? await get(url.toString()).then((value) => {
            if (!value?.timestamp) { return true }
            if (!dataExpired(maxAge, value?.timestamp)) {
                del(url.toString());
                return true;
            }
            console.log('cache hit', url.toString());
            dispatch({ type: cache ? 'data' : 'pre-load', data: value?.data });
            return cache ? false : true;
        }) : true

        if (window && next) {
            method.isGet && del(url.toString());
            worker = new FetchWorker();
            dispatch({ type: 'loading', loading: true });
            worker.postMessage({ type: 'fetch', url, fetchOptions });
            worker.addEventListener('message', ({ data: { data, type } }: WorkerResponseType) => {
                if (!controller?.signal?.aborted) {
                    if (type === 'success') {
                        if(method.isDelete || !data) {
                            return dispatch({type:'loading', loading: false})
                        }
                        dispatch({ type: 'data', data })
                        if (cache && method.isGet) {
                            let timestamp = Date.now();
                            let cacheObject = { timestamp, data }
                            set(url.toString(), cacheObject)
                                .then(() => { console.log("saved data") })
                                .catch(() => { console.error("couldn't access indexedDB to save data") });
                        }
                    } else {
                        dispatch({ type: 'error', error: new Error(type) });
                    }
                }
                cleanupWorker(worker)
            });
        }
    }
    // const pollWorker = async ({url, options, interval, maxAttempts, currentJSON, compareKeys}) => {

    // }

    useEffect(() => {
        if (!window && !sharedRef?.current?.controller?.signal?.aborted) {
            dispatch({ type: 'loading', loading: false });
            dispatch({ type: 'error', error: new Error('window is not defined') });
            cleanupWorker(worker);
        }
        return () => {
            cleanupWorker(worker);
        }
    }, [window, sharedRef.current.controller]);
    return { fetchWorker, ...state! };
};

export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    update: boolean;
}

const initialState: StateType = {
    data: undefined,
    error: undefined,
    loading: false,
    update: true
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'pre-load':
            return { ...state, data: action.data }
        case 'data':
            return { ...state, data: action.data, loading: false, error: void 0 }
        case 'clearError':
            return { ...state, error: undefined };
        case 'error':
            return { ...state, error: action.error, loading: false }
        case 'loading':
            return { ...state, loading: action.loading }
        default:
            return state
    }
}
import { useRef, useEffect, useReducer } from "react";
import { clear, del, get, set } from 'idb-keyval';

import InlineFetchWorker from './worker.js?worker&inline'

type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined
type WorkerResponseType = MessageEvent<{
    type: string;
    data?: UnknownDataResponseType
}>
const DAY = 24 * 60 * 60 * 1000;
function cleanupWorker(worker: Worker | undefined) {
    worker?.postMessage({ type: 'cancel' });
    worker?.terminate();
    worker = void 0;
}
function reducer(state: any, action: any) {
    switch (action.type) {
        case 'nuke':
            return { ...state, nuked: true }
        case 'pre-load':
            return { ...state, data: action.data }
        case 'data':
            return { ...state, data: action.data, loading: false, nuked: false, error: void 0 }
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
export interface FetchWorkerProps {
    cache?: boolean
    fetchOptions?: RequestInit | undefined
    maxAge: number
    // middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType
    url: RequestInfo | URL
}
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    nuked: boolean;
    update: boolean;
}
const initialState: StateType = {
    data: undefined,
    error: undefined,
    loading: false,
    nuked: false,
    update: true
}
export function useFetchHook() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const sharedRef = useRef<{ worker?: Worker; controller?: AbortController }>({ worker: undefined, controller: new AbortController() });
    let { worker, controller } = sharedRef.current;
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

    const fetchWorker = async ({ url, fetchOptions, cache = false, maxAge = DAY }: FetchWorkerProps) => {
        cleanupWorker(worker);
        let next = await get(url.toString()).then((value) => {
            if (!value?.timestamp) { return true }
            if (value?.timestamp + maxAge <= Date.now()) {
                del(url.toString());
                return true;
            }
            console.log('cache hit', url.toString());
            dispatch({ type: cache ? 'data' : 'pre-load', data: value?.data });
            return cache ? false : true;
        })

        if (window && next) {
            del(url.toString());
            worker = new InlineFetchWorker();
            dispatch({ type: 'loading', loading: true });
            worker.postMessage({ type: 'fetch', url, fetchOptions });
            worker.addEventListener('message', ({ data: { data, type } }: WorkerResponseType) => {
                if (!controller?.signal?.aborted) {
                    if (type === 'success') {
                        dispatch({ type: 'data', data, url, fetchOptions })
                        if (cache) {
                            let timestamp = Date.now();
                            let cacheObject = { timestamp, data }
                            set(url.toString(), cacheObject)
                                .then(() => { console.log("saved data") })
                                .catch(() => { console.error("couldn't access indexedDB to save data") });
                        } else {
                            dispatch({ type: 'error', error: new Error(type) });
                        }
                    }
                }
                cleanupWorker(worker)
            });
        }
    }
    const nukeDB = () => {clear()}
    return { fetchWorker, nukeDB, ...state! };
};

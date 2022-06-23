/**
 * @todo polling option
 * @todo work on READ.ME
 */

import { useRef, useEffect, useReducer } from "react";

import PollingWorker from './polling_worker.js?worker&inline'
import { useStore } from "./useStore";
import { cleanupWorker, dataExpired, methodType, reducer } from "./utils";


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
export interface PollingWorkerProps {
    url: string
    fetchOptions?: RequestInit | undefined
    interval: string
    maxAttempts: string
    currentJSON: string
    compareKeys: Array<string>
}
/**
 * useFetch is a React hook that can be initialized with no params.
 * isPolling
 * error
 * data
 * cachedData
 * pollWorker
 * 
 */
export function usePolling() {
    const { del, get, set } = useStore()
    const [state, dispatch] = useReducer(reducer, initialState);
    const workerRef = useRef<Worker>(new PollingWorker());
    let worker = workerRef.current;

    const pollWorker = async ({url, fetchOptions, interval, maxAttempts, currentJSON, compareKeys}: PollingWorkerProps) => {
        if(!methodType(fetchOptions).isGet) {
            return dispatch({ type: 'error', error: new Error('method must be GET to poll') });
        }
        let currentData = {}
        try {
            let value = await get(url.toString())
            if (dataExpired(value.maxAge ?? 0, value.timestamp ?? 0)) {
                // expire cache
                del(url.toString()).catch(err => {console.error(err)})
            }
            currentData = value.data ?? {}
        } catch (err) {
            console.error(err);
        }
        worker.postMessage({ type: 'poll', url, fetchOptions, interval, maxAttempts, currentJSON, compareKeys })
        worker.addEventListener('message', ({ data: { data, type } }: WorkerResponseType) => {
        });
    }
    useEffect(() => {
        if (!window) {
            dispatch({ type: 'loading', loading: false });
            dispatch({ type: 'error', error: new Error('window is not defined') });
            cleanupWorker(worker);
        }
        return () => {
            cleanupWorker(worker);
        }
    }, [window]);

    return { pollWorker, ...state! };
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

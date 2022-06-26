import { useRef, useEffect, useReducer } from "react";

import FetchWorker from '../workers/fetch_worker.js?worker&inline'
import { cleanupWorker, DAY, initialState, reducer, serializeFunction, UnknownDataResponseType } from "../utils";


type WorkerResponseType = MessageEvent<{
    type: string;
    data?: UnknownDataResponseType
}>

export interface FetchWorkerProps {
    options?: RequestInit | undefined
    maxAge?: number
    middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType
    url: RequestInfo | URL
    /* 
    update will be fetched after the response is received.
    This is useful for updating after POST PUT or DELETE, 
    where the api doesn't return all the data and the GET
    endpoint is different.
    */
    update?: {
        url: RequestInfo | URL,
        options?: RequestInit | undefined
    }
}
export interface PollWorkerProps {
    url: RequestInfo | URL
    interval: number,
    options?: RequestInit | undefined
    maxAttempts?: number,
    existingData?: number, 
    compareKeys?: string[]
}
/**
 * useFetch is a React hook that can be initialized with no params.
 * @example const { data, error, loading, fetchWorker } = useFetch()
 * fetchWorker({
 *  url: 'https://swapi.dev/api/people/1/',
 *  middleware: (d:Record<string, any>) => { let keys = Object.keys(d); return {[keys[0]]: d[keys[0]], [keys[1]]: d[keys[1]]}}
 * });
 * 
 * 
 */
export function useFetch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const workerRef = useRef<Worker>();
    
    const fetchWorker = async ({ url, options, maxAge = DAY, middleware }: FetchWorkerProps) => {
        let worker = workerRef.current;
        dispatch({ type: 'loading', loading: true });

        worker?.addEventListener('message', ({ data: { type, data } }: WorkerResponseType) => {
            switch (type) {
                case 'CACHED':
                case 'COMPLETE':
                    dispatch({ type: 'loading', loading: false })
                    break;
                case 'DATA':
                    dispatch({ type: 'data', data })
                    break;
                case 'PRE_LOAD':
                    dispatch({ type: 'pre-load', data })
                    break;
                default:
                    dispatch({ type: 'error', error: new Error(type) });
                    break;
            }
        });
        let serializedMw = middleware ? serializeFunction(middleware) : undefined
        worker?.postMessage({ type: 'fetch', url, options, existingData: state.data, middleware: serializedMw, maxAge });
    }
    const pollWorker = async ({ url, interval = 5000, options, maxAttempts = 100, compareKeys }: PollWorkerProps) => {
        let worker = workerRef.current;
        dispatch({ type: 'loading', loading: true })
        worker?.addEventListener('message', ({ data: { type, data } }: WorkerResponseType) => {
            if(type === 'COMPLETE') dispatch({ type: 'loading', loading: false });
            else if(type === 'DATA') dispatch({ type: 'data', data });
            else dispatch({ type: 'error', error: new Error(type) });
        })
        worker?.postMessage({ type: 'poll', url, interval, maxAttempts, options, existingData: state.data, compareKeys });
    }

    useEffect(() => {
        workerRef.current = new FetchWorker()
        return () => {
            cleanupWorker(workerRef.current);
        }
    }, []);

    return { fetchWorker, pollWorker, ...state! };
};


/**
 * @todo handle query strings?
 * @todo work on READ.ME
 */

import { useRef, useEffect, useReducer } from "react";

import FetchWorker from '../workers/fetch_worker.js?worker&inline'
import { useStore } from "./useStore";
import { cleanupWorker, dataExpired, DAY, initialState, isObject, methodType, reducer, serializeFunction, UnknownDataResponseType } from "../utils";


type WorkerResponseType = MessageEvent<{
    type: string;
    data?: UnknownDataResponseType
}>

export interface FetchWorkerProps {
    fetchOptions?: RequestInit | undefined
    maxAge?: number
    middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType
    url: RequestInfo | URL
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
    const { del, get, set, update } = useStore()
    const [state, dispatch] = useReducer(reducer, initialState);
    const workerRef = useRef<Worker>();

    const fetchWorker = async ({ url, fetchOptions, maxAge = DAY, middleware }: FetchWorkerProps) => {
        let worker = workerRef.current;
        dispatch({ type: 'loading', loading: true });
        let method = methodType(fetchOptions)
        if (method === 'DELETE') del(url.toString());
        if (method === 'GET') {
            get(url.toString())
                .then((value) => {
                    if (!value) throw new Error('no value found in db')
                    if (dataExpired(maxAge, value?.timestamp)) {
                        del(url.toString())
                    } else {
                        dispatch({ type: 'pre-load', data: value?.data });
                    }
                })
                .catch(() => { dispatch({ type: 'pre-load', data: undefined }) })
        }
        worker?.addEventListener('message', ({ data: { type, data } }: WorkerResponseType) => {
            if (type === 'DELETE' || type === 'CACHED') {
                dispatch({ type: 'loading', loading: false })
            } else if (type === 'GET') {
                dispatch({ type: 'data', data })
                let timestamp = Date.now();
                let cacheObject = { timestamp, maxAge, data }
                set(url.toString(), cacheObject)
                    .then(() => { console.log("saved data") })
                    .catch(() => { console.error("couldn't access indexedDB to save data") })
            } else if (type === 'PUT' || type === 'POST') {
                update(url.toString(), (oldValue) => {
                    let timestamp = Date.now();
                    let newData = isObject(data) && isObject(oldValue?.data) ? { ...oldValue.data, ...data } : data;
                    dispatch({ type: 'data', data: newData })
                    return { timestamp, maxAge, data: newData }
                })
                    .then(() => { console.log("updated data") })
                    .catch(() => {
                        dispatch({ type: 'loading', loading: false });
                        console.error("save to indexedDB failed")
                    })
            } else {
                dispatch({ type: 'error', error: new Error(type) });
            }
        });
        let serializedMw = middleware ? serializeFunction(middleware) : undefined
        worker?.postMessage({ type: 'fetch', url, fetchOptions, existingData: state.data, middleware: serializedMw });
    }

    useEffect(() => {
        workerRef.current = new FetchWorker()
        return () => {
            cleanupWorker(workerRef.current);
        }
    }, []);

    return { fetchWorker, ...state! };
};


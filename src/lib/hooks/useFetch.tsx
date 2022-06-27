import { useRef, useEffect, useReducer } from "react";

import FetchWorker from '../workers/fetch_worker.js?worker&inline'
import { cleanupWorker, DAY, initialState, reducer, serializeFunction } from "../utils";

import type { FetchWorkerProps, WorkerResponseType } from "../types";


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
        
        worker?.postMessage({ type: 'fetch', url, options, existingData: state.data, middleware: serializeFunction(middleware), maxAge });
    }

    useEffect(() => {
        workerRef.current = new FetchWorker()
        return () => {
            cleanupWorker(workerRef.current);
        }
    }, []);

    return { fetchWorker, ...state! };
};


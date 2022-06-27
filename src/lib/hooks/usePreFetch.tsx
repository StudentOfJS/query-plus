import { useRef, useEffect } from "react";

import FetchWorker from '../workers/fetch_worker.js?worker&inline'
import { cleanupWorker, serializeFunction } from "../utils";

import type { FetchWorkerBaseRequestType } from "../types";


export function usePreFetch(prefetch?: Array<FetchWorkerBaseRequestType>) {
    const worker = useRef<Worker>(new FetchWorker());
    useEffect(() => {
        if(prefetch && worker.current) {
            worker.current?.postMessage({ type: 'pre-fetch', prefetch: prefetch.map(p => ({...p, middleware: serializeFunction(p.middleware)})) });
        }
    }, [prefetch, worker.current]);

    useEffect(() => {
        worker.current = new FetchWorker()
        return () => {
            cleanupWorker(worker.current);
        }
    }, []);
};


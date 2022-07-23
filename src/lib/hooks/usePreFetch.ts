import { useRef, useEffect } from "react";

import FetchWorker from '../workers/fetch_worker.js?worker&inline'
import { serializeFunction } from "../utils";

import type { FetchWorkerBaseRequestType, WorkerResponseType } from "../types";


export function usePreFetch(prefetch?: Array<FetchWorkerBaseRequestType>) {
    const worker = useRef<Worker | undefined>(new FetchWorker());
    useEffect(() => {
        if(prefetch && worker.current) {
            worker?.current?.addEventListener('message', ({ isTrusted, data: { type } }: WorkerResponseType) => {
                if (isTrusted) {
                    if(type === 'PREFETCH_COMPLETE') {
                        worker?.current?.terminate();
                        worker.current = undefined;
                    }
                }
            })
            worker.current?.postMessage({ type: 'pre-fetch', prefetch: prefetch.map(p => ({...p, middleware: serializeFunction(p.middleware)})) });
        }
    }, [prefetch, worker.current]);
};


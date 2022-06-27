import { useRef, useEffect, useState } from "react";

import StoreWorker from '../workers/store_worker.js?worker&inline'
import { cleanupWorker } from "../utils";

import type { WorkerResponseType } from "../types";

export function useData(key: string) {
    const [data, setData] = useState<unknown>()
    const worker = useRef<Worker>(new StoreWorker());
    // build the postMessage functions

    useEffect(() => {
        return () => {
            cleanupWorker(worker.current);
        }
    }, []);
    return [data];
};

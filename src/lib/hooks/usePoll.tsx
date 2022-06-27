import { useRef, useEffect, useReducer } from "react";

import FetchWorker from '../workers/fetch_worker.js?worker&inline'
import { cleanupWorker, initialState, reducer } from "../utils";

import type { WorkerResponseType, PollWorkerProps } from "../types";

export function usePoll(props: PollWorkerProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const worker = useRef<Worker>(new FetchWorker());
    
    useEffect(() => {
        if(props && worker.current) {
            dispatch({ type: 'loading', loading: true })
            worker.current?.addEventListener('message', ({ data: { type, data } }: WorkerResponseType) => {
                if(type === 'COMPLETE') dispatch({ type: 'loading', loading: false });
                else if(type === 'DATA') dispatch({ type: 'data', data });
                else dispatch({ type: 'error', error: new Error(type) });
            })
            worker.current?.postMessage({ type: 'poll', ...props, existingData: state.data });
        }
    }, [props, worker.current]);
    useEffect(() => {
        return () => {
            cleanupWorker(worker.current);
        }
    }, []);
    return { ...state! };
};

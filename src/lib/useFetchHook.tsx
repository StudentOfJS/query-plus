import { useRef, useEffect, useReducer } from "react";
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
interface StateType {
    url?: RequestInfo | URL
    options?: RequestInit | undefined
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
export function useFetchHook() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const sharedRef = useRef<{ worker?: Worker; controller?: AbortController }>({ worker: undefined, controller: new AbortController() });
    let { worker, controller } = sharedRef.current;
    useEffect(() => {
        if (!window && !sharedRef?.current?.controller?.signal?.aborted) {
            dispatch({ type: 'loading', loading: false });
            dispatch({ type: 'error', error: new Error('window is not defined') });
            cleanupWorker(worker)
        }
        return () => {
            cleanupWorker(worker)
        }
    }, [window, sharedRef.current.controller]);

    const fetchWorker = ({url, options, cache = false, maxAge=DAY}: {url: RequestInfo | URL, options?: RequestInit | undefined, cache?: boolean, maxAge: number}) => {
        cleanupWorker(worker);
        let update = !cache
        if(cache) {
            let storedDataString = sessionStorage.getItem(url.toString());
            if (storedDataString) {
                let {data, timestamp} = JSON.parse(storedDataString)
                if (timestamp + maxAge > Date.now()) {
                    dispatch({ type: 'data', data });
                } else {
                    update = true
                }
            } else {
                update = true
            }
        }
        if (window && update) {
            sessionStorage.removeItem(url.toString());
            worker = new InlineFetchWorker();
            dispatch({ type: 'loading', loading: true });
            worker.postMessage({ type: 'fetch', url, options });
            worker.addEventListener('message', ({ data: { data, type  } }: WorkerResponseType) => {
                if (!controller?.signal?.aborted) {
                    switch (type) {
                        case 'success':
                            if(cache) {
                                let timestamp = Date.now();
                                let cacheObject = {timestamp,data}
                                let dataString = JSON.stringify(cacheObject);
                                sessionStorage.setItem(url.toString(), dataString);
                            }
                            dispatch({ type: 'data', data, url, options })
                            break;
                        default:
                            dispatch({ type: 'error', error: new Error(type)});
                            break;
                    }
                }
                cleanupWorker(worker)
            });
        }
    }
    return { fetchWorker, ...state! };
};

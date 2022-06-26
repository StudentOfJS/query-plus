import { UnknownDataResponseType } from "../utils";
export interface FetchWorkerProps {
    options?: RequestInit | undefined;
    maxAge?: number;
    middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType;
    url: RequestInfo | URL;
    update?: {
        url: RequestInfo | URL;
        options?: RequestInit | undefined;
    };
}
export interface PollWorkerProps {
    url: RequestInfo | URL;
    interval: number;
    options?: RequestInit | undefined;
    maxAttempts?: number;
    existingData?: number;
    compareKeys?: string[];
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
export declare function useFetch(): {
    data: any;
    loading: boolean;
    preload: boolean;
    error: undefined;
    update: boolean;
    fetchWorker: ({ url, options, maxAge, middleware }: FetchWorkerProps) => Promise<void>;
    pollWorker: ({ url, interval, options, maxAttempts, compareKeys }: PollWorkerProps) => Promise<void>;
} | {
    error: any;
    loading: boolean;
    preload: boolean;
    data: UnknownDataResponseType;
    update: boolean;
    fetchWorker: ({ url, options, maxAge, middleware }: FetchWorkerProps) => Promise<void>;
    pollWorker: ({ url, interval, options, maxAttempts, compareKeys }: PollWorkerProps) => Promise<void>;
} | {
    loading: any;
    data: UnknownDataResponseType;
    error?: Error | undefined;
    preload: boolean;
    update: boolean;
    fetchWorker: ({ url, options, maxAge, middleware }: FetchWorkerProps) => Promise<void>;
    pollWorker: ({ url, interval, options, maxAttempts, compareKeys }: PollWorkerProps) => Promise<void>;
};

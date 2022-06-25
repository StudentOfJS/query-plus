/**
 * @todo complete pollWorker function
 * @todo export usePolling hook
 */
declare type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined;
export interface FetchWorkerProps {
    cache?: boolean;
    fetchOptions?: RequestInit | undefined;
    maxAge: number;
    url: RequestInfo | URL;
}
export interface PollingWorkerProps {
    url: string;
    fetchOptions?: RequestInit | undefined;
    interval: string;
    maxAttempts: string;
    currentJSON: string;
    compareKeys: Array<string>;
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
export declare function usePolling(): {
    data: any;
    error?: Error | undefined;
    loading: boolean;
    update: boolean;
    pollWorker: ({ url, fetchOptions, interval, maxAttempts, currentJSON, compareKeys }: PollingWorkerProps) => Promise<void>;
} | {
    error: any;
    loading: boolean;
    data: import("../utils").UnknownDataResponseType;
    update: boolean;
    pollWorker: ({ url, fetchOptions, interval, maxAttempts, currentJSON, compareKeys }: PollingWorkerProps) => Promise<void>;
} | {
    loading: any;
    data: import("../utils").UnknownDataResponseType;
    error?: Error | undefined;
    update: boolean;
    pollWorker: ({ url, fetchOptions, interval, maxAttempts, currentJSON, compareKeys }: PollingWorkerProps) => Promise<void>;
};
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    update: boolean;
}
export {};

/**
 * @todo allow multiple queries - data array of json or keyed (by url) single object
 * @todo handle query strings
 * @todo work on READ.ME
 * @todo update fetchWorker to isMatch data like pollingWorker
 */
declare type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined;
export interface FetchWorkerProps {
    fetchOptions?: RequestInit | undefined;
    maxAge: number;
    url: RequestInfo | URL;
}
/**
 * useFetch is a React hook that can be initialized with no params.
 * @example const { data, error, loading, fetchWorker } = useFetch()
 *
 */
export declare function useFetch(): any;
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    update: boolean;
}
export {};

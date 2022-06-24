/**
 * @todo allow multiple queries - data array of json or keyed (by url) single object
 * @todo handle query strings
 * @todo add to GET method - if existing data, send to worker and update
 * @todo work on READ.ME
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

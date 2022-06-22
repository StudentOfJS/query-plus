/**
 *
 * @todo consider how to handle non GET requests
 */
declare type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined;
export interface FetchWorkerProps {
    cache?: boolean;
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

/**
 * @todo consider how to handle non GET requests
 * @todo consider how to handle non JSON responses
 */
declare type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined;
export interface FetchWorkerProps {
    cache?: boolean;
    fetchOptions?: RequestInit | undefined;
    maxAge: number;
    url: RequestInfo | URL;
}
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    nuked: boolean;
    update: boolean;
}
export declare function useFetch(): any;
export {};

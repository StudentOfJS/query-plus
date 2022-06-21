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
export declare function useFetchHook(): any;
export {};

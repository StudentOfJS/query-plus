/**
 * @todo handle query strings?
 * @todo work on READ.ME
 */
import { UnknownDataResponseType } from "../utils";
export interface FetchWorkerProps {
    fetchOptions?: RequestInit | undefined;
    maxAge?: number;
    middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType;
    url: RequestInfo | URL;
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
    error?: Error | undefined;
    loading: boolean;
    update: boolean;
    fetchWorker: ({ url, fetchOptions, maxAge, middleware }: FetchWorkerProps) => Promise<void>;
} | {
    error: any;
    loading: boolean;
    data: UnknownDataResponseType;
    update: boolean;
    fetchWorker: ({ url, fetchOptions, maxAge, middleware }: FetchWorkerProps) => Promise<void>;
} | {
    loading: any;
    data: UnknownDataResponseType;
    error?: Error | undefined;
    update: boolean;
    fetchWorker: ({ url, fetchOptions, maxAge, middleware }: FetchWorkerProps) => Promise<void>;
};

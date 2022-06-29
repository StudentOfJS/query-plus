import type { FetchWorkerProps } from "../types";
export declare function useFetch(): {
    data: any;
    loading: boolean;
    preload: boolean;
    error: undefined;
    update: boolean;
    fetchWorker: ({ url, options, maxAge, preferUseCache, middleware }: FetchWorkerProps) => Promise<void>;
} | {
    error: any;
    loading: boolean;
    preload: boolean;
    data: import("../utils").UnknownDataResponseType;
    update: boolean;
    fetchWorker: ({ url, options, maxAge, preferUseCache, middleware }: FetchWorkerProps) => Promise<void>;
} | {
    loading: any;
    data: import("../utils").UnknownDataResponseType;
    error?: Error | undefined;
    preload: boolean;
    update: boolean;
    fetchWorker: ({ url, options, maxAge, preferUseCache, middleware }: FetchWorkerProps) => Promise<void>;
};

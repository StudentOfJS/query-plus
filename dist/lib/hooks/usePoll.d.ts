import type { PollWorkerProps } from "../types";
export declare function usePoll(props: PollWorkerProps): {
    data: any;
    loading: boolean;
    preload: boolean;
    error: undefined;
    update: boolean;
} | {
    error: any;
    loading: boolean;
    preload: boolean;
    data: import("../utils").UnknownDataResponseType;
    update: boolean;
} | {
    loading: any;
    data: import("../utils").UnknownDataResponseType;
    error?: Error | undefined;
    preload: boolean;
    update: boolean;
};

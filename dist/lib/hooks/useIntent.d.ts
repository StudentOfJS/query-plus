import type { FetchWorkerBaseRequestType } from "../types";
interface UseIntentOptions<T> {
    expandTarget?: number;
    targetRef: React.RefObject<T>;
    prefetch: Array<FetchWorkerBaseRequestType>;
    timeToExcecute?: number;
}
export declare function useIntent<T extends HTMLElement>({ expandTarget, targetRef, prefetch, timeToExcecute }: UseIntentOptions<T>): void;
export {};

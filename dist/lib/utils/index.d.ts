export * from "./state_tools";
export declare const DAY: number;
export declare function cleanupWorker(worker: Worker | undefined): void;
export declare const dataExpired: (maxAge: number, timestamp?: number | undefined) => boolean;
export declare const isObject: (obj: unknown) => boolean;
export declare const flattenObjectToArray: (obj: Record<string, any>, parent?: string | undefined, flatObj?: Record<string, any>) => [string, any][];
export declare const flattenAndSortArray: (arr: Array<any>) => any[];
export declare const methodType: (options: RequestInit | undefined) => string;
export declare const isMatch: (a: unknown, b: unknown, compareKeys?: string[] | undefined) => boolean;
export declare type StringAnyTuple = [string, any];
export declare type ArrayOfStringAnyTuple = Array<StringAnyTuple>;
export declare type createArrayOfUpdatesType = (oldRecord: Record<string, any>, newRecord: Record<string, any>) => ArrayOfStringAnyTuple;
export declare const createArrayOfUpdates: createArrayOfUpdatesType;
export declare const serializeFunction: (f: Function) => string;
export declare const deserializeFunction: (s: string) => any;

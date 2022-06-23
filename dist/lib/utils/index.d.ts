export * from './state_tools';
export declare const DAY: number;
export declare const isObject: (obj: unknown) => boolean;
export declare function cleanupWorker(worker: Worker | undefined): void;
export declare const dataExpired: (maxAge: number, timestamp?: number) => boolean;
export declare const methodType: (options: RequestInit | undefined) => string;

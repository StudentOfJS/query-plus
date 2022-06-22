export declare const DAY: number;
export declare function cleanupWorker(worker: Worker | undefined): void;
export declare const dataExpired: (maxAge: number, timestamp?: number) => boolean;
export declare const methodType: (options: RequestInit | undefined) => {
    isGet: boolean;
    isPost: boolean;
    isPut: boolean;
    isDelete: boolean;
};

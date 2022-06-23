export * from './state_tools'
export const DAY = 24 * 60 * 60 * 1000;
export const isObject = (obj: unknown) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
export function cleanupWorker(worker: Worker | undefined) {
    worker?.postMessage({ type: 'cancel' });
        worker?.terminate();
        worker = void 0;    
}

export const dataExpired = (maxAge: number,timestamp: number = 0) => timestamp + maxAge > Date.now()
export const methodType = (options: RequestInit | undefined) => options?.method?.toUpperCase() || 'GET';

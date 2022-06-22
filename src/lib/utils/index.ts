export const DAY = 24 * 60 * 60 * 1000;

export function cleanupWorker(worker: Worker | undefined) {
    worker?.postMessage({ type: 'cancel' });
    worker?.terminate();
    worker = void 0;
}

export const dataExpired = (maxAge: number,timestamp: number = 0) => timestamp + maxAge > Date.now()

export const methodType = (options: RequestInit | undefined) => {
    let method = options?.method?.toUpperCase() || 'GET';
    return {
        isGet: method === 'GET',
        isPost: method === 'POST',
        isPut: method === 'PUT',
        isDelete: method === 'DELETE',
    }
}

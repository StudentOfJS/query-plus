interface UseEventListenerOptions {
    eventName: string;
    handler: (event: any) => void;
    element?: typeof globalThis | Element | null;
    options?: Record<string, any>;
}
declare const useEventListener: ({ eventName, handler, element, options }: UseEventListenerOptions) => void;
export default useEventListener;

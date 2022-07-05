interface UseEventListenerOptions {
    eventName: string;
    handler: (event: any) => void;
    options?: Record<string, any>;
}
declare const useEventListener: ({ eventName, handler, options }: UseEventListenerOptions) => ((() => void) | undefined)[];
export default useEventListener;

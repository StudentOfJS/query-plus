import { useRef, useEffect } from 'react';

interface UseEventListenerOptions {
  eventName: string;
  handler: (event: any) => void;
  element?: typeof globalThis | Element | null;
  options?: Record<string, any>
}
const useEventListener = ({
  eventName,
  handler,
  element = window.document.body,
  options = {}
}: UseEventListenerOptions) => {
  const savedHandler = useRef<(event: any) => void>();
  const { capture, passive, once } = options;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }
    const eventListener = (event: any) => savedHandler.current && savedHandler.current(event);
    const opts = { capture, passive, once };
    element.addEventListener(eventName, eventListener, opts);
    return () => {
      element.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);
};

export default useEventListener;
import { useRef, useEffect } from 'react';

interface UseEventListenerOptions {
  eventName: string;
  handler: (event: any) => void;
  options?: Record<string, any>
}
const useEventListener = ({
  eventName,
  handler,
  options = {}
}: UseEventListenerOptions) => {
  const savedHandler = useRef<(event: any) => void>();
  const removeHanlder = useRef<() => void>();
  const { capture, passive, once } = options;
  const element = window.document.body

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
    const remove = () => element.removeEventListener(eventName, eventListener, opts);
    removeHanlder.current = remove;
    return remove
  }, [eventName, element, capture, passive, once]);

  return [removeHanlder.current];
};

export default useEventListener;
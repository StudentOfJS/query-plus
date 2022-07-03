import { useEffect, useRef, useState } from "react";
import { usePreFetch } from "../hooks/usePreFetch";
import type { FetchWorkerBaseRequestType } from "../types";

interface InterfaceFetchWithIntent {
    children: React.ReactNode;
    prefetch: Array<FetchWorkerBaseRequestType>
    timeToExcecute?: number;
}

export const FetchWithIntent: React.FC<InterfaceFetchWithIntent> = ({children, prefetch, timeToExcecute = 1000}) => {
    const [prefetchConfig, setprefetchConfig] = useState<Array<FetchWorkerBaseRequestType>>()
    const timer = useRef<NodeJS.Timeout>()
    usePreFetch(prefetchConfig)
    const handleClearTimeout = () => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
    }
    const handleMouseEnter = () => {
        handleClearTimeout()
        timer.current = setTimeout(() => {setprefetchConfig(prefetch)}, timeToExcecute)
    }
    useEffect(() => handleClearTimeout, []);
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleClearTimeout}>
        {children}
    </div>
  );
};

export default FetchWithIntent;

import { useState, useRef, useEffect } from "react"
import { usePreFetch } from "./usePreFetch"
import useEventListener from "./useEventListener";

import type { FetchWorkerBaseRequestType } from "../types"

interface UseIntentOptions<T> {
		expandTarget?: number
    targetRef: React.RefObject<T>;
    prefetch: Array<FetchWorkerBaseRequestType>
    timeToExcecute?: number;
}

export function useIntent<T extends HTMLElement>({ expandTarget = 0, targetRef, prefetch, timeToExcecute = 1000 }: UseIntentOptions<T>) {
    const [prefetchConfig, setprefetchConfig] = useState<Array<FetchWorkerBaseRequestType>>()
    const timer = useRef<NodeJS.Timeout>()
    usePreFetch(prefetchConfig)
    useEventListener({
        eventName: "mousemove",
        handler: ({ clientX, clientY }) => {
          let left = (targetRef.current?.offsetLeft ?? 0) - expandTarget
          let right = (targetRef.current?.offsetLeft ?? 0) + (targetRef.current?.offsetWidth ?? 0) + expandTarget
          let top = (targetRef.current?.offsetTop ?? 0) - expandTarget
					let bottom = (targetRef.current?.offsetTop ?? 0) + (targetRef.current?.offsetHeight ?? 0) + expandTarget
					if(clientX > left && clientX < right && clientY > top && clientY < bottom) {
						if(!timer.current) {
							timer.current = setTimeout(() => {
								setprefetchConfig(prefetch)
							}, timeToExcecute)
						}
					} else {
						if(timer.current) {
							clearTimeout(timer.current)
							timer.current = undefined
						}
					}
        },
        options: { passive: true }
    });
    useEffect(() => () => { clearTimeout(timer.current) }, [])
}
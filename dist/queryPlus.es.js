import { useReducer, useRef, useEffect, useState } from "react";
import "idb-keyval";
const encodedJs = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIHAodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gTSh0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IHI9cChuKTtyZXR1cm4oYSxjKT0+ci50aGVuKG89PmMoby50cmFuc2FjdGlvbihlLGEpLm9iamVjdFN0b3JlKGUpKSl9bGV0IHc7ZnVuY3Rpb24geSgpe3JldHVybiB3fHwodz1NKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksd31mdW5jdGlvbiBHKHQsZT15KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+cChuLmdldCh0KSkpfWZ1bmN0aW9uIHgodCxlLG49eSgpKXtyZXR1cm4gbigicmVhZHdyaXRlIixyPT4oci5wdXQoZSx0KSxwKHIudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gUih0LGUsbj15KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLHI9Pm5ldyBQcm9taXNlKChhLGMpPT57ci5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e3IucHV0KGUodGhpcy5yZXN1bHQpLHQpLGEocChyLnRyYW5zYWN0aW9uKSl9Y2F0Y2gobyl7YyhvKX19fSkpfWZ1bmN0aW9uIFUodCxlPXkoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLHAobi50cmFuc2FjdGlvbikpKX1mdW5jdGlvbiBOKCl7Y29uc3Qgbj1NKCJ1c2VzdG9yZS1kYiIsInVzZXN0b3JlLWRiIik7cmV0dXJue3JlbW92ZTppPT5VKGksbiksZ2V0RGF0YTppPT5HKGksbiksc2V0RGF0YTooaSxoKT0+eChpLGgsbiksdXBkYXRlRGF0YTooaSxoKT0+UihpLGgsbil9fWNvbnN0IF89KHQsZSk9PmU/dCtlPERhdGUubm93KCk6ITAsRD10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxBPSh0LGUsbj17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKHI9PntsZXQgYT1lP2UrIi4iK3I6cjtEKHRbcl0pP0EodFtyXSxhLG4pOm5bYV09QXJyYXkuaXNBcnJheSh0W3JdKT90W3JdLnNvcnQoKTp0W3JdfSksT2JqZWN0LmVudHJpZXMobikuc29ydCgpKSxUPXQ9PnQuZmxhdE1hcChlPT5EKGUpP0EoZSk6W2VdKS5zb3J0KCksST10PT57dmFyIGUsbjtyZXR1cm4obj0oZT10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOmUudG9VcHBlckNhc2UoKSkhPW51bGw/bjoiR0VUIn0sTz0odCxlLG4pPT57bGV0IHI9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LGE9QXJyYXkuaXNBcnJheShlKT8iYXJyYXkiOnR5cGVvZiBlO3JldHVybiByIT09YT8hMTpyIT09Im9iamVjdCImJnIhPT0iYXJyYXkiP3I9PT1hOm4mJnI9PT0ib2JqZWN0Ij9uLm1hcChjPT50W2NdPT09ZVtjXSkuZXZlcnkoYz0+Yyk6KHI9PT0iYXJyYXkiJiYodD1UKHQpLGU9VChlKSksIW4mJnI9PT0ib2JqZWN0IiYmKHQ9QSh0KSxlPUEoZSkpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkoZSkpfSxDPXQ9PnQ/bmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtkZWNvZGVVUkkodCl9YCkoKTplPT5lLHtyZW1vdmU6TCxnZXREYXRhOiQsc2V0RGF0YTpQLHVwZGF0ZURhdGE6Rn09TigpLGc9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LG09dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTplfT10LmRhdGE7bGV0IG49bmV3IEFib3J0Q29udHJvbGxlcixyPW49PW51bGw/dm9pZCAwOm4uc2lnbmFsO2lmKGU9PT0iY2FuY2VsIiYmKG49PW51bGx8fG4uYWJvcnQoKSksZT09PSJwcmUtZmV0Y2giKXtsZXR7cHJlZmV0Y2g6YX09dC5kYXRhO2EuZm9yRWFjaCgoe21pZGRsZXdhcmU6Yyx1cmw6byxvcHRpb25zOmksbWF4QWdlOmh9KT0+e2xldCBTPUMoYyk7ZmV0Y2goby50b1N0cmluZygpLHtzaWduYWw6ciwuLi5pfSkudGhlbihnKS50aGVuKGQ9PntQKG8udG9TdHJpbmcoKSx7dGltZXN0YW1wOkRhdGUubm93KCksZGF0YTpTKGQpLG1heEFnZTpofSkudGhlbigoKT0+e2NvbnNvbGUubG9nKGBzYXZlZCBwcmVmZXRjaCAke299YCl9KS5jYXRjaCh1PT57Y29uc29sZS5sb2coYGVycm9yIHNhdmluZyBwcmVmZXRjaCAke299YCx1KX0pfSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oIm5vIGRhdGEgZm91bmQiKX0pfSl9aWYoZT09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6YSxwcmVmZXJVc2VDYWNoZTpjLHVybDpvLG9wdGlvbnM6aSxtYXhBZ2U6aCxtaWRkbGV3YXJlOlMsdXBkYXRlOmR9PXQuZGF0YTtjb25zdCB1PXM9PntzPUMoUykocyksKCFhfHwhTyhhLHMpKSYmKHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6c30pLFAoby50b1N0cmluZygpLHtkYXRhOnMsdGltZXN0YW1wOkRhdGUubm93KCksbWF4QWdlOmh9KS50aGVuKCgpPT57Y29uc29sZS5pbmZvKCJzYXZlZCBkYXRhIil9KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygiY291bGRuJ3QgYWNjZXNzIGluZGV4ZWREQiB0byBzYXZlIGRhdGEiKX0pKSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX07bGV0IGw9SShpKTtsPT09IkRFTEVURSImJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLEwoby50b1N0cmluZygpKSxmZXRjaChvLGkpLnRoZW4oKCk9PntkP2ZldGNoKGQudXJsLGQub3B0aW9ucykudGhlbihnKS50aGVuKHUpLmNhdGNoKHM9Pnt0aHJvdyBzfSk6c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KS5jYXRjaChtKSksbD09PSJHRVQiJiYoJChvLnRvU3RyaW5nKCkpLnRoZW4ocz0+e2lmKCFzKXRocm93IG5ldyBFcnJvcigibm8gdmFsdWUgZm91bmQgaW4gZGIiKTtpZihfKHM9PW51bGw/dm9pZCAwOnMubWF4QWdlLHM9PW51bGw/dm9pZCAwOnMudGltZXN0YW1wKSl0aHJvdyBMKG8udG9TdHJpbmcoKSksbmV3IEVycm9yKCJkYXRhIGV4cGlyZWQiKTtsZXQgZj1PKHM9PW51bGw/dm9pZCAwOnMuZGF0YSxhKSxFPXt0eXBlOmM/IkRBVEEiOmY/IkNBQ0hFRCI6IlBSRV9MT0FEIixkYXRhOiFjJiZmfHxzPT1udWxsP3ZvaWQgMDpzLmRhdGF9O3NlbGYucG9zdE1lc3NhZ2UoRSl9KS5jYXRjaChzPT57Y29uc29sZS5pbmZvKHM9PW51bGw/dm9pZCAwOnMubWVzc2FnZSksYz0hMX0pLGN8fChzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLGZldGNoKG8saT97Li4uaSxzaWduYWw6cn06e3NpZ25hbDpyfSkudGhlbihnKS50aGVuKHUpLmNhdGNoKG0pKSksKGw9PT0iUFVUInx8bD09PSJQT1NUIikmJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLGZldGNoKG8saT97Li4uaSxzaWduYWw6cn06e3NpZ25hbDpyfSkudGhlbihnKS50aGVuKHM9PntkP2ZldGNoKGQudXJsLGQub3B0aW9ucykudGhlbihnKS50aGVuKHUpLmNhdGNoKGY9Pnt0aHJvdyBmfSk6RihvLnRvU3RyaW5nKCksZj0+e2xldCBFPURhdGUubm93KCksQj1EKHMpJiZEKGY9PW51bGw/dm9pZCAwOmYuZGF0YSk/ey4uLmYuZGF0YSwuLi5zfTpzO3JldHVybiBzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOmwsZGF0YTpCfSkse3RpbWVzdGFtcDpFLG1heEFnZTpoLGRhdGE6Qn19KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygidXBkYXRlIHN0b3JlIGZhaWxlZCIpfSkuZmluYWxseSgoKT0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSl9KS5jYXRjaChtKSl9fSl9KSgpOwo=";
const blob = typeof window !== "undefined" && window.Blob && new Blob([atob(encodedJs)], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper() {
  const objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
  try {
    return objURL ? new Worker(objURL, {}) : new Worker("data:application/javascript;base64," + encodedJs, { type: "module" });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
const initialState = {
  data: void 0,
  error: void 0,
  loading: false,
  preload: false,
  update: true
};
function reducer(state, action) {
  switch (action.type) {
    case "pre-load":
      return { ...state, data: action.data, loading: false, preload: true, error: void 0 };
    case "data":
      return { ...state, data: action.data, loading: false, preload: false, error: void 0 };
    case "error":
      return { ...state, error: action.error, loading: false, preload: false };
    case "loading":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}
const DAY = 24 * 60 * 60 * 1e3;
function cleanupWorker(worker) {
  worker == null ? void 0 : worker.postMessage({ type: "cancel" });
  worker == null ? void 0 : worker.terminate();
  worker = void 0;
}
const serializeFunction = (f) => f ? encodeURI(f.toString()) : void 0;
function useFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const workerRef = useRef();
  const fetchWorker = async ({ url, options, maxAge = DAY, preferUseCache, middleware }) => {
    let worker = workerRef.current;
    worker == null ? void 0 : worker.addEventListener("message", ({ data: { type, data } }) => {
      switch (type) {
        case "LOADING":
          dispatch({ type: "loading", loading: true });
          break;
        case "CACHED":
        case "COMPLETE":
          dispatch({ type: "loading", loading: false });
          break;
        case "DATA":
          dispatch({ type: "data", data });
          break;
        case "PRE_LOAD":
          dispatch({ type: "pre-load", data });
          break;
        default:
          dispatch({ type: "error", error: new Error(type) });
          break;
      }
    });
    worker == null ? void 0 : worker.postMessage({ type: "fetch", url, options, existingData: state.data, middleware: serializeFunction(middleware), maxAge, preferUseCache });
  };
  useEffect(() => {
    workerRef.current = new WorkerWrapper();
    return () => {
      cleanupWorker(workerRef.current);
    };
  }, []);
  return { fetchWorker, ...state };
}
function usePreFetch(prefetch) {
  const worker = useRef(new WorkerWrapper());
  useEffect(() => {
    var _a;
    if (prefetch && worker.current) {
      (_a = worker.current) == null ? void 0 : _a.postMessage({ type: "pre-fetch", prefetch: prefetch.map((p) => ({ ...p, middleware: serializeFunction(p.middleware) })) });
    }
  }, [prefetch, worker.current]);
}
const useEventListener = ({
  eventName,
  handler,
  options = {}
}) => {
  const savedHandler = useRef();
  const removeHanlder = useRef();
  const { capture, passive, once } = options;
  const element = window.document.body;
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }
    const eventListener = (event) => savedHandler.current && savedHandler.current(event);
    const opts = { capture, passive, once };
    element.addEventListener(eventName, eventListener, opts);
    const remove = () => element.removeEventListener(eventName, eventListener, opts);
    removeHanlder.current = remove;
    return remove;
  }, [eventName, element, capture, passive, once]);
  return [removeHanlder.current];
};
function useIntent({ expandTarget = 0, targetRef, prefetch, timeToExcecute = 1e3 }) {
  const [prefetchConfig, setprefetchConfig] = useState();
  const [once, setOnce] = useState(false);
  const timer = useRef();
  usePreFetch(prefetchConfig);
  const [remove] = useEventListener({
    eventName: "mousemove",
    handler: ({ clientX, clientY }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      let left = ((_b = (_a = targetRef.current) == null ? void 0 : _a.offsetLeft) != null ? _b : 0) - expandTarget;
      let right = ((_d = (_c = targetRef.current) == null ? void 0 : _c.offsetLeft) != null ? _d : 0) + ((_f = (_e = targetRef.current) == null ? void 0 : _e.offsetWidth) != null ? _f : 0) + expandTarget;
      let top = ((_h = (_g = targetRef.current) == null ? void 0 : _g.offsetTop) != null ? _h : 0) - expandTarget;
      let bottom = ((_j = (_i = targetRef.current) == null ? void 0 : _i.offsetTop) != null ? _j : 0) + ((_l = (_k = targetRef.current) == null ? void 0 : _k.offsetHeight) != null ? _l : 0) + expandTarget;
      if (clientX > left && clientX < right && clientY > top && clientY < bottom) {
        console.info("in target area");
        if (!timer.current) {
          timer.current = setTimeout(() => {
            setprefetchConfig(prefetch);
            setOnce(true);
            remove && remove();
          }, timeToExcecute);
        }
      } else {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = void 0;
        }
      }
    },
    options: { passive: true, once }
  });
  useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);
}
export { useFetch, useIntent, usePreFetch };

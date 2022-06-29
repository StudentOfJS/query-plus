var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { useReducer, useRef, useEffect } from "react";
import "idb-keyval";
const encodedJs = "dmFyIGI9T2JqZWN0LmRlZmluZVByb3BlcnR5LFE9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIFc9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIFI9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgWD1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFk9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgVT0oZixoLGQpPT5oIGluIGY/YihmLGgse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmR9KTpmW2hdPWQsbD0oZixoKT0+e2Zvcih2YXIgZCBpbiBofHwoaD17fSkpWC5jYWxsKGgsZCkmJlUoZixkLGhbZF0pO2lmKFIpZm9yKHZhciBkIG9mIFIoaCkpWS5jYWxsKGgsZCkmJlUoZixkLGhbZF0pO3JldHVybiBmfSxPPShmLGgpPT5RKGYsVyhoKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGYodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gaCh0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IHI9ZihuKTtyZXR1cm4oYSxjKT0+ci50aGVuKG89PmMoby50cmFuc2FjdGlvbihlLGEpLm9iamVjdFN0b3JlKGUpKSl9bGV0IGQ7ZnVuY3Rpb24gRSgpe3JldHVybiBkfHwoZD1oKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksZH1mdW5jdGlvbiBOKHQsZT1FKCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+ZihuLmdldCh0KSkpfWZ1bmN0aW9uIF8odCxlLG49RSgpKXtyZXR1cm4gbigicmVhZHdyaXRlIixyPT4oci5wdXQoZSx0KSxmKHIudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gSSh0LGUsbj1FKCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLHI9Pm5ldyBQcm9taXNlKChhLGMpPT57ci5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e3IucHV0KGUodGhpcy5yZXN1bHQpLHQpLGEoZihyLnRyYW5zYWN0aW9uKSl9Y2F0Y2gobyl7YyhvKX19fSkpfWZ1bmN0aW9uICQodCxlPUUoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLGYobi50cmFuc2FjdGlvbikpKX1mdW5jdGlvbiBGKCl7Y29uc3Qgbj1oKCJ1c2VzdG9yZS1kYiIsInVzZXN0b3JlLWRiIik7cmV0dXJue3JlbW92ZTppPT4kKGksbiksZ2V0RGF0YTppPT5OKGksbiksc2V0RGF0YTooaSxnKT0+XyhpLGcsbiksdXBkYXRlRGF0YTooaSxnKT0+SShpLGcsbil9fWNvbnN0IGo9KHQsZSk9PmU/dCtlPERhdGUubm93KCk6ITAsdz10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxtPSh0LGUsbj17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKHI9PntsZXQgYT1lP2UrIi4iK3I6cjt3KHRbcl0pP20odFtyXSxhLG4pOm5bYV09QXJyYXkuaXNBcnJheSh0W3JdKT90W3JdLnNvcnQoKTp0W3JdfSksT2JqZWN0LmVudHJpZXMobikuc29ydCgpKSxDPXQ9PnQuZmxhdE1hcChlPT53KGUpP20oZSk6W2VdKS5zb3J0KCksej10PT57dmFyIGUsbjtyZXR1cm4obj0oZT10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOmUudG9VcHBlckNhc2UoKSkhPW51bGw/bjoiR0VUIn0sTD0odCxlLG4pPT57bGV0IHI9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LGE9QXJyYXkuaXNBcnJheShlKT8iYXJyYXkiOnR5cGVvZiBlO3JldHVybiByIT09YT8hMTpyIT09Im9iamVjdCImJnIhPT0iYXJyYXkiP3I9PT1hOm4mJnI9PT0ib2JqZWN0Ij9uLm1hcChjPT50W2NdPT09ZVtjXSkuZXZlcnkoYz0+Yyk6KHI9PT0iYXJyYXkiJiYodD1DKHQpLGU9QyhlKSksIW4mJnI9PT0ib2JqZWN0IiYmKHQ9bSh0KSxlPW0oZSkpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkoZSkpfSxQPXQ9PnQ/bmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtkZWNvZGVVUkkodCl9YCkoKTplPT5lLHtyZW1vdmU6QixnZXREYXRhOkgsc2V0RGF0YTpHLHVwZGF0ZURhdGE6Sn09RigpLHk9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LE09dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTplfT10LmRhdGE7bGV0IG49bmV3IEFib3J0Q29udHJvbGxlcixyPW49PW51bGw/dm9pZCAwOm4uc2lnbmFsO2lmKGU9PT0iY2FuY2VsIiYmKG49PW51bGx8fG4uYWJvcnQoKSksZT09PSJwcmUtZmV0Y2giKXtsZXR7cHJlZmV0Y2g6YX09dC5kYXRhO2EuZm9yRWFjaCgoe21pZGRsZXdhcmU6Yyx1cmw6byxvcHRpb25zOmksbWF4QWdlOmd9KT0+e2xldCBUPVAoYyk7ZmV0Y2goby50b1N0cmluZygpLGwoe3NpZ25hbDpyfSxpKSkudGhlbih5KS50aGVuKHU9PntHKG8udG9TdHJpbmcoKSx7dGltZXN0YW1wOkRhdGUubm93KCksZGF0YTpUKHUpLG1heEFnZTpnfSkudGhlbigoKT0+e2NvbnNvbGUubG9nKGBzYXZlZCBwcmVmZXRjaCAke299YCl9KS5jYXRjaChEPT57Y29uc29sZS5sb2coYGVycm9yIHNhdmluZyBwcmVmZXRjaCAke299YCxEKX0pfSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oIm5vIGRhdGEgZm91bmQiKX0pfSl9aWYoZT09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6YSxwcmVmZXJVc2VDYWNoZTpjLHVybDpvLG9wdGlvbnM6aSxtYXhBZ2U6ZyxtaWRkbGV3YXJlOlQsdXBkYXRlOnV9PXQuZGF0YTtjb25zdCBEPXM9PntzPVAoVCkocyksKCFhfHwhTChhLHMpKSYmKHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6c30pLEcoby50b1N0cmluZygpLHtkYXRhOnMsdGltZXN0YW1wOkRhdGUubm93KCksbWF4QWdlOmd9KS50aGVuKCgpPT57Y29uc29sZS5pbmZvKCJzYXZlZCBkYXRhIil9KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygiY291bGRuJ3QgYWNjZXNzIGluZGV4ZWREQiB0byBzYXZlIGRhdGEiKX0pKSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX07bGV0IEE9eihpKTtBPT09IkRFTEVURSImJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLEIoby50b1N0cmluZygpKSxmZXRjaChvLGkpLnRoZW4oKCk9Pnt1P2ZldGNoKHUudXJsLHUub3B0aW9ucykudGhlbih5KS50aGVuKEQpLmNhdGNoKHM9Pnt0aHJvdyBzfSk6c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KS5jYXRjaChNKSksQT09PSJHRVQiJiYoSChvLnRvU3RyaW5nKCkpLnRoZW4ocz0+e2lmKCFzKXRocm93IG5ldyBFcnJvcigibm8gdmFsdWUgZm91bmQgaW4gZGIiKTtpZihqKHM9PW51bGw/dm9pZCAwOnMubWF4QWdlLHM9PW51bGw/dm9pZCAwOnMudGltZXN0YW1wKSl0aHJvdyBCKG8udG9TdHJpbmcoKSksbmV3IEVycm9yKCJkYXRhIGV4cGlyZWQiKTtsZXQgcD1MKHM9PW51bGw/dm9pZCAwOnMuZGF0YSxhKSxTPXt0eXBlOmM/IkRBVEEiOnA/IkNBQ0hFRCI6IlBSRV9MT0FEIixkYXRhOiFjJiZwfHxzPT1udWxsP3ZvaWQgMDpzLmRhdGF9O3NlbGYucG9zdE1lc3NhZ2UoUyl9KS5jYXRjaChzPT57Y29uc29sZS5pbmZvKHM9PW51bGw/dm9pZCAwOnMubWVzc2FnZSksYz0hMX0pLGN8fChzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLGZldGNoKG8saT9PKGwoe30saSkse3NpZ25hbDpyfSk6e3NpZ25hbDpyfSkudGhlbih5KS50aGVuKEQpLmNhdGNoKE0pKSksKEE9PT0iUFVUInx8QT09PSJQT1NUIikmJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLGZldGNoKG8saT9PKGwoe30saSkse3NpZ25hbDpyfSk6e3NpZ25hbDpyfSkudGhlbih5KS50aGVuKHM9Pnt1P2ZldGNoKHUudXJsLHUub3B0aW9ucykudGhlbih5KS50aGVuKEQpLmNhdGNoKHA9Pnt0aHJvdyBwfSk6SihvLnRvU3RyaW5nKCkscD0+e2xldCBTPURhdGUubm93KCkseD13KHMpJiZ3KHA9PW51bGw/dm9pZCAwOnAuZGF0YSk/bChsKHt9LHAuZGF0YSkscyk6cztyZXR1cm4gc2VsZi5wb3N0TWVzc2FnZSh7dHlwZTpBLGRhdGE6eH0pLHt0aW1lc3RhbXA6UyxtYXhBZ2U6ZyxkYXRhOnh9fSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oInVwZGF0ZSBzdG9yZSBmYWlsZWQiKX0pLmZpbmFsbHkoKCk9PntzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX0pfSkuY2F0Y2goTSkpfX0pfSkoKTsK";
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
      return __spreadProps(__spreadValues({}, state), { data: action.data, loading: false, preload: true, error: void 0 });
    case "data":
      return __spreadProps(__spreadValues({}, state), { data: action.data, loading: false, preload: false, error: void 0 });
    case "error":
      return __spreadProps(__spreadValues({}, state), { error: action.error, loading: false, preload: false });
    case "loading":
      return __spreadProps(__spreadValues({}, state), { loading: action.loading });
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
  const fetchWorker = async ({
    url,
    options,
    maxAge = DAY,
    preferUseCache,
    middleware
  }) => {
    let worker = workerRef.current;
    worker == null ? void 0 : worker.addEventListener("message", ({
      data: {
        type,
        data
      }
    }) => {
      switch (type) {
        case "LOADING":
          dispatch({
            type: "loading",
            loading: true
          });
          break;
        case "CACHED":
        case "COMPLETE":
          dispatch({
            type: "loading",
            loading: false
          });
          break;
        case "DATA":
          dispatch({
            type: "data",
            data
          });
          break;
        case "PRE_LOAD":
          dispatch({
            type: "pre-load",
            data
          });
          break;
        default:
          dispatch({
            type: "error",
            error: new Error(type)
          });
          break;
      }
    });
    worker == null ? void 0 : worker.postMessage({
      type: "fetch",
      url,
      options,
      existingData: state.data,
      middleware: serializeFunction(middleware),
      maxAge,
      preferUseCache
    });
  };
  useEffect(() => {
    workerRef.current = new WorkerWrapper();
    return () => {
      cleanupWorker(workerRef.current);
    };
  }, []);
  return __spreadValues({
    fetchWorker
  }, state);
}
function usePreFetch(prefetch) {
  const worker = useRef(new WorkerWrapper());
  useEffect(() => {
    var _a;
    if (prefetch && worker.current) {
      (_a = worker.current) == null ? void 0 : _a.postMessage({
        type: "pre-fetch",
        prefetch: prefetch.map((p) => __spreadProps(__spreadValues({}, p), {
          middleware: serializeFunction(p.middleware)
        }))
      });
    }
  }, [prefetch, worker.current]);
}
export { useFetch, usePreFetch };

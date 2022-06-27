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
const encodedJs = "dmFyIGI9T2JqZWN0LmRlZmluZVByb3BlcnR5LEk9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIFE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIFI9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgVz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFg9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgVT0oaSxmLGgpPT5mIGluIGk/YihpLGYse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmh9KTppW2ZdPWgsbD0oaSxmKT0+e2Zvcih2YXIgaCBpbiBmfHwoZj17fSkpVy5jYWxsKGYsaCkmJlUoaSxoLGZbaF0pO2lmKFIpZm9yKHZhciBoIG9mIFIoZikpWC5jYWxsKGYsaCkmJlUoaSxoLGZbaF0pO3JldHVybiBpfSxUPShpLGYpPT5JKGksUShmKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGkodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gZih0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IHI9aShuKTtyZXR1cm4oYSxzKT0+ci50aGVuKGM9PnMoYy50cmFuc2FjdGlvbihlLGEpLm9iamVjdFN0b3JlKGUpKSl9bGV0IGg7ZnVuY3Rpb24gdygpe3JldHVybiBofHwoaD1mKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksaH1mdW5jdGlvbiBfKHQsZT13KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+aShuLmdldCh0KSkpfWZ1bmN0aW9uIEcodCxlLG49dygpKXtyZXR1cm4gbigicmVhZHdyaXRlIixyPT4oci5wdXQoZSx0KSxpKHIudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gJCh0LGUsbj13KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLHI9Pm5ldyBQcm9taXNlKChhLHMpPT57ci5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e3IucHV0KGUodGhpcy5yZXN1bHQpLHQpLGEoaShyLnRyYW5zYWN0aW9uKSl9Y2F0Y2goYyl7cyhjKX19fSkpfWZ1bmN0aW9uIEYodCxlPXcoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLGkobi50cmFuc2FjdGlvbikpKX1mdW5jdGlvbiBqKCl7Y29uc3Qgbj1mKCJ1c2VzdG9yZS1kYiIsInVzZXN0b3JlLWRiIik7cmV0dXJue3JlbW92ZTpkPT5GKGQsbiksZ2V0RGF0YTpkPT5fKGQsbiksc2V0RGF0YTooZCxnKT0+RyhkLGcsbiksdXBkYXRlRGF0YTooZCxnKT0+JChkLGcsbil9fWNvbnN0IHo9KHQsZSk9PmU/dCtlPERhdGUubm93KCk6ITAsQT10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxtPSh0LGUsbj17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKHI9PntsZXQgYT1lP2UrIi4iK3I6cjtBKHRbcl0pP20odFtyXSxhLG4pOm5bYV09QXJyYXkuaXNBcnJheSh0W3JdKT90W3JdLnNvcnQoKTp0W3JdfSksT2JqZWN0LmVudHJpZXMobikuc29ydCgpKSxNPXQ9PnQuZmxhdE1hcChlPT5BKGUpP20oZSk6W2VdKS5zb3J0KCksSD10PT57dmFyIGUsbjtyZXR1cm4obj0oZT10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOmUudG9VcHBlckNhc2UoKSkhPW51bGw/bjoiR0VUIn0sTz0odCxlLG4pPT57bGV0IHI9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LGE9QXJyYXkuaXNBcnJheShlKT8iYXJyYXkiOnR5cGVvZiBlO3JldHVybiByIT09YT8hMTpyIT09Im9iamVjdCImJnIhPT0iYXJyYXkiP3I9PT1hOm4mJnI9PT0ib2JqZWN0Ij9uLm1hcChzPT50W3NdPT09ZVtzXSkuZXZlcnkocz0+cyk6KHI9PT0iYXJyYXkiJiYodD1NKHQpLGU9TShlKSksIW4mJnI9PT0ib2JqZWN0IiYmKHQ9bSh0KSxlPW0oZSkpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkoZSkpfSxDPXQ9PnQ/bmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtkZWNvZGVVUkkodCl9YCkoKTplPT5lLHtyZW1vdmU6UCxnZXREYXRhOkosc2V0RGF0YTpCLHVwZGF0ZURhdGE6Tn09aigpLEQ9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LFM9dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTplfT10LmRhdGE7bGV0IG49bmV3IEFib3J0Q29udHJvbGxlcixyPW49PW51bGw/dm9pZCAwOm4uc2lnbmFsO2lmKGU9PT0iY2FuY2VsIiYmKG49PW51bGx8fG4uYWJvcnQoKSksZT09PSJwcmUtZmV0Y2giKXtsZXR7cHJlZmV0Y2g6YX09dC5kYXRhO2EuZm9yRWFjaCgoe21pZGRsZXdhcmU6cyx1cmw6YyxvcHRpb25zOmQsbWF4QWdlOmd9KT0+e2xldCBwPUMocyk7ZmV0Y2goYy50b1N0cmluZygpLGwoe3NpZ25hbDpyfSxkKSkudGhlbihEKS50aGVuKEU9PntCKGMudG9TdHJpbmcoKSx7dGltZXN0YW1wOkRhdGUubm93KCksZGF0YTpwKEUpLG1heEFnZTpnfSkudGhlbigoKT0+e2NvbnNvbGUubG9nKGBzYXZlZCBwcmVmZXRjaCAke2N9YCl9KS5jYXRjaCh1PT57Y29uc29sZS5sb2coYGVycm9yIHNhdmluZyBwcmVmZXRjaCAke2N9YCx1KX0pfSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oIm5vIGRhdGEgZm91bmQiKX0pfSl9aWYoZT09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6YSx1cmw6cyxvcHRpb25zOmMsbWF4QWdlOmQsbWlkZGxld2FyZTpnLHVwZGF0ZTpwfT10LmRhdGE7Y29uc3QgRT1vPT57bz1DKGcpKG8pLCghYXx8IU8oYSxvKSkmJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJEQVRBIixkYXRhOm99KSxCKHMudG9TdHJpbmcoKSx7ZGF0YTpvLHRpbWVzdGFtcDpEYXRlLm5vdygpLG1heEFnZTpkfSkudGhlbigoKT0+e2NvbnNvbGUuaW5mbygic2F2ZWQgZGF0YSIpfSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oImNvdWxkbid0IGFjY2VzcyBpbmRleGVkREIgdG8gc2F2ZSBkYXRhIil9KSksc2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9O2xldCB1PUgoYyk7dT09PSJERUxFVEUiJiYoUChzLnRvU3RyaW5nKCkpLGZldGNoKHMsYykudGhlbigoKT0+e3A/ZmV0Y2gocC51cmwscC5vcHRpb25zKS50aGVuKEQpLnRoZW4oRSkuY2F0Y2gobz0+e3Rocm93IG99KTpzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX0pLmNhdGNoKFMpKSx1PT09IkdFVCImJihKKHMudG9TdHJpbmcoKSkudGhlbihvPT57aWYoIW8pdGhyb3cgbmV3IEVycm9yKCJubyB2YWx1ZSBmb3VuZCBpbiBkYiIpO2lmKHoobz09bnVsbD92b2lkIDA6by5tYXhBZ2Usbz09bnVsbD92b2lkIDA6by50aW1lc3RhbXApKXRocm93IFAocy50b1N0cmluZygpKSxuZXcgRXJyb3IoImRhdGEgZXhwaXJlZCIpO3NlbGYucG9zdE1lc3NhZ2UoTyhhLG89PW51bGw/dm9pZCAwOm8uZGF0YSk/e3R5cGU6IkNBQ0hFRCJ9Ont0eXBlOiJQUkVfTE9BRCIsZGF0YTpvPT1udWxsP3ZvaWQgMDpvLmRhdGF9KX0pLmNhdGNoKG89Pntjb25zb2xlLmluZm8obz09bnVsbD92b2lkIDA6by5tZXNzYWdlKX0pLGZldGNoKHMsYz9UKGwoe30sYykse3NpZ25hbDpyfSk6e3NpZ25hbDpyfSkudGhlbihEKS50aGVuKEUpLmNhdGNoKFMpKSwodT09PSJQVVQifHx1PT09IlBPU1QiKSYmZmV0Y2gocyxjP1QobCh7fSxjKSx7c2lnbmFsOnJ9KTp7c2lnbmFsOnJ9KS50aGVuKEQpLnRoZW4obz0+e3A/ZmV0Y2gocC51cmwscC5vcHRpb25zKS50aGVuKEQpLnRoZW4oRSkuY2F0Y2goeT0+e3Rocm93IHl9KTpOKHMudG9TdHJpbmcoKSx5PT57bGV0IHg9RGF0ZS5ub3coKSxMPUEobykmJkEoeT09bnVsbD92b2lkIDA6eS5kYXRhKT9sKGwoe30seS5kYXRhKSxvKTpvO3JldHVybiBzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOnUsZGF0YTpMfSkse3RpbWVzdGFtcDp4LG1heEFnZTpkLGRhdGE6TH19KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygidXBkYXRlIHN0b3JlIGZhaWxlZCIpfSkuZmluYWxseSgoKT0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSl9KS5jYXRjaChTKX19KX0pKCk7Cg==";
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
    middleware
  }) => {
    let worker = workerRef.current;
    dispatch({
      type: "loading",
      loading: true
    });
    worker == null ? void 0 : worker.addEventListener("message", ({
      data: {
        type,
        data
      }
    }) => {
      switch (type) {
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
      maxAge
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
  useEffect(() => {
    worker.current = new WorkerWrapper();
    return () => {
      cleanupWorker(worker.current);
    };
  }, []);
}
export { useFetch, usePreFetch };

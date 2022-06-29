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
const encodedJs = "dmFyIEk9T2JqZWN0LmRlZmluZVByb3BlcnR5LFE9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIFc9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIFU9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgWD1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFk9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgXz0oaSxmLGQpPT5mIGluIGk/SShpLGYse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmR9KTppW2ZdPWQsbD0oaSxmKT0+e2Zvcih2YXIgZCBpbiBmfHwoZj17fSkpWC5jYWxsKGYsZCkmJl8oaSxkLGZbZF0pO2lmKFUpZm9yKHZhciBkIG9mIFUoZikpWS5jYWxsKGYsZCkmJl8oaSxkLGZbZF0pO3JldHVybiBpfSxPPShpLGYpPT5RKGksVyhmKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGkodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gZih0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IHI9aShuKTtyZXR1cm4ocyxoKT0+ci50aGVuKGE9PmgoYS50cmFuc2FjdGlvbihlLHMpLm9iamVjdFN0b3JlKGUpKSl9bGV0IGQ7ZnVuY3Rpb24gdygpe3JldHVybiBkfHwoZD1mKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksZH1mdW5jdGlvbiBHKHQsZT13KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+aShuLmdldCh0KSkpfWZ1bmN0aW9uICQodCxlLG49dygpKXtyZXR1cm4gbigicmVhZHdyaXRlIixyPT4oci5wdXQoZSx0KSxpKHIudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gRih0LGUsbj13KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLHI9Pm5ldyBQcm9taXNlKChzLGgpPT57ci5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e3IucHV0KGUodGhpcy5yZXN1bHQpLHQpLHMoaShyLnRyYW5zYWN0aW9uKSl9Y2F0Y2goYSl7aChhKX19fSkpfWZ1bmN0aW9uIGoodCxlPXcoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLGkobi50cmFuc2FjdGlvbikpKX1mdW5jdGlvbiB6KCl7Y29uc3Qgbj1mKCJ1c2VzdG9yZS1kYiIsInVzZXN0b3JlLWRiIik7cmV0dXJue3JlbW92ZTpjPT5qKGMsbiksZ2V0RGF0YTpjPT5HKGMsbiksc2V0RGF0YTooYyxnKT0+JChjLGcsbiksdXBkYXRlRGF0YTooYyxnKT0+RihjLGcsbil9fWNvbnN0IEg9KHQsZSk9PmU/dCtlPERhdGUubm93KCk6ITAsQT10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxtPSh0LGUsbj17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKHI9PntsZXQgcz1lP2UrIi4iK3I6cjtBKHRbcl0pP20odFtyXSxzLG4pOm5bc109QXJyYXkuaXNBcnJheSh0W3JdKT90W3JdLnNvcnQoKTp0W3JdfSksT2JqZWN0LmVudHJpZXMobikuc29ydCgpKSxDPXQ9PnQuZmxhdE1hcChlPT5BKGUpP20oZSk6W2VdKS5zb3J0KCksSj10PT57dmFyIGUsbjtyZXR1cm4obj0oZT10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOmUudG9VcHBlckNhc2UoKSkhPW51bGw/bjoiR0VUIn0sUD0odCxlLG4pPT57bGV0IHI9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LHM9QXJyYXkuaXNBcnJheShlKT8iYXJyYXkiOnR5cGVvZiBlO3JldHVybiByIT09cz8hMTpyIT09Im9iamVjdCImJnIhPT0iYXJyYXkiP3I9PT1zOm4mJnI9PT0ib2JqZWN0Ij9uLm1hcChoPT50W2hdPT09ZVtoXSkuZXZlcnkoaD0+aCk6KHI9PT0iYXJyYXkiJiYodD1DKHQpLGU9QyhlKSksIW4mJnI9PT0ib2JqZWN0IiYmKHQ9bSh0KSxlPW0oZSkpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkoZSkpfSxCPXQ9PnQ/bmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtkZWNvZGVVUkkodCl9YCkoKTplPT5lLHtyZW1vdmU6eCxnZXREYXRhOk4sc2V0RGF0YTpMLHVwZGF0ZURhdGE6Yn09eigpLHk9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LFQ9dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTplfT10LmRhdGE7bGV0IG49bmV3IEFib3J0Q29udHJvbGxlcixyPW49PW51bGw/dm9pZCAwOm4uc2lnbmFsO2lmKGU9PT0iY2FuY2VsIiYmKG49PW51bGx8fG4uYWJvcnQoKSksZT09PSJwcmUtZmV0Y2giKXtsZXR7cHJlZmV0Y2g6c309dC5kYXRhO3MuZm9yRWFjaCgoe21pZGRsZXdhcmU6aCx1cmw6YSxvcHRpb25zOmMsbWF4QWdlOmd9KT0+e2xldCBNPUIoaCk7ZmV0Y2goYS50b1N0cmluZygpLGwoe3NpZ25hbDpyfSxjKSkudGhlbih5KS50aGVuKHU9PntMKGEudG9TdHJpbmcoKSx7dGltZXN0YW1wOkRhdGUubm93KCksZGF0YTpNKHUpLG1heEFnZTpnfSkudGhlbigoKT0+e2NvbnNvbGUubG9nKGBzYXZlZCBwcmVmZXRjaCAke2F9YCl9KS5jYXRjaChEPT57Y29uc29sZS5sb2coYGVycm9yIHNhdmluZyBwcmVmZXRjaCAke2F9YCxEKX0pfSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oIm5vIGRhdGEgZm91bmQiKX0pfSl9aWYoZT09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6cyxwcmVmZXJVc2VDYWNoZTpoLHVybDphLG9wdGlvbnM6YyxtYXhBZ2U6ZyxtaWRkbGV3YXJlOk0sdXBkYXRlOnV9PXQuZGF0YTtjb25zdCBEPW89PntvPUIoTSkobyksKCFzfHwhUChzLG8pKSYmKHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6b30pLEwoYS50b1N0cmluZygpLHtkYXRhOm8sdGltZXN0YW1wOkRhdGUubm93KCksbWF4QWdlOmd9KS50aGVuKCgpPT57Y29uc29sZS5pbmZvKCJzYXZlZCBkYXRhIil9KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygiY291bGRuJ3QgYWNjZXNzIGluZGV4ZWREQiB0byBzYXZlIGRhdGEiKX0pKSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX07bGV0IEU9SihjKTtFPT09IkRFTEVURSImJih4KGEudG9TdHJpbmcoKSksZmV0Y2goYSxjKS50aGVuKCgpPT57dT9mZXRjaCh1LnVybCx1Lm9wdGlvbnMpLnRoZW4oeSkudGhlbihEKS5jYXRjaChvPT57dGhyb3cgb30pOnNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSkuY2F0Y2goVCkpLEU9PT0iR0VUIiYmTihhLnRvU3RyaW5nKCkpLnRoZW4obz0+e2lmKCFvKXRocm93IG5ldyBFcnJvcigibm8gdmFsdWUgZm91bmQgaW4gZGIiKTtpZihIKG89PW51bGw/dm9pZCAwOm8ubWF4QWdlLG89PW51bGw/dm9pZCAwOm8udGltZXN0YW1wKSl0aHJvdyB4KGEudG9TdHJpbmcoKSksbmV3IEVycm9yKCJkYXRhIGV4cGlyZWQiKTtsZXQgcD1QKG89PW51bGw/dm9pZCAwOm8uZGF0YSxzKSxTPXt0eXBlOmg/IkRBVEEiOnA/IkNBQ0hFRCI6IlBSRV9MT0FEIixkYXRhOiFoJiZwfHxvPT1udWxsP3ZvaWQgMDpvLmRhdGF9O3NlbGYucG9zdE1lc3NhZ2UoUyksaHx8ZmV0Y2goYSxjP08obCh7fSxjKSx7c2lnbmFsOnJ9KTp7c2lnbmFsOnJ9KS50aGVuKHkpLnRoZW4oRCkuY2F0Y2goVCl9KS5jYXRjaChvPT57Y29uc29sZS5pbmZvKG89PW51bGw/dm9pZCAwOm8ubWVzc2FnZSl9KSwoRT09PSJQVVQifHxFPT09IlBPU1QiKSYmZmV0Y2goYSxjP08obCh7fSxjKSx7c2lnbmFsOnJ9KTp7c2lnbmFsOnJ9KS50aGVuKHkpLnRoZW4obz0+e3U/ZmV0Y2godS51cmwsdS5vcHRpb25zKS50aGVuKHkpLnRoZW4oRCkuY2F0Y2gocD0+e3Rocm93IHB9KTpiKGEudG9TdHJpbmcoKSxwPT57bGV0IFM9RGF0ZS5ub3coKSxSPUEobykmJkEocD09bnVsbD92b2lkIDA6cC5kYXRhKT9sKGwoe30scC5kYXRhKSxvKTpvO3JldHVybiBzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOkUsZGF0YTpSfSkse3RpbWVzdGFtcDpTLG1heEFnZTpnLGRhdGE6Un19KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygidXBkYXRlIHN0b3JlIGZhaWxlZCIpfSkuZmluYWxseSgoKT0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSl9KS5jYXRjaChUKX19KX0pKCk7Cg==";
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
  useEffect(() => {
    worker.current = new WorkerWrapper();
    return () => {
      cleanupWorker(worker.current);
    };
  }, []);
}
export { useFetch, usePreFetch };

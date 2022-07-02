import { useReducer, useRef, useEffect } from "react";
const encodedJs = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IG09InF1ZXJ5LXN0b3JlIixkPXQ9Pm5ldyBQcm9taXNlKChuLHMpPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5uKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5zKHQuZXJyb3IpfSk7ZnVuY3Rpb24gUCgpe2NvbnN0IHQ9aW5kZXhlZERCLm9wZW4oInF1ZXJ5LWRiIik7dC5vbnVwZ3JhZGVuZWVkZWQ9KCk9PnQucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG0pO2NvbnN0IG49ZCh0KSxzPShlLG8pPT5uLnRoZW4oYT0+byhhLnRyYW5zYWN0aW9uKG0sZSkub2JqZWN0U3RvcmUobSkpKTtyZXR1cm57ZGVsOmU9PnMoInJlYWR3cml0ZSIsbz0+KG8uZGVsZXRlKGUpLGQoby50cmFuc2FjdGlvbikpKSxnZXQ6ZT0+cygicmVhZG9ubHkiLG89PihvLmdldChlKSxkKG8udHJhbnNhY3Rpb24pKSksc2V0OihlLG8pPT5zKCJyZWFkd3JpdGUiLGE9PihhLnB1dChvLGUpLGQoYS50cmFuc2FjdGlvbikpKSxwdXQ6KGUsbyk9PnMoInJlYWR3cml0ZSIsYT0+bmV3IFByb21pc2UoKGMsaSk9PnthLmdldChlKS5vbnN1Y2Nlc3M9ZnVuY3Rpb24oKXt0cnl7YS5wdXQobyh0aGlzLnJlc3VsdCksZSksYyhkKGEudHJhbnNhY3Rpb24pKX1jYXRjaChwKXtpKHApfX19KSksY2xlYXI6KCk9PnMoInJlYWR3cml0ZSIsZT0+KGUuY2xlYXIoKSxkKGUudHJhbnNhY3Rpb24pKSl9fWNvbnN0IHg9KHQsbik9Pm4/dCtuPERhdGUubm93KCk6ITAsdz10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxBPSh0LG4scz17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKGU9PntsZXQgbz1uP24rIi4iK2U6ZTt3KHRbZV0pP0EodFtlXSxvLHMpOnNbb109QXJyYXkuaXNBcnJheSh0W2VdKT90W2VdLnNvcnQoKTp0W2VdfSksT2JqZWN0LmVudHJpZXMocykuc29ydCgpKSxNPXQ9PnQuZmxhdE1hcChuPT53KG4pP0Eobik6W25dKS5zb3J0KCksVT10PT57dmFyIG4scztyZXR1cm4ocz0obj10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOm4udG9VcHBlckNhc2UoKSkhPW51bGw/czoiR0VUIn0sUz0odCxuLHMpPT57bGV0IGU9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LG89QXJyYXkuaXNBcnJheShuKT8iYXJyYXkiOnR5cGVvZiBuO3JldHVybiBlIT09bz8hMTplIT09Im9iamVjdCImJmUhPT0iYXJyYXkiP2U9PT1vOnMmJmU9PT0ib2JqZWN0Ij9zLm1hcChhPT50W2FdPT09blthXSkuZXZlcnkoYT0+YSk6KGU9PT0iYXJyYXkiJiYodD1NKHQpLG49TShuKSksIXMmJmU9PT0ib2JqZWN0IiYmKHQ9QSh0KSxuPUEobikpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkobikpfSxUPXQ9PnQ/bmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtkZWNvZGVVUkkodCl9YCkoKTpuPT5uLHtkZWw6TyxnZXQ6RyxzZXQ6QyxwdXQ6Tn09UCgpLGc9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LHU9dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTpufT10LmRhdGE7bGV0IHM9bmV3IEFib3J0Q29udHJvbGxlcixlPXM9PW51bGw/dm9pZCAwOnMuc2lnbmFsO2lmKG49PT0iY2FuY2VsIiYmKHM9PW51bGx8fHMuYWJvcnQoKSksbj09PSJwcmUtZmV0Y2giKXtsZXR7cHJlZmV0Y2g6b309dC5kYXRhO28uZm9yRWFjaCgoe21pZGRsZXdhcmU6YSx1cmw6YyxvcHRpb25zOmksbWF4QWdlOnB9KT0+e2xldCBEPVQoYSk7ZmV0Y2goYy50b1N0cmluZygpLHtzaWduYWw6ZSwuLi5pfSkudGhlbihnKS50aGVuKGg9PntDKGMudG9TdHJpbmcoKSx7dGltZXN0YW1wOkRhdGUubm93KCksZGF0YTpEKGgpLG1heEFnZTpwfSkudGhlbigoKT0+e2NvbnNvbGUubG9nKGBzYXZlZCBwcmVmZXRjaCAke2N9YCl9KS5jYXRjaChsPT57Y29uc29sZS5sb2coYGVycm9yIHNhdmluZyBwcmVmZXRjaCAke2N9YCxsKX0pfSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oIm5vIGRhdGEgZm91bmQiKX0pfSl9aWYobj09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6byxwcmVmZXJVc2VDYWNoZTphLHVybDpjLG9wdGlvbnM6aSxtYXhBZ2U6cCxtaWRkbGV3YXJlOkQsdXBkYXRlOmh9PXQuZGF0YTtjb25zdCBsPXI9PntyPVQoRCkociksKCFvfHwhUyhvLHIpKSYmKHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6cn0pLEMoYy50b1N0cmluZygpLHtkYXRhOnIsdGltZXN0YW1wOkRhdGUubm93KCksbWF4QWdlOnB9KS50aGVuKCgpPT57Y29uc29sZS5pbmZvKCJzYXZlZCBkYXRhIil9KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygiY291bGRuJ3QgYWNjZXNzIGluZGV4ZWREQiB0byBzYXZlIGRhdGEiKX0pKSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX07bGV0IHk9VShpKTt5PT09IkRFTEVURSImJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLE8oYy50b1N0cmluZygpKSxmZXRjaChjLGkpLnRoZW4oKCk9PntoP2ZldGNoKGgudXJsLGgub3B0aW9ucykudGhlbihnKS50aGVuKGwpLmNhdGNoKHI9Pnt0aHJvdyByfSk6c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KS5jYXRjaCh1KSkseT09PSJHRVQiJiYoRyhjLnRvU3RyaW5nKCkpLnRoZW4ocj0+e2lmKCFyKXRocm93IG5ldyBFcnJvcigibm8gdmFsdWUgZm91bmQgaW4gZGIiKTtpZih4KHI9PW51bGw/dm9pZCAwOnIubWF4QWdlLHI9PW51bGw/dm9pZCAwOnIudGltZXN0YW1wKSl0aHJvdyBPKGMudG9TdHJpbmcoKSksbmV3IEVycm9yKCJkYXRhIGV4cGlyZWQiKTtsZXQgZj1TKHI9PW51bGw/dm9pZCAwOnIuZGF0YSxvKSxFPXt0eXBlOmE/IkRBVEEiOmY/IkNBQ0hFRCI6IlBSRV9MT0FEIixkYXRhOiFhJiZmfHxyPT1udWxsP3ZvaWQgMDpyLmRhdGF9O3NlbGYucG9zdE1lc3NhZ2UoRSl9KS5jYXRjaChyPT57Y29uc29sZS5pbmZvKHI9PW51bGw/dm9pZCAwOnIubWVzc2FnZSksYT0hMX0pLGF8fChzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLGZldGNoKGMsaT97Li4uaSxzaWduYWw6ZX06e3NpZ25hbDplfSkudGhlbihnKS50aGVuKGwpLmNhdGNoKHUpKSksKHk9PT0iUFVUInx8eT09PSJQT1NUIikmJihzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJMT0FESU5HIn0pLGZldGNoKGMsaT97Li4uaSxzaWduYWw6ZX06e3NpZ25hbDplfSkudGhlbihnKS50aGVuKHI9PntoP2ZldGNoKGgudXJsLGgub3B0aW9ucykudGhlbihnKS50aGVuKGwpLmNhdGNoKGY9Pnt0aHJvdyBmfSk6TihjLnRvU3RyaW5nKCksZj0+e2xldCBFPURhdGUubm93KCksTD13KHIpJiZ3KGY9PW51bGw/dm9pZCAwOmYuZGF0YSk/ey4uLmYuZGF0YSwuLi5yfTpyO3JldHVybiBzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOnksZGF0YTpMfSkse3RpbWVzdGFtcDpFLG1heEFnZTpwLGRhdGE6TH19KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygidXBkYXRlIHN0b3JlIGZhaWxlZCIpfSkuZmluYWxseSgoKT0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSl9KS5jYXRjaCh1KSl9fSl9KSgpOwo=";
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
  return {
    fetchWorker,
    ...state
  };
}
function usePreFetch(prefetch) {
  const worker = useRef(new WorkerWrapper());
  useEffect(() => {
    var _a;
    if (prefetch && worker.current) {
      (_a = worker.current) == null ? void 0 : _a.postMessage({
        type: "pre-fetch",
        prefetch: prefetch.map((p) => ({
          ...p,
          middleware: serializeFunction(p.middleware)
        }))
      });
    }
  }, [prefetch, worker.current]);
}
export { useFetch, usePreFetch };

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
const encodedJs = "dmFyIGI9T2JqZWN0LmRlZmluZVByb3BlcnR5LEk9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIFE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIEw9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgVz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFg9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgUj0oYSxjLGkpPT5jIGluIGE/YihhLGMse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOml9KTphW2NdPWksZz0oYSxjKT0+e2Zvcih2YXIgaSBpbiBjfHwoYz17fSkpVy5jYWxsKGMsaSkmJlIoYSxpLGNbaV0pO2lmKEwpZm9yKHZhciBpIG9mIEwoYykpWC5jYWxsKGMsaSkmJlIoYSxpLGNbaV0pO3JldHVybiBhfSxtPShhLGMpPT5JKGEsUShjKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGEodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gYyh0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IHI9YShuKTtyZXR1cm4oZixvKT0+ci50aGVuKGQ9Pm8oZC50cmFuc2FjdGlvbihlLGYpLm9iamVjdFN0b3JlKGUpKSl9bGV0IGk7ZnVuY3Rpb24geSgpe3JldHVybiBpfHwoaT1jKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksaX1mdW5jdGlvbiBVKHQsZT15KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+YShuLmdldCh0KSkpfWZ1bmN0aW9uIF8odCxlLG49eSgpKXtyZXR1cm4gbigicmVhZHdyaXRlIixyPT4oci5wdXQoZSx0KSxhKHIudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gRyh0LGUsbj15KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLHI9Pm5ldyBQcm9taXNlKChmLG8pPT57ci5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e3IucHV0KGUodGhpcy5yZXN1bHQpLHQpLGYoYShyLnRyYW5zYWN0aW9uKSl9Y2F0Y2goZCl7byhkKX19fSkpfWZ1bmN0aW9uIEYodCxlPXkoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLGEobi50cmFuc2FjdGlvbikpKX1jb25zdCBqPSh0LGUpPT5lP3QrZTxEYXRlLm5vdygpOiEwLEU9dD0+dHlwZW9mIHQ9PSJvYmplY3QiJiYhQXJyYXkuaXNBcnJheSh0KSYmdCE9PW51bGwsbD0odCxlLG49e30pPT4oT2JqZWN0LmtleXModCkuZm9yRWFjaChyPT57bGV0IGY9ZT9lKyIuIityOnI7RSh0W3JdKT9sKHRbcl0sZixuKTpuW2ZdPUFycmF5LmlzQXJyYXkodFtyXSk/dFtyXS5zb3J0KCk6dFtyXX0pLE9iamVjdC5lbnRyaWVzKG4pLnNvcnQoKSksVD10PT50LmZsYXRNYXAoZT0+RShlKT9sKGUpOltlXSkuc29ydCgpLHo9dD0+e3ZhciBlLG47cmV0dXJuKG49KGU9dD09bnVsbD92b2lkIDA6dC5tZXRob2QpPT1udWxsP3ZvaWQgMDplLnRvVXBwZXJDYXNlKCkpIT1udWxsP246IkdFVCJ9LE09KHQsZSxuKT0+e2xldCByPUFycmF5LmlzQXJyYXkodCk/ImFycmF5Ijp0eXBlb2YgdCxmPUFycmF5LmlzQXJyYXkoZSk/ImFycmF5Ijp0eXBlb2YgZTtyZXR1cm4gciE9PWY/ITE6ciE9PSJvYmplY3QiJiZyIT09ImFycmF5Ij9yPT09ZjpuJiZyPT09Im9iamVjdCI/bi5tYXAobz0+dFtvXT09PWVbb10pLmV2ZXJ5KG89Pm8pOihyPT09ImFycmF5IiYmKHQ9VCh0KSxlPVQoZSkpLCFuJiZyPT09Im9iamVjdCImJih0PWwodCksZT1sKGUpKSxKU09OLnN0cmluZ2lmeSh0KT09PUpTT04uc3RyaW5naWZ5KGUpKX0sSD10PT5uZXcgRnVuY3Rpb24oYHJldHVybiAke2RlY29kZVVSSSh0KX1gKSgpLHc9YygidXNlc3RvcmUtZGIiLCJ1c2VzdG9yZS1kYiIpLE89dD0+Rih0LHcpLEo9dD0+VSh0LHcpLE49KHQsZSk9Pl8odCxlLHcpLCQ9KHQsZSk9PkcodCxlLHcpLEE9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LEQ9dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTplfT10LmRhdGE7bGV0IG49bmV3IEFib3J0Q29udHJvbGxlcixyPW49PW51bGw/dm9pZCAwOm4uc2lnbmFsO2lmKGU9PT0iY2FuY2VsIiYmKG49PW51bGx8fG4uYWJvcnQoKSksZT09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6Zix1cmw6byxvcHRpb25zOmQsbWF4QWdlOkMsbWlkZGxld2FyZTpQLHVwZGF0ZTpwfT10LmRhdGE7Y29uc3QgUz1zPT57UCYmKHM9SChQKShzKSksKCFmfHwhTShmLHMpKSYmKHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6c30pLE4oby50b1N0cmluZygpLHtkYXRhOnMsdGltZXN0YW1wOkRhdGUubm93KCksbWF4QWdlOkN9KS50aGVuKCgpPT57Y29uc29sZS5pbmZvKCJzYXZlZCBkYXRhIil9KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygiY291bGRuJ3QgYWNjZXNzIGluZGV4ZWREQiB0byBzYXZlIGRhdGEiKX0pKSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX07bGV0IHU9eihkKTt1PT09IkRFTEVURSImJihPKG8udG9TdHJpbmcoKSksZmV0Y2gobyxkKS50aGVuKCgpPT57cD9mZXRjaChwLnVybCxwLm9wdGlvbnMpLnRoZW4oQSkudGhlbihTKS5jYXRjaChzPT57dGhyb3cgc30pOnNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSkuY2F0Y2goRCkpLHU9PT0iR0VUIiYmKEooby50b1N0cmluZygpKS50aGVuKHM9PntpZighcyl0aHJvdyBuZXcgRXJyb3IoIm5vIHZhbHVlIGZvdW5kIGluIGRiIik7aWYoaihzPT1udWxsP3ZvaWQgMDpzLm1heEFnZSxzPT1udWxsP3ZvaWQgMDpzLnRpbWVzdGFtcCkpdGhyb3cgTyhvLnRvU3RyaW5nKCkpLG5ldyBFcnJvcigiZGF0YSBleHBpcmVkIik7c2VsZi5wb3N0TWVzc2FnZShNKGYscz09bnVsbD92b2lkIDA6cy5kYXRhKT97dHlwZToiQ0FDSEVEIn06e3R5cGU6IlBSRV9MT0FEIixkYXRhOnM9PW51bGw/dm9pZCAwOnMuZGF0YX0pfSkuY2F0Y2gocz0+e2NvbnNvbGUuaW5mbyhzPT1udWxsP3ZvaWQgMDpzLm1lc3NhZ2UpfSksZmV0Y2gobyxkP20oZyh7fSxkKSx7c2lnbmFsOnJ9KTp7c2lnbmFsOnJ9KS50aGVuKEEpLnRoZW4oUykuY2F0Y2goRCkpLCh1PT09IlBVVCJ8fHU9PT0iUE9TVCIpJiZmZXRjaChvLGQ/bShnKHt9LGQpLHtzaWduYWw6cn0pOntzaWduYWw6cn0pLnRoZW4oQSkudGhlbihzPT57cD9mZXRjaChwLnVybCxwLm9wdGlvbnMpLnRoZW4oQSkudGhlbihTKS5jYXRjaChoPT57dGhyb3cgaH0pOiQoby50b1N0cmluZygpLGg9PntsZXQgQj1EYXRlLm5vdygpLHg9RShzKSYmRShoPT1udWxsP3ZvaWQgMDpoLmRhdGEpP2coZyh7fSxoLmRhdGEpLHMpOnM7cmV0dXJuIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dSxkYXRhOnh9KSx7dGltZXN0YW1wOkIsbWF4QWdlOkMsZGF0YTp4fX0pLmNhdGNoKCgpPT57Y29uc29sZS5pbmZvKCJ1cGRhdGUgc3RvcmUgZmFpbGVkIil9KS5maW5hbGx5KCgpPT57c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KX0pLmNhdGNoKEQpfX0pfSkoKTsK";
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
const serializeFunction = (f) => encodeURI(f.toString());
function useFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const workerRef = useRef();
  const fetchWorker = async ({
    url,
    fetchOptions,
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
    let serializedMw = middleware ? serializeFunction(middleware) : void 0;
    worker == null ? void 0 : worker.postMessage({
      type: "fetch",
      url,
      fetchOptions,
      existingData: state.data,
      middleware: serializedMw,
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
export { useFetch };

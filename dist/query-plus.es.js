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
import { useRef, useEffect, useReducer } from "react";
import { createStore, clear, del, get, getMany, set, setMany, update } from "idb-keyval";
const encodedJs$1 = "dmFyIEM9T2JqZWN0LmRlZmluZVByb3BlcnR5LFQ9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIE09T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIHk9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgTz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFM9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgaD0oaSxzLGEpPT5zIGluIGk/QyhpLHMse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmF9KTppW3NdPWEsQT0oaSxzKT0+e2Zvcih2YXIgYSBpbiBzfHwocz17fSkpTy5jYWxsKHMsYSkmJmgoaSxhLHNbYV0pO2lmKHkpZm9yKHZhciBhIG9mIHkocykpUy5jYWxsKHMsYSkmJmgoaSxhLHNbYV0pO3JldHVybiBpfSxkPShpLHMpPT5UKGksTShzKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGk9dD0+dHlwZW9mIHQ9PSJvYmplY3QiJiYhQXJyYXkuaXNBcnJheSh0KSYmdCE9PW51bGwscz0odCxyLG49e30pPT4oT2JqZWN0LmtleXModCkuZm9yRWFjaChlPT57bGV0IG89cj9yKyIuIitlOmU7aSh0W2VdKT9zKHRbZV0sbyxuKTpuW29dPUFycmF5LmlzQXJyYXkodFtlXSk/dFtlXS5zb3J0KCk6dFtlXX0pLE9iamVjdC5lbnRyaWVzKG4pLnNvcnQoKSksYT10PT50LmZsYXRNYXAocj0+aShyKT9zKHIpOltyXSkuc29ydCgpLGc9dD0+e3ZhciByLG47cmV0dXJuKG49KHI9dD09bnVsbD92b2lkIDA6dC5tZXRob2QpPT1udWxsP3ZvaWQgMDpyLnRvVXBwZXJDYXNlKCkpIT1udWxsP246IkdFVCJ9LHc9KHQscixuKT0+e2xldCBlPUFycmF5LmlzQXJyYXkodCk/ImFycmF5Ijp0eXBlb2YgdCxvPUFycmF5LmlzQXJyYXkocik/ImFycmF5Ijp0eXBlb2YgcjtyZXR1cm4gZSE9PW8/ITE6ZSE9PSJvYmplY3QiJiZlIT09ImFycmF5Ij9lPT09bzpuJiZlPT09Im9iamVjdCI/bi5tYXAoYz0+dFtjXT09PXJbY10pLmV2ZXJ5KGM9PmMpOihlPT09ImFycmF5IiYmKHQ9YSh0KSxyPWEocikpLCFuJiZlPT09Im9iamVjdCImJih0PXModCkscj1zKHIpKSxKU09OLnN0cmluZ2lmeSh0KT09PUpTT04uc3RyaW5naWZ5KHIpKX0sRT10PT5uZXcgRnVuY3Rpb24oYHJldHVybiAke2RlY29kZVVSSSh0KX1gKSgpO3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsdD0+e2NvbnN0e3R5cGU6cn09dC5kYXRhO2xldCBuPW5ldyBBYm9ydENvbnRyb2xsZXIsZT1uPT1udWxsP3ZvaWQgMDpuLnNpZ25hbDtpZihyPT09ImNhbmNlbCImJihuPT1udWxsfHxuLmFib3J0KCkpLHI9PT0iZmV0Y2giKXtjb25zdHt1cmw6byxvcHRpb25zOmMsZXhpc3RpbmdEYXRhOm0sbWlkZGxld2FyZTpsfT10LmRhdGE7ZmV0Y2gobyxjP2QoQSh7fSxjKSx7c2lnbmFsOmV9KTp7c2lnbmFsOmV9KS50aGVuKGY9PntpZighZi5va3x8Zi5zdGF0dXM9PT00MDQpdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7Zi5zdGF0dXN9YCk7aWYoZi5zdGF0dXM9PT00MDMpdGhyb3cgbmV3IEVycm9yKCJVbmF1dGhvcml6ZWQhIik7cmV0dXJuIGYuanNvbigpfSkudGhlbihmPT57bCYmKGY9RShsKShmKSk7bGV0IHA9ZyhjKSx1PXcobSxmKTtzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOnU/IkNBQ0hFRCI6cCxkYXRhOiF1JiZmfSl9KS5jYXRjaChmPT57c2VsZi5wb3N0TWVzc2FnZSh7dHlwZTpmLm1lc3NhZ2V8fCJVbmtub3duIGVycm9yIn0pfSl9fSl9KSgpOwo=";
const blob$1 = typeof window !== "undefined" && window.Blob && new Blob([atob(encodedJs$1)], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper$1() {
  const objURL = blob$1 && (window.URL || window.webkitURL).createObjectURL(blob$1);
  try {
    return objURL ? new Worker(objURL, {}) : new Worker("data:application/javascript;base64," + encodedJs$1, { type: "module" });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
const DB_NAME = "usestore-db";
const DB_STORE = "usestore-db";
const useStore = (props) => {
  const {
    persistData,
    storeName
  } = __spreadValues({
    persistData: true,
    storeName: DB_STORE
  }, props);
  const store = useRef();
  useEffect(() => {
    store.current = createStore(DB_NAME, storeName);
    return () => {
      !persistData && clear(store.current);
      store.current = void 0;
    };
  }, []);
  return {
    __dangerouslyNukeAllStores: () => {
      indexedDB.deleteDatabase(DB_NAME);
    },
    del: (key) => del(key, store.current),
    get: (key) => get(key, store.current),
    getMany: (keys) => getMany(keys, store.current),
    set: (key, value) => set(key, value, store.current),
    setMany: (entries) => setMany(entries, store.current),
    update: (key, updater) => update(key, updater, store.current)
  };
};
const initialState$1 = {
  data: void 0,
  error: void 0,
  loading: false,
  update: true
};
function reducer(state, action) {
  switch (action.type) {
    case "pre-load":
      return __spreadProps(__spreadValues({}, state), { data: action.data });
    case "data":
      return __spreadProps(__spreadValues({}, state), { data: action.data, loading: false, error: void 0 });
    case "error":
      return __spreadProps(__spreadValues({}, state), { error: action.error, loading: false });
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
const dataExpired = (maxAge, timestamp) => {
  if (!timestamp) {
    return true;
  }
  return maxAge + timestamp < Date.now();
};
const isObject = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;
const methodType = (options) => {
  var _a, _b;
  return (_b = (_a = options == null ? void 0 : options.method) == null ? void 0 : _a.toUpperCase()) != null ? _b : "GET";
};
const serializeFunction = (f) => encodeURI(f.toString());
function useFetch() {
  const {
    del: del2,
    get: get2,
    set: set2,
    update: update2
  } = useStore();
  const [state, dispatch] = useReducer(reducer, initialState$1);
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
    let method = methodType(fetchOptions);
    if (method === "DELETE")
      del2(url.toString());
    if (method === "GET") {
      get2(url.toString()).then((value) => {
        if (!value)
          throw new Error("no value found in db");
        if (dataExpired(maxAge, value == null ? void 0 : value.timestamp)) {
          del2(url.toString());
        } else {
          dispatch({
            type: "pre-load",
            data: value == null ? void 0 : value.data
          });
        }
      }).catch(() => {
        dispatch({
          type: "pre-load",
          data: void 0
        });
      });
    }
    worker == null ? void 0 : worker.addEventListener("message", ({
      data: {
        type,
        data
      }
    }) => {
      if (type === "DELETE" || type === "CACHED") {
        dispatch({
          type: "loading",
          loading: false
        });
      } else if (type === "GET") {
        dispatch({
          type: "data",
          data
        });
        let timestamp = Date.now();
        let cacheObject = {
          timestamp,
          maxAge,
          data
        };
        set2(url.toString(), cacheObject).then(() => {
          console.log("saved data");
        }).catch(() => {
          console.error("couldn't access indexedDB to save data");
        });
      } else if (type === "PUT" || type === "POST") {
        update2(url.toString(), (oldValue) => {
          let timestamp = Date.now();
          let newData = isObject(data) && isObject(oldValue == null ? void 0 : oldValue.data) ? __spreadValues(__spreadValues({}, oldValue.data), data) : data;
          dispatch({
            type: "data",
            data: newData
          });
          return {
            timestamp,
            maxAge,
            data: newData
          };
        }).then(() => {
          console.log("updated data");
        }).catch(() => {
          dispatch({
            type: "loading",
            loading: false
          });
          console.error("save to indexedDB failed");
        });
      } else {
        dispatch({
          type: "error",
          error: new Error(type)
        });
      }
    });
    let serializedMw = middleware ? serializeFunction(middleware) : void 0;
    worker == null ? void 0 : worker.postMessage({
      type: "fetch",
      url,
      fetchOptions,
      existingData: state.data,
      middleware: serializedMw
    });
  };
  useEffect(() => {
    workerRef.current = new WorkerWrapper$1();
    return () => {
      cleanupWorker(workerRef.current);
    };
  }, []);
  return __spreadValues({
    fetchWorker
  }, state);
}
const encodedJs = "dmFyIG09T2JqZWN0LmRlZmluZVByb3BlcnR5LE89T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIFM9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIGQ9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgdj1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LE09T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgZz0oaSxhLG4pPT5hIGluIGk/bShpLGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOm59KTppW2FdPW4saD0oaSxhKT0+e2Zvcih2YXIgbiBpbiBhfHwoYT17fSkpdi5jYWxsKGEsbikmJmcoaSxuLGFbbl0pO2lmKGQpZm9yKHZhciBuIG9mIGQoYSkpTS5jYWxsKGEsbikmJmcoaSxuLGFbbl0pO3JldHVybiBpfSxwPShpLGEpPT5PKGksUyhhKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGk9YXN5bmMoe2ZuOnQsdmFsaWRhdGU6ZSxpbnRlcnZhbDpzLG1heEF0dGVtcHRzOnIsYXR0ZW1wdHM6Yz0wfSk9Pnthc3luYyBmdW5jdGlvbiBmKHUseSl7dHJ5e2NvbnN0IGw9YXdhaXQgdCgpO2lmKGMrKyxlKGwpKXJldHVybiB1KGwpO2lmKHImJmM9PT1yKXJldHVybiB5KG5ldyBFcnJvcigiRXhjZWVkZWQgbWF4IGF0dGVtcHRzIikpO2F3YWl0IHNldFRpbWVvdXQoZixzLHUseSl9Y2F0Y2gobCl7Y29uc29sZS5lcnJvcihgcG9sbGluZyBFcnJvcjogJHsobD09bnVsbD92b2lkIDA6bC5tZXNzYWdlKXx8ImNvbm5lY3Rpb24gZmFpbGVkIn1gKX19cmV0dXJuIG5ldyBQcm9taXNlKGYpfSxhPXQ9PnR5cGVvZiB0PT0ib2JqZWN0IiYmIUFycmF5LmlzQXJyYXkodCkmJnQhPT1udWxsLG49KHQsZSxzPXt9KT0+KE9iamVjdC5rZXlzKHQpLmZvckVhY2gocj0+e2xldCBjPWU/ZSsiLiIrcjpyO2EodFtyXSk/bih0W3JdLGMscyk6c1tjXT1BcnJheS5pc0FycmF5KHRbcl0pP3Rbcl0uc29ydCgpOnRbcl19KSxPYmplY3QuZW50cmllcyhzKS5zb3J0KCkpLEE9dD0+dC5mbGF0TWFwKGU9PmEoZSk/bihlKTpbZV0pLnNvcnQoKSx3PSh0LGUscyk9PntsZXQgcj1BcnJheS5pc0FycmF5KHQpPyJhcnJheSI6dHlwZW9mIHQsYz1BcnJheS5pc0FycmF5KGUpPyJhcnJheSI6dHlwZW9mIGU7cmV0dXJuIHIhPT1jPyExOnIhPT0ib2JqZWN0IiYmciE9PSJhcnJheSI/cj09PWM6cyYmcj09PSJvYmplY3QiP3MubWFwKGY9PnRbZl09PT1lW2ZdKS5ldmVyeShmPT5mKToocj09PSJhcnJheSImJih0PUEodCksZT1BKGUpKSwhcyYmcj09PSJvYmplY3QiJiYodD1uKHQpLGU9bihlKSksSlNPTi5zdHJpbmdpZnkodCk9PT1KU09OLnN0cmluZ2lmeShlKSl9O3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsdD0+e2NvbnN0e3R5cGU6ZX09dC5kYXRhO2xldCBzPW5ldyBBYm9ydENvbnRyb2xsZXIscj1zPT1udWxsP3ZvaWQgMDpzLnNpZ25hbDtpZihlPT09ImNhbmNlbCImJihzPT1udWxsfHxzLmFib3J0KCkpLGU9PT0icG9sbCIpe2NvbnN0e3VybDpjLGZldGNoT3B0aW9uczpmLGludGVydmFsOnUsbWF4QXR0ZW1wdHM6eSxjdXJyZW50SlNPTjpsLGNvbXBhcmVLZXlzOkV9PXQuZGF0YTtpKHtmbjooKT0+ZmV0Y2goYyxmP3AoaCh7fSxmKSx7c2lnbmFsOnJ9KTp7c2lnbmFsOnJ9KS50aGVuKG89PntpZighby5va3x8by5zdGF0dXM9PT00MDQpdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7by5zdGF0dXN9YCk7aWYoby5zdGF0dXM9PT00MDMpdGhyb3cgbmV3IEVycm9yKCJVbmF1dGhvcml6ZWQhIik7cmV0dXJuIG8uanNvbigpfSksaW50ZXJ2YWw6dSxtYXhBdHRlbXB0czp5LHZhbGlkYXRlOm89PiF3KGwsbyxFKX0pLnRoZW4obz0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6InN1Y2Nlc3MiLGRhdGE6b30pLHM9dm9pZCAwfSkuY2F0Y2gobz0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6by5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX0pfX0pfSkoKTsK";
const blob = typeof window !== "undefined" && window.Blob && new Blob([atob(encodedJs)], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper() {
  const objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
  try {
    return objURL ? new Worker(objURL, {}) : new Worker("data:application/javascript;base64," + encodedJs, { type: "module" });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
function usePolling() {
  const {
    del: del2,
    get: get2,
    set: set2
  } = useStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const workerRef = useRef(new WorkerWrapper());
  let worker = workerRef.current;
  const pollWorker = async ({
    url,
    fetchOptions,
    interval,
    maxAttempts,
    currentJSON,
    compareKeys
  }) => {
    var _a, _b, _c;
    if (methodType(fetchOptions) !== "GET") {
      return dispatch({
        type: "error",
        error: new Error("method must be GET to poll")
      });
    }
    let currentData = {};
    try {
      let value = await get2(url.toString());
      if (dataExpired((_a = value.maxAge) != null ? _a : 0, (_b = value.timestamp) != null ? _b : 0)) {
        del2(url.toString()).catch((err) => {
          console.error(err);
        });
      }
      currentData = (_c = value.data) != null ? _c : {};
    } catch (err) {
      console.error(err);
    }
    worker.postMessage({
      type: "poll",
      url,
      fetchOptions,
      interval,
      maxAttempts,
      currentJSON,
      compareKeys
    });
    worker.addEventListener("message", ({
      data: {
        data,
        type
      }
    }) => {
    });
  };
  useEffect(() => {
    if (!window) {
      dispatch({
        type: "loading",
        loading: false
      });
      dispatch({
        type: "error",
        error: new Error("window is not defined")
      });
      cleanupWorker(worker);
    }
    return () => {
      cleanupWorker(worker);
    };
  }, [window]);
  return __spreadValues({
    pollWorker
  }, state);
}
const initialState = {
  data: void 0,
  error: void 0,
  loading: false,
  update: true
};
export { useFetch, usePolling, useStore };

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
const encodedJs = "dmFyIGQ9T2JqZWN0LmRlZmluZVByb3BlcnR5LGc9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIG09T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIGw9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgdz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHk9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgYz0ocix0LGUpPT50IGluIHI/ZChyLHQse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmV9KTpyW3RdPWUsaD0ocix0KT0+e2Zvcih2YXIgZSBpbiB0fHwodD17fSkpdy5jYWxsKHQsZSkmJmMocixlLHRbZV0pO2lmKGwpZm9yKHZhciBlIG9mIGwodCkpeS5jYWxsKHQsZSkmJmMocixlLHRbZV0pO3JldHVybiByfSxmPShyLHQpPT5nKHIsbSh0KSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IHI9dD0+dCYmdC5tZXRob2Q/dC5tZXRob2QudG9VcHBlckNhc2UoKToiR0VUIjtzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLHQ9Pntjb25zdHt0eXBlOmV9PXQuZGF0YTtsZXQgcz1uZXcgQWJvcnRDb250cm9sbGVyLG49cy5zaWduYWw7aWYoZT09PSJjYW5jZWwiJiZzLmFib3J0KCksZT09PSJmZXRjaCIpe2NvbnN0e3VybDppLG9wdGlvbnM6YX09dC5kYXRhO2ZldGNoKGksYT9mKGgoe30sYSkse3NpZ25hbDpufSk6e3NpZ25hbDpufSkudGhlbihvPT57aWYoIW8ub2t8fG8uc3RhdHVzPT09NDA0KXRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke28uc3RhdHVzfWApO2lmKG8uc3RhdHVzPT09NDAzKXRocm93IG5ldyBFcnJvcigiVW5hdXRob3JpemVkISIpO3JldHVybiBvLmpzb24oKX0pLnRoZW4obz0+e2xldCB1PXIoYSk7c2VsZi5wb3N0TWVzc2FnZSh7dHlwZTp1LGRhdGE6b30pLHM9dm9pZCAwfSkuY2F0Y2gobz0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6by5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX0pfX0pfSkoKTsK";
const blob = typeof window !== "undefined" && window.Blob && new Blob([atob(encodedJs)], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper() {
  const objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
  try {
    return objURL ? new Worker(objURL, {}) : new Worker("data:application/javascript;base64," + encodedJs, { type: "module" });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
const DB_NAME = "usestore-db";
const DB_STORE = "usestore-db";
const useStore = (persistData = true, storeName = DB_STORE) => {
  const store = useRef();
  useEffect(() => {
    store.current = createStore(DB_NAME, storeName);
    return () => {
      !persistData && clear(store.current);
      store.current = void 0;
    };
  }, []);
  return {
    del: (key) => del(key, store.current),
    get: (key) => get(key, store.current),
    getMany: (keys) => getMany(keys, store.current),
    set: (key, value) => set(key, value, store.current),
    setMany: (entries) => setMany(entries, store.current),
    update: (key, updater) => update(key, updater, store.current)
  };
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
const isObject = (obj) => typeof obj === "object" && !Array.isArray(obj) && obj !== null;
function cleanupWorker(worker) {
  worker == null ? void 0 : worker.postMessage({ type: "cancel" });
  worker == null ? void 0 : worker.terminate();
  worker = void 0;
}
const dataExpired = (maxAge, timestamp = 0) => timestamp + maxAge > Date.now();
const methodType = (options) => {
  var _a;
  return ((_a = options == null ? void 0 : options.method) == null ? void 0 : _a.toUpperCase()) || "GET";
};
function useFetch() {
  const {
    del: del2,
    get: get2,
    set: set2,
    update: update2
  } = useStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const workerRef = useRef();
  const fetchWorker = async ({
    url,
    fetchOptions,
    maxAge = DAY
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
      }).catch((err) => {
        console.error(err);
      });
    }
    worker == null ? void 0 : worker.addEventListener("message", ({
      data: {
        type,
        data
      }
    }) => {
      if (type === "DELETE") {
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
          let newData = isObject(data) && isObject(oldValue == null ? void 0 : oldValue.data) ? __spreadValues(__spreadValues({}, data), oldValue.data) : data;
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
    worker == null ? void 0 : worker.postMessage({
      type: "fetch",
      url,
      fetchOptions
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
const initialState = {
  data: void 0,
  error: void 0,
  loading: false,
  update: true
};
export { useFetch, useStore };

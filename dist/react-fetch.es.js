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
const encodedJs = "dmFyIE09T2JqZWN0LmRlZmluZVByb3BlcnR5LFQ9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIG09T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIGc9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgUz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFU9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgcD0oZixuLGkpPT5uIGluIGY/TShmLG4se2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOml9KTpmW25dPWksZD0oZixuKT0+e2Zvcih2YXIgaSBpbiBufHwobj17fSkpUy5jYWxsKG4saSkmJnAoZixpLG5baV0pO2lmKGcpZm9yKHZhciBpIG9mIGcobikpVS5jYWxsKG4saSkmJnAoZixpLG5baV0pO3JldHVybiBmfSx3PShmLG4pPT5UKGYsbShuKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGY9dD0+dHlwZW9mIHQ9PSJvYmplY3QiJiYhQXJyYXkuaXNBcnJheSh0KSYmdCE9PW51bGwsbj0odCxlLHM9e30pPT4oT2JqZWN0LmtleXModCkuZm9yRWFjaChyPT57bGV0IGw9ZT9lKyIuIityOnI7Zih0W3JdKT9uKHRbcl0sbCxzKTpzW2xdPUFycmF5LmlzQXJyYXkodFtyXSk/dFtyXS5zb3J0KCk6dFtyXX0pLE9iamVjdC5lbnRyaWVzKHMpLnNvcnQoKSksaT10PT50LmZsYXRNYXAoZT0+ZihlKT9uKGUpOltlXSkuc29ydCgpLE89dD0+e3ZhciBlLHM7cmV0dXJuKHM9KGU9dD09bnVsbD92b2lkIDA6dC5tZXRob2QpPT1udWxsP3ZvaWQgMDplLnRvVXBwZXJDYXNlKCkpIT1udWxsP3M6IkdFVCJ9LEE9KHQsZSxzKT0+e2xldCByPUFycmF5LmlzQXJyYXkodCk/ImFycmF5Ijp0eXBlb2YgdCxsPUFycmF5LmlzQXJyYXkoZSk/ImFycmF5Ijp0eXBlb2YgZTtyZXR1cm4gciE9PWw/ITE6ciE9PSJvYmplY3QiJiZyIT09ImFycmF5Ij9yPT09bDpzJiZyPT09Im9iamVjdCI/cy5tYXAoYz0+dFtjXT09PWVbY10pLmV2ZXJ5KGM9PmMpOihyPT09ImFycmF5IiYmKHQ9aSh0KSxlPWkoZSkpLCFzJiZyPT09Im9iamVjdCImJih0PW4odCksZT1uKGUpKSxKU09OLnN0cmluZ2lmeSh0KT09PUpTT04uc3RyaW5naWZ5KGUpKX0sRT0odCxlKT0+T2JqZWN0LmVudHJpZXModCkucmVkdWNlKChyLGwpPT57Y29uc3RbYyx5XT1sO2xldCBhPWVbY10sbz10W2NdO2lmKEEoeSxhKSlyZXR1cm4gcjtpZihmKGEpKXtsZXQgaD1PYmplY3Qua2V5cyhhKS5tYXAodT0+QShhW3VdLG9bdV0pP3ZvaWQgMDpbYCR7Y30uJHt1fWAsYVt1XV0pLmZpbHRlcih1PT51KTtyZXR1cm5bLi4uciwuLi5oXX1yZXR1cm4gcn0sW10pO3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsdD0+e2NvbnN0e3R5cGU6ZX09dC5kYXRhO2xldCBzPW5ldyBBYm9ydENvbnRyb2xsZXIscj1zPT1udWxsP3ZvaWQgMDpzLnNpZ25hbDtpZihlPT09ImNhbmNlbCImJihzPT1udWxsfHxzLmFib3J0KCkpLGU9PT0iZmV0Y2giKXtjb25zdHt1cmw6bCxvcHRpb25zOmMsZXhpc3RpbmdEYXRhOnl9PXQuZGF0YTtmZXRjaChsLGM/dyhkKHt9LGMpLHtzaWduYWw6cn0pOntzaWduYWw6cn0pLnRoZW4oYT0+e2lmKCFhLm9rfHxhLnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHthLnN0YXR1c31gKTtpZihhLnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gYS5qc29uKCl9KS50aGVuKGE9PntsZXQgbz1PKGMpO2lmKCF5KXNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6byxkYXRhOmF9KTtlbHNlIGlmKGYoYSkpe2xldCBoPUUoeSxhKTtzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJVUERBVEVTIixkYXRhOmh9KX1lbHNlIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6byxkYXRhOmF9KX0pLmNhdGNoKGE9PntzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOmEubWVzc2FnZXx8IlVua25vd24gZXJyb3IifSl9KX19KX0pKCk7Cg==";
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
      } else if (type === "UPDATES")
        ;
      else if (type === "GET") {
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

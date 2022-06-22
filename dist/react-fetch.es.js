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
const encodedJs = "dmFyIHU9T2JqZWN0LmRlZmluZVByb3BlcnR5LGg9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIGc9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIG49T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgZD1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHc9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgbD0ocyx0LGUpPT50IGluIHM/dShzLHQse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmV9KTpzW3RdPWUsYz0ocyx0KT0+e2Zvcih2YXIgZSBpbiB0fHwodD17fSkpZC5jYWxsKHQsZSkmJmwocyxlLHRbZV0pO2lmKG4pZm9yKHZhciBlIG9mIG4odCkpdy5jYWxsKHQsZSkmJmwocyxlLHRbZV0pO3JldHVybiBzfSxpPShzLHQpPT5oKHMsZyh0KSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIscz0+e2NvbnN0e3R5cGU6dH09cy5kYXRhO2xldCBlPW5ldyBBYm9ydENvbnRyb2xsZXIsYT1lLnNpZ25hbDtpZih0PT09ImNhbmNlbCImJmUuc2lnbmFsLmFib3J0KCksdD09PSJmZXRjaCIpe2NvbnN0e3VybDpmLG9wdGlvbnM6b309cy5kYXRhO2ZldGNoKGYsbz9pKGMoe30sbykse3NpZ25hbDphfSk6e3NpZ25hbDphfSkudGhlbihyPT57aWYoIXIub2t8fHIuc3RhdHVzPT09NDA0KXRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Iuc3RhdHVzfWApO2lmKHIuc3RhdHVzPT09NDAzKXRocm93IG5ldyBFcnJvcigiVW5hdXRob3JpemVkISIpO3JldHVybiByLmpzb24oKX0pLnRoZW4ocj0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6InN1Y2Nlc3MiLGRhdGE6cn0pLGU9dm9pZCAwfSkuY2F0Y2gocj0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6ci5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX0pfX0pfSkoKTsK";
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
const DAY = 24 * 60 * 60 * 1e3;
function cleanupWorker(worker) {
  worker == null ? void 0 : worker.postMessage({
    type: "cancel"
  });
  worker == null ? void 0 : worker.terminate();
  worker = void 0;
}
function reducer(state, action) {
  switch (action.type) {
    case "nuke":
      return __spreadProps(__spreadValues({}, state), {
        nuked: true
      });
    case "pre-load":
      return __spreadProps(__spreadValues({}, state), {
        data: action.data
      });
    case "data":
      return __spreadProps(__spreadValues({}, state), {
        data: action.data,
        loading: false,
        nuked: false,
        error: void 0
      });
    case "clearError":
      return __spreadProps(__spreadValues({}, state), {
        error: void 0
      });
    case "error":
      return __spreadProps(__spreadValues({}, state), {
        error: action.error,
        loading: false
      });
    case "loading":
      return __spreadProps(__spreadValues({}, state), {
        loading: action.loading
      });
    default:
      return state;
  }
}
const initialState = {
  data: void 0,
  error: void 0,
  loading: false,
  nuked: false,
  update: true
};
function useFetch() {
  const {
    del: del2,
    get: get2,
    set: set2
  } = useStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const sharedRef = useRef({
    worker: void 0,
    controller: new AbortController()
  });
  let {
    worker,
    controller
  } = sharedRef.current;
  useEffect(() => {
    var _a, _b, _c;
    if (!window && !((_c = (_b = (_a = sharedRef == null ? void 0 : sharedRef.current) == null ? void 0 : _a.controller) == null ? void 0 : _b.signal) == null ? void 0 : _c.aborted)) {
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
  }, [window, sharedRef.current.controller]);
  const fetchWorker = async ({
    url,
    fetchOptions,
    cache = false,
    maxAge = DAY
  }) => {
    cleanupWorker(worker);
    let method = (fetchOptions == null ? void 0 : fetchOptions.method) || "GET";
    let methodIsGet = method.toLowerCase() === "get";
    let next = methodIsGet ? await get2(url.toString()).then((value) => {
      if (!(value == null ? void 0 : value.timestamp)) {
        return true;
      }
      if ((value == null ? void 0 : value.timestamp) + maxAge <= Date.now()) {
        del2(url.toString());
        return true;
      }
      console.log("cache hit", url.toString());
      dispatch({
        type: cache ? "data" : "pre-load",
        data: value == null ? void 0 : value.data
      });
      return cache ? false : true;
    }) : true;
    if (window && next) {
      methodIsGet && del2(url.toString());
      worker = new WorkerWrapper();
      dispatch({
        type: "loading",
        loading: true
      });
      worker.postMessage({
        type: "fetch",
        url,
        fetchOptions
      });
      worker.addEventListener("message", ({
        data: {
          data,
          type
        }
      }) => {
        var _a;
        if (!((_a = controller == null ? void 0 : controller.signal) == null ? void 0 : _a.aborted)) {
          if (type === "success") {
            dispatch({
              type: "data",
              data,
              url,
              fetchOptions
            });
            if (cache && methodIsGet) {
              let timestamp = Date.now();
              let cacheObject = {
                timestamp,
                data
              };
              set2(url.toString(), cacheObject).then(() => {
                console.log("saved data");
              }).catch(() => {
                console.error("couldn't access indexedDB to save data");
              });
            }
          } else {
            dispatch({
              type: "error",
              error: new Error(type)
            });
          }
        }
        cleanupWorker(worker);
      });
    }
  };
  return __spreadValues({
    fetchWorker
  }, state);
}
export { useFetch, useStore };

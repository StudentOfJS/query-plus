import type { createArrayOfUpdatesType, ArrayOfStringAnyTuple, StringAnyTuple } from "../types";

export * from "./state_tools";
export * from "./store_tools";

export const DAY = 24 * 60 * 60 * 1000;

export function cleanupWorker(worker: Worker | undefined) {
  worker?.postMessage({ type: "cancel" });
  worker?.terminate();
  worker = void 0;
}

export const dataExpired = (maxAge: number, timestamp?: number) => {
  if (!timestamp) {
    return true;
  }
  return (maxAge + timestamp) < Date.now();
};

export const isObject = (obj: unknown) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const flattenObjectToArray = (
  obj: Record<string, any>,
  parent?: string,
  flatObj: Record<string, any> = {},
) => {
  Object.keys(obj).forEach((key) => {
    let next = parent ? parent + "." + key : key;
    if (isObject(obj[key])) {
      flattenObjectToArray(obj[key], next, flatObj);
    } else {
      flatObj[next] =
        Array.isArray(obj[key]) ? (obj[key] as []).sort() : obj[key];
    }
  },);
  return Object.entries(flatObj).sort();
};

export const flattenAndSortArray = (arr: Array<any>) =>
  arr.flatMap((x) => isObject(x) ? flattenObjectToArray(x) : [x]).sort();

export const methodType = (options: RequestInit | undefined) =>
  options?.method?.toUpperCase() ?? "GET";

export const isMatch = (
  a: unknown,
  b: unknown,
  compareKeys?: Array<string>,
) => {
  let typeofA = Array.isArray(a) ? "array" : typeof a;
  let typeofB = Array.isArray(b) ? "array" : typeof b;
  if (typeofA !== typeofB) {
    return false;
  }
  if (typeofA !== "object" && typeofA !== "array") {
    return typeofA === typeofB;
  }
  if (compareKeys && typeofA === "object") {
    return compareKeys.map(
      (key) =>
        (a as Record<string, any>)[key] === (b as Record<string, any>)[key],
    ).every((x) => x);
  }
  if (typeofA === "array") {
    a = flattenAndSortArray((a as Array<any>));
    b = flattenAndSortArray((b as Array<any>));
  }
  if (!compareKeys && typeofA === "object") {
    a = flattenObjectToArray((a as Record<string, any>));
    b = flattenObjectToArray((b as Record<string, any>));
  }
  return JSON.stringify(a) === JSON.stringify(b);
};



// compare records two entries deep and return an array of tuples
export const createArrayOfUpdates:createArrayOfUpdatesType = (oldRecord, newRecord) => {
  let changeRegister: ArrayOfStringAnyTuple = Object.entries(oldRecord)
    .reduce((register: any, entry: StringAnyTuple) => {
      const [key, value] = entry
      let newValue: Record<string, any> = newRecord[key]
      let oldValue: Record<string, any> = oldRecord[key]
      if(isMatch(value, newValue)) return register;
      if(isObject(newValue)) {
        let secondLevelKeys = Object.keys(newValue)
          .map(k => isMatch(newValue[k], oldValue[k]) ? undefined : [`${key}.${k}`, newValue[k]])
          .filter(tuple => tuple)
        return [...register, ...secondLevelKeys];
      }
      return register
    }, [])
  return changeRegister;
}

export const serializeFunction = (f?: Function) => f ? encodeURI(f.toString()) : undefined;
export const deserializeFunction = (s?: string) => s ? new Function(`return ${decodeURI(s)}`)() : (d:unknown) => d;
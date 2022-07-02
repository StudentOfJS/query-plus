// modified code from idb-keyval to suit our needs
import { ValueType } from "../types";

const DB_STORE = "query-store";
export declare type UseStore = <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>;
export const promisifyRequest = <T = undefined>(request: IDBRequest<T> | IDBTransaction ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        // @ts-ignore
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore
        request.onabort = request.onerror = () => reject(request.error);
    });
}
export function store () {
    const request = indexedDB.open("query-db");
    request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE);
    const dbpromise = promisifyRequest(request);
    const useStore: UseStore = (txMode, callback) => dbpromise.then((db) => callback(db.transaction(DB_STORE, txMode).objectStore(DB_STORE)));
    return {
        del: (key: IDBValidKey) => useStore('readwrite', (store) => {store.delete(key); return promisifyRequest(store.transaction)}),
        get: (key: IDBValidKey): Promise<ValueType> => useStore<ValueType>('readonly', (store) => {store.get(key); return promisifyRequest(store.transaction)}),
        set: (key: IDBValidKey, value: any) => useStore<ValueType>('readwrite', (store) => {store.put(value, key); return promisifyRequest(store.transaction)}),
        put: (key: IDBValidKey, updater: (oldValue: ValueType) => ValueType) => useStore<ValueType>('readwrite', (store) => new Promise((resolve, reject) => {
            store.get(key).onsuccess = function () {
              try {
                store.put(updater(this.result), key);
                resolve(promisifyRequest(store.transaction));
              } catch (err) {
                reject(err);
              }
            };
          })),
        clear: () => useStore('readwrite', (store) => {store.clear(); return promisifyRequest(store.transaction)}),
    };
}

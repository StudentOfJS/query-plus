import { ValueType } from "../types";
export declare type UseStore = <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>;
export declare function store(): {
    del: (key: IDBValidKey) => Promise<undefined>;
    get: (key: IDBValidKey) => Promise<ValueType>;
    set: (key: IDBValidKey, value: any) => Promise<undefined>;
    put: (key: IDBValidKey, updater: (oldValue: any | undefined) => any) => Promise<unknown>;
    clear: () => Promise<undefined>;
};

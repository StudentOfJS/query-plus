import { del, get, set, update, createStore } from "idb-keyval";

import type { UseStore } from "idb-keyval";


export function store () {
    const DB_NAME = "usestore-db";
    const DB_STORE = "usestore-db";
    const store: UseStore = createStore(DB_NAME, DB_STORE);
    const remove = (key: IDBValidKey) => del(key, store);
    const getData = (key: IDBValidKey) => get(key, store);
    const setData = (key: IDBValidKey, value: unknown) => set(key, value, store);
    const updateData = (key: IDBValidKey, updater: (oldValue: any) => any) => update(key, updater, store);
    return {
        remove,
        getData,
        setData,
        updateData,
    };
}
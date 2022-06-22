/**
 * @todo add maxAge + timestamp to value object on set
 * @todo check maxAge + timestamp on get
 * @todo do we need all of this?
*/
import { useEffect, useRef } from "react";
import { clear, del, get, getMany, set, setMany, update, createStore } from 'idb-keyval';
import type { UseStore } from 'idb-keyval'

export interface UseStoreProps {
    persistData: boolean
    storeName: string
}
const DB_NAME = 'usestore-db'
const DB_STORE = 'usestore-db'
export const useStore = (persistData: boolean = true, storeName: string = DB_STORE) => {
    const store = useRef<UseStore>()

    useEffect(() => {
       store.current = createStore(DB_NAME, storeName);
        return () => {
            !persistData && clear(store.current)
            store.current = void 0
        }
    }, []);
    return { 
        del: (key: IDBValidKey) => del(key, store.current),
        get: (key: IDBValidKey) => get(key, store.current),
        getMany: (keys: Array<IDBValidKey>) => getMany(keys, store.current),
        set: (key: IDBValidKey, value: unknown) => set(key, value, store.current),
        setMany: (entries: Array<[IDBValidKey, any]>) => setMany(entries, store.current),
        update: (key: IDBValidKey, updater: (oldValue: any) => any) => update(key, updater, store.current)
    }
}
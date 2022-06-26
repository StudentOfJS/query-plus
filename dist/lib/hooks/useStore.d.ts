export interface UseStoreProps {
    persistData: boolean;
    storeName: string;
}
/**
 *
 * @param {persistData?: boolean, storeName?: string} props
 * @example const { del, get, set, update } = useStore({ persistData: true, storeName: 'myStore' })
 *
*/
export declare const useStore: (props?: Partial<UseStoreProps> | undefined) => {
    __dangerouslyNukeAllStores: () => void;
    del: (key: IDBValidKey) => Promise<void>;
    get: (key: IDBValidKey) => Promise<any>;
    getMany: (keys: Array<IDBValidKey>) => Promise<any[]>;
    set: (key: IDBValidKey, value: unknown) => Promise<void>;
    setMany: (entries: Array<[IDBValidKey, any]>) => Promise<void>;
    update: (key: IDBValidKey, updater: (oldValue: any) => any) => Promise<void>;
};

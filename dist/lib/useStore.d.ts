export interface UseStoreProps {
    persistData: boolean;
    storeName: string;
}
export declare const useStore: (persistData?: boolean, storeName?: string) => {
    del: (key: IDBValidKey) => Promise<void>;
    get: (key: IDBValidKey) => Promise<any>;
    getMany: (keys: Array<IDBValidKey>) => Promise<any[]>;
    set: (key: IDBValidKey, value: unknown) => Promise<void>;
    setMany: (entries: Array<[IDBValidKey, any]>) => Promise<void>;
    update: (key: IDBValidKey, updater: (oldValue: any) => any) => Promise<void>;
};

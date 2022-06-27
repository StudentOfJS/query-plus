export declare function store(): {
    remove: (key: IDBValidKey) => Promise<void>;
    getData: (key: IDBValidKey) => Promise<any>;
    setData: (key: IDBValidKey, value: unknown) => Promise<void>;
    updateData: (key: IDBValidKey, updater: (oldValue: any) => any) => Promise<void>;
};

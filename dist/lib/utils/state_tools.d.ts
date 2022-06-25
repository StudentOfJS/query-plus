export declare type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined;
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    update: boolean;
}
export declare const initialState: StateType;
export declare function reducer(state: StateType, action: any): {
    data: any;
    error?: Error | undefined;
    loading: boolean;
    update: boolean;
} | {
    error: any;
    loading: boolean;
    data: UnknownDataResponseType;
    update: boolean;
} | {
    loading: any;
    data: UnknownDataResponseType;
    error?: Error | undefined;
    update: boolean;
};

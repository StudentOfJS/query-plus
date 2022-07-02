import type { UnknownDataResponseType } from "../types";
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    preload: boolean;
    loading: boolean;
    update: boolean;
}
export declare const initialState: StateType;
export declare function reducer(state: StateType, action: any): {
    data: any;
    loading: boolean;
    preload: boolean;
    error: undefined;
    update: boolean;
} | {
    error: any;
    loading: boolean;
    preload: boolean;
    data: UnknownDataResponseType;
    update: boolean;
} | {
    loading: any;
    data: UnknownDataResponseType;
    error?: Error | undefined;
    preload: boolean;
    update: boolean;
};

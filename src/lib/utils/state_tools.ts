import type { UnknownDataResponseType } from "../types";

export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    preload: boolean;
    loading: boolean;
    update: boolean;
}

export const initialState: StateType = {
    data: undefined,
    error: undefined,
    loading: false,
    preload: false,
    update: true
}

export function reducer(state: StateType, action: any) {
    switch (action.type) {
        case 'pre-load':
            return { ...state, data: action.data, loading: false, preload: true, error: void 0 }
        case 'data':
            return { ...state, data: action.data, loading: false, preload: false, error: void 0 }
        case 'error':
            return { ...state, error: action.error, loading: false, preload: false }
        case 'loading':
            return { ...state, loading: action.loading }
        default:
            return state
    }
}

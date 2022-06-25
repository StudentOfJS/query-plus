export type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined
export interface StateType {
    data: UnknownDataResponseType;
    error?: Error;
    loading: boolean;
    update: boolean;
}

export const initialState: StateType = {
    data: undefined,
    error: undefined,
    loading: false,
    update: true
}

export function reducer(state: StateType, action: any) {
    switch (action.type) {
        case 'pre-load':
            return { ...state, data: action.data }
        case 'data':
            return { ...state, data: action.data, loading: false, error: void 0 }
        case 'error':
            return { ...state, error: action.error, loading: false }
        case 'loading':
            return { ...state, loading: action.loading }
        default:
            return state
    }
}

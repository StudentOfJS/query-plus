export function reducer(state: any, action: any) {
    switch (action.type) {
        case 'pre-load':
            return { ...state, data: action.data }
        case 'data':
            return { ...state, data: action.data, loading: false, error: void 0 }
        case 'clearError':
            return { ...state, error: undefined };
        case 'error':
            return { ...state, error: action.error, loading: false }
        case 'loading':
            return { ...state, loading: action.loading }
        default:
            return state
    }
}
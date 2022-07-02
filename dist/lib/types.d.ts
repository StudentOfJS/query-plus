export type UnknownDataResponseType = Array<unknown> | Record<string, unknown> | undefined
export type StringAnyTuple = [string, any]
export type ArrayOfStringAnyTuple = Array<StringAnyTuple>
export type WorkerResponseType = MessageEvent<{
    type: string;
    data?: UnknownDataResponseType
}>
export interface FetchWorkerBaseRequestType {
    options?: RequestInit | undefined
    maxAge?: number
    preferUseCache?: boolean
    middleware?: (data: UnknownDataResponseType) => UnknownDataResponseType
    url: RequestInfo | URL
}
export interface FetchWorkerRequestType extends Omit<FetchWorkerBaseRequestType, "middleware"> {
    middleware?: string
}

export interface FetchWorkerProps extends FetchWorkerBaseRequestType {
    /* 
    update will be fetched after the response is received.
    This is useful for updating after POST PUT or DELETE, 
    where the api doesn't return all the data and the GET
    endpoint is different.
    */
    update?: {
        url: RequestInfo | URL,
        options?: RequestInit | undefined
    }
}
export interface PollWorkerProps {
    url: RequestInfo | URL
    interval: number,
    options?: RequestInit | undefined
    maxAttempts?: number,
    existingData?: number, 
    compareKeys?: string[]
}

export type ValueType = { timestamp: number; maxAge: number; data: any };



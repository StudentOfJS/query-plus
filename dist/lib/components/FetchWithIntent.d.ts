import type { FetchWorkerBaseRequestType } from "../types";
interface InterfaceFetchWithIntent {
    children: React.ReactNode;
    prefetch: Array<FetchWorkerBaseRequestType>;
    timeToExcecute?: number;
}
export declare const FetchWithIntent: React.FC<InterfaceFetchWithIntent>;
export default FetchWithIntent;

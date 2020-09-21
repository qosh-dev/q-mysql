import { QResult } from "./QResult";
export declare class QTools<T, P extends keyof T> extends QResult<T, P> {
    Distinct(): QResult<T, P>;
    SUM(): QResult<T, P>;
    MIN(): QResult<T, P>;
    AVG(): QResult<T, P>;
    MAX(): QResult<T, P>;
    Count(): QResult<T, P>;
}

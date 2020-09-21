import { IRoot } from "./interface/IRoot";
import { QFinish } from "./QFinish";
export declare class QResult<T, P extends keyof T> extends QFinish<T, P> {
    Root: IRoot;
    constructor(Root: IRoot);
    Where<P extends keyof T>(Condition: string): QFinish<T, P>;
    Find<P extends keyof T>(id: number): Promise<T>;
    Equal<P extends keyof T>(key: P, value: T[P]): QFinish<T, P>;
    NotEqual<P extends keyof T>(key: P, value: T[P]): QFinish<T, P>;
}

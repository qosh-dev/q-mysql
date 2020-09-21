import { IRoot } from "./interface/IRoot";
import { QChange } from "./QChange";
import { QResult } from "./QResult";
import { QTools } from "./QTools";
export declare class QType<T, P extends keyof T> extends QResult<T, P> {
    Root: IRoot;
    constructor(Root: IRoot);
    Delete(id: Number): Promise<void>;
    Delete(): Promise<QChange>;
    Select<P extends keyof T>(...props: P[]): QTools<T, P>;
    Add(objArr: T): Promise<void>;
    Add(objArr: T[]): Promise<void>;
    Update(obj: T): Promise<QChange>;
    Update(obj: T, id: number): Promise<void>;
}

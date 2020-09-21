import { IRoot } from "./interface/IRoot";
import { QLast } from "./QLast";
export declare class QFinish<T, P extends keyof T> extends QLast<T, P> {
    Root: IRoot;
    constructor(Root: IRoot);
    OrderBy<P extends keyof T>(prop: P): QLast<T, P>;
    OrderByDESC<P extends keyof T>(prop: P): QLast<T, P>;
}

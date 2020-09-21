import { IRoot } from "./interface/IRoot";
export declare class QLast<T, P extends keyof T> {
    Root: IRoot;
    constructor(Root: IRoot);
    toList(): Promise<T[]>;
    First(): Promise<T | T[P]>;
    Paginate(count?: number, page?: number): Promise<T[]>;
}

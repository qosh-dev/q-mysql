import { IRoot } from "./interface/IRoot";
export declare class QChange {
    Root: IRoot;
    query: string;
    constructor(Root: IRoot, query: string);
    Where(Condition: string): Promise<void>;
}

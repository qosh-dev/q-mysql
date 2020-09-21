export declare function Parse<T>(tempArr: Array<T>): T[];
export declare type obj<T> = {
    [P in keyof T]?: T[P] | string;
};

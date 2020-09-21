import { QType } from "./QType";
import { IRoot } from './interface/IRoot';
import * as mysql from 'mysql';
export declare class QMySql {
    private hostname?;
    private username?;
    private password?;
    private db?;
    conn: mysql.Connection;
    connected: boolean;
    constructor(hostname?: string | undefined, username?: string | undefined, password?: string | undefined, db?: string | undefined);
    connectAsync(): Promise<void>;
    queryAsync(query: string): Promise<any>;
    Exequte(queryString: string): Promise<any>;
    closeAsync(): Promise<void>;
    Tables(): Promise<string[]>;
    SetTable<T>(tableName: string): QType<T, keyof T>;
    BuildQuery(Root: IRoot): string;
}
declare global {
    interface Array<T> {
        First<P extends keyof T>(arg?: (ar: T) => T[P]): T | undefined;
        Paginate(count: number, page: number): Array<T>;
        Where<P extends keyof T>(arg: (ar: T) => T[P]): Array<T> | T;
        Select<P extends keyof T>(...prop: P[]): typeof prop;
        Select<P extends keyof T>(prop: P[]): typeof prop;
    }
}

import { QType } from "./QType";
import { IRoot } from './interface/IRoot'
import * as mysql from 'mysql'

export class QMySql{
    private hostname?: string | undefined;
    private username?: string | undefined;
    private password?: string | undefined;
    private db?: string | undefined;
    public conn!: mysql.Connection;
    public connected: boolean;
    constructor(hostname?: string | undefined, username?: string | undefined, password?: string | undefined, db?: string | undefined) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.db = db;
        this.connected = false;
    }
    connectAsync(){
        return new Promise<void>((resolve, reject) => {
            this.conn = mysql.createConnection({
                database: this.db,
                host: this.hostname,
                password: this.password,
                user: this.username,
            });
            this.conn.connect((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = true;
                return resolve();
            });
        });
    }
    public queryAsync(query: string) {
        return new Promise<any>((resolve, reject) => {
            this.conn.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
    async Exequte(queryString :string){
        await this.connectAsync();
        let result;
        try {
            result = await this.queryAsync(queryString);
        } catch (exception) {
            throw exception;
        } finally {
            await this.closeAsync();
        }
        return result;
    }
    public closeAsync() {
        return new Promise<void>((resolve, reject) => {
            this.conn.end((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = false;
                return resolve();
            });
        });
    }
    async Tables(){
        var list : Array<string>  = new Array<string>();
        var tables : Array<any>  = await this.Exequte('SHOW TABLES');
        tables.forEach((el: { [x: string]: string; }) => {
            list.push(el['Tables_in_social'])
        });
        return list;
    }
    SetTable<T>(tableName : string){
        return new QType<T,keyof T>({Connection : this, Table : tableName});
    }
    BuildQuery(Root : IRoot){
        var queryString = '';
        if(Root.Props !== '* '){
            queryString = "SELECT " + Root.Props + ' ' + Root.Table
            if(Root.Condition !== ''){
                queryString +=  'WHERE ' + Root.Condition
            }
        } else if(Root.Props === '* ' && Root.Condition !== ''){
            queryString = Root.MainQ as string + 'WHERE ' + Root.Condition
        }
        else{
            queryString = Root.MainQ as string
        }
        var query = queryString + " " + Root.ConditionSort
        return query
    }
}


declare global {
    interface Array<T>{
        First<P extends keyof T>(arg? : (ar: T) =>  T[P]): T | undefined
        Paginate(count : number, page : number ): Array<T>
        Where<P extends keyof T>(arg : (ar: T) => T[P]) : Array<T> | T
        Select<P extends keyof T>(...prop : P[]) : typeof prop ;
        Select<P extends keyof T>(prop : P[]) : typeof prop ;
    }
}
Array.prototype.First = function<T,P extends keyof T>(this:T[],arg? : (ar: T) =>  T[P]) : T  {
    var tempArr : Array<T> = new Array<T>();
    if (arg != undefined){
        for (let i = 0; i < this.length; i++) {
            if(arg(this[i])){
                tempArr.push( this[i]);
            }
        }    
    }
    return tempArr[0];
}
Array.prototype.Select = function<T,P extends keyof T>(this:T[],...prop : P[]) : typeof prop{
    var d = '[';
    for (let i = 0; i < this.length; i++) {
        d += '{'
        prop.forEach(el => {
            if(typeof this[i][el] === 'number' || typeof this[i][el] === 'boolean'){
                d += '"' + el  + '":' + this[i][el] + ',';
            } else {
                d += '"' + el  + '":"' + this[i][el] + '",';
            }
        });
        d = d.substring(0,d.length-1)
        d += '},'
    }
    d = d.substring(0,d.length-1)
    d += ']'
    return JSON.parse(d) as typeof prop 
}
Array.prototype.Select = function<T,P extends keyof T>(this:T[],prop : P[]) : typeof prop{
    var d = '[';
    for (let i = 0; i < this.length; i++) {
        d += '{'
        prop.forEach(el => {
            if(typeof this[i][el] === 'number' || typeof this[i][el] === 'boolean'){
                d += '"' + el  + '":' + this[i][el] + ',';
            } else {
                d += '"' + el  + '":"' + this[i][el] + '",';
            }
        });
        d = d.substring(0,d.length-1)
        d += '},'
    }
    d = d.substring(0,d.length-1)
    d += ']'
    return JSON.parse(d) as typeof prop 
}
Array.prototype.Paginate = function<T>(this:T[],count : number, page : number ){
    var list : Array<T> = new Array<T>();
    page = (page-1) * count;
    count = page + count;
    if(this.length > count){ 
        for (let i = page; i < count; i++) {
            list.push(this[i]);
        }
    } else {
        for(let i = page; i < this.length; i++){
            list.push(this[i])
        }
    }
    
    return list;
}
Array.prototype.Where = function <T,P extends keyof T>(this:T[],arg : (ar: T) => T[P]){
    var tempArr : Array<T> = new Array<T>();
    for (let i = 0; i < this.length; i++) {
        if(arg(this[i])){
            tempArr.push( this[i]);
        }
    }
    return tempArr;
}

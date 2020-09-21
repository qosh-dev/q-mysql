import { IRoot } from "./interface/IRoot";
import { QChange } from "./QChange";
import { QResult } from "./QResult";
import { QTools } from "./QTools";

export class QType<T,P extends keyof T> extends QResult<T,P>{
    public Root : IRoot;
    constructor(Root : IRoot) {
        super(Root);
        this.Root = Root
        this.Root.Table = "FROM " + this.Root.Table + ' ';
        this.Root.MainQ = `SELECT * ${this.Root.Table} `;
        this.Root.Condition = '';
        this.Root.Props = '* '
        this.Root.ConditionSort = ''
    }

    async Delete(id: Number): Promise<void>;
    async Delete(): Promise<QChange>;
    async Delete(id?: any) {
        var prop = (await this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field']
        var table = this.Root.Table.substring(5,this.Root.Table.length -1);
        return id !== undefined ?
            await this.Root.Connection.Exequte('DELETE FROM ' + table + " WHERE " + prop + " = " + id) :
            new QChange(this.Root,'DELETE FROM ' + table)
    } 

    Select<P extends keyof T>( ...props : P[]){
        var toQuery : string = "";
        props.forEach(el => {
            toQuery += el + ',';
        });
        this.Root.Props =  toQuery.substring(0,toQuery.length - 1);
        return new QTools<T,P>(this.Root);
    }

    async Add(objArr: T) : Promise<void>;
    async Add(objArr: T[]) : Promise<void>;
    async Add(objArr: any) : Promise<void>{
        var p = ''
        var v = ''
        var table = this.Root.Table.substring(5,this.Root.Table.length -1)
        if((objArr as T[]).length > 1){
            (objArr as T[]).forEach(async tempObj => {
                var tKey = Object.keys(tempObj)
                var tValue = Object.values(tempObj)
                for (let i = 0; i < tKey.length; i++) {
                    p += tKey[i].toString() + ' ,'
                    v +=  "'" + tValue[i] + "'" + ' ,'
                }
                var p1 =  p.substring(0,p.length - 2)
                var v1 =  v.substring(0,v.length - 2)
                var tempQuery = 'INSERT INTO ' + table + '(' + p1 + ')' + ' VALUES ' + '(' + v1 + ')'
                p = '';
                v = '';
                await this.Root.Connection.Exequte(tempQuery);
            });
        }
        else {
            var tKey = Object.keys(objArr)
            var tValue = Object.values(objArr)
            for (let i = 0; i < tKey.length; i++) {
                p += tKey[i].toString() + ' ,'
                v +=  "'" + tValue[i] + "'" + ' ,'
            }
            var p1 =  p.substring(0,p.length - 2)
            var v1 =  v.substring(0,v.length - 2)
            var tempQuery = 'INSERT INTO ' + table + '(' + p1 + ')' + ' VALUES ' + '(' + v1 + ')'
            p = '';
            v = '';
            await this.Root.Connection.Exequte(tempQuery);
        }
    }

    async Update(obj : T) : Promise<QChange>;
    async Update(obj : T, id : number) : Promise<void>;
    async Update(obj : any, id? : any) : Promise<any>{
        var queryString = '';
        var prop = (await this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field']
        var keys : Array<P> = new Array<P>();
        keys = (Object.keys(obj) as P[] )
        var values : Array<T[P]> = new Array<T[P]>()
        values = Object.values(obj) as T[P][]
        var table = this.Root.Table.substring(5,this.Root.Table.length -1)
        queryString = 'UPDATE ' + "" + table + "" + ' SET '
        for (let i = 0; i < keys.length; i++) {
            queryString += "" + keys[i] + " = '" + values[i] + "', "
        }
        queryString = queryString.substring(0,queryString.length -2)
        if(typeof id !== 'undefined' && typeof id === 'number'){
            await this.Root.Connection.Exequte(queryString + " WHERE " + prop + " = " + id)
        }else{
            return new QChange(this.Root,queryString)
        }
    }
}
"use strict";
// import { MySqlConnection } from "mysqlconnector";
// import { IRoot } from './interface/IRoot'
// import { Parse } from "./Methods";
// export class QMySql{
//     private hostname?: string | undefined;
//     private username?: string | undefined;
//     private password?: string | undefined;
//     private db?: string | undefined;
//     constructor(hostname?: string | undefined, username?: string | undefined, password?: string | undefined, db?: string | undefined) {
//         this.hostname = hostname;
//         this.username = username;
//         this.password = password;
//         this.db = db;
//     }
//     conn(){
//         return new MySqlConnection(this.hostname,this.username,this.password,this.db)
//     }
//     async Exequte(queryString :string){
//         return await (await this.conn()).executeAsync(queryString);;
//     }
//     async Tables(){
//         var list : Array<string>  = new Array<string>();
//         var tables  = await (await this.conn()).executeAsync('SHOW TABLES');
//         tables.forEach((el: { [x: string]: string; }) => {
//             list.push(el['Tables_in_social'])
//         });
//         return list;
//     }
//     SetTable<T>(tableName : string){
//         return new QType<T,keyof T>({Connection : this, Table : tableName});
//     }
//     BuildQuery(Root : IRoot){
//         var queryString = '';
//         if(Root.Props !== '* '){
//             queryString = Root.MainQ as string
//             if(Root.Condition !== ''){
//                 queryString +=  'WHERE ' + Root.Condition
//             }
//         } else if(Root.Props === '* ' && Root.Condition !== ''){
//             queryString = Root.MainQ as string + 'WHERE ' + Root.Condition
//         }
//         else{
//             queryString = Root.MainQ as string
//         }
//         var query = queryString + " " + Root.ConditionSort
//         return query
//     }
// }
// class QLast<T,P extends keyof T> {
//     constructor(public Root : IRoot){
//     }
//     async toList() : Promise<Array<T> | T | T[P]> {
//         var queryString = this.Root.Connection.BuildQuery(this.Root)
//         try{
//             var temp : Array<T> =  await this.Root.Connection.Exequte(queryString as string);
//             var ret = Parse(temp)
//             if(ret.length === 1){
//                 if(this.Root.Props?.split(' ')[1] !== undefined){
//                     var prop = Object.keys(ret[0])[0]
//                     return ret[0][prop]
//                 }
//                 return ret[0]
//             }
//             return ret
//         }catch(UnhandledPromiseRejectionWarning){
//             throw new Error(queryString)
//         }
//     }
//     async First(arg? : (ar: T) =>  T[P]){
//         var queryString = this.Root.Connection.BuildQuery(this.Root)
//         try{
//             console.log(queryString);
//             var temp : Array<T> =  await this.Root.Connection.Exequte(queryString as string);
//             var ret = Parse(temp)
//             var prop = Object.keys(ret[0])
//             if(prop.length === 1){
//                 return ret[0][prop[0]]
//             }
//             else {
//                 return ret[0]
//             }
//         }catch(UnhandledPromiseRejectionWarning){
//             throw new Error(queryString)
//         }
//     }
//     async Paginate(count : number = 7, page : number = 1 ){
//         var queryString = this.Root.Connection.BuildQuery(this.Root)
//         try{
//             var temp : Array<T> =  await this.Root.Connection.Exequte(queryString as string);
//             var result = Parse(temp)
//             var list : Array<T> = new Array<T>();
//             page = (page-1) * count;
//             count = page + count;
//             if(result.length > count){
//                 for (let i = page; i < count; i++) {
//                     list.push(result[i]);
//                 }
//             } else {
//                 for(let i = page; i < result.length; i++){
//                     list.push(result[i])
//                 }
//             }
//             return list;
//         }catch(UnhandledPromiseRejectionWarning){
//             throw new Error(queryString)
//         }
//     }
// }
// class QFinish<T,P extends keyof T> extends QLast<T,P>{
//     constructor(public Root : IRoot){
//         super(Root);
//     }
//     OrderBy<P extends keyof T>(prop : P) {
//         this.Root.ConditionSort += "ORDER BY " + prop as string + " ASC "
//         return new QLast<T,P>(this.Root);  
//     }
//     OrderByDESC<P extends keyof T>(prop : P) {
//         this.Root.ConditionSort += "ORDER BY " + prop as string + " DESC "
//         return new QLast<T,P>(this.Root);  
//     }
// }
// class QResult<T,P extends keyof T> extends QFinish<T,P>{
//     constructor(public Root : IRoot){
//         super(Root);
//     }
//     Where<P extends keyof T>(Condition: string) {
//         this.Root.Condition = Condition;
//         return new QFinish<T,P>(this.Root);
//     }
//     async Find<P extends keyof T>(id : number) {
//         var prop = (await this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field']
//         this.Root.Condition =  "" + prop + " = " + id ;
//         var temp =  new QFinish<T,P>(this.Root);
//         return temp.First() as Promise<T>
//     }
//     Exual<P extends keyof T>(key : P, value : T[P]) {
//         this.Root.Condition =  "" + key as string + " = " + value  as string ;
//         return new QFinish<T,P>(this.Root);
//     }
//     NotExual<P extends keyof T>(key : P, value : T[P]) {
//         this.Root.Condition =  "" + key as string + " != " + value  as string ;
//         return new QFinish<T,P>(this.Root);
//     }
// }
// class QType<T,P extends keyof T> extends QResult<T,P>{
//     public Root : IRoot;
//     constructor(Root : IRoot) {
//         super(Root);
//         this.Root = Root
//         this.Root.Table = "FROM " + this.Root.Table + ' ';
//         this.Root.MainQ = `SELECT * ${this.Root.Table} `;
//         this.Root.Condition = '';
//         this.Root.Props = '* '
//         this.Root.ConditionSort = ''
//     }
//     async Delete(param: Number): Promise<void>;
//     async Delete(): Promise<QChange>;
//     async Delete(param?: any) {
//         var prop = (await this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field']
//         var table = this.Root.Table.substring(5,this.Root.Table.length -1);
//         return param !== undefined ?
//             await this.Root.Connection.Exequte('DELETE FROM ' + table + " WHERE " + prop + " = " + param) :
//             new QChange(this.Root,'DELETE FROM ' + table)
//     }
//     Select<P extends keyof T>( ...props : P[]){
//         var toQuery : string = "";
//         props.forEach(el => {
//             toQuery += el + ',';
//         });
//         this.Root.Props =  toQuery.substring(0,toQuery.length - 1);
//         return new QTools<T,P>(this.Root);
//     }
//     async Add(objArr: T) : Promise<void>;
//     async Add(objArr: T[]) : Promise<void>;
//     async Add(objArr: any) : Promise<void>{
//         var p = ''
//         var v = ''
//         var table = this.Root.Table.substring(5,this.Root.Table.length -1)
//         if((objArr as T[]).length > 1){
//             (objArr as T[]).forEach(async tempObj => {
//                 var tKey = Object.keys(tempObj)
//                 var tValue = Object.values(tempObj)
//                 for (let i = 0; i < tKey.length; i++) {
//                     p += tKey[i].toString() + ' ,'
//                     v +=  "'" + tValue[i] + "'" + ' ,'
//                 }
//                 var p1 =  p.substring(0,p.length - 2)
//                 var v1 =  v.substring(0,v.length - 2)
//                 var tempQuery = 'INSERT INTO ' + table + '(' + p1 + ')' + ' VALUES ' + '(' + v1 + ')'
//                 p = '';
//                 v = '';
//                 await this.Root.Connection.Exequte(tempQuery);
//             });
//         }
//         else {
//             var tKey = Object.keys(objArr)
//             var tValue = Object.values(objArr)
//             for (let i = 0; i < tKey.length; i++) {
//                 p += tKey[i].toString() + ' ,'
//                 v +=  "'" + tValue[i] + "'" + ' ,'
//             }
//             var p1 =  p.substring(0,p.length - 2)
//             var v1 =  v.substring(0,v.length - 2)
//             var tempQuery = 'INSERT INTO ' + table + '(' + p1 + ')' + ' VALUES ' + '(' + v1 + ')'
//             p = '';
//             v = '';
//             await this.Root.Connection.Exequte(tempQuery);
//         }
//     }
//     async Update(obj : T) : Promise<QChange>;
//     async Update(obj : T, id : number) : Promise<void>;
//     async Update(obj : any, id? : any) : Promise<any>{
//         var queryString = '';
//         var prop = (await this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field']
//         var keys : Array<P> = new Array<P>();
//         keys = (Object.keys(obj) as P[] )
//         var values : Array<T[P]> = new Array<T[P]>()
//         values = Object.values(obj) as T[P][]
//         var table = this.Root.Table.substring(5,this.Root.Table.length -1)
//         queryString = 'UPDATE ' + "" + table + "" + ' SET '
//         for (let i = 0; i < keys.length; i++) {
//             queryString += "" + keys[i] + " = '" + values[i] + "', "
//         }
//         queryString = queryString.substring(0,queryString.length -2)
//         if(typeof id !== 'undefined' && typeof id === 'number'){
//             await this.Root.Connection.Exequte(queryString + " WHERE " + prop + " = " + id)
//         }else{
//             return new QChange(this.Root,queryString)
//         }
//     }
// }
// class QTools <T,P extends keyof T> extends QResult<T,P>{
//     Distinct() {
//         this.Root.Props = 'DISTINCT ' + this.Root.Props + " "
//         return new QResult<T,P>(this.Root);  
//     }
//     SUM() {
//         this.Root.Props = 'SUM(' + this.Root.Props + ") "
//         return new QResult<T,P>(this.Root);  
//     }
//     MIN() {
//         this.Root.Props = 'MIN(' + this.Root.Props + ") "
//         return new QResult<T,P>(this.Root);  
//     }
//     AVG() {
//         this.Root.Props = 'AVG(' + this.Root.Props + ") "
//         return new QResult<T,P>(this.Root);  
//     }
//     MAX() {
//         this.Root.Props = 'MAX(' + this.Root.Props + ") "
//         return new QResult<T,P>(this.Root);  
//     }
//     Count()  {
//         this.Root.Props = 'COUNT(' + this.Root.Props + ") "
//         return new QResult<T,P>(this.Root);  
//     }
// }
// export class QChange{
//     constructor(public Root : IRoot,public query : string){
//     }
//     async Where(Condition: string) {
//         var queryString = this.query + ' WHERE ' + Condition
//         try{
//             await this.Root.Connection.Exequte(queryString);
//         }catch(UnhandledPromiseRejectionWarning){
//             throw new Error(queryString)
//         }
//     }  
// }
// // type obj<T> =  {[P in keyof T]?: T[P] | string}
// declare global {
//     interface Array<T>{
//         First<P extends keyof T>(arg? : (ar: T) =>  T[P]): T | undefined
//         Paginate(count : number, page : number ): Array<T>
//         Where<P extends keyof T>(arg : (ar: T) => T[P]) : Array<T> | T
//         Select<P extends keyof T>(...prop : P[]) : typeof prop ;
//         Select<P extends keyof T>(prop : P[]) : typeof prop ;
//     }
// }
// Array.prototype.First = function<T,P extends keyof T>(this:T[],arg? : (ar: T) =>  T[P]) : T  {
//     var tempArr : Array<T> = new Array<T>();
//     if (arg != undefined){
//         for (let i = 0; i < this.length; i++) {
//             if(arg(this[i])){
//                 tempArr.push( this[i]);
//             }
//         }    
//     }
//     return tempArr[0];
// }
// Array.prototype.Select = function<T,P extends keyof T>(this:T[],...prop : P[]) : typeof prop{
//     var d = '[';
//     for (let i = 0; i < this.length; i++) {
//         d += '{'
//         prop.forEach(el => {
//             if(typeof this[i][el] === 'number' || typeof this[i][el] === 'boolean'){
//                 d += '"' + el  + '":' + this[i][el] + ',';
//             } else {
//                 d += '"' + el  + '":"' + this[i][el] + '",';
//             }
//         });
//         d = d.substring(0,d.length-1)
//         d += '},'
//     }
//     d = d.substring(0,d.length-1)
//     d += ']'
//     return JSON.parse(d) as typeof prop 
// }
// Array.prototype.Select = function<T,P extends keyof T>(this:T[],prop : P[]) : typeof prop{
//     var d = '[';
//     for (let i = 0; i < this.length; i++) {
//         d += '{'
//         prop.forEach(el => {
//             if(typeof this[i][el] === 'number' || typeof this[i][el] === 'boolean'){
//                 d += '"' + el  + '":' + this[i][el] + ',';
//             } else {
//                 d += '"' + el  + '":"' + this[i][el] + '",';
//             }
//         });
//         d = d.substring(0,d.length-1)
//         d += '},'
//     }
//     d = d.substring(0,d.length-1)
//     d += ']'
//     return JSON.parse(d) as typeof prop 
// }
// Array.prototype.Paginate = function<T>(this:T[],count : number, page : number ){
//     var list : Array<T> = new Array<T>();
//     page = (page-1) * count;
//     count = page + count;
//     if(this.length > count){
//         for (let i = page; i < count; i++) {
//             list.push(this[i]);
//         }
//     } else {
//         for(let i = page; i < this.length; i++){
//             list.push(this[i])
//         }
//     }
//     return list;
// }
// Array.prototype.Where = function <T,P extends keyof T>(this:T[],arg : (ar: T) => T[P]){
//     var tempArr : Array<T> = new Array<T>();
//     for (let i = 0; i < this.length; i++) {
//         if(arg(this[i])){
//             tempArr.push( this[i]);
//         }
//     }
//     return tempArr;
// }
// //#region eee
// // export class QSelect<T,P extends keyof T> extends QResult<T,P>{
// //     Where<P extends keyof T>(arg: string) {
// //         if(this.tempQ === this.MainQ){
// //             this.tempQ = this.MainQ + ' WHERE ' + arg
// //         } else {
// //             this.tempQ += ' WHERE ' + arg
// //         }
// //         return new QResult<T,P>(this.connection,this.tempQ,this.MainQ);
// //     }
// // }
// // export class QWhere<T,P extends keyof T> extends QResult<T,P>{
// // }
// //#endregion
// //#region archive 
// // function parse<T>(row : any) : number | string{
// //     var temp = JSON.stringify(row);
// //     temp = temp.split(':')[1]
// //     temp = temp.substring(0,temp.length -1)
// //     if(temp[0] === '"'){
// //         temp = temp.substring(1,temp.length -1)
// //     }
// //     if(temp[0] === "'"){
// //         temp = temp.substring(1,temp.length -1)
// //     }
// //     if(Number(temp) !== undefined){
// //         return Number(temp)
// //     }
// //     return temp
// // }
// // async Props<P extends keyof T>(...prop : P[]) : Promise<T[P][]> {
// //     var obj = (await this.toList())[0]
// //     var p1 = prop as P[];
// //     var retList = new Array<T[P]>();
// //     for (let i = 0; i < p1.length; i++) {
// //         retList.push(obj[p1[i]])
// //     }
// //     return retList;
// // }
// // type dict<T> =  {
// //     [P in keyof T]?: T[P] | string
// // }
//     // async Where(...props : dict<T>[]){
//     //     var toQuery : string = "";
//     //     this.dictToObj(props).forEach(el => {
//     //         var v = el.v.toString()
//     //         if(!v.includes('!') && !v.includes('<') && !v.includes('>') && !v.includes('<=') && !v.includes('>=')){
//     //             if(v.includes('?')){
//     //                 v =  v.substring(0,v.length - 2) + '"'
//     //                 toQuery += el.p + ' = ' + v + ' OR ';
//     //             } else {
//     //                 toQuery += el.p + ' = ' + v + ' AND ';
//     //             }
//     //         }
//     //         else if (v.includes('!')){
//     //             v = '"' + el.v.toString().substr(2)
//     //             if(v.includes('?')){
//     //                 v =  v.substring(0,v.length - 2) + '"'
//     //                 toQuery += el.p + ' != ' + v + ' OR ';
//     //             } else {
//     //                 toQuery += el.p + ' != ' + v + ' AND ';
//     //             }
//     //         } 
//     //         else{
//     //             var chars : string[] = ['>','<','>=','<=']
//     //             var v = this.REM(el.v.toString())
//     //             for (let i = 0; i < chars.length; i++) {
//     //                 if(v.includes(chars[i])){
//     //                     var index = v.indexOf(chars[i])
//     //                     this.tempQ = v.replace(v.charAt(index), chars[i] + ' ')
//     //                 }
//     //             }
//     //                 // if(v.includes('?')){
//     //                 //     // v =  v.substring(0,v.length - 1) + '"'
//     //                 //     toQuery += el.p + ' ' + v + ' OR ';
//     //                 // } else {
//     //                 //     toQuery += el.p + ' ' + v + ' AND ';
//     //                 // }
//     //             // } else {
//     //             //     if(v.includes('?')){
//     //             //         // v =  v.substring(0,v.length - 2) + '"'
//     //             //         toQuery += el.p + v + ' OR ';
//     //             //     } else {
//     //             //         toQuery += el.p + v + ' AND ';
//     //             //     }
//     //             // }
//     //         }
//     //     });
//     //     if(toQuery.endsWith(' OR ')){
//     //         var temp1 =  toQuery.substring(0,toQuery.length - 4)
//     //         this.tempQ = this.Main + ' WHERE ' + temp1
//     //     } else {
//     //         var temp1 =  toQuery.substring(0,toQuery.length - 5)
//     //         this.tempQ = this.Main + ' WHERE ' + temp1
//     //     }
//     //     return this;
//     // }
//     // private dictToObj<T>(objList : Array<T>) : Array<obj> {
//     //     var list : Array<obj> = new Array<obj>()
//     //     objList.forEach(el => {
//     //         var str = JSON.stringify(el).replace('{','').replace('}','');
//     //         var f = str.split(':')
//     //         var tempObj : obj = {p : this.REM(f[0]), v :f[1] } 
//     //         list.push(tempObj)
//     //     });
//     //     return list;
//     // }
//     // interface obj {
// //     p: string ;
// //     v : string | number
// // }
//     //#endregion

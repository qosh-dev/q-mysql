import { Parse } from "./Methods";
import { IRoot } from "./interface/IRoot"
export class QLast<T,P extends keyof T> {
    constructor(public Root : IRoot){
    }
    async toList() : Promise<T[]>{
        var queryString = this.Root.Connection.BuildQuery(this.Root)
        this.Root.Props = '* ';
        this.Root.Condition = '';
        this.Root.ConditionSort = '';
        try{
            var temp : Array<T> =  await this.Root.Connection.Exequte(queryString as string);
            var ret = Parse(temp)
            
            return ret
        }catch(UnhandledPromiseRejectionWarning){
            throw new Error(queryString)
        }
    }
    async First(): Promise<T | T[P]>{
        var queryString = this.Root.Connection.BuildQuery(this.Root)
        try{           
            var temp : Array<T> =  await this.Root.Connection.Exequte(queryString as string);
            var ret = Parse(temp)
                if(Object.keys(ret[0]).length === 1){
                    var prop = Object.keys(ret[0])[0]
                    return ret[0][prop] 
                }
                return ret[0]
        }catch(UnhandledPromiseRejectionWarning){
            throw new Error(queryString)
        }
    }
    async Paginate(count : number = 7, page : number = 1 ){
        var queryString = this.Root.Connection.BuildQuery(this.Root)
        try{
            var temp : Array<T> =  await this.Root.Connection.Exequte(queryString as string);
            var result = Parse(temp)
            var list : Array<T> = new Array<T>();
            page = (page-1) * count;
            count = page + count;
            if(result.length > count){
                for (let i = page; i < count; i++) {
                    list.push(result[i]);
                }
            } else {
                for(let i = page; i < result.length; i++){
                    list.push(result[i])
                }
            }
            return list;
        }catch(UnhandledPromiseRejectionWarning){
            throw new Error(queryString)
        }
    }
}
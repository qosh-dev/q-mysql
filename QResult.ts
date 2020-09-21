import { IRoot } from "./interface/IRoot";
import { QFinish } from "./QFinish";

export class QResult<T,P extends keyof T> extends QFinish<T,P>{
    constructor(public Root : IRoot){
        super(Root);
    }
    Where<P extends keyof T>(Condition: string) {
        this.Root.Condition = Condition;
        return new QFinish<T,P>(this.Root);
    }
    async Find<P extends keyof T>(id : number) {
        var prop = (await this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field']
        this.Root.Condition =  "" + prop + " = " + id ;
        var temp =  new QFinish<T,P>(this.Root);
        this.Root.Condition = ''
        return temp.First() as Promise<T>
    }
    Equal<P extends keyof T>(key : P, value : T[P]) {
        if(typeof value === 'string'){
            this.Root.Condition =  "" + key as string + " = '" + value  as string  + "'";
        } else {
            this.Root.Condition =  "" + key as string + " = " + value  as string ;
        }
        return new QFinish<T,P>(this.Root);
    }
    NotEqual<P extends keyof T>(key : P, value : T[P]) {
        if(typeof value === 'string'){
            this.Root.Condition =  "" + key as string + " != '" + value  as string  + "'";
        } else {
            this.Root.Condition =  "" + key as string + " != " + value  as string ;
        }
        return new QFinish<T,P>(this.Root);
    }
}
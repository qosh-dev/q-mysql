import { IRoot } from "./interface/IRoot";
import { QLast } from "./QLast";

export class QFinish<T,P extends keyof T> extends QLast<T,P>{
    constructor(public Root : IRoot){
        super(Root);
    }
    OrderBy<P extends keyof T>(prop : P) {
        this.Root.ConditionSort += "ORDER BY " + prop as string + " ASC "
        return new QLast<T,P>(this.Root);  
    }
    OrderByDESC<P extends keyof T>(prop : P) {
        this.Root.ConditionSort += "ORDER BY " + prop as string + " DESC "
        return new QLast<T,P>(this.Root);  
    } 
}  




 
 
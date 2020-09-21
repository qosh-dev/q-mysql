import { QResult } from "./QResult";

export class QTools <T,P extends keyof T> extends QResult<T,P>{
    Distinct() : QResult<T,P> {
        this.Root.Props = 'DISTINCT ' + this.Root.Props + " "
        return new QResult<T,P>(this.Root);  
    }
    SUM(): QResult<T,P> {
        this.Root.Props = 'SUM(' + this.Root.Props + ") "
        return new QResult<T,P>(this.Root);  
    }
    MIN(): QResult<T,P> {
        this.Root.Props = 'MIN(' + this.Root.Props + ") "
        return new QResult<T,P>(this.Root);  
    }
    AVG(): QResult<T,P> {
        this.Root.Props = 'AVG(' + this.Root.Props + ") "
        return new QResult<T,P>(this.Root);  
    }
    MAX(): QResult<T,P> {
        this.Root.Props = 'MAX(' + this.Root.Props + ") "
        return new QResult<T,P>(this.Root);  
    }
    Count(): QResult<T,P>  {
        this.Root.Props = 'COUNT(' + this.Root.Props + ") "
        return new QResult<T,P>(this.Root);   
    }
}
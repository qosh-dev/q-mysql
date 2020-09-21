import { IRoot } from "./interface/IRoot";

export class QChange{
    constructor(public Root : IRoot,public query : string){
    }
    async Where(Condition: string) {
        var queryString = this.query + ' WHERE ' + Condition
        try{
            await this.Root.Connection.Exequte(queryString);
        }catch(UnhandledPromiseRejectionWarning){
            throw new Error(queryString)
        }
    }  
} 
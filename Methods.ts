export function Parse<T>(tempArr : Array<T>){
    var props = Object.keys(tempArr[0]) as (keyof T)[]
    return tempArr.Select(props) as unknown as T[] ;
}
export type obj<T> =  {[P in keyof T]?: T[P] | string}
 
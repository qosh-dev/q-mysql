import { QMySql } from "../QMysql";

export interface IRoot {
    Connection: QMySql;
    Table : string ;
    MainQ? : string ;
    Props? : string;
    Condition? :string;
    ConditionSort? :string
}
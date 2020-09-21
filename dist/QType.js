"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QType = void 0;
const QChange_1 = require("./QChange");
const QResult_1 = require("./QResult");
const QTools_1 = require("./QTools");
class QType extends QResult_1.QResult {
    constructor(Root) {
        super(Root);
        this.Root = Root;
        this.Root.Table = "FROM " + this.Root.Table + ' ';
        this.Root.MainQ = `SELECT * ${this.Root.Table} `;
        this.Root.Condition = '';
        this.Root.Props = '* ';
        this.Root.ConditionSort = '';
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var prop = (yield this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field'];
            var table = this.Root.Table.substring(5, this.Root.Table.length - 1);
            return id !== undefined ?
                yield this.Root.Connection.Exequte('DELETE FROM ' + table + " WHERE " + prop + " = " + id) :
                new QChange_1.QChange(this.Root, 'DELETE FROM ' + table);
        });
    }
    Select(...props) {
        var toQuery = "";
        props.forEach(el => {
            toQuery += el + ',';
        });
        this.Root.Props = toQuery.substring(0, toQuery.length - 1);
        return new QTools_1.QTools(this.Root);
    }
    Add(objArr) {
        return __awaiter(this, void 0, void 0, function* () {
            var p = '';
            var v = '';
            var table = this.Root.Table.substring(5, this.Root.Table.length - 1);
            if (objArr.length > 1) {
                objArr.forEach((tempObj) => __awaiter(this, void 0, void 0, function* () {
                    var tKey = Object.keys(tempObj);
                    var tValue = Object.values(tempObj);
                    for (let i = 0; i < tKey.length; i++) {
                        p += tKey[i].toString() + ' ,';
                        v += "'" + tValue[i] + "'" + ' ,';
                    }
                    var p1 = p.substring(0, p.length - 2);
                    var v1 = v.substring(0, v.length - 2);
                    var tempQuery = 'INSERT INTO ' + table + '(' + p1 + ')' + ' VALUES ' + '(' + v1 + ')';
                    p = '';
                    v = '';
                    yield this.Root.Connection.Exequte(tempQuery);
                }));
            }
            else {
                var tKey = Object.keys(objArr);
                var tValue = Object.values(objArr);
                for (let i = 0; i < tKey.length; i++) {
                    p += tKey[i].toString() + ' ,';
                    v += "'" + tValue[i] + "'" + ' ,';
                }
                var p1 = p.substring(0, p.length - 2);
                var v1 = v.substring(0, v.length - 2);
                var tempQuery = 'INSERT INTO ' + table + '(' + p1 + ')' + ' VALUES ' + '(' + v1 + ')';
                p = '';
                v = '';
                yield this.Root.Connection.Exequte(tempQuery);
            }
        });
    }
    Update(obj, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var queryString = '';
            var prop = (yield this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field'];
            var keys = new Array();
            keys = Object.keys(obj);
            var values = new Array();
            values = Object.values(obj);
            var table = this.Root.Table.substring(5, this.Root.Table.length - 1);
            queryString = 'UPDATE ' + "" + table + "" + ' SET ';
            for (let i = 0; i < keys.length; i++) {
                queryString += "" + keys[i] + " = '" + values[i] + "', ";
            }
            queryString = queryString.substring(0, queryString.length - 2);
            if (typeof id !== 'undefined' && typeof id === 'number') {
                yield this.Root.Connection.Exequte(queryString + " WHERE " + prop + " = " + id);
            }
            else {
                return new QChange_1.QChange(this.Root, queryString);
            }
        });
    }
}
exports.QType = QType;

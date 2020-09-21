"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.QMySql = void 0;
const QType_1 = require("./QType");
const mysql = __importStar(require("mysql"));
class QMySql {
    constructor(hostname, username, password, db) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
        this.db = db;
        this.connected = false;
    }
    connectAsync() {
        return new Promise((resolve, reject) => {
            this.conn = mysql.createConnection({
                database: this.db,
                host: this.hostname,
                password: this.password,
                user: this.username,
            });
            this.conn.connect((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = true;
                return resolve();
            });
        });
    }
    queryAsync(query) {
        return new Promise((resolve, reject) => {
            this.conn.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
    Exequte(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectAsync();
            let result;
            try {
                result = yield this.queryAsync(queryString);
            }
            catch (exception) {
                throw exception;
            }
            finally {
                yield this.closeAsync();
            }
            return result;
        });
    }
    closeAsync() {
        return new Promise((resolve, reject) => {
            this.conn.end((error) => {
                if (error) {
                    return reject(error);
                }
                this.connected = false;
                return resolve();
            });
        });
    }
    Tables() {
        return __awaiter(this, void 0, void 0, function* () {
            var list = new Array();
            var tables = yield this.Exequte('SHOW TABLES');
            tables.forEach((el) => {
                list.push(el['Tables_in_social']);
            });
            return list;
        });
    }
    SetTable(tableName) {
        return new QType_1.QType({ Connection: this, Table: tableName });
    }
    BuildQuery(Root) {
        var queryString = '';
        if (Root.Props !== '* ') {
            queryString = "SELECT " + Root.Props + ' ' + Root.Table;
            if (Root.Condition !== '') {
                queryString += 'WHERE ' + Root.Condition;
            }
        }
        else if (Root.Props === '* ' && Root.Condition !== '') {
            queryString = Root.MainQ + 'WHERE ' + Root.Condition;
        }
        else {
            queryString = Root.MainQ;
        }
        var query = queryString + " " + Root.ConditionSort;
        return query;
    }
}
exports.QMySql = QMySql;
Array.prototype.First = function (arg) {
    var tempArr = new Array();
    if (arg != undefined) {
        for (let i = 0; i < this.length; i++) {
            if (arg(this[i])) {
                tempArr.push(this[i]);
            }
        }
    }
    return tempArr[0];
};
Array.prototype.Select = function (...prop) {
    var d = '[';
    for (let i = 0; i < this.length; i++) {
        d += '{';
        prop.forEach(el => {
            if (typeof this[i][el] === 'number' || typeof this[i][el] === 'boolean') {
                d += '"' + el + '":' + this[i][el] + ',';
            }
            else {
                d += '"' + el + '":"' + this[i][el] + '",';
            }
        });
        d = d.substring(0, d.length - 1);
        d += '},';
    }
    d = d.substring(0, d.length - 1);
    d += ']';
    return JSON.parse(d);
};
Array.prototype.Select = function (prop) {
    var d = '[';
    for (let i = 0; i < this.length; i++) {
        d += '{';
        prop.forEach(el => {
            if (typeof this[i][el] === 'number' || typeof this[i][el] === 'boolean') {
                d += '"' + el + '":' + this[i][el] + ',';
            }
            else {
                d += '"' + el + '":"' + this[i][el] + '",';
            }
        });
        d = d.substring(0, d.length - 1);
        d += '},';
    }
    d = d.substring(0, d.length - 1);
    d += ']';
    return JSON.parse(d);
};
Array.prototype.Paginate = function (count, page) {
    var list = new Array();
    page = (page - 1) * count;
    count = page + count;
    if (this.length > count) {
        for (let i = page; i < count; i++) {
            list.push(this[i]);
        }
    }
    else {
        for (let i = page; i < this.length; i++) {
            list.push(this[i]);
        }
    }
    return list;
};
Array.prototype.Where = function (arg) {
    var tempArr = new Array();
    for (let i = 0; i < this.length; i++) {
        if (arg(this[i])) {
            tempArr.push(this[i]);
        }
    }
    return tempArr;
};

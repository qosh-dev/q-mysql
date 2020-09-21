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
exports.QLast = void 0;
const Methods_1 = require("./Methods");
class QLast {
    constructor(Root) {
        this.Root = Root;
    }
    toList() {
        return __awaiter(this, void 0, void 0, function* () {
            var queryString = this.Root.Connection.BuildQuery(this.Root);
            this.Root.Props = '* ';
            this.Root.Condition = '';
            this.Root.ConditionSort = '';
            try {
                var temp = yield this.Root.Connection.Exequte(queryString);
                var ret = Methods_1.Parse(temp);
                return ret;
            }
            catch (UnhandledPromiseRejectionWarning) {
                throw new Error(queryString);
            }
        });
    }
    First() {
        return __awaiter(this, void 0, void 0, function* () {
            var queryString = this.Root.Connection.BuildQuery(this.Root);
            try {
                var temp = yield this.Root.Connection.Exequte(queryString);
                var ret = Methods_1.Parse(temp);
                if (Object.keys(ret[0]).length === 1) {
                    var prop = Object.keys(ret[0])[0];
                    return ret[0][prop];
                }
                return ret[0];
            }
            catch (UnhandledPromiseRejectionWarning) {
                throw new Error(queryString);
            }
        });
    }
    Paginate(count = 7, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            var queryString = this.Root.Connection.BuildQuery(this.Root);
            try {
                var temp = yield this.Root.Connection.Exequte(queryString);
                var result = Methods_1.Parse(temp);
                var list = new Array();
                page = (page - 1) * count;
                count = page + count;
                if (result.length > count) {
                    for (let i = page; i < count; i++) {
                        list.push(result[i]);
                    }
                }
                else {
                    for (let i = page; i < result.length; i++) {
                        list.push(result[i]);
                    }
                }
                return list;
            }
            catch (UnhandledPromiseRejectionWarning) {
                throw new Error(queryString);
            }
        });
    }
}
exports.QLast = QLast;

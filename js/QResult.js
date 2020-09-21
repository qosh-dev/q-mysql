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
exports.QResult = void 0;
const QFinish_1 = require("./QFinish");
class QResult extends QFinish_1.QFinish {
    constructor(Root) {
        super(Root);
        this.Root = Root;
    }
    Where(Condition) {
        this.Root.Condition = Condition;
        return new QFinish_1.QFinish(this.Root);
    }
    Find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var prop = (yield this.Root.Connection.Exequte('DESCRIBE posts;'))[0]['Field'];
            this.Root.Condition = "" + prop + " = " + id;
            var temp = new QFinish_1.QFinish(this.Root);
            this.Root.Condition = '';
            return temp.First();
        });
    }
    Equal(key, value) {
        if (typeof value === 'string') {
            this.Root.Condition = "" + key + " = '" + value + "'";
        }
        else {
            this.Root.Condition = "" + key + " = " + value;
        }
        return new QFinish_1.QFinish(this.Root);
    }
    NotEqual(key, value) {
        if (typeof value === 'string') {
            this.Root.Condition = "" + key + " != '" + value + "'";
        }
        else {
            this.Root.Condition = "" + key + " != " + value;
        }
        return new QFinish_1.QFinish(this.Root);
    }
}
exports.QResult = QResult;

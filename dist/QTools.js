"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QTools = void 0;
const QResult_1 = require("./QResult");
class QTools extends QResult_1.QResult {
    Distinct() {
        this.Root.Props = 'DISTINCT ' + this.Root.Props + " ";
        return new QResult_1.QResult(this.Root);
    }
    SUM() {
        this.Root.Props = 'SUM(' + this.Root.Props + ") ";
        return new QResult_1.QResult(this.Root);
    }
    MIN() {
        this.Root.Props = 'MIN(' + this.Root.Props + ") ";
        return new QResult_1.QResult(this.Root);
    }
    AVG() {
        this.Root.Props = 'AVG(' + this.Root.Props + ") ";
        return new QResult_1.QResult(this.Root);
    }
    MAX() {
        this.Root.Props = 'MAX(' + this.Root.Props + ") ";
        return new QResult_1.QResult(this.Root);
    }
    Count() {
        this.Root.Props = 'COUNT(' + this.Root.Props + ") ";
        return new QResult_1.QResult(this.Root);
    }
}
exports.QTools = QTools;

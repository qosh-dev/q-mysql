"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QFinish = void 0;
const QLast_1 = require("./QLast");
class QFinish extends QLast_1.QLast {
    constructor(Root) {
        super(Root);
        this.Root = Root;
    }
    OrderBy(prop) {
        this.Root.ConditionSort += "ORDER BY " + prop + " ASC ";
        return new QLast_1.QLast(this.Root);
    }
    OrderByDESC(prop) {
        this.Root.ConditionSort += "ORDER BY " + prop + " DESC ";
        return new QLast_1.QLast(this.Root);
    }
}
exports.QFinish = QFinish;

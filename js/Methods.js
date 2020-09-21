"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
function Parse(tempArr) {
    var props = Object.keys(tempArr[0]);
    return tempArr.Select(props);
}
exports.Parse = Parse;

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
const QMysql_1 = require("./QMysql");
var connection = new QMysql_1.QMySql("localhost", 'app', 'pass', 'social');
var posts = connection.SetTable("posts");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        // await posts.Add(newPost[1])
        // var test = await posts.Where('content = "added"').OrderByDESC('id').Paginate()
        // var id = await connection.Id()
        // console.log(id)
        // console.log(await posts.First()); 
        // console.log(await posts.Find(45));
        // var list = await posts.Select('likes').Count().Where('content = "added"').First()
        // console.log(list);
        var temp = posts.Delete();
        var result = yield temp.toList();
        console.log(result);
        // console.log(await posts.Equal('id',45).toList());
        console.log('\n');
        // var list  = await test.toList()
        // var el = test.Select('removed','content','id')
        // console.log(await posts.Where('content = "Second"').toList());
        // var props = Object.keys(test[0]) as (keyof post)[]
        // console.log(test);
        // console.log(await test.Paginate(5,4));
    });
}
test();
//#region archive
// var test1 = await (await posts).toList()
// var test2 = test1.Single(e => e.likes === 0 && e.id === 3)
// var test3 = await posts.Props('content','created','id')
// console.log(await posts.tempQ);
// var d = posts.run()
// var list = await posts.toList()
// var d = await (await posts.Select("content")).toList()
// console.log(list.Where(e => e.likes === 0));
// console.log(list.First(e => e.content))
// var el = list.Single('removed')
// console.log(test3);
// console.log("\n\n\n");
// console.log(list);
// console.log("\n\n\n");
// console.log(await posts.toList());
// var temp = await posts.Select('content','id','likes').Where(e => e.content === "second" && e.id !== 214213).toList()
// console.log(  temp.First(e => e.id === 53)?.content )
// console.log(posts);
// var single = posts.Single(
//     {id : 2 }
// )
// console.log(posts.tempQ);
// console.log( await single)
// console.log( await connection.Exequte(posts.tempQ));
// console.log(list);
// console.log(d);
// var newPost : post[] = [
// {
//     content : "added",
//     removed : 0,
//     likes : 4,
// },
// {
//     content : "Second",
//     removed : 0,
//     likes : 4,
// }]
// await posts.AddRange(newPost)
// var post = await (await posts.Where(
//     {content : '!added'}
// ))
// console.log(posts.tempQ);
// console.log(await post.toList());
//#endregion

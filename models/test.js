// const db = require("../config/db")
// var mongoose = require('mongoose')

// var personSchema = db.Schema({
//     _id: db.Schema.Types.ObjectId,
//     name: String,
//     age: Number,
//     stories: [{ type: db.Schema.Types.ObjectId, ref: 'Story' }]
// });

// var storySchema = db.Schema({
//     author: { type: db.Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: [{ type: db.Schema.Types.ObjectId, ref: 'Person' }]
// });

// var Story = db.model('Story', storySchema);
// var Person = db.model('Person', personSchema);
// //-------add
// var author = new Person({
//     _id: new db.Types.ObjectId(),
//     name: 'zhu',
//     age: 20
// });
//author.save()
// author.save(function (err) {
//     if (err) return handleError(err);

//     var story1 = new Story({
//         title: 'Casino Royale',
//         author: author._id    // assign the _id from the person
//     });

//     story1.save(function (err) {
//         if (err) return handleError(err);
//         // thats it!
//     });
// });
// ----find
// Story.
//     findOne({ title: 'Casino Royale' }).
//     populate('author').
//     exec(function (err, story) {
//         if (err) return handleError(err);
//         console.log(story);
//         // prints "The author is Ian Fleming"
//     });
// ---find 填充部分字段
// Story.
//     findOne({ title: /casino royale/i }).
//     populate('author', ['name', 'age']). // only return the Persons name
//     exec(function (err, story) {
//         if (err) return handleError(err);

//         console.log(story);
//     });
// Query 条件与其他选项
// Story.
//     findOne({ title: /casino royale/i }).
//     populate({
//         path: 'fans',
//         match: { age: { $gte: 20 } },
//         // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
//         select: 'name age -_id',
//         options: { limit: 5 }
//     }).
//     exec((err, story) => {
//         if (err) {
//             if (err) return handleError(err);

//         } else {
//             console.log(story);

//         }
//     });    
const mj = require("./MajorBasicInfo")
mj.find()
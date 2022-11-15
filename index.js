"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cls = require("./model/collection");

mongoose.connect("mongodb+srv://Keyurshingala:keyur123@cluster0.t9zdryg.mongodb.net/PosterMaker?retryWrites=true&w=majority")
    .then(() => {
        console.log(`connection Done`);
    })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));



// const js = cls.posterJson.update({}, { $set: { requestCount: 1 } }, {})
// const js =   cls.posterJson.findOne({}, { _id: 0 })
// console.log(js);

// cls.posterJson.aggregate([
//     {
//         $addFields: {
//             requestCount: 1
//         }
//     }
// ])

const app = new express();

app.get('/posters', async (req, res) => {
    const result = await cls.poster.find()
    res.send(result);
});

app.get('/home', async (req, res) => {
    const result = await cls.home.findOne({}, { _id: 0 })

    // const findTrend = await cls.poster.find({}, { _id: 0, tag: 0, requestCount: 0 }).sort({ requestCount: -1 }).limit(10)
    const findTrend = await cls.poster.find({}, { _id: 0, imgurl: 1, data: 1 }).sort({ requestCount: -1 }).limit(10)

    // result.my_poster_list[0].cat_list = findTrend
    for (let list of result.my_poster_list) if (list.cat_name == "Trending") list.cat_list = findTrend
    
    res.send(result);
});

// res.status(result == null ? 404 : 200).send(result == null ? { message: 'Data not found' } : result)
app.post('/posterJson', async (req, res) => {
    const q = req.query.poster
    const result = await cls.posterJson.findOne({ tag: q }, { _id: 0 })

    if (result == null) {
        res.status(404).send({ message: 'Data not found' })

    } else {
        const poster = await cls.poster.findOne({ data: `poster/${q}` })
        const rc = poster.requestCount + 1

        const rcUpdate = await cls.poster.updateOne({ data: `poster/${q}` }, { $set: { requestCount: rc } })
        console.log(rc);

        res.status(200).send(result)
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Connected ${port}`);
})
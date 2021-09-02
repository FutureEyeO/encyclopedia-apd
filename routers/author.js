const router = require("express").Router()

const Author = require("../models/Author")

router.post("/", async (req, res) => {
    try {
        const newAuthor = new Author(req.body)
        const author = await newAuthor.save()
        res.status(200).json(author)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get("/:_id", async (req, res) => {
    try {
        const author = await Author.findOne({ userId: req.params._id })
        res.status(200).json(author)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/0/all", async (req, res) => {
    try {
        const limit = Number(req.query.limit)
        const authors = await Author.find({ isAuthor: true }, { userId: 1 }).limit(limit)
        res.status(200).json(authors)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router
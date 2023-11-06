const router = require('express').Router();
const User = require('../model/user');

router.get("/", async (req, res) => {
    //get all user
    const user = await User
    .find({})
    .populate("thoughts")
    .populate("friends")
    .exec()

    return user ? res.status(200).send(user) : res.status(400).send(err)
})

router.get("/:id", async (req, res) => {
    const user = await User
    .findById(req.params.id)
    .populate("thoughts")
    .populate("friends")
    .exec()

    return user ? res.status(200).send(user) : res.status(400).send(err)
})

router.put("/:id", async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.status(200).send('updated'))
    .catch(err => res.status(400).send(err))
})

router.post("/", async (req, res) => {
    User.create(req.body)
    .then(() => res.status(200).send('saved'))
    .catch(err => res.status(400).send(err))
})

router.put("/:userId/friends/:friendId", async (req, res) => {
    // add friend to :userId's friends list
    User.findByIdAndUpdate(req.params.userId, {
        $push: { friends: req.params.friendId }}, { new: true })
    .then(() => res.status(200).send('friend added'))
    .catch(err => res.status(400).send(err))

})


router.delete("/:id", async (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send('deleted'))
    .catch(err => res.status(400).send(err))
})


router.delete("/:userId/friends/:friendId", async (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        $pull: { friends: req.params.friendId }}, { new: true })
    .then(() => res.status(200).send('friend deleted'))
    .catch(err => res.status(400).send(err))
})


module.exports = router
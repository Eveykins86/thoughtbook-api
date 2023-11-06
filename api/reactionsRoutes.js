const router = require('express').Router();
const Reaction = require('../model/Reaction');

// Route to get all reactions
router.get("/reactions", async (req, res) => {
    const reactions = await Reaction.find({}).exec();
    return res.status(200).send(reactions);
});

// Route to create a new reaction
router.post("/reactions", async (req, res) => {
    const newReaction = new Reaction(req.body);
    newReaction.save()
        .then(() => res.status(200).send('Reaction saved'))
        .catch(err => res.status(400).send(err));
});

// Route to update a reaction by its _id
router.put("/reactions/:id", async (req, res) => {
    Reaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.status(200).send('Reaction updated'))
        .catch(err => res.status(400).send(err));
});

// Route to delete a reaction by its _id
router.delete("/reactions/:id", async (req, res) => {
    Reaction.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('Reaction deleted'))
        .catch(err => res.status(400).send(err));
});

module.exports = router;
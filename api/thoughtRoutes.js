const router = require('express').Router();
const Thought = require('../model/Thought');

// GET all thoughts
router.get("/", async (req, res) => {
    const thought = await Thought
    .find({})
    .populate("reactions")
    .exec()

    return thought ? res.status(200).send(thought) : res.status(400)
})

// GET a single thought by its _id
router.get('/:Id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST to create a new thought
router.post("/", async (req, res) => {
    let data = new Thought(req.body)
    data.save()
    .then(() => res.status(200).send('saved'))
    .catch(err => res.status(400).send(err))
});

// PUT to update a thought by its _id
router.put("/:id", async (req, res) => {
    let data = req.body
    Thought.findByIdAndUpdate(req.params.id, data, { new: true })
    .then(() => res.status(200).send('updated'))
    .catch(err => res.status(400).send(err))
});

// DELETE to remove a thought by its _id
router.delete("/:id", async (req, res) => {
    Thought.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send('deleted'))
    .catch(err => res.status(400).send(err))
});

router.post('/:thoughtId/reactions', async (req, res) => {
    // create reaction to be stored in a thought
    Thought.findByIdAndUpdate(req.params.thoughtId, { 
        $push: { reactions: req.body }}, { new: true })
    .then(() => res.status(200).send('reaction added'))
    .catch(err => res.status(400).send(err))
});

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId, {
        $pull: { reactions: {_id : req.params.reactionId }}}, { new: true })
    .then(() => res.status(200).send('reaction deleted'))
    .catch(err => res.status(400).send(err))
});

module.exports = router;
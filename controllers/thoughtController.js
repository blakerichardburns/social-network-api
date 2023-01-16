const { User, Thought } = require('../models');

module.exports = {
  postThought(request, response) {
    Thought.create(request.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: request.body.userId },
          { $addToSet: { thoughts: thought_id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? response.status(404).json({
              message:
                'Thought created, but there are no users with that ID...',
            })
          : response.json('Thought created.')
      )
      .catch((error) => response.json(500).json(error));
  },

  getAllThoughts(request, response) {
    Thought.find()
      .then((thoughts) => response.json(thoughts))
      .catch((error) => response.status(500).json(error));
  },

  getOneThought(request, response) {
    Thought.findOne({ _id: request.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? response
              .status(404)
              .json({ message: 'There are no thoughts with that ID...' })
          : response.json(thought)
      )
      .catch((error) => response.status(500).json(error));
  },

  putThought(request, response) {
    Thought.findOneAndUpdate(
      { _id: request.params.thoughtId },
      { $set: request.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? response
              .status(404)
              .json({ message: 'There are no thoughts with that ID...' })
          : response.json(thought)
      )
      .catch((error) => response.status(500).json(error));
  },

  deleteThought(request, response) {
    Thought.findOneAndRemove({ _id: request.params.thoughtId })
      .then((thought) =>
        !thought
          ? response
              .status(404)
              .json({ message: 'There are no thoughts with that ID...' })
          : User.findOneAndUpdate(
              { thoughts: request.params.thoughtId },
              { $pull: { thoughts: request.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? response
              .status(404)
              .json({
                message:
                  'Thought deleted, but there are no users with that ID...',
              })
          : response.json({ message: 'Thought deleted.' })
      )
      .catch((error) => response.status(500).json(error));
  },

  postReaction(request, response) {
    Thought.findOneAndUpdate(
      { _id: request.params.thoughtId },
      { $addToSet: { reactions: request.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? response
              .status(404)
              .json({ message: 'There are no thoughts with that ID...' })
          : response.json(thought)
      )
      .catch((error) => response.status(500).json(error));
  },

  deleteReaction(request, response) {
    Thought.findOneAndUpdate(
      { _id: request.params.thoughtId },
      { $pull: { reactions: { reactionId: request.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? response
              .status(404)
              .json({ message: 'There are no thoughts with that ID...' })
          : response.json(thought)
      )
      .catch((error) => response.status(500).json(error));
  },
};

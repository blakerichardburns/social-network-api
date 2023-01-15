const { User, Thought } = require('../models');

module.exports = {

    postUser(request, response) {
        User.create(request.body)
            .then((user) => response.json(user))
            .catch((error) => response.status(500).json(error));
    },

    getAllUsers(request, response) {
        User.find()
            .then((users) => response.json(users))
            .catch((error) => response.status(500).json(error));
    },
    
    getOneUser(request, response) {
        User.findOne({ _id: request.params.userId })
        .select('-__v')
        .lean()
        .then((user) =>
        !user
         ? response.status(404).json({ message: 'There are no users with that ID...'})
         : response.json(user)
        )
        .catch((error) => response.status(500).json(error));
    },
    
    putUser(request, response) {
        User.findOneAndUpdate(
            { _id: request.body.userId },
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? response.status(404).json({ message: 'There are no users with that ID...'})
                : response.json(user)
            )
            .catch((error) => response.status(500).json(error));
    },
    
    deleteUser(request, response) {
        User.findOneAndDelete({ _id: request.params.userId })
            .then((user) => 
            !user
                ? response.status(404).json({ message: 'There are no users with that ID...'})
                : User.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => response.json({ message: 'User and Thoughts have been deleted.' }))
            .catch((error) => response.status(500).json(error));
    },
    
    // postFriend
    
    // deleteFriend
};
const { User, Thought } = require('../models');

module.exports = {

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
    
    // postUser
    
    // putUser
    
    // deleteUser
    
    // postFriend
    
    // deleteFriend
};
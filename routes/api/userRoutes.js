const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require('../../controllers/userController');

router
    .route('/')
    .get(getAllUsers)
    .post(postUser);

router
    .route('/:userId')
    .get(getOneUser)
    .put(putUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(postFriend)
    .delete(deleteFriend);

module.exports = router;

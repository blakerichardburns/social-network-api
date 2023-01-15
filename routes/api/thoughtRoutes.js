const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  postThought,
  putThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(postThought);

router.route('/:thoughtId').get(getOneThought).put(putThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(postReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

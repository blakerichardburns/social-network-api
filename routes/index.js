const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((request, response) => {
  return response.send('Which route was that, again?');
});

module.exports = router;

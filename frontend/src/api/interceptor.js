let AuthIntercept = require('superagent-intercept')((err, res) => {
  console.log(res.status);
});

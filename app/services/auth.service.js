
const authService = {
  checkAuthToken: checkAuthToken
};

function checkAuthToken(req, res, next) {
  let token = getAuthToken(req.headers);

  if (token) {
    next();
  } else {
    return res.status(403).send({ msg: 'Not authorized!' });
  }
}


function getAuthToken(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}


module.exports = authService;

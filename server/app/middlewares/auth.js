const authenticated = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    return next();
  }
  // Si l'utilisateur n' est pas authentifié, alors error 401
  if (request.session.user) {
    next();
  } else {
    return response.status(401).send({ error: 'non autorisé' });
  }
};

const authenticatedCurrentUser = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    return next();
  }

  // Si l'utilisateur n' est pas authentifié, alors error 401
  if (
    request.session.user &&
    request.session.user.id === parseInt(request.params.id)
  ) {
    return next();
  }
  return response.status(401).send({ error: 'non autorisé' });
};

module.exports = {
  authenticatedCurrentUser,
  authenticated,
};

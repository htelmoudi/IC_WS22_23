const { updateUser, getUsers } = require("../services/userService");

exports.get_users = async (req, res, next) => {
  getUsers()
    .then((result) => {
      const { message, data } = result;
      res.status(200).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message } = err;
      res.status(statusCode).send({ message }) && next(err);
    });
};

exports.update_user = async (req, res, next) => {
  const { userId } = req.params;
  const { fullName, email, password } = req.body;

  updateUser({ userId, fullName, email, password })
    .then((result) => {
      const { statusCode = 200, message, data } = result;
      res.status(statusCode).send({ message, data });
    })
    .catch((err) => {
      const { statusCode = 400, message, data } = err;
      res.status(statusCode).send({ message, data }) && next(err);
    });
};

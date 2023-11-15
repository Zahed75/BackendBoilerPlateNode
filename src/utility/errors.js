'use strict';

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
  }

  getCode() {
    return 400;
  }
}

class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
  }

  getCode() {
    return 404;
  }
}

class Unauthorized extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }

  getCode() {
    return 401;
  }
}

class Forbidden extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
  }

  getCode() {
    return 403;
  }
}

class NoContent extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'No Content';
  }

  getCode() {
    return 204;
  }
}

class MongoError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'MongoError';
  }

  getCode() {
    return 400;
  }
}

const handleError = async (err, req, res, next) => {
  console.log({ err });
  if (res.headerSent) {
    return next(err);
  }

  let code = 500;
  if (err instanceof GeneralError) {
    code = err.getCode();
  }

  const correlationId = req.headers['x-correlation-id'];

  return res.status(code).json({
    correlationId,
    message: err.message,
  });
};

module.exports = {
  BadRequest,
  NotFound,
  MongoError,
  handleError,
  Unauthorized,
  Forbidden,
  NoContent,
};

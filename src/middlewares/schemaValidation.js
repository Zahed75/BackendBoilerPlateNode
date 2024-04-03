const handleValidation = (validate) => (req, res, next) => {
  const result = validate(req.body, req.user);
  const isValid = result.error == null;
  if (isValid) {
    req.body = result.value;
    return next();
  }

  const { details } = result.error;
  console.log(result.error);
  const messages = details.map((e) => e.message);
  const msg = messages.join(',');
  // throw new BadRequest(msg);
  return res.status(400).send({ status: 'error', message: msg });
};

module.exports = handleValidation;
export const notFoundMiddleware = (req, res) =>
  res.status(404).send({
    errorMessage:
      `Route for ${req.method} ` +
      `'${req.get('host')}${req.path}' does not exists.`,
  });

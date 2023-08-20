export const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof Error) {
    return res.status(500).json({ error });
  }

  return res.status(500).json({ error });
};

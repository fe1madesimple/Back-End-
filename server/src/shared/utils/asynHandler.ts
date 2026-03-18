import { Request, Response, NextFunction } from 'express';

/**
 * Async Handler Wrapper 
 *
 * Wraps async route handlers to automatically catch errors and pass them to error middleware
 * Eliminates the need for try-catch blocks in every controller
 *
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.findMany();
 *   res.json(users);
 * }));
 */

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;

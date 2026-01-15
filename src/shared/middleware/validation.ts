import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { BadRequestError } from '@/utils/errors';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format errors in a user-friendly way
        const errors = error.issues.map((err) => {
          const field = err.path.slice(1).join('.'); // Remove 'body'/'query'/'params' prefix

          return {
            field: field || 'unknown',
            message: err.message,
          };
        });

        // Create a readable error message
        const firstError = errors[0];
        const message =
          errors.length === 1
            ? `${firstError!.field}: ${firstError!.message}`
            : `Validation failed: ${errors.map((e) => `${e.field} (${e.message})`).join(', ')}`;

        const validationError = new BadRequestError(message);
        (validationError as any).errors = errors;

        return next(validationError);
      }

      next(error);
    }
  };
};

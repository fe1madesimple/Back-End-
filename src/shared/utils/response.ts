import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Standard API Response Structure
 */
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Send success response
 */
export const sendSuccess = <T = any>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = StatusCodes.OK,
  meta?: ApiResponse['meta']
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta && { meta }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
  errors?: any[]
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    ...(errors && { errors }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Send created response (201)
 */
export const sendCreated = <T = any>(res: Response, message: string, data?: T): Response => {
  return sendSuccess(res, message, data, StatusCodes.CREATED);
};

/**
 * Send no content response (204)
 */
export const sendNoContent = (res: Response): Response => {
  return res.status(StatusCodes.NO_CONTENT).send();
};

/**
 * Send paginated response
 */
export const sendPaginated = <T = any>(
  res: Response,
  message: string,
  data: T[],
  page: number,
  limit: number,
  total: number
): Response => {
  const totalPages = Math.ceil(total / limit);

  return sendSuccess(res, message, data, StatusCodes.OK, {
    page,
    limit,
    total,
    totalPages,
  });
};

export default {
  sendSuccess,
  sendError,
  sendCreated,
  sendNoContent,
  sendPaginated,
};

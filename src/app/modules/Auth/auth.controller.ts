import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.signup(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  const { accessToken } = result;
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'login successfully!',
    token: accessToken
  })
});

export const authController = { signup, login };

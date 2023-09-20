import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';


const geAllUser = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${data.length} users retrieved successfully!`,
    data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrieved successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user update successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user delete successfully!',
    data: result
  });
});

const profileInfo = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user!
  const result = await userService.profileInfo(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user profile!',
    data: result,
  });
});

export const userController = {
  geAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  profileInfo
};

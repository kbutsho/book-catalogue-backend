import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId, orderedBooks } = req.body;
  const result = await OrderService.createOrder(orderedBooks, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order created successfully!',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const { role, userId } = req.user!;
  const result = await OrderService.getAllOrder(role, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.length} orders fetch successfully!`,
    data: result
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { role, userId } = req.user!
  const { orderId } = req.params;
  const result = await OrderService.getSingleOrder(orderId, userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order fetched Successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};

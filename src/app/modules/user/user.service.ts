import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IUser } from './user.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllUser = async (): Promise<IUser[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
      reviews: true,
      orders: true,
    },
  });
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
      reviews: true,
      orders: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!')
  }
  return result;
};

const updateUser = async (id: string, data: User): Promise<User> => {
  const result = await prisma.user.update({ where: { id: id }, data });
  return result;
};

const deleteUser = async (id: string): Promise<User> => {
  const orders = await prisma.order.findMany({ where: { userId: id } });
  await Promise.all(orders.map(async order => {
    await prisma.orderedBooks.deleteMany({ where: { orderId: order.id } });
  }));
  await Promise.all(orders.map(async order => {
    await prisma.order.delete({ where: { id: order.id } });
  }));
  const result = await prisma.user.delete({ where: { id: id } });
  return result;
};

const profile = async (id: string): Promise<IUser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
      reviews: true,
      orders: true,
    },
  });
  return result;
};

export const userService = {
  // createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  profile,
};

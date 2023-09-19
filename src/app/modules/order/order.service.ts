import { Order, OrderedBooks } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { IOrder } from './order.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createOrder = async (data: OrderedBooks[], userId: string): Promise<IOrder> => {
  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: {
        create: data.map(book => ({
          bookId: book.bookId,
          quantity: book.quantity
        }))
      }
    },
    select: {
      id: true,
      userId: true,
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true
        }
      },
      status: true,
      createdAt: true
    }
  });
  return result;
};

const getAllOrder = async (role: string, userId: string): Promise<IOrder[]> => {
  if (role === ENUM_USER_ROLE.admin) {
    const result = await prisma.order.findMany({
      select: {
        id: true,
        userId: true,
        status: true,
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });
    return result;
  }
  if (role === ENUM_USER_ROLE.customer) {
    const result = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        status: true,
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });
    return result;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, "internal server error!")
  }
};

const getSingleOrder = async (orderId: string, userId: string, role: string): Promise<IOrder | null> => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (order) {
    if (role === ENUM_USER_ROLE.admin) {
      const result = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        select: {
          id: true,
          userId: true,
          status: true,
          orderedBooks: {
            select: {
              bookId: true,
              quantity: true
            }
          },
          createdAt: true
        }
      });
      return result;
    }
    if (role === ENUM_USER_ROLE.customer) {
      const result = await prisma.order.findUnique({
        where: {
          id: orderId,
          userId: userId,
        },
        select: {
          id: true,
          userId: true,
          status: true,
          orderedBooks: {
            select: {
              bookId: true,
              quantity: true
            }
          },
          createdAt: true
        }
      });
      if (result === null) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized access!')
      }
      return result;
    } else {
      return null;
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found!')
  }
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};

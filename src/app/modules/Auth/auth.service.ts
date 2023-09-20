import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IUser } from '../user/user.interface';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const signup = async (data: User): Promise<IUser> => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (isExist) {
    throw new Error('email already exist!');
  }
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    },
  });
  return result;
};

const login = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not exist!');
  }
  if (isUserExist.password !== data.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect!');
  }
  const accessToken = jwtHelpers.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );
  return {
    accessToken
  };
};


export const authService = {
  signup,
  login
};

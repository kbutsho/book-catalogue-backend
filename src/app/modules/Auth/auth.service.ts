import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IUser } from '../user/user.interface';

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


export const authService = {
  signup
};

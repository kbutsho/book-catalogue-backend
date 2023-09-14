import { z } from 'zod';
import { Role } from './user.constants';

const create = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required!'
      }),
    email: z
      .string({
        required_error: 'email is required!',
      })
      .email(),
    password: z
      .string({
        required_error: 'password is required!',
      }),
    role: z.enum([...Role] as [string, ...string[]]),
    contactNo: z
      .string({
        required_error: 'contact number is required!',
      }),
    address: z
      .string({
        required_error: 'address is required!',
      }),
    profileImg: z
      .string({
        required_error: 'Profile Image is required!',
      }),
  }),
});

const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required!',
      })
      .email(),
    password: z
      .string({
        required_error: 'password is required!',
      }),
  }),
});

export const userValidation = {
  create,
  login,
};


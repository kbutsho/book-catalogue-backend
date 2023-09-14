// import { AdminRole } from '../Admin/admin.interface';
// import { IRole } from '../Users/User.interface';

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  // refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// export type IVerifiedLoginUser = {
//   userId: string;
//   role: IRole;
// };
// export type IVerifiedLoginAdmin = {
//   userId: string;
//   role: AdminRole;
// };

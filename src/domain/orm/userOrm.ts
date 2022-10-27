import { User, UserModel } from "../entities";

export interface UserUi {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  location: {
    lat: number;
    lng: number;
  };
}
export interface LoginCredencial {
  email: string;
  password: string;
}

export const UserOrm = {
  createUser: async (user: UserUi) => {
    return await UserModel.create(user);
  },

  userExistsByEmail: async (email: string) => {
    const findUser = await UserModel.findOne(
      { email },
      {
        _id: 1,
        email: 1,
      }
    );
    return findUser;
  },

  userFindById: async (id: string) => await UserModel.findById(id),
};

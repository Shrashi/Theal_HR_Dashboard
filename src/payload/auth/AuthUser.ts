
export type TUser = {
    email: string;
    id: string;
  };

export type AuthUser = {
    token: string;
    user: TUser;
  };

  
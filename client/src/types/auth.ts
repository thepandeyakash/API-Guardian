export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthPayload = {
  user: User;
  token: string;
};

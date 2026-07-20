export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
};

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

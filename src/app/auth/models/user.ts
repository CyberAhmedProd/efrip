import { Role } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  username?: string;
  firstName: string;
  lastName: string;
  avatar: string;
  roles: Role[];
  token?: string;
}

import { Role } from './role';
import { Image } from './Image'

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: Image;
  roles: Role[];
  token?: string;
}

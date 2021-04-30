import { Role } from './role';
import { Image } from './Image'

export class User {
  id: string;
  email: string;
  password: string;
  username?: string;
  roles: Role[];
  token?: string;
  status : string;
}

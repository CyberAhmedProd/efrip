import { User } from './user';
import { Image } from './Image'
import { Address } from './address';

export class Profil {
  id: string;
  firstName: string;
  lastName: string;
  userState : String;
  avatar: Image;
  address : Address
  user: User;
}

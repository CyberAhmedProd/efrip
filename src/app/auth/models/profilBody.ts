import { User } from './user';
import { Image } from './Image'
import { Address } from './address';

export class ProfilBody {
  id: string;
  firstName: string;
  lastName: string;
  user: User;
}

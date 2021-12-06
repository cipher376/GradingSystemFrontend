
import { extend } from "jquery";
import { Address, Profile, Photo} from ".";


export interface Token {
  token: '';
}

export class Credentials {
  id?: number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  password?: string;
  realm?: string;
  remember?: boolean;
}


export class User {

  id?: string;
  bidderId?: string;
  email?: string;
  phone?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  roles?: string

  /*********** RELATIONAL PROPERTIES ***********/
  profile?: Profile;
  profilePhoto?: Photo;
  address?: Address;
  localAuthentication?: any;
  externalAuthentication?: any;


  resetPasswordRequest?: any[];;
  application?: string[];

  constructor(data?: Partial<User>) {

  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;


export class Admin{
  id?: string;
  user?: User;
}

export class Lecturer {
  id?: string;
  user?: User;
}

export class Hod {
  id?: string;
  user?: User;
  programmeId?: string;

}


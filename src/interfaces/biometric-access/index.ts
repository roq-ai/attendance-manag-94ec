import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BiometricAccessInterface {
  id?: string;
  punch_in_time?: any;
  punch_out_time?: any;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface BiometricAccessGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}

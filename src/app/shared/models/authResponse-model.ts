import { User } from './user-model';

export interface AuthResponse {
  ok: boolean;
  msg?: string;
  token: string;
  user: User;
}

import { Role } from './RoleResponse';

export interface LoginResponse {
  message: string;
  token: string;
  id: number;
  username: string;
  role: Role;
}

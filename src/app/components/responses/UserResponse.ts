import { Role } from './RoleResponse';

export interface UserResponse {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  isActive: number;
  dateOfBirth: string;
  role: Role;
  active: string;
}

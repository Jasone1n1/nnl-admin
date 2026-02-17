export interface UserType {
  _id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  username: string;
  isActive: boolean;
  isVerified: boolean;
}
export interface IUserLean {
  _id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  username: string;
  isActive: boolean;
  isVerified: boolean;
}


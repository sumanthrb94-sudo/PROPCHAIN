import { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  kycStatus: string;
  walletAddress?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

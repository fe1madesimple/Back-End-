export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
    profileColor: string;
    isEmailVerified: boolean;
  };
}

export interface AuthServiceResponse {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
    profileColor: string;
    isEmailVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
  needsOnBoarding: boolean;
  subscription: any
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  code: string;
  password: string;
}

export interface VerifyEmailInput {
  email: string;
  code: string;
}

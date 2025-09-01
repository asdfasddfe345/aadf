export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
}

export interface JwtPayload {
  sub: string;
  userId: number;
  exp: number;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: string;
}
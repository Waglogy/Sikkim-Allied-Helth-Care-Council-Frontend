import { apiClient } from "../client";
import type {
  CreateAdmin,
  AdminResponse,
  LoginRequest,
  LoginResponse,
} from "../types";

/* ------------------------------- Auth API --------------------------------- */
/*  Maps to AuthController (@RequestMapping("/api/auth")).                     */

/** POST /api/auth/signup — register a new admin user. */
export function signupAdmin(payload: CreateAdmin): Promise<AdminResponse> {
  return apiClient<AdminResponse>("/api/auth/signup", {
    method: "POST",
    body: payload,
  });
}

/** POST /api/auth/login — authenticate and receive a JWT + admin profile. */
export function login(payload: LoginRequest): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}

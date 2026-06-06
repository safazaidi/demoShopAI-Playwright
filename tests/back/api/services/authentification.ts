import { APIRequestContext } from '@playwright/test';
import { LoginRequest } from '../../../models/LoginRequest';


const dbManager = require('../../../utils/dbManager');

export class AuthService {
  constructor(private api: APIRequestContext) {}

  async login(credentials: LoginRequest) {
    const startTime = Date.now();

    const user = dbManager.getUserByEmail(credentials.Email);
    const isValid = Boolean(user && user.password === credentials.Password);

    const response = {
      status: () => (isValid ? 200 : 401),
      ok: isValid,
      json: async () => ({
        message: isValid ? 'Login successful' : 'Invalid credentials',
        user: isValid
          ? {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            }
          : null,
        token: isValid ? 'fake-db-auth-token' : null,
      }),
      text: async () => (isValid ? 'OK' : 'Unauthorized'),
    };

    return {
      response,
      responseTime: Date.now() - startTime,
    };
  }
}
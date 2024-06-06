// Constants
import { instance } from '@/lib/instance';
// Interfaces || Types
import { loginType, registerType } from '@/schemas/auth.schemas';

export async function loginService(userData: loginType) {
  try {
    const response = await instance.post('/auth/local/register', userData);

    return response.data;
  } catch (error) {
    console.error(error);
    // throw new Error(error);
  }
}

export async function registerService(userData: registerType) {
  try {
    const response = await instance.post('/auth/local', userData);

    return response.data;
  } catch (error) {
    console.error(error);
    // throw new Error(error);
  }
}
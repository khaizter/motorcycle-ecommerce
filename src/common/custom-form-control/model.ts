export interface fieldsInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const fields = ['name', 'email', 'password', 'confirmPassword'] as const;

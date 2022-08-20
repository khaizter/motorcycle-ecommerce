export interface fieldsInterface {
  [key: string]: string;
}

export const fields = ['name', 'email', 'password', 'confirmPassword'] as const;

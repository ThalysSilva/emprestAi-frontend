import config from '@/config';
import * as z from 'zod';

const { isRequired } = config.messages.validations;

export const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: isRequired })
      .min(1, isRequired)
      .email({ message: 'Insira um e-mail válido' }),
    fullName: z.string({ required_error: isRequired }).min(1, isRequired),
    alias: z.string({ required_error: isRequired }).min(1, isRequired),
    password: z.string({ required_error: isRequired }).min(1, isRequired),
    passwordConfirm: z.string({ required_error: isRequired }).min(1, isRequired),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })
  .transform((data) => ({
    email: data.email,
    fullName: data.fullName,
    alias: data.alias,
    password: data.password,
  }));

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: isRequired })
    .min(1, isRequired)
    .email({ message: 'Insira um e-mail válido' }),

  password: z.string({ required_error: isRequired }).min(1, isRequired),
});
export type LoginFormSchemaData = z.infer<typeof loginFormSchema>;

import { z } from 'zod';
import { unmaskBrazilianCurrency } from '@/utils/formaters/masks';

type RegisterLoanInput = {
  identification: string;
  loanValue: string;
  installmentsQty: string;
};

type RegisterLoanOutput = {
  identification: string;
  loanValue: number;
  installmentsQty: number;
};

export const baseSchema = z.object({
  identification: z
    .string({ required_error: 'Escolha uma pessoa' })
    .min(8, 'Selecione uma pessoa')
    .max(14),
  loanValue: z
    .string({ required_error: 'Digite um valor' })
    .min(1, 'Digite um valor válido')
    .transform(unmaskBrazilianCurrency)
    .refine((loanValue) => {
      return loanValue > 0;
    }, 'Digite um valor válido'),
  installmentsQty: z
    .string({ required_error: 'digite um valor' })
    .min(1, 'Digite um valor válido')
    .max(2, 'Digite um valor válido')
    .transform(Number)
    .refine((value) => {
      const installmentsQty = Number(value);
      return installmentsQty > 0;
    }, 'Digite um valor acima de 0')
    .refine((value) => {
      const installmentsQty = Number(value);
      return installmentsQty <= 24;
    }, 'Digite um valor menor ou igual a 24'),
});
export const registerLoanSchema: z.ZodType<RegisterLoanOutput, z.ZodTypeDef, RegisterLoanInput> =
  baseSchema;

export type RegisterLoanSchemaData = z.infer<typeof registerLoanSchema>;

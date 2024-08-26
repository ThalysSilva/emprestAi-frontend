import { z } from 'zod';
import { unmaskBrazilianCurrency } from '@/utils/formaters/masks';

export const registerLoanSchema = z.object({
  identification: z
    .string({ required_error: 'Escolha uma pessoa' })
    .min(8, 'Selecione uma pessoa')
    .max(14),
  loanValue: z
    .string({ required_error: 'Digite um valor' })
    .min(1, 'Digite um valor válido')
    .refine((value) => {
      const loanValue = unmaskBrazilianCurrency(value);
      return loanValue > 0;
    }, 'Digite um valor válido'),
  installmentsQty: z
    .string({ required_error: 'digite um valor' })
    .min(1, 'Digite um valor válido')
    .max(2, 'Digite um valor válido')
    .refine((value) => {
      const installmentsQty = Number(value);
      return installmentsQty > 0;
    }, 'Digite um valor acima de 0')
    .refine((value) => {
      const installmentsQty = Number(value);
      return installmentsQty <= 24;
    }, 'Digite um valor menor ou igual a 24'),
});

export type RegisterLoanSchemaData = z.infer<typeof registerLoanSchema>;

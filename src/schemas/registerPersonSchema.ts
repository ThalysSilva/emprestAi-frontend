import { z } from 'zod';
import moment from 'moment';

export const registerPersonSchema = z.object({
  name: z.string().min(3, 'Digite um nome').max(120),
  birthdate: z
    .string()
    .min(10, 'Digite uma data de nascimento')
    .max(10)
    .refine((value) => {
      const currentDate = moment();
      const birthDate = moment(value, 'DD/MM/YYYY');
      return birthDate.isValid() && birthDate.isBefore(currentDate);
    }, 'Digite uma data de nascimento válida')
    .transform((value) => moment(value, 'DD/MM/YYYY').toISOString()),
  identification: z
    .string()
    .min(8, 'Digite uma identificação')
    .max(14, 'Digite uma identificação válida'),
});

export type RegisterPersonSchemaData = z.infer<typeof registerPersonSchema>;

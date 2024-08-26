import { PersonIdentificationType } from '@/@types/entities/person';

export const personIdentificationTypeLabel = {
  legalPerson: 'Pessoa Jurídica',
  naturalPerson: 'Pessoa Física',
  student: 'Estudante',
  retiree: 'Aposentado',
} as Record<PersonIdentificationType, string>;

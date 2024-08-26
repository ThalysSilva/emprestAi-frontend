import { Person } from '@/@types/entities/person';

export type RegisterPersonPayload = {
  identification: string;
  name: string;
  birthdate: string;
};

import { Person } from './person';

export type Loan = {
  id: string;
  personId: string;
  amount: number;
  installmentsQty: number;
  status: 'paid' | 'pending';
  createdAt: string;
  updatedAt: string;
  paymentDate?: string;
  installments?: Installment[];
  person: Person;
};

export type Installment = {
  id: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
  loanId: string;
  createdAt: string;
  updatedAt: string;
  paymentDate?: string;
};

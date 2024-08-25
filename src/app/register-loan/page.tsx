import { BigText2 } from '@/components/Texts';
import { RegisterLoanForm } from './components/RegisterLoanForm';

export default async function RegisterLoan() {
  return (
    <div className="flex flex-col w-fit items-center">
      <div className="mb-8">
        <BigText2>Cadastrar novo empréstimo</BigText2>
      </div>
      <RegisterLoanForm />
    </div>
  );
}

import { BigText2 } from '@/components/Texts';
import { RegisterPersonForm } from './components/RegisterPersonForm';

export default async function RegisterPerson() {
  return (
    <div className="flex flex-col w-fit items-center">
      <div className="mb-8">
        <BigText2>Cadastrar nova pessoa</BigText2>
      </div>
      <RegisterPersonForm />
    </div>
  );
}

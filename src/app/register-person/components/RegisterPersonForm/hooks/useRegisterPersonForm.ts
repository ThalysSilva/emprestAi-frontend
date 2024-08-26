import { useRegisterPersonFormServices } from './useRegisterPersonFormServices';
import { RegisterPersonSchemaData } from '@/schemas/registerPersonSchema';

export function useRegisterPersonForm() {
  const { registerPersonMutation } = useRegisterPersonFormServices();

  function handleSubmit(payload: RegisterPersonSchemaData) {
    registerPersonMutation.mutate({
      payload,
    });
  }

  return { registerPersonMutation, handleSubmit };
}

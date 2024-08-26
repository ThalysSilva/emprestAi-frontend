import { useCreateMutation } from '@/services/hooks/useCreateMutation';
import { RegisterPersonPayload } from '@/services/types/person/payload';
import { RegisterPersonData } from '@/services/types/person/returnData';

export function useRegisterPersonFormServices() {
  const registerPersonMutation = useCreateMutation<RegisterPersonData, RegisterPersonPayload>({
    routeName: 'registerPerson',
    invalidateQueriesKeys: ['persons'],
    successText: 'Pessoa cadastrada com sucesso!',
  });
  return { registerPersonMutation };
}

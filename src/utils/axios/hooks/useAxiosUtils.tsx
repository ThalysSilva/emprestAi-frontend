import { useSnackbarContext } from '@/contexts/Snackbar';
import { CustomAxiosError } from '../types';

export default function useAxiosUtils() {
  const { dispatchSnackbar } = useSnackbarContext();
  function handleAxiosError(error: unknown) {
    const messageError = 'Tente novamente mais tarde';
    const typedError = error as CustomAxiosError;
    const responseData = typedError.response?.data;

    const responseError = (responseData && responseData.message) as string;

    const descriptionError =
      responseError && typeof responseError === 'string' ? responseError : messageError;
    dispatchSnackbar({ type: 'error', message: descriptionError });
    return { descriptionError };
  }
  return { handleAxiosError };
}

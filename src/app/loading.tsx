import { Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-background-primaryLight">
      <Spinner fontSize={20} className="text-brand-primary" />
    </div>
  );
}

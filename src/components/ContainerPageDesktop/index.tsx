import { ReactNode } from 'react';
import { Text1 } from '../Texts';

type Props = {
  children: ReactNode;
  title: string;
};

export function ContainerPage({ children, title }: Props) {
  return (
    <div className="flex flex-col w-full h-full bg-background-primaryLight md:rounded-lg md:w-[550px] md:max-h-[80%] xl:w-[750px] shadow-solid items-center">
      <div className="relative flex mt-10 w-40 justify-center items-center bg-brand-primary shadow-lg p-3 mb-10 md:w-full rounded-lg md:rounded-b-none md:mt-0 gradiente-lateral">
        <Text1 className="text-white z-10"> {title}</Text1>
      </div>
      <div className="flex flex-col h-full w-full items-center ">{children}</div>
    </div>
  );
}

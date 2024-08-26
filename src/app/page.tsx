import { BigText2 } from '@/components/Texts';
import { ContentHome } from './components/ContentHome';

export default async function Home() {
  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      <div className="mb-8">
        <BigText2>Visualizar empréstimos</BigText2>
      </div>
      <ContentHome />
    </div>
  );
}

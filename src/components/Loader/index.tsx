import { colors } from '@/styles/Theme/colors';
import { LoaderCircle, LucideProps } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const Loader: React.FC<LucideProps> = (props) => {
  const { size = 24, className } = props;
  const { brand } = colors;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle
        color={brand.primary}
        size={size}
        className={twMerge('animate-spin', className)}
      />
    </div>
  );
};
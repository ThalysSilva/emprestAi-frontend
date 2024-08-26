import { Loader } from '@/components/Loader';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader fontSize={20} className="animate-spin text-brand-primary" />
    </div>
  );
}

import { useForm, UseFormReturn, UseFormProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, ZodTypeDef } from 'zod';

type UseCustomFormProps<Input, Output extends FieldValues> = {
  useFormProps?: Omit<UseFormProps<Output>, 'resolver'>;
  zodSchema?: ZodType<Output, ZodTypeDef, Input>;
};

export function useCustomForm<Input extends Record<string, any>, Output extends FieldValues>({
  useFormProps,
  zodSchema,
}: UseCustomFormProps<Input, Output>): { methods: UseFormReturn<Output> } {
  const methods = useForm<Output>({
    ...useFormProps,
    resolver: zodSchema ? zodResolver(zodSchema) : undefined,
  });

  return { methods };
}
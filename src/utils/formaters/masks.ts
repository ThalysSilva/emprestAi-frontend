export const moneyMask = (value: string, currencySybol?: string) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100);

  if (currencySybol) return `${currencySybol} ${result}`;

  return result;
};

export const onlyNumber = (maskNumber: string) => {
  return maskNumber.replace(/\D/g, '');
};

export const onlyNumberDecimal = (maskNumber: string) => {
  return maskNumber.replaceAll('.', '').replace(',', '.');
};

export function toBrazilianCurrency(value?: number | string) {
  if (!value) return 'R$ 0,00';
  if (typeof value === 'string' && value.includes('R$')) return value;

  const normalizedValue = typeof value === 'string' ? Number(value) : value;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(normalizedValue);
}

export function unmaskBrazilianCurrency(value?: string) {
  if (!value) return 0;
  const unmaskedString = value
    ?.replaceAll(' ', '')
    .replaceAll('R$', '')
    .replaceAll('.', '')
    .replace(',', '.');
  return parseFloat(unmaskedString);
}

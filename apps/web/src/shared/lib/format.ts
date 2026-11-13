const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const brlCents = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Preço em centavos → "R$ 197" (sem centavos quando inteiro). */
export function formatPrice(cents: number) {
  if (cents === 0) return "Grátis";
  return cents % 100 === 0 ? brl.format(cents / 100) : brlCents.format(cents / 100);
}

export function formatInstallments(cents: number, times = 3) {
  return `ou ${times}x de ${brlCents.format(cents / 100 / times)} sem juros`;
}

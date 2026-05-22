const WHATSAPP_NUMBER = "243810688062";

const DEFAULT_MESSAGE =
  "Bonjour, je viens du site JK Service et j'aimerais échanger avec vous au sujet de…";

export function buildWhatsAppLink(message?: string): string {
  const text = encodeURIComponent(message?.trim() || DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const WHATSAPP = WHATSAPP_NUMBER;
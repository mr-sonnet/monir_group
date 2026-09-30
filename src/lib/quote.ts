export interface Quote {
  inquiryType: string;
  product: string;
  quantity: string;
  unit: string;
  location: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  reply: string;
  consent: boolean;
  website: string;
}
export type QuoteResult =
  | { mode: 'direct'; message: string; emailUrl: string; whatsappUrl: string }
  | { mode: 'live'; message: string };
export function validateQuote(q: Quote): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!q.name.trim()) errors.name = 'Enter your contact name.';
  if (!['quote', 'company', 'other'].includes(q.inquiryType))
    errors.inquiryType = 'Choose an inquiry type.';
  if (!q.phone.trim() && !q.email.trim())
    errors.phone = 'Enter a phone number or email address so we can reply.';
  if (q.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email))
    errors.email = 'Enter a valid email address.';
  if (q.phone && !/^[+()\d\s.-]{6,25}$/.test(q.phone))
    errors.phone = 'Enter a valid phone number (at least 6 digits).';
  if (q.phone && q.phone.replace(/\D/g, '').length < 6)
    errors.phone = 'Enter a valid phone number (at least 6 digits).';
  if (!q.product.trim() && !q.message.trim())
    errors.product = 'Enter a product or describe your requirement.';
  if (q.reply === 'email' && !q.email)
    errors.email = 'Enter an email address for your preferred reply method.';
  if (q.reply === 'phone' && !q.phone)
    errors.phone = 'Enter a phone number for your preferred reply method.';
  if (!q.consent)
    errors.consent = 'Please agree to the privacy notice to continue.';
  return errors;
}
// One transport boundary. Production must provide a server endpoint that validates,
// rate-limits, checks spam and confirms provider acceptance before returning success.
export async function submitQuote(
  q: Quote,
  endpoint = '',
  recipient = 'mdmonirgroupbd@gmail.com',
): Promise<QuoteResult> {
  if (q.website)
    throw new Error(
      'This submission could not be processed. Please contact us directly.',
    );
  if (Object.keys(validateQuote(q)).length)
    throw new Error('Please check your inquiry details.');
  if (!navigator.onLine)
    throw new Error(
      'You appear to be offline. Your entries are still here. Reconnect and try again.',
    );
  if (!endpoint) {
    const body = [
      ['Inquiry type', q.inquiryType],
      ['Product', q.product],
      ['Quantity', [q.quantity, q.unit].filter(Boolean).join(' ')],
      ['Delivery location', q.location],
      ['Company', q.company],
      ['Contact name', q.name],
      ['Phone', q.phone],
      ['Email', q.email],
      ['Preferred reply', q.reply],
      ['Requirements', q.message],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => label + ': ' + value)
      .join('\n\n');
    return {
      mode: 'direct',
      message:
        'Your inquiry is ready. Choose WhatsApp or email below, then send the prepared message to our team.',
      whatsappUrl:
        'https://wa.me/8801711966411?text=' +
        encodeURIComponent('Monir Group inquiry\n\n' + body),
      emailUrl:
        'mailto:' +
        recipient +
        '?subject=' +
        encodeURIComponent(
          'Monir Group inquiry: ' + (q.product || q.inquiryType),
        ) +
        '&body=' +
        encodeURIComponent(body),
    };
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(q),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(
      'Your inquiry could not be sent. Your entries are still here. Please try again or contact us directly.',
    );
  const result = await response.json();
  if (result.accepted !== true)
    throw new Error('Delivery was not confirmed. Please contact us directly.');
  return {
    mode: 'live',
    message:
      'Thank you. We have received your inquiry. Our team will contact you using the details provided.',
  };
}

import { z } from 'zod';

export const quoteFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  products: z.array(z.string()).min(1, 'Please select at least one product'),
  quantity: z.string().optional(),
  sizing: z.string().optional(),
  packing: z.string().optional(),
  deliveryTerms: z.string().optional(),
  preferredDeliveryDate: z.string().optional(),
  howHeard: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

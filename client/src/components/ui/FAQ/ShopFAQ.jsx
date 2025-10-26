// components/ShopFAQ.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const shopFAQ = [
  {
    question: 'Are your stickers waterproof?',
    answer:
      'Yes, all our stickers are made with vinyl material, making them waterproof and durable for indoor and outdoor use.',
  },
  {
    question: 'Can I order custom stickers?',
    answer:
      'Yes! Use our custom sticker tool on the shop page to upload your design and choose sizes. Processing takes 3-5 business days.',
  },
  {
    question: 'How do I know which sticker size to choose?',
    answer:
      'Each product page lists dimensions in cm. Use our size guide to visualize how stickers will look on your items.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer:
      'Yes, discounts start at 20+ stickers. Add items to your cart, and the discount will apply automatically at checkout.',
  },
  {
    question: 'Are the stickers easy to remove?',
    answer:
      'Our stickers are designed for easy removal without leaving residue, but we recommend testing on a small area first.',
  },
];

export default function ShopFAQ() {
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold">
        Frequetly asked questions
      </h2>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <Accordion
          type="single"
          collapsible
          className="w-full rounded-md border"
          defaultValue="item-1"
        >
          {cartFAQ.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="px-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}

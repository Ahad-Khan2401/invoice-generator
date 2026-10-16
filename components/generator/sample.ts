import type { Item, Party } from "@/lib/invoice-doc";

/* Example content for the "Fill with an example" button. Deliberately fake
   (example.com addresses, a made-up studio and café) so nobody mistakes it
   for real data — and it is never saved as the user's remembered business. */
export const SAMPLE_FROM: Party = {
  name: "Alex Morgan Design Studio",
  email: "alex@example.com",
  phone: "+1 555 0123",
  address: "12 Market Street\nSpringfield",
};

export const SAMPLE_TO: Party = {
  name: "Sunrise Café",
  email: "accounts@sunrisecafe.example",
  phone: "",
  address: "48 Harbour Road\nSpringfield",
};

export function sampleItems(startId: number): Item[] {
  return [
    { id: startId,     desc: "Logo design — 3 concepts, 2 revision rounds", qty: 1, rate: 450 },
    { id: startId + 1, desc: "Menu layout (2 pages)",                       qty: 2, rate: 60 },
    { id: startId + 2, desc: "Stock photo licences",                        qty: 3, rate: 12 },
  ];
}

/** True while the "from" block still holds the example business. */
export function isSampleFrom(p: Party): boolean {
  return p.name === SAMPLE_FROM.name && p.email === SAMPLE_FROM.email;
}

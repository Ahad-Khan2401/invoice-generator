import InvoiceGenerator from "@/components/InvoiceGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download PDF Invoices Instantly | InvoiceQuick",
  description:
    "Generate professional invoices online for free. No signup needed. Fill in your details, add line items, apply tax — then download a clean PDF invoice in seconds.",
  alternates: { canonical: "https://www.invoicequick.com" },
};

export default function Home() {
  return <InvoiceGenerator />;
}
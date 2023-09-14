export interface FormItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IUpdateItem {
  itemId: string;
  fieldName: string;
  fieldValue: string | number;
}

export enum InvoiceStatus {
  PAID = 0,
  PENDING = 1,
  DRAFT = 2
}

export interface Invoice {
  fromStreet: string;
  fromCity: string;
  fromZip: string;
  fromCountry: string;
  toClientName: string;
  toClientEmail: string;
  toStreet: string;
  toCity: string;
  toZip: string;
  toCountry: string;
  invoiceDate: number | null;
  paymentTerms: number | null;
  description: string;
  items: FormItem[];
}

export interface InvoiceOptionals {
  fromStreet?: string;
  fromCity?: string;
  fromZip?: string;
  fromCountry?: string;
  toClientName?: string;
  toClientEmail?: string;
  toStreet?: string;
  toCity?: string;
  toZip?: string;
  toCountry?: string;
  invoiceDate?: number | null;
  paymentTerms?: number | null;
  description?: string;
  items?: FormItem[];
}

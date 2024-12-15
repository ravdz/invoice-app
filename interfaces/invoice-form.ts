export type FormItem = {
	id: string;
	name: string;
	quantity: number;
	price: number;
};

export type IUpdateItem = {
	itemId: string;
	fieldName: string;
	fieldValue: string | number;
};

export enum InvoiceStatus {
	PAID = 0,
	PENDING = 1,
	DRAFT = 2,
}

export type Invoice = {
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
};

export type InvoiceOptionals = {
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
	items?: FormItem[] | [];
};

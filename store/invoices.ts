import { defineStore } from "pinia";

import type { Invoice, InvoiceOptionals, InvoiceStatus } from "@/interfaces/invoice-form";
import { generateUniqueID } from "@/utils/helpers";

interface InvoiceDataOptionals extends InvoiceOptionals {
	status?: InvoiceStatus;
}

interface InvoiceData extends Invoice {
	id: string;
	status: InvoiceStatus;
}

export const invoicesStore = defineStore("invoices", {
	state: () => {
		return {
			invoices: [] as InvoiceData[],
			filterBy: [] as InvoiceStatus[],
		};
	},
	actions: {
		addInvoice(newInvoice: Invoice, status: InvoiceStatus) {
			const invoice = { ...newInvoice, id: generateUniqueID(), status };
			this.invoices.push(invoice);
		},
		updateInvoice(invoiceId: string, invoiceForm: InvoiceDataOptionals) {
			this.invoices = this.invoices.map((invoice) => {
				if (invoice.id === invoiceId) {
					return {
						...invoice,
						...invoiceForm,
					};
				}
				return invoice;
			});
		},
		deleteInvoice(invoiceId: string) {
			this.invoices = this.invoices.filter((invoice) => invoice.id !== invoiceId);
		},
		changeFilters(status: InvoiceStatus) {
			if (this.filterBy.includes(status)) {
				this.filterBy = this.filterBy.filter((statusItem) => statusItem !== status);
			} else {
				this.filterBy = [...this.filterBy, status];
			}
		},
	},
	getters: {
		filteredInvoices: (state) => {
			const { invoices, filterBy } = state;
			if (!filterBy.length) return invoices;
			return invoices.filter((invoice) => {
				const invoiceMatch = filterBy.includes(invoice.status);
				if (invoiceMatch) return invoice;
				return false;
			});
		},
	},
	persist: {
		key: "invoices",
		storage: localStorage,
	},
});

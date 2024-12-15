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
			const invoices = this.invoices.map((invoice) => {
				if (invoice.id === invoiceId) {
					return {
						...invoice,
						...invoiceForm,
					};
				}
				return invoice;
			});
			this.invoices = invoices;
		},
		deleteInvoice(invoiceId: string) {
			const invoices = this.invoices.filter((invoice) => invoice.id !== invoiceId);
			this.invoices = invoices;
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
			const results = invoices.filter((invoice) => {
				const invoiceMatch = filterBy.includes(invoice.status);
				if (invoiceMatch) return invoice;
				return false;
			});
			return results;
		},
	},
	persist: {
		storage: persistedState.localStorage,
	},
});

import { defineStore } from "pinia";

import useUniqueId from "@/composables/useUniqueId";
import type { Invoice, InvoiceOptionals, InvoiceStatus } from "@/types/invoice-form";

interface InvoiceDataOptionals extends InvoiceOptionals {
	status?: InvoiceStatus;
}

interface InvoiceData extends Invoice {
	id: string;
	status: InvoiceStatus;
}

type State = {
	invoices: InvoiceData[];
	filterBy: InvoiceStatus[];
};

export const invoicesStore = defineStore("invoices", {
	state: (): State => {
		return {
			invoices: [],
			filterBy: [],
		};
	},
	actions: {
		addInvoice(newInvoice: Invoice, status: InvoiceStatus) {
			const invoice = { ...newInvoice, id: useUniqueId(), status };
			this.invoices.push(invoice);
		},
		updateInvoice(invoiceId: string, invoiceForm: InvoiceDataOptionals) {
			this.invoices = this.invoices.map((invoice: InvoiceData) => {
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
			this.invoices = this.invoices.filter((invoice: InvoiceData) => invoice.id !== invoiceId);
		},
		changeFilters(status: InvoiceStatus) {
			if (this.filterBy.includes(status)) {
				this.filterBy = this.filterBy.filter((statusItem: InvoiceStatus) => statusItem !== status);
			} else {
				this.filterBy = [...this.filterBy, status];
			}
		},
	},
	getters: {
		filteredInvoices: (state: State) => {
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

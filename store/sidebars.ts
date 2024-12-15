import { defineStore } from "pinia";

import type { Invoice, InvoiceStatus } from "@/interfaces/invoice-form";

interface InvoiceData extends Invoice {
	id: string;
	status: InvoiceStatus;
}

interface InvoiceSidebar {
	isOpen: boolean;
	invoiceData: InvoiceData | null;
}

export const sidebarsStore = defineStore("sidebars", {
	state: () => {
		return {
			invoiceSidebar: {
				isOpen: false,
				invoiceData: null,
			} as InvoiceSidebar,
		};
	},
	actions: {
		changeInvoiceSidebarVisibility(value: boolean, invoiceData?: InvoiceData) {
			this.invoiceSidebar.isOpen = value;

			if (!value) {
				this.invoiceSidebar.invoiceData = null;
			} else {
				this.invoiceSidebar.invoiceData = invoiceData || null;
			}
		},
	},
});

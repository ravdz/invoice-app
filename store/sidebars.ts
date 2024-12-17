import { defineStore } from "pinia";

import type { Invoice, InvoiceStatus } from "@/types/invoice-form";

interface InvoiceData extends Invoice {
	id: string;
	status: InvoiceStatus;
}

interface InvoiceSidebar {
	isOpen: boolean;
	invoiceData: InvoiceData | null;
}

type State = {
	invoiceSidebar: InvoiceSidebar;
};

export const sidebarsStore = defineStore("sidebars", {
	state: (): State => {
		return {
			invoiceSidebar: {
				isOpen: false,
				invoiceData: null,
			},
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

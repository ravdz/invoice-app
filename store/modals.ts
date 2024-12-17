import { defineStore } from "pinia";

type State = {
	deleteInvoiceModalOpen: boolean;
};

export const modalsStore = defineStore("modals", {
	state: (): State => {
		return {
			deleteInvoiceModalOpen: false,
		};
	},
	actions: {
		changeDeleteInvoiceModalVisibility(value: boolean) {
			this.deleteInvoiceModalOpen = value;
		},
	},
});

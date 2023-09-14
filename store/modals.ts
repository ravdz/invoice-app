import { defineStore } from 'pinia'

export const modalsStore = defineStore('modals', {
    state: () => {
        return {
            deleteInvoiceModalOpen: false as boolean
        }
    },
    actions: {
        changeDeleteInvoiceModalVisibility (value: boolean) {
            this.deleteInvoiceModalOpen = value
        }

    }
})

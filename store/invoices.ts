import { defineStore } from 'pinia'
import { Invoice, InvoiceStatus, InvoiceOptionals } from '@/interfaces/invoice-form'
import { generateUniqueID } from '@/utils/helpers'

interface InvoiceDataOptionals extends InvoiceOptionals {
    status?: InvoiceStatus
}

interface InvoiceData extends Invoice {
    id: string;
    status: InvoiceStatus
  }

export const invoicesStore = defineStore('invoices', {
    state: () => {
        return {
            invoices: [] as InvoiceData[]
        }
    },
    actions: {
        addInvoice (newInvoice: Invoice) {
            const invoice = { ...newInvoice, id: generateUniqueID(), status: 1 }
            this.invoices.push(invoice)
        },
        updateInvoice (invoiceId: string, invoiceForm: InvoiceDataOptionals) {
            const invoices = this.invoices.map((invoice) => {
                if (invoice.id === invoiceId) {
                    return {
                        ...invoice,
                        ...invoiceForm
                    }
                }
                return invoice
            })
            this.invoices = invoices
        },
        deleteInvoice (invoiceId: string) {
            const invoices = this.invoices.filter(invoice => invoice.id !== invoiceId)
            this.invoices = invoices
        }
    },

    persist: {
        storage: persistedState.localStorage
    }
})

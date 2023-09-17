<template>
    <div class="w-full flex justify-end items-center md:hidden bg-white-0 dark:bg-black-600 py-5 px-6 shadow-sm">
        <Button :variant="3" class="mr-2" @click="editInvoice">
            Edit
        </Button>
        <Button :variant="5" class="mr-2" @click="openDeleteInvoiceModal">
            Delete
        </Button>
        <Button v-if="isNotDraft" :variant="2" @click="changeStatus">
            {{ changeStatusBtnLabel }}
        </Button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DetailsActionBar',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import { modalsStore } from '@/store/modals'
import { sidebarsStore } from '@/store/sidebars'
import Button from '@/components/atoms/Button.vue'
import { Invoice, InvoiceStatus } from '@/interfaces/invoice-form'

interface InvoiceWithId extends Invoice {
  id: string;
  status: InvoiceStatus;
}

interface Props {
invoiceData: InvoiceWithId
}

const props = defineProps<Props>()

const invoicesStoreRef = invoicesStore()
const modalsStoreRef = modalsStore()
const sidebarsStoreRef = sidebarsStore()

const changeStatusBtnLabel = computed(() => {
    if (props.invoiceData.status === 1) {
        return 'Mark as paid'
    }
    return 'Mark as pending'
})

const isNotDraft = computed(() => props.invoiceData.status !== 2)

const editInvoice = () => {
    sidebarsStoreRef.changeInvoiceSidebarVisibility(true, props.invoiceData)
}

const changeStatus = () => {
    const { id, status } = props.invoiceData
    const newStatus = status === 1 ? 0 : 1
    invoicesStoreRef.updateInvoice(id, { status: newStatus })
}

const openDeleteInvoiceModal = () => {
    modalsStoreRef.changeDeleteInvoiceModalVisibility(true)
}

</script>

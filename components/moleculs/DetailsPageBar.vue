<template>
    <div class="w-full flex justify-between p-6 md:px-8 md:py-6 bg-white-0 dark:bg-black-600 rounded-lg mb-4 shadow-sm">
        <div class="w-full md:w-auto flex justify-between items-center">
            <Text tag="span" class="text-blue-300 dark:text-blue-100 leading-3 block md:mr-5">
                Status
            </Text>
            <StatusBadge :status-key="invoiceData.status" />
        </div>
        <div class="hidden md:flex justify-end items-center">
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
    </div>
</template>

<script lang="ts">
export default {
    name: 'DetailsPageBar',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import { modalsStore } from '@/store/modals'
import { sidebarsStore } from '@/store/sidebars'
import StatusBadge from '@/components/atoms/StatusBadge.vue'
import Text from '@/components/atoms/Text.vue'
import Button from '@/components/atoms/Button.vue'
import { Invoice, InvoiceStatus } from '@/interfaces/invoice-form'

interface InvoiceData extends Invoice {
  id: string;
  status: InvoiceStatus;
}

interface Props {
invoiceData: InvoiceData
}

const props = defineProps<Props>()

const { updateInvoice } = invoicesStore()
const { changeDeleteInvoiceModalVisibility } = modalsStore()
const { changeInvoiceSidebarVisibility } = sidebarsStore()

const changeStatusBtnLabel = computed(() => {
    if (props.invoiceData.status === 1) {
        return 'Mark as paid'
    }
    return 'Mark as pending'
})

const isNotDraft = computed(() => props.invoiceData.status !== 2)

const editInvoice = () => {
    changeInvoiceSidebarVisibility(true, props.invoiceData)
}

const changeStatus = () => {
    const { id, status } = props.invoiceData
    const newStatus = status === 1 ? 0 : 1
    updateInvoice(id, { status: newStatus })
}

const openDeleteInvoiceModal = () => {
    changeDeleteInvoiceModalVisibility(true)
}

</script>

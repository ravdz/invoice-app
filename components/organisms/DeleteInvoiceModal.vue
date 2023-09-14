<template>
    <Modal :is-open="modalsStoreRef.deleteInvoiceModalOpen" @close="triggerCloseModal">
        <div
            class="max-w-[480px] w-full rounded-lg bg-white-0 dark:bg-black-600 shadow-sm p-8 md:p-12 md:pb-11"
        >
            <Heading tag="h2" size="m" class="leading-8 mb-2 md:mb-3 text-black-800 dark:text-white-0">
                Confirm Deletion
            </Heading>
            <Text tag="p" class="text-blue-200 dark:text-blue-100 leading-5 mb-5 md:mb-3.5 ">
                Are you sure you want to delete invoice #{{ invoiceId }}? This action cannot be undone.
            </Text>
            <div class="flex justify-end items-center">
                <Button :variant="3" class="mr-2" @click="triggerCloseModal">
                    Cancel
                </Button>
                <Button :variant="5" @click="deleteInvoice">
                    Delete
                </Button>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
export default {
    name: 'DeleteInvoiceModal',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { modalsStore } from '@/store/modals'
import { invoicesStore } from '@/store/invoices'
import Text from '@/components/atoms/Text.vue'
import Heading from '@/components/atoms/Heading.vue'
import Modal from '@/components/moleculs/Modal.vue'
import Button from '@/components/atoms/Button.vue'

interface Props {
    invoiceId: string
}

const props = defineProps<Props>()

const modalsStoreRef = modalsStore()
const invoicesStoreRef = invoicesStore()

const triggerCloseModal = () => {
    modalsStoreRef.changeDeleteInvoiceModalVisibility(false)
}

const deleteInvoice = () => {
    invoicesStoreRef.deleteInvoice(props.invoiceId)
    triggerCloseModal()
    return navigateTo('/')
}
</script>

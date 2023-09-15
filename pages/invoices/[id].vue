<template>
    <NuxtLayout>
        <div class="px-6 md:px-12 py-9 md:py-18 xl:px-0 xl:py-20">
            <div class="flex justify-start items-center w-full mb-8">
                <NuxtLink to="/">
                    <GoBackButton />
                </NuxtLink>
            </div>
            <template v-if="!!invoiceData">
                <div>
                    <DetailsPageBar :invoice-data="invoiceData" />
                    <InvoiceDetails :invoice-data="invoiceData" />
                </div>
            </template>
        </div>
        <DetailsActionBar :invoice-data="invoiceData" />
        <DeleteInvoiceModal :invoice-id="invoiceData.id" />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import GoBackButton from '@/components/atoms/GoBackButton.vue'
import DetailsPageBar from '@/components/moleculs/DetailsPageBar.vue'
import DetailsActionBar from '@/components/moleculs/DetailsActionBar.vue'
import InvoiceDetails from '@/components/organisms/InvoiceDetails.vue'
import DeleteInvoiceModal from '@/components/organisms/DeleteInvoiceModal.vue'
import { Invoice, InvoiceStatus } from '@/interfaces/invoice-form'

interface InvoiceWithId extends Invoice {
  id: string;
  status: InvoiceStatus;
}

const store = invoicesStore()

const { id } = useRoute().params

const invoiceData = computed(() => {
    const invoice = store.invoices.find((invoiceItem: InvoiceWithId) => invoiceItem.id === id)
    if (!invoice) {
        throw createError({ statusCode: 404, statusMessage: 'Invoice not found', fatal: true })
    } else {
        return invoice
    }
})

useHead({
    title: `InvoiceApp - #${id}`,
    meta: [{
        name: 'description',
        content: `Details of #${id} invoice`
    }, {
        name: 'robots',
        content: 'noindex, nofollow'
    }]
})

</script>

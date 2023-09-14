<template>
    <ClientOnly>
        <div
            v-if="store.invoices.length"
            class="flex flex-col justify-start items-stretch mt-8 md:mt-14 xl:mt-16"
        >
            <InvoiceItem v-for="invoice in store.invoices" :key="invoice.id+invoice.status" :invoice-data="invoice" />
        </div>
        <EmptyList v-else />
    </ClientOnly>
</template>

<script lang="ts">
export default {
    name: 'InvoiceList',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import InvoiceItem from '@/components/moleculs/InvoiceItem.vue'
import EmptyList from '@/components/moleculs/EmptyList.vue'

const store = invoicesStore()

</script>

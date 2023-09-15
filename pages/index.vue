<template>
    <NuxtLayout>
        <div class="px-6 md:px-12 py-9 md:py-18 xl:px-0 xl:py-20">
            <div class="flex justify-between items-center">
                <div class="flex flex-col justify-center items-start">
                    <Heading tag="h2" size="l" class="mb-0.5 md:mb-1.5">
                        Invoices
                    </Heading>
                    <Text tag="span" class="text-blue-200 dark:text-blue-100">
                        <ClientOnly> {{ subtitle }} </ClientOnly>
                    </Text>
                </div>
                <div class="flex justify-center items-center">
                    <Button :variant="1" @click="openSidebar">
                        <span class="md:hidden text-inherit">New</span>
                        <span class="hidden md:block text-inherit">New Invoice</span>
                    </Button>
                </div>
            </div>
            <InvoiceList />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import { sidebarsStore } from '@/store/sidebars'
import InvoiceList from '@/components/organisms/InvoiceList.vue'
import Heading from '@/components/atoms/Heading.vue'
import Text from '@/components/atoms/Text.vue'
import Button from '@/components/atoms/Button.vue'

const { invoices } = invoicesStore()
const { changeInvoiceSidebarVisibility } = sidebarsStore()

const subtitle = computed(() => {
    if (invoices.length) {
        return `There are ${invoices.length} total invoices`
    }
    return 'No invoices'
})

const openSidebar = () => {
    changeInvoiceSidebarVisibility(true)
}

useHead({
    title: 'InvoiceApp',
    meta: [{
        name: 'description',
        content: 'Your invoice list'
    }, {
        name: 'robots',
        content: 'noindex, nofollow'
    }]
})

</script>

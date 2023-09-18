<template>
    <div class="xl:flex xl:justify-stretch xl:items-stretch min-h-screen">
        <Menu />
        <main
            role="main"
            class="z-10 xl:flex-grow mx-auto xl:max-w-xl-container"
        >
            <Sidebar :is-open="isSidebarOpen" @close="closeSidebar">
                <InvoiceForm @close="closeSidebar" />
            </Sidebar>
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { sidebarsStore } from '@/store/sidebars'
import Menu from '@/components/moleculs/Menu.vue'
import Sidebar from '@/components/organisms/Sidebar.vue'
import InvoiceForm from '@/components/organisms/InvoiceForm/InvoiceForm.vue'

const store = sidebarsStore()

const isSidebarOpen = computed(() => store.invoiceSidebar.isOpen)

const closeSidebar = () => {
    store.changeInvoiceSidebarVisibility(false)
}
</script>

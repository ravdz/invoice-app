<template>
	<div class="min-h-screen xl:flex xl:items-stretch xl:justify-stretch">
		<Menu />
		<main role="main" class="z-10 mx-auto xl:max-w-xl-container xl:flex-grow">
			<Sidebar :is-open="isSidebarOpen" @close="closeSidebar">
				<InvoiceForm @close="closeSidebar" />
			</Sidebar>
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
import Menu from "@/components/moleculs/Menu.vue";
import InvoiceForm from "@/components/organisms/InvoiceForm/InvoiceForm.vue";
import Sidebar from "@/components/organisms/Sidebar.vue";
import { sidebarsStore } from "@/store/sidebars";

const store = sidebarsStore();

const isSidebarOpen = computed(() => store.invoiceSidebar.isOpen);

const closeSidebar = () => {
	store.changeInvoiceSidebarVisibility(false);
};
</script>

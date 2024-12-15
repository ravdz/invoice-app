<template>
	<NuxtLayout>
		<div class="px-6 py-9 md:px-12 md:py-18 xl:px-0 xl:py-20">
			<div class="flex items-center justify-between">
				<div class="flex flex-col items-start justify-center">
					<Heading tag="h1" size="l" class="mb-0.5 md:mb-1.5"> Invoices </Heading>
					<Text tag="span" class="text-blue-200 dark:text-blue-100">
						<ClientOnly> {{ subtitle }} </ClientOnly>
					</Text>
				</div>
				<div class="flex items-center justify-center">
					<StatusFilter />
					<Button :variant="1" aria-label="New Invoice" @click="openSidebar">
						<span class="text-inherit md:hidden">New</span>
						<span class="hidden text-inherit md:block">New Invoice</span>
					</Button>
				</div>
			</div>
			<InvoiceList />
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import Heading from "@/components/atoms/Heading.vue";
import Text from "@/components/atoms/Text.vue";
import StatusFilter from "@/components/moleculs/StatusFilter/StatusFilter.vue";
import InvoiceList from "@/components/organisms/InvoiceList.vue";
import { invoicesStore } from "@/store/invoices";
import { sidebarsStore } from "@/store/sidebars";

const invoicesStoreRef = invoicesStore();
const sidebarsStoreRef = sidebarsStore();

const subtitle = computed(() =>
	invoicesStoreRef.filteredInvoices.length
		? `There are ${invoicesStoreRef.filteredInvoices.length} total invoices`
		: "No invoices",
);

const openSidebar = () => {
	sidebarsStoreRef.changeInvoiceSidebarVisibility(true);
};

useHead({
	title: "InvoiceApp",
	meta: [
		{
			name: "description",
			content: "Your invoice list",
		},
		{
			name: "robots",
			content: "noindex, nofollow",
		},
	],
});
</script>

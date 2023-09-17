<template>
    <div
        class="flex justify-center items-center flex-wrap md:flex-nowrap w-full relative max-w-full min-w-full mt-12 md:mt-4.5 first:mt-0 form-item"
    >
        <Input
            v-model="name"
            label="Item Name"
            name="name"
            class="basis-full md:basis-4/12 mb-6 md:mb-0 md:[&>.label]:hidden [&>.label>.error-label]:hidden"
            :error-message="errorMessage.name.length ? errorMessage.name[0].$message : null"
        />
        <Input
            v-model="quantity"
            label="Qty."
            name="quantity"
            type="number"
            min="0"
            step="1"
            class="basis-1/6 md:basis-2/12 pr-4 md:px-4 md:[&>.label]:hidden [&>input]:px-0 [&>input]:text-center [&>.label>.error-label]:hidden"
            :error-message="errorMessage.quantity.length ? errorMessage.quantity[0].$message : null"
        />
        <Input
            v-model="price"
            label="Price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            class="basis-2/6 md:basis-3/12 md:pr-4 text-center md:[&>.label]:hidden [&>.label>.error-label]:hidden"
            :error-message="errorMessage.price.length ? errorMessage.price[0].$message : null"
        />
        <div class="basis-2/6 md:basis-2/12 pl-4 md:pl-0 flex flex-col justify-center items-start">
            <Text tag="span" class="leading-3 -tracking-xs w-fit text-blue-300 dark:text-blue-100 mb-2 md:hidden">
                Total
            </Text>
            <Heading tag="span" size="s" class="block text-blue-200 dark:text-blue-100 leading-3 py-4.5 pr-5 w-full">
                {{ totalPrice }}
            </Heading>
        </div>

        <button
            type="button"
            class="basis-1/6 md:basis-1/12 pl-4"
            @click="removeItem"
        >
            <BinIcon :filled="true" />
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormItem',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import Input from '@/components/atoms/Input.vue'
import Heading from '@/components/atoms/Heading.vue'
import Text from '@/components/atoms/Text.vue'
import BinIcon from '@/assets/svg/bin-icon.svg'
import { roundNumber } from '@/utils/helpers'
import { FormItem as IFormItem } from '@/interfaces/invoice-form'

interface Props {
  data: IFormItem;
  errorMessage: any;
}

const props = defineProps<Props>()

const emit = defineEmits(['remove', 'update'])

const name = computed({
    get () {
        return props.data.name
    },
    set (fieldValue) {
        emit('update', {
            itemId: props.data.id,
            fieldName: 'name',
            fieldValue
        })
    }
})

const quantity = computed({
    get () {
        return props.data.quantity
    },
    set (fieldValue) {
        emit('update', {
            itemId: props.data.id,
            fieldName: 'quantity',
            fieldValue
        })
    }
})

const price = computed({
    get () {
        return props.data.price
    },
    set (fieldValue) {
        emit('update', {
            itemId: props.data.id,
            fieldName: 'price',
            fieldValue
        })
    }
})

const totalPrice = computed(() => {
    const { quantity, price } = props.data
    return roundNumber(price * quantity)
})

const removeItem = () => {
    emit('remove', props.data.id)
}
</script>

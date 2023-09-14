<template>
    <div>
        <Heading
            tag="h3"
            size="s"
            class="leading-3 text-blue-500 dark:text-blue-500"
        >
            Item list
        </Heading>
        <div class="hidden md:flex justify-center items-center mt-6">
            <Text tag="span" class="basis-4/12 leading-3">
                Item Name
            </Text>
            <Text tag="span" class="basis-2/12 leading-3 px-4">
                Qty.
            </Text>
            <Text tag="span" class="basis-3/12 leading-3 pr-4">
                Price
            </Text>
            <Text tag="span" class="basis-2/12 leading-3">
                Total
            </Text>
            <div class="basis-1/12 pl-4" />
        </div>

        <div class="mt-5 md:mt-3.5">
            <FormItem
                v-for="(item, index) in items"
                :key="item.id"
                :data="item"
                :error-message="errorMessages.$each.$response.$errors[index]"
                @remove="removeItem"
                @update="updateItem"
            />
        </div>

        <Button :variant="6" class="mt-4.5" @click="addItem">
            + Add New Item
        </Button>

        <ul v-if="errors.length" class="mt-8">
            <li
                v-for="(error, index) in errors"
                :key="index"
                class="text-xxs text-red-500 font-bold"
            >
                - {{ error }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormItemList',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import FormItem from '@/components/moleculs/FormItem.vue'
import Heading from '@/components/atoms/Heading.vue'
import Text from '@/components/atoms/Text.vue'
import Button from '@/components/atoms/Button.vue'
import { FormItem as IFormItem, IUpdateItem } from '@/interfaces/invoice-form'

interface Props {
  items: IFormItem[];
  errorMessages: any;
}

const props = defineProps<Props>()

const emit = defineEmits(['add', 'remove', 'update'])

const errors = computed(() => {
    const { $errors } = props.errorMessages

    if ($errors.length) {
        if (typeof $errors[0].$message === 'string') {
            return [$errors[0].$message]
        } else if ($errors[0].$message.length) {
            const firstErrorArray = $errors[0].$message.find((errorArray: [] | string[]) => !!errorArray.length)
            return [...new Set(firstErrorArray)]
        }
    }
    return []
})

const addItem = () => {
    emit('add', {
        id: uuidv4(),
        name: 'Item',
        quantity: 1,
        price: 0.01
    })
}

const removeItem = (itemId: string) => {
    emit('remove', itemId)
}

const updateItem = (data: IUpdateItem) => {
    emit('update', data)
}
</script>

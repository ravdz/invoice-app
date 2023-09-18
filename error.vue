<template>
    <NuxtLayout name="error">
        <Heading tag="h1" size="l" class="mb-2">
            {{ error.statusCode }}
        </Heading>
        <Text tag="p" class="text-center text-base md:text-lg mb-4">
            {{ error.statusMessage }}
        </Text>
        <Button :variant="2" aria-label="Go back to dashboard" @click="handleError">
            Go back to dashboard
        </Button>
    </NuxtLayout>
</template>

<script setup lang="ts">
import Heading from '@/components/atoms/Heading.vue'
import Text from '@/components/atoms/Text.vue'
import Button from '@/components/atoms/Button.vue'

interface IError {
    statusCode: number,
    statusMessage: string
}

defineProps({
    error: {
        type: Object as () => IError,
        required: true
    }
})

const handleError = () => {
    clearError({
        redirect: '/'
    })
}
</script>

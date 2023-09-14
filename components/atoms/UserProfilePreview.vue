<template>
    <div
        class="w-8 xl:w-10 h-8 xl:h-10 rounded-[32px] bg-no-repeat bg-center bg-cover"
        :style="`background-image: url('${UserImg}')`"
    />
</template>

<script lang="ts">
export default {
    name: 'UserProfilePreview',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import UserImg from '@/assets/img/user.png'
</script>

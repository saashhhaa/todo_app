<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: false
        },
        img: {
            type: String,
            required: false
        }
    })
</script>

<template>
    <div class="category">
        <img :src="props.img" alt="">
        <div>{{ props.title}}</div>
        <div>⣿</div>    
    </div>
</template>
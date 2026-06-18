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
        <div>d</div>
        <div>{{ props.title}}</div>
        <div>1</div>    
    </div>
</template>
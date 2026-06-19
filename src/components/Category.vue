<script setup>
    const props = defineProps({
        title: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        count: {
            type: Number,
            required: false
        }
    })
</script>

<template>
    <div class="category">
        <div class="category-icon" :style="{ backgroundColor: props.color }"></div>
        <div>{{ props.title}}</div>
        <div class="category-count">{{ props.count }}</div>    
    </div>
</template>

<style scoped>
.category {
   display: grid;
    grid-template-columns: 10% 70% 20%;
    align-items: center;
    border-radius: 10px;
    padding: 15px 20px;
    background-color: var(--blackTheme-back-secondary);
}

.category-icon{
    width: 10px;
    height: 10px;
    border-radius: 100px;
}

.category-count {
    filter: brightness(0.5);
    text-align: end;
}

.category:hover {
    filter: brightness(1.3);
    cursor: pointer;
}


</style>
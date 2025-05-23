<script setup>
import icon from '../assets/icon/address_big.png'
defineProps({
    modelValue: String
})
const emit = defineEmits(['update:modelValue', 'search'])
</script>


<template>
    <div class="search-container text-center my-4">
        <h2><img :src="icon" alt="ที่อยู่" width="50" height="50">ค้นหาร้านอาหาร</h2>
        <div class="d-flex justify-content-center gap-2 mt-2">
            <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)"
                @keyup.enter="$emit('search')" placeholder="ข้าวมันไก่ ลาดพร้าว" class="form-control"
                style="max-width: 300px;" />
            <button class="btn btn-outline-primary" @click="$emit('search')">ค้นหา</button>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

input {
    padding: 8px;
    width: 250px;
    box-sizing: border-box;
    font-size: 16px;
}

button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
}
</style>

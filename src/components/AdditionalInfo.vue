<script setup>
defineProps(['place'])
</script>

<template>
    <div class="p-2 mb-2 text-muted">
        <hr>
        <h6 style="margin-bottom: 12px;">ข้อมูลเพิ่มเติม</h6>

        <!-- เวลาเปิดปิด -->
        <div class="info-block">
            <strong>เวลาทำการ:</strong>
            <ul class="opening-hours-list">
                <span v-if="place.opening_hours?.weekday_text">
                    <li v-for="(day, index) in place.opening_hours?.weekday_text" :key="index">
                        {{ day }}
                    </li>
                </span>
                <li v-else>
                    {{ place.opening_hours }}
                </li>
            </ul>
        </div>

        <!-- ประมาณราคา -->
        <div class="info-block">
            <strong>ประมาณราคา: </strong>
            <span>{{ place.price_level }}</span>
        </div>

        <!-- เบอร์โทร -->
        <div class="info-block">
            <strong>โทรศัพท์: </strong>
            <a v-if="place.phone_number && place.phone_number.trim() !== ''" :href="`tel:${place.phone_number}`"
                class="phone-link">
                <i class="bi bi-telephone-fill"></i>
                {{ place.phone_number }}
            </a>
            <span v-else class="text-muted">
                -
            </span>
        </div>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.info-block {
    margin-bottom: 12px;
    font-size: 14px;
    color: #444;
}

.opening-hours-list {
    list-style: none;
    padding-left: 0;
    margin: 4px 0 0 0;
    font-size: 14px;
    line-height: 1.4;
    color: #555;
    max-height: 120px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 6px 10px;
    background: #fafafa;
}

.opening-hours-list li {
    padding: 2px 0;
    border-bottom: 1px solid #eee;
}

.opening-hours-list li:last-child {
    border-bottom: none;
}
</style>

<script setup>
import AdditionalInfo from './AdditionalInfo.vue'

defineProps({
    place: Object,
    showDetails: Boolean,
})
defineEmits(['toggle-show'])
</script>


<template>
    <div class="card" style="margin-bottom: 6px;">
        <div class="card-body">
            <div
                class="d-flex gap-3 flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                <!-- รูปภาพด้านซ้าย -->
                <div style="flex: 0 0 100px;">
                    <img v-if=place.photo_url v-lazy=place.photo_url alt="รูปภาพร้าน" class="img-fluid rounded" />

                    <!-- แสดงข้อความหรือไอคอนถ้าไม่มีภาพ -->
                    <div v-else
                        class="d-flex justify-content-center align-items-center bg-light border rounded text-muted"
                        style="width: 100px; height: 100px; font-size: 12px;">
                        ไม่มีภาพ
                    </div>
                </div>

                <div style="flex: 1;">
                    <h5 class="card-title">{{ place.name }}</h5>
                    <p class="card-text mb-1">
                        <span class="d-flex align-items-center gap-2" style="font-size: 14px;">
                            <!-- <span>({{ (place.rating ?? 0).toFixed(1) }})</span> -->
                            <vue3-star-ratings v-model="place.rating" disableClick="true" star-size="14"
                                starColor="#fbbc04" inactiveColor="#c2c2c2" style="margin-top: -3.5px;" />
                            <span>({{ (place.rating ?? 0).toFixed(1) }})</span>
                        </span>
                        <span>{{ place.address }}</span>
                    </p>
                    <p class="mb-0">
                        สถานะ:
                        <span v-if="place.opening_hours && place.opening_hours.open_now" class="text-success fw-bold">
                            <i class="bi bi-circle-fill me-1"></i>เปิดอยู่
                        </span>
                        <span v-else class="text-danger fw-bold">
                            <i class="bi bi-circle-fill me-1"></i>ปิดอยู่
                        </span>
                    </p>
                </div>

                <div class="mt-2 mt-sm-0">
                    <a :href="`https://www.google.com/maps/dir/?api=1&destination=${place.location?.lat},${place.location?.lng}`"
                        target="_blank" class="btn btn-outline-secondary btn-sm" style="white-space: nowrap;">
                        <i class="bi bi-geo-alt-fill me-1"></i>
                        นำทาง
                    </a>
                </div>
            </div>
        </div>

        <!-- ข้อมูลเพิ่มเติม -->
        <transition name="expand">
            <AdditionalInfo v-if="showDetails" :place="place" />
        </transition>

        <button class="btn-link-like" @click="$emit('toggle-show', place.place_id)"
            style="margin-right: 4px; margin-top: -5px; margin-bottom: 6px;">
            <i :class="showDetails ? 'bi bi-chevron-double-up' : 'bi bi-chevron-double-down'"></i>
            {{ showDetails ? 'ซ่อนข้อมูล' : 'ดูข้อมูลเพิ่มเติม' }}
        </button>
    </div>
</template>

<style scoped>
.btn-link-like {
    background: none;
    border: none;
    padding: 0;
    color: #458cca;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;
}

.btn-link-like:hover {
    color: #3c93eb;
    text-decoration: none;
}
</style>
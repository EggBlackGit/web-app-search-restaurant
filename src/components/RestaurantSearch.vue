<script setup>
import { ref } from 'vue';
import { searchRestaurants } from '../api/restaurant'; // เรียกใช้ API จากไฟล์ที่แยกไว้
import Vue3StarRatings from "vue3-star-ratings";
import addressIcon from '../assets/icon/address_big.png';

const keyword = ref('');
const results = ref([]);
const loading = ref(false);
const searched = ref(false);
const showDetails = ref({});


const search = async () => { // function search ยิงไปที่หลังบ้านและดึงข้อมูล
  if (!keyword.value) return;
  loading.value = true;
  results.value = [];
  searched.value = false;

  try {
    results.value = await searchRestaurants(keyword.value);
    // console.log(results.value);
    searched.value = true;
  } catch (err) {
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};

const toggleShow = (id) => {
  showDetails.value[id] = !showDetails.value[id];
}
</script>

<template>
  <div class="container">
    <div class="search-container text-center my-4">
      <h2><img :src="addressIcon" alt="ที่อยู่" width="50" height="50">ค้นหาร้านอาหาร</h2>
      <div class="d-flex justify-content-center gap-2 mt-2">
        <input
          v-model="keyword"
          @keyup.enter="search"
          placeholder="ข้าวมันไก่ ลาดพร้าว"
          class="form-control"
          style="max-width: 300px;"
        />
        <button class="btn btn-outline-primary" @click="search">ค้นหา</button>
      </div>
    </div>

    <!-- <div class="d-flex justify-content-center">
      <div v-if="loading" class="spinner-grow text-primary" role="status">
      </div>
    </div> -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-grow text-primary" role="status"></div>
    </div>
  
  <div class="card" v-for="place in results" :key="place.place_id" style="margin-bottom: 6px;">
    <div class="card-body">
      <div class="d-flex gap-3 flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
        <!-- รูปภาพด้านซ้าย -->
        <div style="flex: 0 0 100px;">
          <img
            v-if=place.photo_url
            v-lazy=place.photo_url
            alt="รูปภาพร้าน"
            class="img-fluid rounded"
          />

          <!-- แสดงข้อความหรือไอคอนถ้าไม่มีภาพ -->
          <div
            v-else
            class="d-flex justify-content-center align-items-center bg-light border rounded text-muted"
            style="width: 100px; height: 100px; font-size: 12px;"
          >
            ไม่มีภาพ
          </div>
        </div>

        <div style="flex: 1;">
          <h5 class="card-title">{{ place.name }}</h5>
          <p class="card-text mb-1">
            <span class="d-flex align-items-center gap-2" style="font-size: 14px;">
              <!-- <span>({{ (place.rating ?? 0).toFixed(1) }})</span> -->
              <vue3-star-ratings
                v-model="place.rating"
                disableClick="true"
                star-size="14"
                starColor="#fbbc04"
                inactiveColor="#c2c2c2"
                style="margin-top: -3.5px;"
              />
              <span>({{ (place.rating ?? 0).toFixed(1) }})</span>
            </span>
            <span>{{ place.address }}</span>
          </p>
          <p class="mb-0">
            สถานะ:
            <span
              v-if="place.opening_hours && place.opening_hours.open_now"
              class="text-success fw-bold"
            >
              <i class="bi bi-circle-fill me-1"></i>เปิดอยู่
            </span>
            <span
              v-else
              class="text-danger fw-bold"
            >
              <i class="bi bi-circle-fill me-1"></i>ปิดอยู่
            </span>
          </p>
        </div>

        <div class="mt-2 mt-sm-0">
          <a
            :href="`https://www.google.com/maps/dir/?api=1&destination=${place.location?.lat},${place.location?.lng}`"
            target="_blank"
            class="btn btn-outline-secondary btn-sm"
            style="white-space: nowrap;"
          >
            <i class="bi bi-geo-alt-fill me-1"></i>
            นำทาง
          </a>
        </div>
      </div>
    </div>

    <!-- ข้อมูลเพิ่มเติม -->
    <transition name="expand">
      <div
        v-if="showDetails[place.place_id]"
        class="p-2 mb-2 text-muted"
      >
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
          <a
            v-if="place.phone_number && place.phone_number.trim() !== ''"
            :href="`tel:${place.phone_number}`"
            class="phone-link"
          >
            <i class="bi bi-telephone-fill"></i>
            {{ place.phone_number }}
          </a>
          <span v-else class="text-muted">
            -
          </span>
        </div>
      </div>
    </transition>

    <button class="btn-link-like" @click="toggleShow(place.place_id)" style="margin-right: 4px; margin-top: -5px; margin-bottom: 6px;">
      <i :class="showDetails[place.place_id] ? 'bi bi-chevron-double-up' : 'bi bi-chevron-double-down'"></i>
      {{ showDetails[place.place_id] ? 'ซ่อนข้อมูล' : 'ดูข้อมูลเพิ่มเติม' }}
    </button>


    
  </div>
    <div v-if="!loading && results.length === 0 && searched">ไม่พบข้อมูล</div>
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3); /* เทาใส */
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
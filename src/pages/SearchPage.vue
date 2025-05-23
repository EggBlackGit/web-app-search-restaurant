<script setup>
import { ref } from 'vue'
import { searchRestaurants } from '../api/restaurant'
import SearchBar from '../components/SearchBar.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'

const keyword = ref('')
const results = ref([])
const loading = ref(false)
const searched = ref(false)
const showDetails = ref({})

const search = async () => {
  if (!keyword.value || keyword.value.trim() === '') {
    alert('กรุณากรอกคำค้นหา')
    return
  }
  
  loading.value = true
  results.value = []
  searched.value = false

  try {
    results.value = await searchRestaurants(keyword.value)
    searched.value = true
  } catch (err) {
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

const toggleShow = (id) => {
  showDetails.value[id] = !showDetails.value[id]
}
</script>

<template>
  <div class="container">
    <SearchBar v-model="keyword" @search="search" />
    <LoadingOverlay v-if="loading" />
    <div v-for="place in results" :key="place.place_id">
      <RestaurantCard :place="place" :showDetails="showDetails[place.place_id]" @toggle-show="toggleShow" />
    </div>
  </div>
  <div v-if="!loading && results.length === 0 && searched">ไม่พบข้อมูล</div>
</template>

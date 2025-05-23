<script setup>
import Vue3StarRatings from 'vue3-star-ratings'
defineProps(['rating'])
</script>

<template>
  <vue3-star-ratings
    :rating="rating"
    disableClick
    star-size="14"
    starColor="#fbbc04"
    inactiveColor="#c2c2c2"
    style="margin-top: -3.5px;"
  />
</template>

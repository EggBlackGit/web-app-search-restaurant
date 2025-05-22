import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import vue3StarRatings from "vue3-star-ratings";
import VueLazyLoad from 'vue-lazyload';

const app = createApp(App);

app.use(router);
app.use(VueLazyLoad, {
  loading: '/spinner.gif',
  // error: '/not-found.jpg',
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1,
  },
});
app.component("vue3-star-ratings", vue3StarRatings);

app.mount('#app');
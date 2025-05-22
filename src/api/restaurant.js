import api from './axios';

export const searchRestaurants = async (keyword) => {
  try {
    const res = await api.get('/api/search-restaurants', {
      params: { 
        keyword: keyword
      }
    });
    if (res.status !== 200) {
      throw new Error('Failed to fetch place details');
    }
    return res.data;
  } catch (err) {
    console.error('searchRestaurants error:', err);
    return [];
  }
};


<template>
  <div class="practice-box json-box">
    <h3>📝 Axios JSONPlaceholder 통신 실습</h3>
    <button @click="fetchPosts">게시글 3개 가져오기</button>

    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.id }}번:</strong> {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const posts = ref([])
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const fetchPosts = async () => {
  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    posts.value = response.data
  } catch (error) {
    console.error('실패:', error)
  }
}
</script>

<style scoped>
.json-box {
  border-color: #ff9800;
}
button {
  padding: 10px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
ul {
  margin-top: 15px;
  background: #fff3e0;
  padding: 20px 40px;
  border-radius: 8px;
  color: #e65100;
}
</style>

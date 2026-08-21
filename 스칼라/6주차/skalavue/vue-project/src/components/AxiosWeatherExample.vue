<template>
  <div class="practice-box">
    <h3>⚡ Axios 날씨 통신 실습</h3>
    <button @click="fetchWeather" :disabled="isLoading">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 당겨오기' }}
    </button>

    <div v-if="weatherData" class="result">
      <p>
        📍 위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        🌡️ 현재 기온: <strong>{{ weatherData.main.temp }}°C</strong>
      </p>
      <p>
        🌤️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
    </div>
    <div v-else class="empty-text">버튼을 눌러 통신을 시작하세요.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)

const fetchWeather = async () => {
  isLoading.value = true
  // 슬라이드에 있는 API Key 활용
  const API_KEY = '6b3965fb740194652f49cafd62fe5ac6'
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=Gwangju&appid=${API_KEY}&units=metric&lang=kr`

  try {
    const response = await axios.get(URL)
    console.log('통신 성공!', response.data)
    weatherData.value = response.data
  } catch (error) {
    console.error('에러 발생:', error)
    alert('데이터를 가져오지 못했습니다.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.practice-box {
  border: 2px solid #4caf50;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
button {
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.result {
  margin-top: 15px;
  background: #e8f5e9;
  padding: 15px;
  border-radius: 8px;
  color: #2e7d32;
}
.empty-text {
  margin-top: 15px;
  color: #888;
}
</style>

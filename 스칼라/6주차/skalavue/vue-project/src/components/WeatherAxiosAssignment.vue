<template>
  <div class="assignment-box">
    <h2>🚀 과제: 진짜 API로 날씨 앱 확장하기</h2>

    <div class="search-area">
      <input
        v-model="searchCity"
        @keyup.enter="fetchAllData"
        placeholder="영문 도시명 입력 (예: Seoul)"
      />
      <button @click="fetchAllData">검색</button>
    </div>

    <!-- 1. 메인 날씨 데이터 -->
    <div v-if="weatherData" class="weather-card">
      <h3>🌍 {{ weatherData.name }}의 현재 날씨</h3>
      <p>
        🌡️ 기온: <strong>{{ weatherData.main.temp }}°C</strong> (체감:
        {{ weatherData.main.feels_like }}°C)
      </p>
      <p>💧 습도: {{ weatherData.main.humidity }}%</p>
      <p>🌤️ 상태: {{ weatherData.weather[0].description }}</p>
    </div>

    <!-- 2. 추가 API (OpenWeather 대기 오염도) -->
    <div v-if="airPollutionData" class="weather-card air-card">
      <h3>😷 대기 오염도 (OpenWeather 확장 API)</h3>
      <p>
        미세먼지 지수(PM2.5): <strong>{{ airPollutionData.components.pm2_5 }}</strong>
      </p>
      <p>
        일산화탄소(CO): <strong>{{ airPollutionData.components.co }}</strong>
      </p>
    </div>

    <!-- 3. 외부 API (오늘의 명언) -->
    <div v-if="adviceData" class="weather-card advice-card">
      <h3>💡 오늘의 랜덤 조언 (외부 API)</h3>
      <p>"{{ adviceData }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const searchCity = ref('Gwangju') // 기본 검색어 설정
const weatherData = ref(null)
const airPollutionData = ref(null)
const adviceData = ref('')

const API_KEY = '6b3965fb740194652f49cafd62fe5ac6'

const fetchAllData = async () => {
  if (!searchCity.value) return

  try {
    // 1. 실제 날씨 데이터 호출 (요구사항 1)
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${API_KEY}&units=metric&lang=kr`,
    )
    weatherData.value = weatherRes.data

    // 위에서 받아온 좌표(lat, lon)를 활용해 대기 오염도 호출
    const lat = weatherData.value.coord.lat
    const lon = weatherData.value.coord.lon

    // 2. OpenWeather 추가 기능 확장 (요구사항 2)
    const airRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    )
    airPollutionData.value = airRes.data.list[0]

    // 3. 기타 외부 API 확장 (요구사항 3) - 가입 필요 없는 무료 랜덤 명언 API
    const adviceRes = await axios.get('https://api.adviceslip.com/advice')
    adviceData.value = adviceRes.data.slip.advice
  } catch (error) {
    console.error('API 호출 에러:', error)
    alert('데이터를 불러오는데 실패했습니다. 도시 이름을 영문으로 확인해주세요.')
  }
}
</script>

<style scoped>
.assignment-box {
  border: 3px solid #1a73e8;
  padding: 20px;
  border-radius: 12px;
  background: #f0f7ff;
  color: #333;
}
.search-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 20px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.weather-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.air-card {
  background: #fffde7;
}
.advice-card {
  background: #fce4ec;
  font-style: italic;
  font-weight: bold;
}
</style>

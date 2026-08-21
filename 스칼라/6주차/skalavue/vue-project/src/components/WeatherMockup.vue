<script setup>
import { ref } from 'vue'

// [요구사항 1, 5] 임의의 날씨 데이터 배열 (+ 광주 데이터 추가)
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '광주', temp: 31, status: '맑음' }, // 나만의 데이터!
  { id: 'city_04', name: '광주', temp: 31, status: '맑음' },
  { id: 'city_05', name: '제주', temp: 22, status: '바람' },
  { id: 'city_06', name: '대전', temp: 25, status: '흐림' },
])

// [요구사항 3] 한글 검색어 처리를 위한 변수
const searchQuery = ref('')

// [요구사항 4] 하단 상태바 메시지 변수
const statusBarMessage = ref('카드를 클릭하거나 검색해 보세요.')

// 카드 클릭 시 실행될 함수
const selectCity = (cityName) => {
  statusBarMessage.value = `${cityName}이(가) 선택되었습니다.`
}

// [요구사항 4] 상세보기 클릭 시 실행될 함수
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-assignment">
    <h2>⛅ 과제 1: 날씨 (Mockup)</h2>

    <!-- [요구사항 3] 양방향 바인딩 및 한글 처리 (:value, @input) -->
    <div class="box-section search-section">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        placeholder="검색할 도시 이름 입력"
      />
      <p class="search-text">
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </div>

    <!-- [요구사항 1] 배열 렌더링 (v-for) -->
    <div class="box-section list-section">
      <h3>🗺️ 지역별 날씨 현황</h3>

      <div
        v-for="city in weatherList"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city.name)"
      >
        <div class="card-info">
          <h4>{{ city.name }} ({{ city.status }})</h4>
          <p>현재 기온: {{ city.temp }}°C</p>

          <!-- [요구사항 2] 조건부 렌더링 (v-if) -->
          <span v-if="city.temp >= 25" class="badge hot">💧 더움 (25도 이상)</span>
          <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
        </div>

        <!-- [요구사항 4] 이벤트 수식어 (.stop으로 버블링 방지!) -->
        <button class="btn-detail" @click.stop="showDetail(city.name, city.status)">
          상세보기
        </button>
      </div>
    </div>

    <!-- 하단 상태바 -->
    <div class="status-bar">
      {{ statusBarMessage }}
    </div>
  </div>
</template>

<style scoped>
/* 날씨 과제 전용 예쁜 디자인 코드입니다! */
.weather-assignment {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
}
.box-section {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fcfcfc;
}
h2,
h3 {
  margin-top: 0;
  color: white;
}
input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-text {
  font-size: 14px;
  color: #555;
  margin-bottom: 0;
}
.weather-card {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  cursor: pointer;
  transition: 0.2s;
}
.weather-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #222;
}
.card-info p {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
}
.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
.badge.hot {
  background-color: #ffeaea;
  color: #d93025;
}
.badge.cool {
  background-color: #e8f0fe;
  color: #1a73e8;
}
.btn-detail {
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #333;
}
.btn-detail:hover {
  background-color: #f1f1f1;
}
.status-bar {
  background-color: #e6f4ea;
  color: #137333;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
}
</style>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

// [요구사항 1] 반응형 상태 관리
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '광주', temp: 31, status: '맑음' },
])

// [요구사항 5] 본인만의 반응형 상태 변수 추가 (관심 지역)
const favoriteCity = ref('광주')

// [요구사항 2] 검색 도시 (computed 활용) - 검색어 포함 항목만 필터링
const filteredWeatherList = computed(() => {
  if (!searchQuery.value) {
    return weatherList.value
  }
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

// [요구사항 5] 본인만의 Computed 추가 - 검색 결과에 관심 지역이 포함되어 있는지 계산
const hasFavoriteCity = computed(() => {
  return filteredWeatherList.value.some((city) => city.name === favoriteCity.value)
})

// [요구사항 3] 반응형 변수 변화 감시
// 1) selectedCityInfo 감시 (watch 이용)
watch(selectedCityInfo, (newVal) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newVal}"`)
})

// 2) searchQuery 감시 (watchEffect 이용)
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

// [요구사항 5] 본인만의 Watcher 추가 - 관심 지역 출현 감시
watch(hasFavoriteCity, (newVal) => {
  if (newVal) {
    console.log(`⭐ 관심 지역(${favoriteCity.value})이 검색 결과 화면에 나타났습니다!`)
  }
})

// 카드 및 상세보기 클릭 이벤트 함수
const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이(가) 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-assignment">
    <h2>⛅ 과제 2: 날씨 (컴포지션)</h2>

    <!-- 도시 검색 영역 -->
    <div class="box-section search-section">
      <h3>🔍 도시 검색</h3>
      <input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" />
      <p class="search-text">
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>

      <!-- [요구사항 5] 본인만의 커스텀 템플릿 적용 -->
      <p v-if="hasFavoriteCity" class="favorite-alert">
        💡 관심 지역({{ favoriteCity }})이 목록에 포함되어 있습니다!
      </p>
    </div>

    <!-- 지역별 날씨 현황 영역 -->
    <div class="box-section list-section">
      <h3>🗺️ 지역별 날씨 현황</h3>

      <!-- [요구사항 4] 검색 결과 표시 (조건부 렌더링) -->

      <!-- 조건 A, B: 일치하는 데이터가 있거나 검색어가 비었을 때 (데이터 출력) -->
      <template v-if="filteredWeatherList.length > 0">
        <div
          v-for="city in filteredWeatherList"
          :key="city.id"
          class="weather-card"
          @click="selectCity(city.name)"
        >
          <div class="card-info">
            <h4>{{ city.name }} ({{ city.status }})</h4>
            <p>현재 기온: {{ city.temp }}°C</p>
            <span v-if="city.temp >= 25" class="badge hot">💧 더움 (25도 이상)</span>
            <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
          </div>
          <button class="btn-detail" @click.stop="showDetail(city.name, city.status)">
            상세보기
          </button>
        </div>
      </template>

      <!-- 조건 C: 검색어와 일치하는 데이터가 없을 때 안내 문구 -->
      <div v-else class="no-result">
        <p>검색 결과가 일치하는 도시가 없습니다. 😢</p>
      </div>
    </div>

    <!-- 하단 상태바 -->
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
/* 이전 디자인과 동일한 깔끔한 CSS */
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
  margin-top: 10px;
}
.favorite-alert {
  font-size: 13px;
  color: #d93025;
  margin-top: 8px;
  font-weight: bold;
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
.no-result {
  text-align: center;
  padding: 30px 10px;
  color: #888;
  font-weight: bold;
  background-color: #f5f5f5;
  border-radius: 6px;
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

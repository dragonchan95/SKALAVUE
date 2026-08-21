<template>
  <div class="weather-assignment">
    <h2>⛅ 과제 3: 날씨 (컴포넌트)</h2>

    <!-- 1. 검색 박스 조립 -->
    <BaseDashboardCard title="🔍 도시 검색">
      <!-- 자식(SearchBar)에게 데이터를 주고(:), 신호탄을 받습니다(@) -->
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <!-- 2. 리스트 박스 조립 -->
    <BaseDashboardCard title="🗺️ 지역별 날씨 현황">
      <template v-if="filteredWeatherList.length > 0">
        <!-- 자식(WeatherCard)을 데이터 개수만큼 반복(v-for)해서 찍어냅니다 -->
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />
      </template>
      <div v-else class="no-result">
        <p>검색 결과가 없습니다. 😢</p>
      </div>
    </BaseDashboardCard>

    <!-- 3. 상태바 조립 (내가 만든 추가 컴포넌트!) -->
    <StatusBar :message="selectedCityInfo" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 흩어져 있는 부품 파일 4개를 모두 수입해옵니다!
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import StatusBar from './StatusBar.vue'

// 데이터(상태) 모음
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '광주', temp: 31, status: '맑음' },
])

const filteredWeatherList = computed(() => {
  if (!searchQuery.value) return weatherList.value
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

// 자식들이 쏜 신호탄(Emit)을 받아서 처리하는 함수들
const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSelectCard = (cityName) => {
  selectedCityInfo.value = `${cityName}이(가) 선택되었습니다.`
}

const handleClickDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<style scoped>
.weather-assignment {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
}
h2 {
  margin-top: 0;
  color: white;
  margin-bottom: 20px;
}
.no-result {
  text-align: center;
  padding: 30px 10px;
  color: #888;
  font-weight: bold;
  background-color: #f5f5f5;
  border-radius: 6px;
}
</style>

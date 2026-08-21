<template>
  <div>
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="(q) => (searchQuery = q)" />
    </BaseDashboardCard>

    <BaseDashboardCard title="🗺️ 지역별 날씨 현황">
      <template v-if="filteredWeatherList.length > 0">
        <!-- 기존 컴포넌트를 그대로 재활용! -->
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @click-detail="() => goToDetail(city.id)"
        />
      </template>
      <div v-else>검색 결과가 없습니다.</div>
    </BaseDashboardCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// 부품들 가져오기 (경로 주의: views 폴더에서 components 폴더로 나가야 함)
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'

const router = useRouter()
const searchQuery = ref('')
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '광주', temp: 31, status: '맑음' },
])

const filteredWeatherList = computed(() => {
  if (!searchQuery.value) return weatherList.value
  return weatherList.value.filter((c) => c.name.includes(searchQuery.value))
})

// ⭐ 요구사항 3: 상세보기 클릭 시 alert 대신 라우터 이동!
const goToDetail = (id) => {
  router.push('/weather/' + id)
}
</script>

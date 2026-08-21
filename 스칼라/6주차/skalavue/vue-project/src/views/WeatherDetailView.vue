<template>
  <div class="detail-box">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <div v-if="cityData" class="info">
      <p>
        📍 지정 지역: <strong>{{ cityData.name }}</strong>
      </p>
      <p>🌡️ 실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>🌤️ 기상 현황: {{ cityData.status }}</p>
      <p>💧 대기 습도: 55%</p>
      <p>💨 현재 풍속: 2.5m/s</p>
    </div>
    <div v-else>데이터를 불러올 수 없습니다.</div>
    <button class="back-btn" @click="router.push('/')">⬅ 메인으로 돌아가기</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const cityData = ref(null)

const mockData = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '광주', temp: 31, status: '맑음' },
]

onMounted(() => {
  const targetId = route.params.id
  cityData.value = mockData.find((c) => c.id === targetId)
})

const displayTemp = computed(() => {
  if (!cityData.value) return 0
  const rawTemp = cityData.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<style scoped>
.detail-box {
  border: 1px solid #ddd;
  padding: 30px;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #333;
}
.info p {
  font-size: 16px;
  margin-bottom: 10px;
}
.back-btn {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #343a40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<style scoped>
.detail-box {
  border: 1px solid #ddd;
  padding: 30px;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #333;
}
.info p {
  font-size: 16px;
  margin-bottom: 10px;
}
.back-btn {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #343a40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

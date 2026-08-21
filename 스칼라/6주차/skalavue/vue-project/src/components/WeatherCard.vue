<template>
  <div class="weather-card" @click="$emit('select-card', city.name)">
    <div class="card-info">
      <h4>{{ city.name }} ({{ city.status }})</h4>

      <!-- 🔥 고정된 온도가 아닌, 계산된 온도와 스토어의 기호(°C/°F)를 출력! -->
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

      <span v-if="city.temp >= 25" class="badge hot">💧 더움 (25도 이상)</span>
      <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
    </div>
    <button class="btn-detail" @click.stop="$emit('click-detail', city.name, city.status)">
      상세보기
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../stores/configStore'

const props = defineProps({ city: Object })
defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore() // 창고 가져오기

// 🔥 교수님이 주신 섭씨 -> 화씨 변환 계산식 적용!
const displayTemp = computed(() => {
  const rawTemp = props.city.temp // 원본 섭씨 데이터

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환
  }
  return rawTemp // 섭씨일 땐 그대로
})
</script>

<style scoped>
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
</style>

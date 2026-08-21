import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // ==========================================
  // [필수 요구사항] 온도 단위 상태 관리
  // ==========================================
  const unit = ref('celsius') // 초기값: 섭씨

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '°C' : '°F'
  })

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  // ==========================================
  // ⭐ [요구사항 4] 나만의 커스텀 (관심 지역 관리)
  // ==========================================
  const favoriteLoc = ref('광주') // state 추가

  const favoriteMsg = computed(() => `나의 관심 지역: ${favoriteLoc.value}`) // getter 추가

  function changeFavoriteLoc(newLoc) {
    // action 추가
    favoriteLoc.value = newLoc
  }

  return {
    unit,
    unitSymbol,
    toggleUnit,
    favoriteLoc,
    favoriteMsg,
    changeFavoriteLoc,
  }
})

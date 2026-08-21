<template>
  <div class="toggler-container">
    <!-- 커스텀 스토어 요소 표시 -->
    <span class="custom-msg">📍 {{ configStore.favoriteMsg }}</span>

    <!-- 단위 변경 토글 영역 -->
    <div class="unit-toggle">
      <span
        >날씨단위:
        <strong>{{ configStore.unit === 'celsius' ? '섭씨(°C)' : '화씨(°F)' }}</strong></span
      >
      <button @click="configStore.toggleUnit" class="btn-toggle">단위변경</button>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../stores/configStore'
const configStore = useConfigStore() // 창고 가져오기!
</script>

<style scoped>
.toggler-container {
  display: flex;
  align-items: center;
  gap: 20px;
}
.custom-msg {
  font-size: 12px;
  color: #1a73e8;
  background: #e8f0fe;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
}
.unit-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #555;
  white-space: nowrap;
}
.btn-toggle {
  background-color: #4a5568;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}
.btn-toggle:hover {
  background-color: #2d3748;
}
</style>

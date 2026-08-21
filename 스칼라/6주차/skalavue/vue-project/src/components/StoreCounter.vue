<template>
  <div class="pinia-box">
    <h2>🍍 Pinia 카운터 실습</h2>
    <p>
      현재 창고 카운트: <strong>{{ counterStore.count }}</strong>
    </p>
    <p>
      두 배 카운트: <strong>{{ counterStore.doubleCount }}</strong>
    </p>
    <button @click="counterStore.increment()">창고 카운트 증가!</button>
  </div>
</template>

<script setup>
// 아까 만든 창고(Store)를 불러옵니다!
import { useCounterStore } from '../stores/counter'

// 창고 사용을 위해 변수에 담기
const counterStore = useCounterStore()
</script>

<style scoped>
.pinia-box {
  border: 2px solid #ebaa1e;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
  color: white; /* 다크모드 대응 */
}
button {
  padding: 10px 20px;
  background-color: #ebaa1e;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>

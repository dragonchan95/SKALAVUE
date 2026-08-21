<template>
  <div class="box-section">
    <h3>{{ title }}</h3>
    <!-- slot: 부모가 이 안에 어떤 태그를 넣든 그대로 보여주는 마법의 구멍! -->
    <slot></slot>
  </div>
</template>

<script setup>
// 부모로부터 박스 제목(title)을 Props로 받습니다.
defineProps({ title: String })
</script>

<style scoped>
.box-section {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fcfcfc;
}
h3 {
  margin-top: 0;
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
}
</style>

<template>
  <div>
    <!-- @input 이벤트가 발생하면 부모에게 'update-query'라는 신호탄(Emit)을 쏩니다! -->
    <input
      type="text"
      :value="searchQuery"
      @input="$emit('update-query', $event.target.value)"
      placeholder="검색할 도시 이름 입력"
    />
    <p class="search-text">
      검색 중인 도시: <strong>{{ searchQuery }}</strong>
    </p>
  </div>
</template>

<script setup>
defineProps({ searchQuery: String }) // 부모에게서 검색어(Props)를 받음
defineEmits(['update-query']) // 부모에게 보낼 신호탄 이름 등록
</script>

<style scoped>
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
</style>

<template>
  <div class="not-found">
    <h1>🤷‍♂️ 404</h1>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.</p>
    <button @click="$router.push('/')">날씨 메인으로 이동</button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
h1 {
  font-size: 80px;
  margin: 0;
  color: #ff9800;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>

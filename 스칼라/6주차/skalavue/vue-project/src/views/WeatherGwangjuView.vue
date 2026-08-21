<template>
  <div class="gwangju-special">
    <h2>🚨 광주광역시 날씨 특보 🚨</h2>
    <div class="alert-box">
      <p><strong>현재 광주의 기온은 31°C 입니다.</strong></p>
      <p>무더위가 기승을 부리고 있으니 수분 섭취에 유의하시기 바랍니다! 💦</p>
      <small>※ 이 페이지는 나만의 커스텀 라우트 과제 제출용입니다. 😆</small>
    </div>
    <button @click="$router.push('/')">메인으로 피신하기</button>
  </div>
</template>

<style scoped>
.gwangju-special {
  text-align: center;
}
.alert-box {
  background-color: #ffebee;
  color: #c62828;
  padding: 30px;
  border-radius: 8px;
  border: 2px solid #ef5350;
  margin: 20px 0;
}
button {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

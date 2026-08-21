<template>
  <div class="about-box">
    <h3>ℹ️ 서비스 소개</h3>
    <p>본 앱은 Vue 3 및 Vue Router 4 기반으로 제작된 실습용 기상 관측 대시보드입니다.</p>
    <ul>
      <li>Client-side Routing을 통한 새로고침 없는 화면 전환</li>
      <li>동적 라우팅 매칭을 활용한 상세 데이터 연동</li>
    </ul>
    <button class="home-btn" @click="$router.push('/')">대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
.about-box {
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.home-btn {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>

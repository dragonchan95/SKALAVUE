<script setup>
import WeatherMockup from './components/WeatherMockup.vue'
import WeatherComposition from './components/WeatherComposition.vue'
import WeatherParent from './components/WeatherParent.vue'
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/UnitToggler.vue'
import WeatherAxiosAssignment from './components/WeatherAxiosAssignment.vue'
import WeatherElementAssignment from './components/WeatherElementAssignment.vue'
</script>

<template>
  <div style="padding: 20px">
    <WeatherMockup />
    <hr />
    <WeatherComposition />
    <hr />
    <WeatherParent />
    <hr />

    <h2 style="color: white; margin-bottom: 15px">
      🛣️ 과제 4 & 5: 라우터 및 스토어 (페이지 이동, 상태 관리)
    </h2>
    <header>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px dashed #ddd;
          padding-bottom: 15px;
          margin-bottom: 20px;
        "
      >
        <nav class="custom-nav" style="margin: 0">
          <RouterLink to="/">날씨 대시보드</RouterLink>
          <RouterLink to="/about">서비스 소개</RouterLink>
          <RouterLink to="/gwangju-special">광주 특보</RouterLink>
        </nav>

        <UnitToggler />
      </div>
    </header>

    <RouterView />

    <hr style="margin-top: 50px; border-top: 4px solid #333" />
    <!-- 구분선 -->
    <h2 style="color: white; margin-bottom: 15px">⚡ 과제 6: Axios API 통신</h2>

    <WeatherAxiosAssignment />
    <h2 style="color: white; margin-bottom: 15px">⚡ 과제 7: Hands on - Weather UI Library</h2>
    <hr style="margin-top: 50px; border-top: 4px solid #333" />
    <WeatherElementAssignment />
  </div>
</template>

<style scoped>
/* 가로줄(hr)을 조금 더 예쁘게 꾸며주는 스타일 (선택 사항) */
hr {
  margin: 30px 0;
  border: 0;
  border-top: 2px dashed #ddd;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

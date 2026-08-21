# 🌤️ Vue.js 날씨 웹 어플리케이션 프로젝트

## 📌 프로젝트 소개
SKALA Full-Stack Engineering 과정의 Frontend-framework: Vue.js 최종 과제입니다. 
Vue 3의 Composition API를 기반으로 제작된 싱글 페이지 애플리케이션(SPA)이며, OpenWeatherMap API를 연동하여 실시간 날씨 정보를 제공합니다.

* **배포 URL:** https://skalavue-znw1.vercel.app/

---

## 📝 단원별 구현 내역 (Customization)

### 1. Vue 기본 문법 및 디렉티브 (Mockup)
* `v-for`를 사용하여 배열 형태의 날씨 데이터를 목록 카드로 반복 렌더링했습니다.
* `v-if`를 활용하여 기온 기준(25도)에 따라 '더움'과 '선선함' 라벨이 조건부로 렌더링되도록 구현했습니다.
* `v-model`을 사용해 도시 이름 검색 창에 양방향 데이터 바인딩을 적용했습니다.
* 날씨 카드 클릭 시 상태바를 업데이트하고, 상세보기 버튼 클릭 시 이벤트 버블링을 막기 위해 `.stop` 이벤트 수식어를 적용했습니다.

### 2. Composition API 적용
* `searchQuery`, `selectedCityInfo`, `weatherList` 등의 상태를 `ref`를 사용하여 반응형 상태로 정의했습니다.
* `computed`를 활용하여 사용자가 입력한 검색어가 포함된 도시만 필터링하여 화면에 표시하도록 구현했습니다.
* `watch`를 사용하여 선택된 도시 정보가 변경될 때마다 콘솔 로그를 출력하도록 상태 변화를 감시했습니다.
* `watchEffect`를 적용하여 도시 검색어를 타이핑할 때마다 변경 사항을 자동으로 추적하고 기록하도록 구성했습니다.

### 3. Vue 컴포넌트 분리 (Component)
* 유지보수 및 재사용성을 높이기 위해 전체 화면을 4개의 컴포넌트(`WeatherParent`, `BaseDashboardCard`, `SearchBar`, `WeatherCard`)로 분리했습니다.
* **Props & Emits:** 부모 컴포넌트에서 자식으로 데이터를 전달(Props)하고, 자식에서 검색어나 카드 선택 액션이 발생하면 부모에게 이벤트(Emits)를 전달하여 상태를 업데이트했습니다.
* **Slot:** `BaseDashboardCard`에 `<slot>`을 배치하여 검색 박스와 리스트 박스의 레이아웃 디자인을 공통화했습니다.
* `<style scoped>`를 적용하여 각 컴포넌트별로 독립적인 스타일을 가지도록 캡슐화했습니다.

### 4. Vue Router 적용 (SPA 라우팅)
* `vue-router`를 도입하여 페이지 새로고침 없이 화면이 전환되는 SPA 구조를 완성했습니다.
* `App.vue`에 Navigation Bar(`<RouterLink>`)와 메인 콘텐츠 렌더링 구역(`<RouterView>`)을 배치했습니다.
* **동적 라우팅 (Dynamic Route Matching):** `/weather/:cityId` 패턴을 적용하여, 전달받은 파라미터에 따라 해당 지역의 상세 기상 정보를 표시하도록 구현했습니다.
* **Catch-all Route:** 사용자가 잘못된 URL로 접근할 경우를 대비하여 `NotFoundView.vue`로 연결되도록 예외 처리를 추가했습니다.

### 5. 전역 상태 관리 (Pinia)
* 컴포넌트 간 데이터 전달(Props Drilling)의 한계를 극복하기 위해 `Pinia`를 도입했습니다.
* 온도 단위(섭씨/화씨)를 전역으로 관리하는 `configStore.js`를 구축하여 `state`, `getters`, `actions`를 정의했습니다.
* `UnitToggler.vue` 컴포넌트를 네비게이션 바 영역에 배치하여, 사용자가 스위치를 누르면 앱 전체의 온도 단위가 일괄 변경되도록 구현했습니다.

### 6. 비동기 통신 (Axios & OpenWeather API)
* `axios` 라이브러리를 사용하여 백엔드(OpenWeatherMap REST API)와 통신 구조를 확립했습니다.
* 하드코딩되어 있던 Mock 데이터를 제거하고, 실제 날씨 API 데이터를 비동기적(`async/await`)으로 호출하여 화면에 렌더링했습니다.

### 7. UI 라이브러리 적용 및 배포 (Vite Build)
* 외부 UI 라이브러리인 **Element Plus**를 적용하여 전체적인 레이아웃과 폼, 버튼 디자인을 세련되게 리팩토링했습니다.
* `ESLint`와 `Prettier`를 적용하여 코드 품질과 포맷을 일관성 있게 정돈했습니다.
* 보안을 위해 API Key를 `.env` 환경 변수로 분리하여 GitHub에 노출되지 않도록 처리했습니다.
* `Vite` 엔진을 통해 최종 산출물을 빌드하고 정적 웹 호스팅 서버에 상용 배포를 완료했습니다.

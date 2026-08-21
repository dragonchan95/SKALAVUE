<template>
  <el-card class="dashboard-card" v-loading="isLoading">
    <template #header>
      <div class="header-content">
        <h2>✨ 3일차 과제 리마스터 (Element Plus + Real API 적용)</h2>
      </div>
    </template>

    <!-- 1. 검색 영역 -->
    <div style="display: flex; gap: 10px; margin-bottom: 20px">
      <el-input
        v-model="searchKeyword"
        placeholder="검색할 영문 도시 이름 입력 (예: Seoul, London)"
        @keyup.enter="searchCity"
        clearable
      >
        <template #prefix><span style="font-size: 16px">🔍</span></template>
      </el-input>
      <el-button type="primary" @click="searchCity">검색</el-button>
      <el-button @click="loadInitialData">초기화</el-button>
    </div>

    <!-- 2. 지역별 날씨 현황 (3일차 과제 레이아웃 복원) -->
    <el-row :gutter="15">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        v-for="city in weatherList"
        :key="city.id"
        style="margin-bottom: 15px"
      >
        <el-card shadow="hover" class="city-card">
          <h3 style="margin-top: 0">🌍 {{ city.name }}</h3>

          <el-descriptions :column="1" size="small" border>
            <el-descriptions-item label="기온">
              <el-tag :type="city.temp >= 25 ? 'danger' : 'primary'">{{ city.temp }}°C</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="날씨">
              {{ city.status }}
            </el-descriptions-item>

            <!-- 요구사항 2: OpenWeather 추가 API (미세먼지) -->
            <el-descriptions-item label="미세먼지">
              <el-tag size="small" :type="city.pm25 > 25 ? 'danger' : 'success'">
                {{ city.pm25 }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>

          <el-button size="small" style="width: 100%; margin-top: 10px" @click="showDetail(city)"
            >상세보기</el-button
          >
        </el-card>
      </el-col>
    </el-row>

    <!-- 요구사항 3: 기타 외부 API (오늘의 명언) -->
    <el-alert
      v-if="adviceData"
      title="💡 오늘의 랜덤 조언 (외부 API)"
      :description="`\u0022${adviceData}\u0022`"
      type="success"
      show-icon
      :closable="false"
      style="margin-top: 20px"
    />
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchKeyword = ref('')
const weatherList = ref([]) // 여러 도시의 데이터를 담을 배열
const adviceData = ref('')
const isLoading = ref(false)

const API_KEY = import.meta.env.VITE_WEATHER_KEY
const defaultCities = ['Seoul', 'Suwon', 'Busan', 'Gwangju'] // 3일차 과제 도시 목록

// 단일 도시의 날씨와 오염도 데이터를 가져오는 함수
const fetchCityData = async (cityName) => {
  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=kr`,
    )
    const data = weatherRes.data

    const lat = data.coord.lat
    const lon = data.coord.lon
    const airRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    )
    const pm25 = airRes.data.list[0].components.pm2_5

    return {
      id: data.id,
      name: data.name,
      temp: data.main.temp,
      status: data.weather[0].description,
      pm25: pm25,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

// 화면 켜질 때 4개 도시 데이터와 명언을 한 번에 세팅
const loadInitialData = async () => {
  isLoading.value = true
  searchKeyword.value = ''
  weatherList.value = []

  for (const city of defaultCities) {
    const cityData = await fetchCityData(city)
    if (cityData) weatherList.value.push(cityData)
  }

  try {
    const adviceRes = await axios.get('https://api.adviceslip.com/advice')
    adviceData.value = adviceRes.data.slip.advice
  } catch (error) {
    console.error('명언 API 호출 실패', error)
  }

  isLoading.value = false
}

// 특정 도시 검색 시
const searchCity = async () => {
  if (!searchKeyword.value) {
    ElMessage.warning('검색할 도시를 입력하세요.')
    return
  }

  isLoading.value = true
  const cityData = await fetchCityData(searchKeyword.value)

  if (cityData) {
    weatherList.value = [cityData] // 기존 목록 지우고 검색된 도시만 보여주기
    ElMessage.success(`${cityData.name} 날씨를 불러왔습니다.`)
  } else {
    ElMessage.error('도시를 찾을 수 없습니다. 영문으로 다시 확인해주세요.')
  }

  isLoading.value = false
}

const showDetail = (city) => {
  ElMessageBox.alert(
    `🌡️ 현재 기온: ${city.temp}°C<br>
     🌤️ 기상 상태: ${city.status}<br>
     😷 미세먼지(PM2.5): ${city.pm25}`,
    `🌍 ${city.name} 상세 날씨 정보`,
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '확인',
      type: 'info',
    },
  )
}

// 컴포넌트가 화면에 붙자마자 초기 데이터 로드 실행!
onMounted(() => {
  loadInitialData()
})
</script>

<style scoped>
.dashboard-card {
  border: 2px solid #409eff;
}
.header-content h2 {
  margin: 0;
  color: #409eff;
}
.city-card {
  transition: all 0.3s;
}
.city-card:hover {
  transform: translateY(-5px);
}
</style>

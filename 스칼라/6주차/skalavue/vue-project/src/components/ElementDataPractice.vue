<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>🛒 실습 2. 커머스 상품 수량 및 평점 시스템</span>
      </div>
    </template>

    <el-form label-width="120px">
      <el-form-item label="구매 수량 선택">
        <el-input-number v-model="productQuantity" :min="1" :max="10" />
        <span style="margin-left: 10px; color: #909399; font-size: 12px"
          >(최대 10개 구매 가능)</span
        >
      </el-form-item>

      <el-form-item label="상품 만족도 별점">
        <el-rate v-model="productRate" show-score />
      </el-form-item>
    </el-form>

    <el-alert
      :title="`실시간 장바구니 요약: 선택 수량 ${productQuantity}개 / 내가 준 점수 ${productRate}점`"
      type="success"
      show-icon
      :closable="false"
    />
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.card-header {
  font-weight: bold;
}
</style>

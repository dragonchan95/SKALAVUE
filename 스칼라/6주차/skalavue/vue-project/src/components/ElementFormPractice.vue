<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>📝 실습 1. 회원가입 Form & 인풋 제어</span>
      </div>
    </template>

    <el-form :model="userForm" label-width="120px">
      <el-form-item label="이메일 주소">
        <el-input v-model="userForm.email" placeholder="example@email.com" />
      </el-form-item>

      <el-form-item>
        <el-switch
          v-model="userForm.agree"
          active-text="개인정보 수집 및 필수 이용약관에 동의합니다."
        />
      </el-form-item>

      <el-form-item>
        <el-button type="success" style="width: 100%" @click="handleRegister"
          >🚀 회원가입하기</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('✖ 올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('⚠ 이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.card-header {
  font-weight: bold;
}
</style>

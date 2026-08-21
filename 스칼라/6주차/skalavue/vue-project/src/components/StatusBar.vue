<template>
  <div class="status-bar">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({ message: String })
</script>

<style scoped>
.status-bar {
  background-color: #e6f4ea;
  color: #137333;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
}
</style>

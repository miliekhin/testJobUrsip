<script setup>
  defineProps(['label', 'isActive'])
</script>

<template>
  <div
      :class="['box', {active: isActive}]"
  >
    {{ label }}
  </div>
</template>

<style scoped>
  .box{
    font-family: Quicksand, sans-serif;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    height: 56px;
    cursor: pointer;
    padding: 0 20px;
    border: 1px solid transparent;
    border-radius: 10px;
    width: 260px;
    color: var(--dark-color);
    user-select: none;
  }
  .box:hover{
    border: 1px solid #ccc;
    color: black;
  }
  .active{
    background: #E5EFFF;
  }
</style>
<script setup>
  defineProps(['asc'])
</script>
<template>
  <svg :class="{ 'asc': !asc }" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.42001 10L4.59001 13.17L7.76001 10L9.18001 11.41L4.59001 16L0.0100098 11.41L1.42001 10Z" fill="#069697"/>
    <path d="M4.59 2.83L7.76 6L9.17 4.59L4.59 0L0 4.59L1.42 6L4.59 2.83Z" fill="#C6CACC"/>
  </svg>
</template>

<style scoped>
  svg{
    margin-bottom: -3px;
    margin-right: 7px;
  }
  .asc{
    transform: rotate(180deg);
  }
</style>
<template>
  <div>
      <h1>小明每次都要花<button @click="$emit('update:money',money-100)">100</button>元，爸爸还剩{{money}}元</h1>
  </div>
</template>

<script>
export default {
    props:['money']

}
</script>

<style>

</style>
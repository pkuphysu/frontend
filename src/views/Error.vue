<template>
  <div class="text-center mt-4">
    <span v-for="(c, i) in code" :key="i" class="display-1">
      <img v-if="c == 0" :src="`${baseUrl}img/FermionLarge.svg`" width="150px">
      <span v-else>{{ c }}</span>
    </span>
    <div>
      你发现了什么大不了的事情~
    </div>
    <div>
      Hint: 点击上方“预约主页”进入预约系统
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      code: '404',
      baseUrl: process.env.BASE_URL
    }
  }
}
</script>

<style></style>

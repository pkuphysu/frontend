<template>
  <div class="text-center mt-4">
    <span v-for="(c, i) in code" :key="i" class="display-1">
      <img v-if="c == 0" src="/img/FermionLarge.svg" width="150px">
      <span v-else>{{ c }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      code: '404'
    }
  }
}
</script>

<style></style>

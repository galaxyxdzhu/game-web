<template>
  <div class="banner">
    <h3>客户您好，欢迎选择游戏</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Banner',
  computed: {
    ...mapGetters(['platform'])
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 28px;
  background: #f2f2f2;
  border-bottom: 1px solid #ccc;
  h3 {
    font-size: 14px;
    height: 100%;
    line-height: 28px;
  }
}
</style>
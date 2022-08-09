<template>
  <div class="banner">
    <h1>客户您好，欢迎选择{{ platform }}游戏</h1>
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
  height: 35px;
  background: #f2f2f2;
  border-bottom: 1px solid #ccc;
  h1 {
    font-size: 16px;
    height: 100%;
    line-height: 35px;
  }
}
</style>
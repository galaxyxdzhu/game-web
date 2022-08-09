<template>
  <div class="select-flash">
    <h3 class="title">请选择硬盘容量:</h3>
    <van-radio-group
      v-model="size"
      direction="horizontal"
      @change="onSizeChange"
    >
      <van-radio name="190">250G = 190G</van-radio>
      <van-radio name="320">320G = 280G</van-radio>
      <van-radio name="430">500G = 430G</van-radio>
      <van-radio name="790">1000G = 790G</van-radio>
      <van-radio name="1680">2000G = 1680G</van-radio>
      <van-radio name="2500">3000G = 2500G</van-radio>
      <van-radio name="3725">4000G = 3725G</van-radio>
      <van-radio name="5588">6000G = 5588G</van-radio>
    </van-radio-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      size: 190
    }
  },
  methods: {
    ...mapActions({
      setFlashSize: 'setFlashSize'
    }),
    onSizeChange(val) {
      this.setFlashSize(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-flash {
  padding: 0.2rem;
  font-size: 12px;

  .title {
    font-size: 14px;
    color: red;
    text-align: left;
    margin-bottom: 0.12rem;
  }
}
</style>
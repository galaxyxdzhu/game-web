<template>
  <div class="select-flash">
    <h3 class="title">请选择硬盘容量:</h3>
    <van-radio-group
      v-model="size"
      direction="horizontal"
      @change="onSizeChange"
    >
      <van-radio v-for="item in sizes" :key="item.id" :name="item.actualSize"
        >{{ item.normalSize }}G = {{ item.actualSize }}G</van-radio
      >
    </van-radio-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getSizes } from '@/api'
export default {
  data() {
    return {
      size: 0,
      sizes: [],
      sizeMap: {}
    }
  },
  created() {
    this.getSizes()
  },
  methods: {
    ...mapActions({
      setFlashSize: 'setFlashSize',
      setFlashSizeMap: 'setFlashSizeMap'
    }),
    onSizeChange(val) {
      this.setFlashSize(this.sizeMap.get(val))
    },
    async getSizes() {
      const ret = await getSizes()
      if (ret && ret.code) {
        const sizes = new Map()
        ret.data.forEach((item) => {
          sizes.set(item.actualSize, item)
        })
        this.sizes = ret.data
        this.sizeMap = sizes
      }
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
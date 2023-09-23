<template>
  <div class="select-flash">
    <div class="title">
      <h3>请选择硬盘容量:</h3>
      <span
        :class="['dropdown', openStatus ? 'active' : '']"
        @click="triggerOpen"
      >
        <van-icon name="arrow-down" />
      </span>
    </div>
    <van-radio-group
      v-model="size"
      direction="horizontal"
      @change="onSizeChange"
      v-show="!openStatus"
    >
      <van-radio v-for="item in sizes" :key="item.id" :name="item.actualSize"
        >{{ item.normalSize }}G = {{ item.actualSize }}G</van-radio
      >
    </van-radio-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getSizes } from '@/api'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      size: 0,
      sizes: [],
      sizeMap: {},
      openStatus: false
    }
  },
  created() {
    this.getSizes()
  },
  computed: {
    ...mapGetters([
      'selectGames',
      'totalGames',
      'flashSize',
      'curGameType',
      'tableIndex'
    ]),
    selectGamesSize: (state) =>
      state.selectGames
        .reduce((prev, cur) => {
          return prev + cur.size
        }, 0)
        .toFixed(2) || 0
  },
  methods: {
    ...mapActions({
      setFlashSize: 'setFlashSize',
      setFlashSizeMap: 'setFlashSizeMap'
    }),
    onSizeChange(val) {
      this.setFlashSize(this.sizeMap.get(val))
      if (this.flashSize.actualSize - this.selectGamesSize < 0) {
        Dialog.alert({
          message: '亲，您选择的游戏容量已超标，请根据硬盘容量进行选择哦！'
        })
      }
    },
    triggerOpen() {
      this.openStatus = !this.openStatus
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
    display: flex;
    justify-content: space-between;
    .dropdown {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      transition: transform 0.5s linear;
      transform: rotate(0);
      &.active {
        transform: rotate(180deg);
      }
    }
    h3 {
      font-size: 14px;
      color: red;
      text-align: left;
      margin-bottom: 0.12rem;
    }
  }
}
</style>
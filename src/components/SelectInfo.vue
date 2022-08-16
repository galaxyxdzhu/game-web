<template>
  <div class="info-wrapper">
    <div class="info-blank" v-if="fixed"></div>
    <div class="select-info" :style="fixedStyle" ref="info">
      <div class="info-left">
        <div class="info-item">
          <span>硬盘实际容量:</span>
          <span>{{ flashSize }}G</span>
        </div>
        <div class="info-item">
          <span>已选游戏容量:</span>
          <span>{{ selectGamesSize }}G</span>
        </div>
        <div class="info-item">
          <span>硬盘剩余容量:</span>
          <span>{{ remainedSize }}G</span>
        </div>
        <div class="info-item">
          <span>游戏总数:</span>
          <span>{{ selectGames.length }}</span>
        </div>
      </div>
      <div class="info-right">
        <van-button size="small" type="primary" @click="checkSelectGames"
          >查看已选游戏</van-button
        >

        <van-button size="small" type="info" @click="showPicker = true"
          >游戏分类</van-button
        >

        <van-button size="small" type="danger" @click="onSubmit"
          >提交</van-button
        >
      </div>
    </div>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="gameTypes"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getGameTypes } from '@/api'
export default {
  name: 'SelectInfo',
  data() {
    return {
      fixed: false,
      gameTypes: [],
      showPicker: false
    }
  },
  computed: {
    ...mapGetters(['flashSize', 'selectGames', 'selectGamesSize']),
    selectGamesSize: (state) =>
      state.selectGames
        .reduce((prev, cur) => {
          return prev + cur.size
        }, 0)
        .toFixed(2) || 0,
    // 剩余容量
    remainedSize() {
      return this.flashSize - this.selectGamesSize
    },
    fixedStyle() {
      if (this.fixed) {
        return {
          position: 'fixed',
          top: 0,
          left: '50%',
          width: '100%',
          transform: 'translateX(-50%)',
          maxWidth: '450px'
        }
      } else {
        return {
          position: 'static',
          top: 0,
          left: 0
        }
      }
    }
  },
  created() {
    this.getGameTypes()
  },
  mounted() {
    window.addEventListener('scroll', (e) => {
      const top = document.body.scrollTop || document.documentElement.scrollTop
      this.fixed = top > 35 ? true : false
    })
  },
  methods: {
    ...mapActions({
      setCurGameType: 'setCurGameType'
    }),
    /**
     * 获取游戏分类
     */
    async getGameTypes() {
      const ret = await getGameTypes()
      if (ret && ret.code) {
        this.gameTypes = [{ id: 0, text: '所有', name: '' }].concat(
          ret.data.map((item) => {
            return { ...item, text: item.name }
          })
        )
      }
    },
    onConfirm(val) {
      this.showPicker = false
      this.setCurGameType(val.name)
    },
    checkSelectGames() {
      this.$emit('checkSelectGames')
    },
    onSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang="scss">
.info-blank {
  height: 1.8rem;
}
.select-info {
  height: 1.8rem;
  display: grid;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.12rem 0.2rem;
  background: #f2f2f2;
  box-sizing: border-box;
  width: 100%;
  z-index: 10;
  margin: 0 auto;

  .info-left {
    height: 100%;
    width: 100%;
    display: grid;
    grid-column-gap: 0.4rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.4rem 0.4rem;
  }
  .info-right {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.4rem;
    font-size: 12px;
  }
  .info-item {
    font-size: 12px;
    margin: 0.08rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span:last-child:not(.submit-btn) {
      color: red;
      font-weight: bold;
    }
  }
}
</style>

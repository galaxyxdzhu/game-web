<template>
  <div class="select-info" :style="fixedStyle">
    <div class="info-left">
      <div class="info-item">
        <span>游戏硬盘:</span>
        <span>内置</span>
      </div>
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
    </div>
    <div class="info-right">
      <div class="right-top">
        <div class="info-item">
          <span>游戏总数:</span>
          <span>{{ selectGames.length }}</span>
        </div>
      </div>
      <div class="right-bottom right-item">
        <div class="right-item">
          <a class="link" @click="onLinkClick">查看已选游戏</a>
        </div>
        <span class="submit-btn" @click="onSubmit">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SelectInfo',
  data() {
    return {
      fixed: false
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
  mounted() {
    window.addEventListener('scroll', (e) => {
      const top = document.body.scrollTop || document.documentElement.scrollTop
      this.fixed = top > 35 ? true : false
    })
    this.$nextTick(() => {
      this.infoHeight = this.$refs.info.offsetHeight
    })
  },
  methods: {
    onLinkClick() {
      this.$emit('checkSelectGames')
    },
    onSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang="scss">
.select-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  // display: flex;
  // justify-content: space-between;
  // align-items: flex-start;
  padding: 0.12rem 0.2rem;
  background: #f2f2f2;
  box-sizing: border-box;
  width: 100%;
  z-index: 10;
  margin: 0 auto;
  .info-left {
    height: 100%;
    flex: 1;
    margin-right: 0.4rem;
  }
  .info-right {
    height: 100%;
    flex: 1;
    margin-left: 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .right-item {
    text-align: right;
    margin: 0.08rem 0;
  }
  .right-bottom {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .submit-btn {
    display: inline-block;
    padding: 0.08rem 0.24rem;
    background: red;
    color: #fff;
    border-radius: 0.08rem;
    margin-left: 0.08rem;
  }
  .link {
    color: #1989fa;
  }
}
</style>

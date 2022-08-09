<template>
  <div class="container">
    <Banner />
    <SelectInfo
      @checkSelectGames="showSelectGameDialog"
      @submit="handleSubmit"
    />
    <SelectFlash />
    <TableGames />

    <van-popup
      v-model="selectGamesDialogVisble"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <CheckGames @close="onSelectGamesDialogClose" />
    </van-popup>

    <van-popup
      v-model="orderInfoDialogVisble"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <OrderInfo @back="onOrderInfoDialogClose" />
    </van-popup>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import SelectInfo from '@/components/SelectInfo.vue'
import SelectFlash from '@/components/selectFlash.vue'
import TableGames from '@/components/tableGames.vue'
import CheckGames from './CheckGames.vue'
import OrderInfo from './OrderInfo.vue'
import { Dialog } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    Banner,
    SelectInfo,
    SelectFlash,
    TableGames,
    CheckGames,
    OrderInfo
  },
  data() {
    return {
      selectGamesDialogVisble: false,
      orderInfoDialogVisble: false
    }
  },

  mounted() {
    // window.addEventListener('scroll', (e) => {
    //   const top = document.body.scrollTop || document.documentElement.scrollTop
    //   if (top > 35) {
    //     this.fixed = true
    //   } else {
    //     this.fixed = false
    //   }
    // })
    // this.$nextTick(() => {
    //   this.infoHeight = this.$refs.info.offsetHeight
    // })
  },
  computed: {
    ...mapGetters(['selectGames']),
    heightStyle() {
      return {
        height: (this.infoHeight = 'px')
      }
    },
    fixedStyle() {
      if (this.fixed) {
        return {
          position: 'fixed',
          top: 0,
          left: 0
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
  methods: {
    // 显示已选游戏弹窗
    showSelectGameDialog() {
      this.selectGamesDialogVisble = true
    },
    // 提交
    handleSubmit() {
      if (this.selectGames.length) {
        this.orderInfoDialogVisble = true
      } else {
        Dialog.alert({
          message: '亲，请选择游戏！'
        })
      }
    },
    onSelectGamesDialogClose() {
      this.selectGamesDialogVisble = false
    },
    onOrderInfoDialogClose() {
      this.orderInfoDialogVisble = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

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
      <OrderInfo
        @back="onOrderInfoDialogClose"
        @submitSuccess="onOrderInfoDialogClose"
      />
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
  computed: {
    ...mapGetters(['selectGames'])
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

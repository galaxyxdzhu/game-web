<template>
  <div class="container">
    <Banner />
    <SelectInfo
      @checkSelectGames="showSelectGameDialog"
      @submit="handleSubmit"
    />
    <SelectFlash />

    <div class="table-box">
      <TableGames ref="tableGames" :searchKey="search" />
    </div>

    <div class="search">
      <van-search v-model="search" placeholder="请输入游戏名" />
    </div>

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
        @submitSuccess="onOrderSubmit"
      />
    </van-popup>
  </div>
</template>

<script>
import { Notify } from 'vant'
import Banner from '@/components/Banner.vue'
import SelectInfo from '@/components/SelectInfo.vue'
import SelectFlash from '@/components/selectFlash.vue'
import TableGames from '@/components/tableGames.vue'
import CheckGames from './CheckGames.vue'
import OrderInfo from './OrderInfo.vue'
import { Dialog } from 'vant'
import { mapActions, mapGetters } from 'vuex'
import { getSetting } from '@/api'
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
      orderInfoDialogVisble: false,
      search: ''
    }
  },
  created() {
    this.getSetting()
  },

  computed: {
    ...mapGetters(['selectGames'])
  },
  methods: {
    ...mapActions({
      setTableIndex: 'setTableIndex'
    }),
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
      this.$refs.tableGames.clear()
      this.orderInfoDialogVisble = false
    },
    onOrderSubmit() {
      this.$refs.tableGames.clear()
      this.orderInfoDialogVisble = false
      Notify({ type: 'success', message: '提交成功' })
    },
    async getSetting() {
      const ret = await getSetting({ name: 'table_view' })
      if (ret && ret.code) {
        this.tableIndex = ret.data.value
        this.setTableIndex(this.tableIndex || 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .table-box {
    flex: 1;
    overflow: auto;
  }
  .search {
    width: 100%;
    padding: 0.2rem;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0px 12px 2px rgba(0, 0, 0, 0.5);
  }
}
</style>

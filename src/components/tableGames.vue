<template>
  <div class="table-games">
    <div class="search">
      <van-search v-model="search" placeholder="请输入游戏名" />
    </div>
    <div class="table-content">
      <div class="game-item th">
        <span class="checkbox">选择</span>
        <span class="game-name">名称</span>
        <span class="game-size">容量(G)</span>
      </div>
      <div class="game-item" v-for="item in games" :key="item.id">
        <van-checkbox
          class="checkbox"
          v-model="item.checked"
          @change="onSelected(item)"
        ></van-checkbox>
        <span class="game-name">{{ item.name }}</span>
        <span class="game-size">{{ item.size }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getGames } from '@/api'
import { mapActions, mapGetters } from 'vuex'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters(['selectGames', 'totalGames', 'flashSize']),
    games() {
      return this.totalGames.filter(
        (item) => item.name.indexOf(this.search) !== -1
      )
    },
    selectGamesSize: (state) =>
      state.selectGames
        .reduce((prev, cur) => {
          return prev + cur.size
        }, 0)
        .toFixed(2) || 0
  },
  created() {
    this.getGameData()
  },
  methods: {
    ...mapActions({
      setSelectGames: 'setSelectGames',
      setTotalGames: 'setTotalGames'
    }),
    onSelected(item) {
      if (this.flashSize - this.selectGamesSize < 0) {
        Dialog.alert({
          message: '亲，您选择的游戏容量已超标，请根据硬盘容量进行选择哦！'
        })
        item.checked = false
      }
    },
    async getGameData() {
      const ret = await getGames()
      if (ret && ret.code) {
        const totalGames = ret.data.map((item) => {
          return {
            ...item,
            checked: false
          }
        })
        this.setTotalGames(totalGames)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-games {
  padding: 0 0.2rem;
  box-sizing: border-box;
  .search {
    margin-bottom: 0.2rem;
  }
  .game-item {
    height: 0.64rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    &:last-of-type {
      border-bottom: 1px solid #ccc;
    }
  }
  .th {
    span {
      font-weight: bold;
    }
  }
  .van-checkbox,
  .checkbox {
    width: 0.7rem;
    margin-left: 0.08rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .game-size {
    width: 0.9rem;
    height: 100%;
    border-left: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
  .game-name {
    height: 100%;
    flex: 1;
    text-align: left;
    border-left: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding-left: 0.08rem;
  }
}
</style>
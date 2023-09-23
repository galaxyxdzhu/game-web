<template>
  <div class="table-games">
    <!-- <van-tabs v-model="activeTab" animated v-if="tableIndex == 3">
      <van-tab title="表格">
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
      </van-tab>
      <van-tab title="图示">
        <div class="table-image">
          <div class="table-image-item" v-for="item in games" :key="item.id">
            <div class="table-image-left">
              <img :src="gameImage(item)" alt="" />
            </div>
            <div class="table-image-right">
              <p>{{ item.name }}</p>
              <div class="info">
                <span>{{ item.size }}G</span>
                <span>{{ item.genre }}</span>
                <van-checkbox
                  class="checkbox"
                  v-model="item.checked"
                  @change="onSelected(item)"
                ></van-checkbox>
              </div>
              <div class="rate">
                <van-rate :value="item.rate" :size="12" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs> -->

    <div class="table-content" v-if="tableIndex == 1">
      <div class="game-item th">
        <span class="checkbox">选择</span>
        <span class="game-name">名称</span>
        <span class="game-size">容量(G)</span>
      </div>
      <virtual-list
        style="height: 100%; overflow-y: auto; padding: 0 0.2rem"
        scrollable
        :data-key="'id'"
        :data-sources="games"
        :data-component="lineItem"
        :extra-props="{
          onSelected
        }"
      />
    </div>

    <div class="table-image" v-if="tableIndex == 2">
      <virtual-list
        style="height: 100%; overflow-y: auto; padding: 0 0.2rem"
        scrollable
        :data-key="'id'"
        :data-sources="games"
        :data-component="item"
        :extra-props="{
          onSelected
        }"
      />
    </div>

    <van-loading
      style="margin-top: 30px"
      v-if="loading"
      type="spinner"
      color="#1989fa"
    />

    <div style="margin-top: 30px" v-if="!games.length && !loading">
      暂无游戏
    </div>
  </div>
</template>

<script>
import { getGames } from '@/api'
import { mapActions, mapGetters } from 'vuex'
import { Dialog } from 'vant'
import VirtualList from 'vue-virtual-scroll-list'
import GameTableItem from './gameTableItem.vue'
import GameLineItem from './gameLineItem.vue'
export default {
  props: {
    searchKey: ''
  },
  data() {
    return {
      item: GameTableItem,
      lineItem: GameLineItem,
      search: '',
      activeTab: 1,
      gameTypes: [],
      showPicker: false,
      loading: false,
      platform: ''
    }
  },

  computed: {
    ...mapGetters([
      'selectGames',
      'totalGames',
      'flashSize',
      'curGameType',
      'tableIndex'
    ]),
    games() {
      return this.totalGames.filter(
        (item) =>
          item.name.indexOf(this.search) !== -1 &&
          item.genre.indexOf(this.curGameType) !== -1 &&
          item.platform === this.platform
      )
    },
    gameImage() {
      return (item) => {
        return (
          item.src ||
          'https://img0.baidu.com/it/u=1522769245,1660535558&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1660410000&t=257d8b4bfd74a9d3602e6cafad390e2d'
        )
      }
    },
    selectGamesSize: (state) =>
      state.selectGames
        .reduce((prev, cur) => {
          return prev + cur.size
        }, 0)
        .toFixed(2) || 0
  },
  watch: {
    searchKey(val) {
      this.search = val
    }
  },
  created() {
    this.getGameData()
  },
  mounted() {
    const { platform } = this.$route.params
    if (platform) {
      this.platform = platform
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions({
      setSelectGames: 'setSelectGames',
      setTotalGames: 'setTotalGames',
      setCurGameType: 'setCurGameType'
    }),

    onSelected(item, e) {
      if (this.flashSize.actualSize - this.selectGamesSize < 0 && e) {
        Dialog.alert({
          message: '亲，您选择的游戏容量已超标，请根据硬盘容量进行选择哦！'
        })
        item.checked = false
      }
    },
    clear() {
      const totalGames = this.totalGames.map((item) => {
        return {
          ...item,
          checked: false
        }
      })
      this.setTotalGames(totalGames)
    },
    async getGameData() {
      this.loading = true
      const ret = await getGames()
      if (ret && ret.code) {
        const totalGames = ret.data.map((item) => {
          return {
            ...item,
            checked: false
          }
        })
        this.setTotalGames(totalGames)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-games {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  .filter {
    text-align: right;
    color: #1989fa;
    margin-bottom: 0.2rem;
  }

  .search {
    margin-bottom: 0.2rem;
  }
  .game-item {
    height: 0.64rem;
    margin: 0 0.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
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

  .table-image {
    height: 100%;
    overflow: hidden;
  }

  .table-image-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.6rem;
    margin: 0.12rem 0;
    border: 1px solid #ccc;
    overflow: hidden;
    font-size: 12px;
    height: 100%;
    .table-image-left {
      width: 1.6rem;
      height: 1.6rem;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .table-image-right {
      flex: 1;
      height: 1.6rem;
      display: flex;
      padding: 0.08rem;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    p {
      text-align: left;
      margin: 0.12rem;
    }
    .info {
      margin: 0.12rem;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
    .rate {
      margin: 0 0.12rem;
    }
  }
}
.table-content {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
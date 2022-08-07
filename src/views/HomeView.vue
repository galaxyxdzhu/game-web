<template>
  <div class="container">
    <div class="top">
      <div class="banner">客户您好，欢迎选择ps游戏</div>
      <div class="games-padding" v-if="fixed" :style="heightStyle"></div>
      <div class="games-info" ref="info" :style="fixedStyle">
        <div class="info-top">
          <div class="info-left">
            <div class="info-item">
              <span>游戏硬盘:</span>
              <span>内置</span>
            </div>
            <div class="info-item">
              <span>硬盘实际容量:</span>
              <span>{{ selectedFlash }}G</span>
            </div>
            <div class="info-item">
              <span>已选游戏容量:</span>
              <span>{{ selectedGames.size }}G</span>
            </div>
            <div class="info-item">
              <span>硬盘剩余容量:</span>
              <span>{{ reSize }}G</span>
            </div>
          </div>
          <div class="info-right">
            游戏总数: {{ selectedGames.games.length }}
          </div>
        </div>
        <div class="info-bottom">
          <span>查看已选游戏</span>
          <div>
            <span>按步骤选择游戏后，请点击</span>
            <span class="btn" @click="onSelectSubmit">确定</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="flash-select">
        <div class="title"><span>请选择硬盘容量:</span></div>
        <van-radio-group v-model="selectedFlash" direction="horizontal">
          <van-radio name="190">250G = 190G</van-radio>
          <van-radio name="320">320G = 280G</van-radio>
          <van-radio name="430">500G = 430G</van-radio>
          <van-radio name="790">1000G = 790G</van-radio>
          <van-radio name="1680">2000G = 1680G</van-radio>
          <van-radio name="2500">3000G = 2500G</van-radio>
          <van-radio name="3725">4000G = 3725G</van-radio>
        </van-radio-group>
      </div>

      <div class="games-box">
        <div class="title"><span>请选择游戏:</span></div>
        <div class="search-box">
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
    </div>

    <van-popup
      v-model="showSelctedGamesDialog"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Games
        @back="onBack"
        :games="selectedGames.games"
        @orderConfirm="onOrderConfirm"
      />
    </van-popup>

    <van-popup
      v-model="showOrderInfoDialog"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <Info
        @back="onOrderBack"
        :size="selectedFlash"
        :games="selectedGames.games"
        @submitSuccess="onSubmitSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import Games from './Games.vue'
import Info from './Info.vue'
import { getGames } from '@/api'
import { Dialog } from 'vant'
export default {
  name: 'HomeView',
  components: {
    Games,
    Info
  },
  data() {
    return {
      radio: 1,
      showSelctedGamesDialog: false,
      showOrderInfoDialog: false,
      selectedFlash: 0,
      search: '',
      loading: false,
      totolGames: [],
      fixed: false,
      infoHeight: 0,
      reSize: 0
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    window.addEventListener('scroll', (e) => {
      const top = document.body.scrollTop || document.documentElement.scrollTop
      if (top > 35) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    })

    this.$nextTick(() => {
      this.infoHeight = this.$refs.info.offsetHeight
    })
  },
  computed: {
    games() {
      return this.totolGames.filter(
        (item) => item.name.indexOf(this.search) !== -1
      )
    },
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
    },
    selectedGames() {
      const games = this.totolGames.filter((item) => item.checked)
      const size = games
        .reduce((prev, cur) => {
          return prev + cur.size
        }, 0)
        .toFixed(2)
      return {
        games,
        size
      }
    }
  },
  methods: {
    onSubmitSuccess() {
      debugger
      this.showOrderInfoDialog = false
      this.showSelctedGamesDialog = false
    },
    onOrderBack() {
      this.showOrderInfoDialog = false
    },
    onOrderConfirm() {
      this.showOrderInfoDialog = true
    },
    onBack() {
      this.showSelctedGamesDialog = false
    },
    onSelectSubmit() {
      if (this.selectedGames.games.length) {
        this.showSelctedGamesDialog = true
      } else {
        Dialog.alert({
          message: '亲，请选择游戏！'
        })
      }
    },
    onSelected(item) {
      const reSize = this.selectedFlash - this.selectedGames.size
      if (reSize > 0) {
        this.reSize = reSize.toFixed(2)
      } else {
        item.checked = false
        Dialog.alert({
          message: '亲，您选择的游戏容量已超标，请根据硬盘容量进行选择哦！'
        })
      }
    },
    async getList() {
      this.loading = true
      const ret = await getGames()
      if (ret && ret.code) {
        this.totolGames = ret.data.map((item) => {
          return {
            ...item,
            checked: false
          }
        })
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="check-game">
    <div class="title">
      <van-icon name="cross" @click="handleClose" />
    </div>
    <div class="game-item th">
      <span class="checkbox">选择</span>
      <span class="game-name">名称</span>
      <span class="game-size">类型</span>
      <span class="game-size">容量(G)</span>
    </div>
    <div class="game-item" v-for="item in selectGames" :key="item.id">
      <van-checkbox
        class="checkbox"
        v-model="item.checked"
        @change="onSelected(item)"
      ></van-checkbox>
      <span class="game-name">{{ item.name }}</span>
      <span class="game-size">{{ item.genre }}</span>
      <span class="game-size">{{ item.size }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['selectGames'])
  },
  methods: {
    back() {
      this.$emit('back')
    },
    onOrderConfirm() {
      this.$emit('orderConfirm')
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.check-game {
  padding: 0.2rem;
  .title {
    text-align: right;
    height: 0.5rem;
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
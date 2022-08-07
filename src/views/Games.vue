<template>
  <div class="confirm-page">
    <div class="top">
      <van-icon name="cross" class="back-btn" @click="back" />
      <span>欢迎选购游戏</span>
    </div>
    <div class="oprate">
      <van-button type="danger" size="small" @click="onOrderConfirm"
        >提交订单</van-button
      >
    </div>
    <div class="content">
      <div class="games">
        <div class="game-item th">
          <span class="checkbox">选择</span>
          <span class="game-name">名称</span>
          <span class="game-size">类型</span>
          <span class="game-size">容量(G)</span>
        </div>
        <div class="game-item" v-for="item in games" :key="item.id">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    games: {
      type: Array,
      require: true
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    onOrderConfirm() {
      this.$emit('orderConfirm')
    }
  }
}
</script>

<style>
</style>
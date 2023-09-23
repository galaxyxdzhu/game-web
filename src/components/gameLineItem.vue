<template>
  <div class="game-item">
    <van-checkbox
      class="checkbox"
      v-model="source.checked"
      @change="
        (e) => {
          onSelected(source, e)
        }
      "
    ></van-checkbox>
    <span class="game-name">{{ source.name }}</span>
    <span class="game-size">{{ source.size }}</span>
  </div>
</template>

<script>
export default {
  name: 'game-line-source',
  props: {
    source: {
      type: Object,
      required: true
    },
    onSelected: {
      type: Function
    }
  },
  computed: {}
}
</script>

<style lang="scss">
.game-item {
  height: 0.64rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.th {
  border-top: 1px solid #ccc;
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
</style>
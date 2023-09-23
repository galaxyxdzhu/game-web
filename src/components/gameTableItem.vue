<template>
  <div class="table-image-item">
    <div class="table-image-left">
      <img :src="gameImage(source)" alt="" />
    </div>
    <div class="table-image-right">
      <p>{{ source.name }}</p>
      <div class="info">
        <span>{{ source.size }}G</span>
        <span>{{ source.genre }}</span>
        <van-checkbox
          class="checkbox"
          v-model="source.checked"
          @change="
            (e) => {
              onSelected(source, e)
            }
          "
        ></van-checkbox>
      </div>
      <div class="rate">
        <van-rate :value="source.rate" :size="12" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game-table-source',
  props: {
    source: {
      type: Object,
      required: true
    },
    onSelected: {
      type: Function
    }
  },
  computed: {
    gameImage() {
      return (source) => {
        return (
          source.src ||
          'https://img0.baidu.com/it/u=1522769245,1660535558&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1660410000&t=257d8b4bfd74a9d3602e6cafad390e2d'
        )
      }
    }
  }
}
</script>

<style lang="scss">
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
  .checkbox {
    margin-right: 0.2rem;
  }
}
</style>
<template>
  <div class="container home-container">
    <h1 class="title">平台选择</h1>
    <div class="content">
      <div class="grid-box">
        <div
          class="platform-item"
          v-for="item in platforms"
          :key="item.id"
          @click="onPlatformClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      platforms: [
        {
          id: 1,
          name: 'switch'
        },
        {
          id: 2,
          name: 'ps4'
        },
        {
          id: 3,
          name: 'xbox'
        },
        {
          id: 4,
          name: 'psp'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      setPlatform: 'setPlatform'
    }),
    onPlatformClick(item) {
      this.setPlatform(item.name)
      this.$router.push('/main')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  .title {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    height: 40%;
    overflow: hidden;
    .grid-box {
      height: 100%;
      display: grid;
      // grid-template-columns: repeat(2, 1fr);
      // grid-template-rows: repeat(2, 2.667rem);
      justify-items: center;
      // align-items: center;
    }
    .platform-item {
      font-weight: bold;
      font-size: 18px;
      width: 80%;
      height: 60%;
      border: 1px solid #ccc;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .bottom {
    height: 30%;
  }
}
</style>
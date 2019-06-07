<template>
  <div id="header">
    <div>
      <router-link to="/homepage"><button class="header-button">首页</button></router-link>
      <router-link to="/search"><button class="header-button">搜索</button></router-link>
      <button class="header-button">我</button>
    </div>
    <!-- <div id="search-icon-box" @click="showSM" v-show="!showIM">
      <img src="/static/search.png" alt>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "UploadHeader",
  data() {
    return {};
  },
  props:{
    showIM:Boolean
  },
  components: {},
  methods: {
    showSM() {
      this.$emit("showSM");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
}

#header {
  width: 90%;
  margin: 0 auto;
  height: 100px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
}

#search-icon-box {
  width: 30px;
  height: 30px;
  
}

#search-icon-box img {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  
}

#search-icon-box img:hover {
  opacity: 1;
}

.header-button {
  border: none;
  background: none;
  color: #80788f;
  cursor: pointer;
  font-weight: bold;
  opacity: 0.6;
  font-size: 18px;
  margin-right: 50px;
}

.header-button:hover {
  opacity: 1;
}

.header-button:focus {
  outline: 0;
}
</style>

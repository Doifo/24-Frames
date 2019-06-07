<template>
  <div id="header">
    <div id="header-left">
      <router-link to="/search">
        <button>搜索</button>
      </router-link>
      <router-link to="/upload">
        <button>上传</button>
      </router-link>
    </div>
    <div id="header-right">
      <button>我</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {};
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#header-left,
#header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 50px;
}

#header-left button,
#header-right button {
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  margin-right: 60px;
  margin-top: 40px;
  opacity: 0.5;
  font-size: 18px;
}

#header-left button:hover,
#header-right button:hover {
  opacity: 1;
}

#header-left button:focus,
#header-right button:focus {
  outline: 0;
}
</style>

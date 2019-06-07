<template>
  <div id="top-container">
    <div id="logo">24Frames</div>
    <img class="icon" src="/static/menu.png" alt @click="navShowed">
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    navShowed() {
      this.$emit("showMenu");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#top-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 5;
  
  width: 100%;
  margin-top: 20px;
}

#logo {
  color: #fff;
  font-size: 30px;
  font-family: Bahnschrift Condensed;
  font-weight: bold;
  margin-bottom: 10px;
  opacity: 0.5;
  margin-left: 50px;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 50px;
  opacity: 0.5;
  cursor: pointer;
}

.icon:hover {
  opacity: 1;
}
</style>

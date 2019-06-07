<template>
  <transition name="fade">
    <div id="menu-box" v-show="show">
      <div id="mebContent">
        <img src="/static/close.png" @click="closeMenu" class="icon close" alt>

        <div id="nav-container">
          <router-link to="/homepage"> <button class="nav-button">首页</button></router-link>
          <router-link  to="/search"> <button class="nav-button">搜索</button></router-link>
          <router-link to="upload"><button class="nav-button">上传</button></router-link>
          <router-link to="/me"><button class="nav-button">我的</button></router-link>
          <button class="nav-button-logout" @click="logout">退出</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      show: false
    };
  },
  methods: {
    showMenu() {
      this.show = true;
      document.getElementsByClassName("blur")[0].style.filter = "blur(2px)";
    },
    closeMenu() {
      this.show = false;
      document.getElementsByClassName("blur")[0].style.filter = "blur(0px)";
    },
    logout(){
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.$router.push('/')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}

#menu-box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
}

#mebContent {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
}

#nav-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;
}

.nav-button{
  width: 300px;
  height: 60px;
  color: #aaa;
  font-weight: bold;
  border: none;
  background: transparent;
  border-bottom: 1px solid #aaa;
  font-size: 16px;
  cursor: pointer;
}

.nav-button-logout{
  width: 300px;
  height: 60px;
  color: #aaa;
  font-weight: bold;
  border: none;
  background: #333;
  border: 1px solid #aaa;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.nav-button-logout:focus{
  outline: 0;
}

.nav-button-logout:hover{
  color: #fff;
  border: 2px solid #fff;
  background: transparent;

}

.nav-button:focus{
  outline: 0;
}

.nav-button:hover{
  color: #fff;
  border-bottom: 2px solid #fff;
}

.close {
  position: absolute;
  margin: 20px;
  right: 0;
}

.icon {
  width: 30px;
  height: 30px;
  transition: transform 0.1s;
  filter: brightness(70%);
}

.icon:hover {
  filter: brightness(150%);
  transform: scale(1.1);
}
</style>
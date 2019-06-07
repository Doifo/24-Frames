<template>
  <div id="search" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div id="mainModel" class="blur">
      <common-header  @showMenu="toShowMenu"></common-header>
      <div id="inputModel" v-show="showIM">
        <p style="margin-left:50px;margin-right:50px;"><input
          type="text"
          id="input-model-input"
          placeholder="Search..."
          @keydown="search"
          v-model="searchKey"
        ></p>
        <p class="input-model-alert" ref="alert">Hit enter to search</p>
      </div>

      <div id="resultModel" v-show="!showIM">
        <p id="searchResult" v-show="!noResult"><img src="/static/search.png" alt=""><span @click="showSM"> 搜索</span></p>
        <div id="picModel" v-show="!noResult">
          <router-link class="pic-router" v-for="movie in searchedMovies" :key="movie.title" :to="'/detail/' + movie._id"  target="_blank">
            <div
              class="pic"
              :style="'background-image:url('+movie.url+')'"
              @mouseover="showInfor"
              @mouseout="hideInfor"
            >
              <div class="infor-box">
                <p>{{movie.title}}</p>
                <p>{{movie.date}}</p>
              </div>
            </div>
          </router-link>
        </div>

        <div id="nothing-box" v-show="noResult">
          <div style="display:flex;align-items:center">
            <img src="/static/nothing.png" alt> 没有您要寻找的内容
          </div>
          <p style="font-weight:bold;cursor:pointer" @click="showSM">再次搜索</p>
        </div>
      </div>
    </div>

    <div id="searchModel" class="blur" ref="sm">
      <div id="innerModel">
        <div class="icon-box">
          <img @click="closeSM" class="icon" src="/static/close.png">
        </div>
        <div id="search-input-p">
          <p style="margin-left:50px;margin-right:50px;">

            <input
            type="text"
            id="search-input"
            ref="searchInputP"
            placeholder="Search..."
            @keydown="search"
            v-model="searchKey"
          >
          </p>

          <p class="alert" ref="alert">Hit enter to search</p>
        </div>
      </div>
    </div>

    <header-menu ref="menu"></header-menu>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu'
import CommonHeader from "@/components/CommonHeader";
import axios from "axios";
import global from "@/global/index.js";

export default {
  name: "",
  data() {
    return {
      showSearch: false,
      searchKey: "",
      searchedMovies: [],
      showIM: true,
      loading: false,
      noResult: false
    };
  },
  components: {
    CommonHeader,
    HeaderMenu,
  },
  methods: {
    toShowMenu(){
      this.$refs.menu.showMenu()
    },
    showInfor(e) {
      e.target.childNodes[0].style.left = "0";
    },
    hideInfor(e) {
      e.target.childNodes[0].style.left = "-100%";
    },
    showSM() {
      this.$refs.sm.style = "z-index:10";
      this.$refs.sm.style.opacity = "1";
      // this.$refs.searchInputP.classList.add('search-input-show')
      this.$refs.searchInputP.style.width = "100%";
      this.$refs.alert.classList.add("alert-show");
    },
    closeSM() {
      this.$refs.sm.style = "z-index:-10";
      this.$refs.sm.style.opacity = "0";
      // this.$refs.searchInputP.classList.add('search-input-show')
      this.$refs.searchInputP.style.width = "0";
      this.$refs.alert.classList.remove("alert-show");
    },
    search() {
      if (window.event.keyCode != 13) {
        return;
      }
      this.loading = true;
      axios
        .get(global.baseURL + "/findByTitle?title=" + this.searchKey)
        .then(response => {
          this.loading = false;
          this.searchedMovies = response.data.data;
          if (this.searchedMovies.length == 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
          }

          this.searchKey = "";
          this.closeSM();
          this.showIM = false;
        });
    }
  },
  mounted(){
    
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.button {
  z-index: 10;
}

#search {
  height: 100vh;
  position: relative;
}

#mainModel {
  height: 100vh;
  z-index: 10;
  overflow: auto;
  background-color: #bccece;
}

#mainModel::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
#mainModel::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
#mainModel::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

#searchModel {
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #bccece;
  position: absolute;
  top: 0;
  z-index: -10;
  opacity: 0;
  transition: opacity 0.5s;
}

#innerModel {
  position: relative;
  width: 100%;
  height: 100%;
}

#search-input-p {
  position: absolute;
  top: 40%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
}

#search-input {
  width: 0px;
  height: 120px;
  border: none;
  border-bottom: 5px solid #8c9ba0;
  color: #8c9ba0;
  background: transparent;
  font-size: 100px;
  transition: width 0.5s;
  font-family: Impact;
}

#inputModel {
  text-align: center;
  margin-top: 200px;
}

#input-model-input {
  width: 100%;
  height: 120px;
  border: none;
  border-bottom: 5px solid #8c9ba0;
  color: #8c9ba0;
  background: transparent;
  font-size: 100px;
  transition: width 0.5s;
  font-family: Impact;
}

.search-input-show {
}

#search-input:focus,
#input-model-input:focus {
  outline: 0;
}

.alert {
  font-size: 20px;
  margin: 0 auto;
  color: #8c9ba0;
  margin-top: 20px;
  transition: transform 1s;
  font-family: Impact;
  width: 80%;
  text-align: right;
}

.alert-show {
  transform: translateY(-50%);
}

.input-model-alert {
  font-size: 20px;
  margin: 0 auto;
  color: #80788f;
  margin-top: 20px;
  transition: transform 1s;
  font-family: Impact;
  margin-right: 50px;
  text-align: right;
}

.icon-box {
  position: absolute;
  right: 0;
  margin: 40px;
}

.icon {
  width: 25px;
  height: 25px;
  transition: transform 0.1s;
  filter: brightness(50%);
}

.icon:hover {
  filter: brightness(150%);
  transform: scale(1.1);
}

#resultModel {
  margin: 0 auto;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
}

#picModel {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#searchResult {
  font-size: 18px;
  color: #666;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}



#searchResult img{
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

#searchResult span:hover{
  cursor: pointer;
  filter: brightness(130%)
}


.pic-router{
  width: 25%;
  margin-bottom: 20px;
}

.pic {
  width: 100%;
  height: 300px;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  z-index: 1;
}

.pic::before {
  transition: opacity 0.5s ease;
  bottom: 0;
  content: "";
  display: block;
  height: 100%;
  left: 0;
  opacity: 0.3;
  position: absolute;
  width: 100%;
  z-index: 2;
  background-color: #bccece;
}

.pic:hover::before {
  opacity: 0;
}

.pic:hover {
}

.infor-box {
  font-size: 15px;
  font-weight: 700;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: -100%;
  transition: left 0.5s;
  z-index: 3;
}

.infor-box p {
  margin-bottom: 5px;
  background: #38646f;
  width: auto;
  padding-left: 6px;
  padding-right: 6px;
  text-align: center;
  color: #fff;
  border-radius: 1px;
}

#nothing-box img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

#nothing-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  font-size: 18px;
  color: #38646f;
}
</style>

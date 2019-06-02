<template>
  <div id="search" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div id="mainModel">
      <search-header @showSM="showSM" :showIM="showIM"></search-header>
      <div id="inputModel" v-show="showIM">
        <input
          type="text"
          id="input-model-input"
          placeholder="Search..."
          @keydown="search"
          v-model="searchKey"
        >
        <p class="input-model-alert" ref="alert">Hit enter to search</p>
      </div>

      <div id="resultModel" v-show="!showIM">
        <p id="searchResult">搜索结果</p>
        <div id="picModel">
          <div
            class="pic"
            v-for="movie in searchedMovies"
            :key="movie.title"
            :style="'background-image:url('+movie.url+')'"
            @mouseover="showInfor"
            @mouseout="hideInfor"
          >
            <div class="infor-box">
              <p>{{movie.title}}</p>
              <p>{{movie.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="searchModel" ref="sm">
      <div id="innerModel">
        <div class="icon-box">
          <img @click="closeSM" class="icon" src="/static/close.png">
        </div>
        <div id="search-input-p">
          <input
            type="text"
            id="search-input"
            ref="searchInputP"
            placeholder="Search..."
            @keydown="search"
            v-model="searchKey"
          >

          <p class="alert" ref="alert">Hit enter to search</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHeader from "@/components/SearchHeader";
import axios from "axios";
import global from '@/global/index.js'


export default {
  name: "",
  data() {
    return {
      showSearch: false,
      searchKey: "",
      searchedMovies: [],
      showIM: true,
      loading: false
    };
  },
  components: {
    SearchHeader
  },
  methods: {
    showInfor(e) {
      e.target.childNodes[0].style.left = "0";
    },
    hideInfor(e){
      e.target.childNodes[0].style.left = "-100%";
    },
    showSM() {
      this.$refs.sm.style = "z-index:10";
      this.$refs.sm.style.opacity = "1";
      // this.$refs.searchInputP.classList.add('search-input-show')
      this.$refs.searchInputP.style.width = "80%";
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
        .get( global.baseURL + "/findByTitle?title=" + this.searchKey)
        .then(response => {
          this.loading = false;
          this.searchedMovies = response.data;
          this.searchKey = "";
          this.closeSM();
          this.showIM = false;
        });
    }
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
  position: relative;
  height: 100vh;
  width: 100vw;
}

#mainModel {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 10;
  overflow: auto;
  background-color: rgba(146, 219, 236, 1);
  min-width: 1000px;
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
  width: 100vw;
  height: 100vh;
  background-color: #ffd3ca;
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
  border-bottom: 5px solid #cf8095;
  color: #cf8095;
  background: transparent;
  font-size: 100px;
  transition: width 0.5s;
  font-family: 方正粗黑宋简体;
}

#inputModel {
  text-align: center;
  margin-top: 100px;
}

#input-model-input {
  width: 80%;
  height: 120px;
  border: none;
  border-bottom: 5px solid #80788f;
  color: #80788f;
  background: transparent;
  font-size: 100px;
  transition: width 0.5s;
  font-family: 方正粗黑宋简体;
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
  color: #cf8095;
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
  width: 80%;
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
  width: 80%;
  margin: 0 auto;
}

#picModel {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#searchResult {
  font-size: 18px;
  color: #8d8091;
  font-weight: bold;
  margin-bottom: 20px;
}

.pic {
  width: 25%;
  height: 400px;
  margin: 5px;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s;
  cursor: pointer;
}

.pic:hover {
  transform: scale(1.05)
}

.infor-box {
  font-size: 15px;
  font-weight: 700;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: -100%;
  transition: left 0.5s;
}

.infor-box p{
  margin-bottom: 5px;
  background: #fff;
  width: auto;
  padding-left: 4px;
  padding-right:4px;
  text-align: center;
}
</style>

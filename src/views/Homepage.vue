<template>
  <div id="out-container">
    <div
      id="main-container"
      class="blur"
      :style="backImg"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div id="cover"></div>
      <common-header style="position:absolute;top:0" @showMenu="toShowMenu"></common-header>

      <movie-pic-list ref="moviePicList" :movies="movies" v-on:changeBack="setBack"></movie-pic-list>

      <div class="control">
        <img class="icon" src="/static/details.png" @click="showMEB">
        <img class="icon" src="/static/left.png" @click="pageUp">
        <img class="icon" src="/static/right.png" @click="pageDown">
      </div>
      <div class="detail">
        <p class="title">{{backMovie.title}}</p>
        <p class="date">{{backMovie.date}}</p>
        <p class="description">{{backMovie.description}}</p>
      </div>
    </div>

    <evaluation-box ref="evaluation" :backMovie="backMovie"></evaluation-box>
    <header-menu ref="menu"></header-menu>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import MoviePicList from "@/components/MoviePicList";
import EvaluationBox from "@/components/EvaluationBox";
import HeaderMenu from "@/components/HeaderMenu";
import axios from "axios";
import global from "@/global/index.js";

export default {
  name: "Movies",
  data() {
    return {
      page: 1,
      movieSize: 0,
      pages: 0,
      pics: [],
      backMovie: {},
      showedMEB: false,
      movies: [],
      activateNode: {},
      loading: true
    };
  },
  components: {
    CommonHeader,
    MoviePicList,
    EvaluationBox,
    HeaderMenu
  },
  methods: {
    toShowMenu() {
      this.$refs.menu.showMenu();
    },
    showMEB() {
      this.$refs.evaluation.showMEB();
    },
    setBack(back) {
      this.backMovie = back;
    },
    pageUp() {
      this.loading = true;
      this.$refs.moviePicList.removeActivateNode();
      this.page--;
      if (this.page <= 0) this.page = this.pages;
      axios.get(global.baseURL + "/movies?page=" + this.page).then(response => {
        this.loading = false;
        this.movies = response.data.data;
        this.backMovie = this.movies[0];
      });
    },
    pageDown() {
      this.loading = true;
      this.$refs.moviePicList.removeActivateNode();
      this.page++;
      if (this.page > this.pages) this.page = 1;
      axios.get(global.baseURL + "/movies?page=" + this.page).then(response => {
        this.loading = false;
        this.movies = response.data.data;
        this.backMovie = this.movies[0];
      });
    },
    getData() {
      axios.get(global.baseURL + "/size").then(response => {
        this.movieSize = response.data.size;
        this.pages = parseInt(this.movieSize / 6) + 1;
      });

      axios.get(global.baseURL + "/movies?page=1").then(response => {
        this.loading = false;
        this.movies = response.data.data;
        this.backMovie = this.movies[0];
      });
    }
  },
  computed: {
    backImg() {
      return "background-image:url('" + this.backMovie.url + "')";
    }
  },
  mounted() {
    this.getData()
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

#out-container {
  position: relative;
}

#main-container {
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.detail {
  width: 650px;
  z-index: 0;
  margin-left: 50px;
}

.control {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 50px;
  margin-bottom: 20px;
}

.description {
  color: #fff;
  font-size: 14px;
  font-family: 微软雅黑 Light;
  margin-bottom: 20px;
}

.date {
  color: #cea5c7;
  font-size: 20px;
  font-family: 微软雅黑 Light;
  margin-bottom: 10px;
}

.title {
  font-size: 30px;
  font-family: Segoe UI Black;
  color: #fff;
  margin-bottom: 10px;
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

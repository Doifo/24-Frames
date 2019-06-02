<template>
  <div id="movies" :style="backImg" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <main-header></main-header>
    <div id="cover"></div>

    <transition name="fade">
      <div id="movie-evaluation-box" v-show="showedMEB">
        <div id="mebContent">
          <img src="/static/close.png" @click="closeMEB" class="icon close" alt>
          <div id="content">
            <p id="username">
              {{this.backMovie.username}}
              <span>{{this.backMovie.email}}</span>
            </p>
            <article id="movie-evaluation">{{this.backMovie.evaluation}}</article>
          </div>
        </div>
      </div>
    </transition>

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
</template>

<script>
import MainHeader from "@/components/MainHeader";
import MoviePicList from "@/components/MoviePicList";
import axios from "axios";
import global from '@/global/index.js'

export default {
  name: "Movies",
  data() {
    return {
      page: 1,
      movieSize: 0,
      pages:0,
      pics: [],
      backMovie: {},
      showedMEB: false,
      movies: [],
      activateNode: {},
      loading:true
    };
  },
  components: {
    MainHeader,
    MoviePicList
  },
  methods: {
    showMEB() {
      this.showedMEB = true;
    },
    closeMEB() {
      this.showedMEB = false;
    },
    setBack(back) {
      this.backMovie = back;
    },
    pageUp() {
      this.loading = true
      this.$refs.moviePicList.removeActivateNode()
      this.page--;
      if(this.page <= 0) this.page = this.pages 
      axios
        .get( global.baseURL + "/movies?page=" + this.page)
        .then(response => {
          this.loading = false
          this.movies = response.data;
          this.backMovie = this.movies[0];
        });
    },
    pageDown() {
      this.loading = true
      this.$refs.moviePicList.removeActivateNode()
      this.page++;
      if(this.page > this.pages) this.page = 1
      axios
        .get( global.baseURL + "/movies?page=" + this.page)
        .then(response => {
          this.loading = false
          this.movies = response.data;
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
    console.log("mounted");
    axios.get(global.baseURL + "/size").then(response => {
      this.movieSize = response.data;
      this.pages = parseInt(this.movieSize / 6) + 1;
    });

    axios.get(global.baseURL + "/movies?page=1").then(response => {
      this.loading = false
      this.movies = response.data;
      this.backMovie = this.movies[0];
    });

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

#movies {
  min-width: 1300px;
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
  z-index: 10;
  margin-left: 50px;
}

.control {
  z-index: 10;
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

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}

#movie-evaluation-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}

#mebContent {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
}

.close {
  position: absolute;
  margin: 20px;
  right: 0;
}

#content {
  height: 100%;
  width: 60%;
  margin: 0 auto;
  overflow: auto;
  background: #000;
}

#content::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
#content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
#content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

#username {
  margin: 0 50px;
  margin-top: 50px;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
}

#username span {
  font-size: 15px;
  color: grey;
}

#movie-evaluation {
  margin: 0 50px;
  margin-bottom: 50px;
  color: #999;
  white-space: pre-wrap;
  font-family: "Times New Roman", Times, serif;
}
</style>

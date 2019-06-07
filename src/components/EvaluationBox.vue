<template>
  <div>
    <transition name="fade">
      <div id="evaluation-box" v-show="showedMEB">
        <div id="mebContent">
          <img src="/static/close.png" @click="closeMEB" class="icon close" alt>
          <div id="content">
            <p id="username">
              {{this.backMovie.username}}
              <span>{{this.backMovie.email}}</span>
            </p>
            <article id="movie-evaluation" ref="movieEval" v-html="compiledMarkdown"></article>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import marked from "marked";

export default {
  name: "",
  data() {
    return {
      showedMEB:false,
    };
  },
  props:{
    backMovie:{}
  },
  methods:{
    showMEB() {
      let imgs = this.$refs.movieEval.getElementsByTagName("img");
      for (let img of imgs) {
        img.style.width = "100%";
        img.style.height = "auto";
      }
      document.getElementsByClassName('blur')[0].style.filter = 'blur(2px)'
      this.showedMEB = true;
    },
    closeMEB() {
      document.getElementsByClassName('blur')[0].style.filter = 'blur(0px)'
      this.showedMEB = false;
    },
  },
  computed:{
    compiledMarkdown() {
      return marked(this.backMovie.evaluation || "", { sanitize: true });
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

#evaluation-box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
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

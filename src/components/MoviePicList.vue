<template>
  <div id="pic-container">
    <div class="pic-box" v-for="(movie,index) in movies" :key="index">
      <img :src="movie.url" class="pic" @click="setBackground($event,index)">
      <p class="selected">SELECTED</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoviePicList",
  data() {
    return {
      activateNode: {}
    };
  },
  props: {
    movies: Array
  },
  methods: {
    setBackground(e, index) {
      this.setActivateNode(e.target.parentNode);
      this.$emit("changeBack", this.movies[index]);
    },
    setActivateNode(node) {
      if (this.activateNode) {
        this.activateNode.classList.remove("picBoxActivate");
        let nodes = this.activateNode.childNodes;
        nodes[0].classList.remove("picActivate");
        nodes[2].classList.remove("selectedActivate");
      }

      this.activateNode = node;
      node.classList.add("picBoxActivate");
      let newNodes = node.childNodes;
      newNodes[0].classList.add("picActivate");
      newNodes[2].classList.add("selectedActivate");
    },
    removeActivateNode() {
      this.activateNode.classList.remove("picBoxActivate");
      let nodes = this.activateNode.childNodes;
      nodes[0].classList.remove("picActivate");
      nodes[2].classList.remove("selectedActivate");
    },
    picSizeMatch(imgs, width, height) {
      for (let img of imgs) {
        img.onload = function() {
          img.classList.remove("pic-change");
          img.style.left = 0;
          img.style.top = 0;
          let offsetHeight = img.offsetHeight;
          if (offsetHeight < height) {
            // img.style.height = "100%";
            // img.style.width = "auto";
            img.classList.add("pic-change");

            let offset = (img.offsetWidth - width) / 2;
            img.style.left = `-${offset}px`;
          } else {
            let offset = (img.offsetHeight - height) / 2;
            img.style.top = `-${offset}px`; 
          }
        };
      }
    }
  },
  mounted() {},
  updated() {
    console.log("update");
    this.pics = document.getElementsByClassName("pic");
    let box = document.getElementsByClassName("pic-box")[0];
    this.activateNode = box;
    this.removeActivateNode()
    this.setActivateNode(this.activateNode);
    this.picSizeMatch(this.pics, box.offsetWidth, box.offsetHeight);
    //this.picSizeMatch(this.pics, 240, 130);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

#pic-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
}

.pic-box {
  box-sizing: border-box;
  width: 240px;
  height: 130px;
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  margin: 3px;
}

.picBoxActivate {
  border: 4px solid #fff;
}

.selected {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  display: none;
}

.selectedActivate {
  display: block;
}

.pic {
  width: 100%;
  height: auto;
  position: absolute;
  vertical-align: bottom;
  cursor: pointer;
  transition: transform 0.5s;
}

.pic-change {
  height: 100%;
  width: auto;
}

.pic:hover {
  transform: scale(1.1);
  filter: brightness(30%);
}

.picActivate {
  transform: scale(1.1);
  filter: brightness(30%);
}
</style>

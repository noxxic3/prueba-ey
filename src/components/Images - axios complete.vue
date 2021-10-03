<template>
  <div>
    <h1>Images</h1>
    <p class="loadMessage" v-if="loading">Loading images...</p>
    <section>
      <div class="img_container" v-for="(img, index) in images" v-bind:key='index'  data-test="img_container">
        <p><span>Album ID:</span> {{img.albumId}}</p> 
        <p><span>Image ID:</span> {{img.id}}</p> 
        <div class="img_title_section">  
          <h2>{{img.title}}</h2> 
        </div>
        <div class="picture" v-on:click="removeImage(index)">                                <!-- vue-lazyload  does not work with the <picture> element, so multiple <img> elements are used for different image sizes and CSS is used to display one or the other based on screen size. --> 
          <img class="img_full" v-lazy="img.url" alt="Full image">                           <!-- v-bind:src -->   <!-- VueLazyLoad  v-lazy directive causes images to load when entering visible screen. This makes it possible for the page to take a little less time to load. -->        
          <img class="img_thumb" v-lazy="img.thumbnailUrl" alt="Thumbnail image">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Images',
  data(){
    return {
      images: null,
      loading: false,
    }
  },
  async mounted(){
    this.loading = true;
    //const response = await axios.get('photos');
    
    // Axios request
    try {
      const response = await axios({
          method: 'get',
          url: 'photos',
      });
      console.log(response.data);
      this.images = response.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }

    this.loading = false;  
  }, 
  methods: {
    removeImage(index){
      this.images.splice(index, 1);                        // Remove from the index position of the array, 1 single item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.img_container {
  border: 1px solid;
  width: 47%;
  box-sizing: border-box; 
  margin: 4px;
}

.img_container span {
  color: #663300;
}

.img_title_section {
  height: 40px;
  background-color: lightgray;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img_title_section > h2 {
  font-size: 1.1em; 
}

.picture:hover {
  filter: brightness(80%);
}

.picture:active {
  filter: brightness(60%);
}

img {
  width: 100%;
}

.img_full {
  display: none;
}

@keyframes loadingAnimation {               
  0%   {opacity: 100%;}        
  50%  {opacity: 10%;}
  100% {opacity: 100%;}
}

.loadMessage { 
  color: #663300;
  animation-name: loadingAnimation;
  animation-duration: 1s;
  animation-iteration-count: infinite;  
}

		/* Tablet */
		@media screen and (min-width: 768px) {                
      .img_container {
        width: 30%; 
      }
      .img_title_section {
        height: 60px;
        padding: 0 10px;
      }
      .img_full {
        display: block;
      }
      .img_thumb {
        display: none;
      }
		}
		
		/* Desktop */
		@media screen and (min-width: 1280px) {                
      .img_container {
        width: 22%; 
      }
      .img_title_section {
        height: 85px;
        padding: 0 15px;
      }
		}

</style>

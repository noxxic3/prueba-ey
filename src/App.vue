<template>
  <div id="app">

    <h1>App.vue</h1>
    
    <images />

  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  font-size: 0.5em;
}

		/* Tablet */
		@media screen and (min-width: 768px) {                
      #app {
        font-size: 0.8em; 
      }
		}
		
		/* Desktop */
		@media screen and (min-width: 1280px) {                
      #app {
        font-size: 1em;
      }
		}
</style>

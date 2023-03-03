<!-- <template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-button @click="startHacking">Start</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
 -->
 <template>
	 <div class="tabs-container">
   <el-tabs v-model="activeName" center @tab-click="handleClick">
     <el-tab-pane label="Home" name="Home">
		<Home></Home>
	 </el-tab-pane>
     <el-tab-pane label="Gallery" name="Gallery">
		 <Gallery></Gallery>
	</el-tab-pane>
     <el-tab-pane label="About" name="About">
		 <About></About>
	 </el-tab-pane>
   <keep-alive></keep-alive>
   </el-tabs>
   </div>
 </template>
 <script>
	import Home from "./Home.vue";
	import Gallery from "./Gallery.vue";
	import About from "./About.vue";
   export default {
	   components:{Home, Gallery, About}, 
     data() {
       return {
         activeName: 'Home'
       };
     },
     methods: {
       handleClick(tab, event) {
         console.log(tab, event);
       }
     }
   };
 </script>
 <style>
 .tabs-container {
   justify-content: center;
 }
 </style>
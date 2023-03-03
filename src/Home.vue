<template>
	<div>
	    <h1 class="title">Astronomy Picture of the Day</h1>
		<h2 class="subtitle">{{ title }}</h2>
	    <div class="image-container">
	      <img :src="image" :alt="title">
	    </div>
	    <p>{{ explain }}</p>
	  </div>
</template>

<script>
	const apiKey = 'JkdGIyf5bGFRUgJJhTx0tqMnSqydWjRmUapZMVAL';
	const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
	// let url = "https://api.nasa.gov/planetary/apod?api_key=JkdGIyf5bGFRUgJJhTx0tqMnSqydWjRmUapZMVAL"
	export default {
		data(){
			return{
				image:'',
				explain: '',
				title:''
			}
		},
	  methods: {
		fetchData: function(){
		  // fetch请求
		  console.log("fetch")
		  fetch(url, {method: "GET"})
				.then((response) => {
				  return response.json();
				})
				.then((data) => {
				  // 设置响应数据
				  this.image = data.url
				  this.explain = data.explanation
				  this.title = data.title
				  // 控制台输出请求回来的json数据
				  console.log(data)
				})
				.catch(error => {    // 请求失败处理
					console.log(error);
				})
				.then(() => {
				  this.loading = false;
				});
		}
	  },
	  mounted: function(){
		  console.log("Home component")
		  this.fetchData(url);
	  }
	};
</script>

<style>
	.image-container {
	  width: 100%;
	  display: flex;
	  justify-content: center;
	  margin: 20px 0;
	}
	
	img {
	  max-width: 100%;
	  height: auto;
	}
	
	.title {
	  text-align: center;
	}
	.subtitle {
	  text-align: center;
	  font-size: 1.2rem;
	  margin-bottom: 10px;
	}
</style>

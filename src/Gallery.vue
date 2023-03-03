<template>
	<div>
		<div class="search">
		<el-row :gutter="10">
		  <el-col :span="16">
			<el-input placeholder="Search for..." v-model="keyword" @keyup.Enter="searchImage"></el-input>
		  </el-col>
		  <el-col :span="8">
			<el-button type="primary" icon="el-icon-search" @click="searchImage">Search</el-button>
		  </el-col>
		</el-row>
		<el-dialog title="Error" :visible.sync="errorDialogVisible">
		  <span>{{ errorMessage }}</span>
		  <span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="errorDialogVisible = false">OK</el-button>
		  </span>
		</el-dialog>
		</div>
	   <!-- <el-input placeholder="Search for..." v-model="keyword"></el-input>
		<el-button type="primary" icon="el-icon-search" @click="searchImage">Search</el-button> -->
		<el-row :gutter="10">
			<el-col :span="4" v-for="(imageUrl, index) in imagesUrls">
				 <img :src="imageUrl"  style="width: 400px;height: 400px" @click="openImage(imageUrl, index)"/>
			</el-col>
		</el-row>
		<el-button type="primary" icon="el-icon-search" @click="loadMore" placeholder="LOAD MORE">LoadMore</el-button>
		 <el-dialog :visible.sync="dialogVisible" width="50%">
			 <div class="dialog-content">
		      <div class="dialog-image-wrapper">
		        <img :src="selectedImage" alt="Image" class="dialog-image">
		        <p>Description: {{ selectedDes }}</p>
				 <p>Created date: {{ selectedDate }}</p>
		      </div>
		      <span slot="footer" class="dialog-footer">
		        <el-button type="primary" @click="dialogVisible = false">Close</el-button>
		      </span>
			  </div>
		    </el-dialog>
		<!-- <modal name="image-modal" height = 1000>
		    <div class="modal-image">
		      <img :src="selectedImage" alt="image">
		    </div>
		  <div class="modal-description">Description: {{ selectedDes }}</div>
		  <div class="modal-description">Created date: {{ selectedDate }}</div>
		 </modal> -->
	 </div>
</template>

<script>
	
	let url = "https://images-api.nasa.gov/search?q="
	export default {
	  data () {
	    return {
	      keyword: '',
		  imagesUrls:[],
		  jsonUrls:[],
		  description:[],
		  date:[],
		  selectedImage: null,
		  selectedDes: '',
		  selectedDate: '',
		  page: 1,
			busy: true,
			errorDialogVisible: false,
				  errorMessage: '',
				  dialogVisible: false,
	    }
	  },
	  created(){
		  this.searchImage()
	  },
	  methods:{
		  searchImage: function(){
			 this.imagesUrls = [];
			 this.page = 1;
			  let tempurl = url + this.keyword + "&page=1"+ "&media_type=image";
			  console.log(tempurl)
			  fetch(tempurl, {method: "GET"})
					.then((response) => {
					  // 取出响应中的json数据 *
					  return response.json();
					})
					.then((data) => {
					  // 设置响应数据
					  let tempJson = data.collection.items;
					  for(let i = 0; i < tempJson.length; i++){
						  let imageUrl = tempJson[i].links[0].href;
						  this.imagesUrls.push(imageUrl);
						  let jsonUrl = tempJson[i].href;
						  this.jsonUrls.push(jsonUrl);
						  let curdescription = tempJson[i].data[0].description;
						  this.description.push(curdescription);
						  let curDate = tempJson[i].data[0].date_created;
						  this.date.push(curDate);
					  }
					  //console.log(this.imagesUrls)
					})
					.catch(error => {    // 请求失败处理
						console.log(error);
						 this.errorMessage = error.message;
						  this.errorDialogVisible = true;
						this.busy = false
					})
					.then(() => {
					  // this.loading = false;
					});
		  },
		  
		  loadMore() {
				this.page++
		        let tempurl = url + this.keyword + "&page="+this.page+ "&media_type=image";
		        console.log(tempurl)
		        fetch(tempurl, {method: "GET"})
					.then((response) => {
					  // 取出响应中的json数据 *
					  return response.json();
					})
					.then((data) => {
					  // 设置响应数据
					  let tempJson = data.collection.items;
					  this.busy = true
					  
					  if (this.imagesUrls.length === 0) {
						this.busy = true
					  }
					  for(let i = 0; i < tempJson.length; i++){
						  let imageUrl = tempJson[i].links[0].href;
						  this.imagesUrls.push(imageUrl);
						  let jsonUrl = tempJson[i].href;
						  this.jsonUrls.push(jsonUrl);
						  let curdescription = tempJson[i].data[0].description;
						  this.description.push(curdescription);
						  let curDate = tempJson[i].data[0].date_created;
						  this.date.push(curDate);
					  }
					  console.log(this.imagesUrls)
					  // console.log(this.jsonUrls)
					  // 控制台输出请求回来的json数据
					  //console.log(data.collection.items[0].data[0].media_type)
					})
					.catch(error => {    // 请求失败处理
						console.log(error);
						this.busy = false
					})
					.then(() => {
					  // this.busy = false;
					});
		      },
		  
		  openImage(image, index){
			  this.dialogVisible = true;
			  this.selectedImage = image
			  this.selectedDes = this.description[index]
			  this.selectedDate = this.date[index]
		  }
	  },
	}
</script>

<style>

.modal-image {
	table-layout: fixed;
	width: 90%;
	max-width: 1200px;
	height: 90%;
	max-height: 800px;
  text-align: center;
}
.modal-image img {
  max-width: 100%;
  max-height: calc(100vh - 100px); /* set max height to 100vh - 100px */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-description {
  margin-top: 10px;
  text-align: center;
}
.loading {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: #999;
  
}
.search {
  /* display: flex; */
  justify-content: center;
  margin-bottom: 20px;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
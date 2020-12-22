<template>
 
    <div>
           <h1>systemmanagement</h1>
           <el-carousel :height="imgHeight+'px'">
     <el-carousel-item v-for="(item,index) in bannerList" :key="index">
           <img :src="item.picture_url" alt="" class="img_banner" ref="imgHeight" @load="imgLoad">
     </el-carousel-item>
</el-carousel>
    </div>
    
</template>
<script>
export default {
    data(){
  return{
      imgHeight: '150px',  //data初始化
  }
},
mounted() {  // element banner 高度自适应
    window.addEventListener('resize', () => { //  resize:当调整浏览器窗口的大小时触发事件
      this.imgHeight = this.$refs.imgHeight[0].height
      this.imgLoad()
    })
  },
methods:{
  imgLoad(){
      this.$nextTick(() => {
        this.imgHeight = this.$refs.imgHeight[0].height
        console.log(this.$refs.imgHeight[0].height)
    })
  }
}
}
</script>
<template>
<el-button :type="bType" :size="bSize" :plain="bPlain"  :icon="bIcon" @click="btnclick()">{{msg}}</el-button>  
</template>
<script>
export default {
    name:'EsunButton',
    props:{
        buttonType:{
            required:true,
            type:String
        }
    },
    data(){
        return{
            bType:'',
            bSize:'medium',
            bIcon:'',
            bPlain:true,
            msg:''  
        }
    },
    mounted(){
        if(this.buttonType.toUpperCase()=== 'ADD'){
            this.bType = 'primary'
            this.bIcon = 'el-icon-plus'
            this.msg    ='新增'
            return
        }

        if(this.buttonType.toUpperCase() === 'DEL'){
            this.bType ='danger'
            this.bIcon = 'el-icon-delete'
            this.msg    ='删除'
            return 
        }

        if(this.buttonType.toUpperCase() === 'LOOKFOR'){
            this.bType = 'success'
            this.bIcon = 'el-icon-search'
            this.msg   = '查找'
            return
        }
    },
    methods:{
        btnclick(){
            this.$emit('buttonClick')
        }
    }
    
}
</script>
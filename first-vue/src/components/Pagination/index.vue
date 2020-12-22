<template>
    <div :class="{'hidden':hidden}" class="pagination-container">
        <el-pagination
        :background="background"
        :current-page.sync ="currentPage"
        :page-size.sync ="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
export default {
    name:"pagination",
    props:{
        total:{
            required:true,
            type:Number
        },
        page:{
            type:Number,
            default:1
        },
        limit:{
            type:Number,
            default:30
        },
        pageSizes:{
            type:Array,
            default(){
                return [2,4,6,8]
            }
        },
        layout:{
            type:String,
            default:'total,sizes,prev,pager,next,jumper'
        },
        background:{
            type:Boolean,
            default:true
        },
        autoScroll:{
            type:Boolean,
            default:true
        },
        hidden:{
            type:Boolean,
            default:false
        } 
    },
    computed:{
        currentPage:{
            get(){
                return this.page
            },
            set(val){
                this.$emit('update:page',val)
            }
        },
        pageSize:{
            get(){
                return this.limit
            },
            set(val){
                this.$emit('update:limit',val)
            }
        }
    },
    methods:{
        handleSizeChange(val){
            this.$emit('pagination',{page:this.currentPage,limit:val})
      
        },
        handleCurrentChange(val){
            this.$emit('pagination',{pagae:val,limit:this.pageSize})
           
        }
    }
}
</script>

<style  scoped>
.pagination-container.hidden{
    display: none;
}
</style>
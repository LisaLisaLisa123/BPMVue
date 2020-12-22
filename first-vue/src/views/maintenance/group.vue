<template>
  <div> 
    <!-- /// 使用树形穿梭框组件 -->
    <tree-transfer  slot="form"
        :title="title"  
        :from_data='fromData'   
        :to_data='toData'      
        :defaultProps="{label:'orgName'}"
        :pid="parentId"
        @addBtn='add'        
        @removeBtn='remove'   
        :mode='mode'    
        height='400px'    
        placeholder="查找组人员"      
        filter                
        openAll>                
    </tree-transfer>
  
  </div>
</template>
<script>
  import treeTransfer from 'el-tree-transfer'    // 引入
  import api from '@/components/api'
 
  
  export default {
    data(){
      return{
        parentId:"parentId",
        title: ["待选","已选"],    //标题 类型：Array 必填：false 默认：["源列表", "目标列表"]
        mode: "transfer", //设置模式，字段可选值为transfer|addressList 类型：String 必填：false 补充：mode默认为transfer模式，即树形穿梭框模式，可配置字段为addressList改为通讯录模式，通讯录模式时按钮不可自定义名字，如要自定义标题名在title数组传入四个值即可，addressList模式时标题默认为通讯录、收件人、抄送人、密送人
 
        fromData :api.treeCompany.splice(0,999),
        toData:[]    //目标数据 类型：Array 必填：true 补充：数据格式同element-ui tree组件，但必须有id和pid
      }
  
    },
    methods:{ 
      // 监听穿梭框组件添加
      add(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", JSON.stringify(toData) );
        console.log("obj:", obj);
　
      },
      // 监听穿梭框组件移除
      remove(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromDataRemove:", fromData);
        console.log("toDataremove:",  JSON.stringify(toData) );
        console.log("obj:", obj);
      }
    },
    components:{ treeTransfer } // 注册
  }
</script>
<style>

</style>
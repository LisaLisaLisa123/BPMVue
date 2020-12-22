<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="16"
          ><div class="grid-content bg-purple">流程规则</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <!-- 操作栏 -->

            <!-- 增加 -->
            <EsunButton :button-type="'ADD'" @buttonClick="handleCreate" />

            <!-- 删除 -->
            <EsunButton :button-type="'DEL'" @buttonClick="delMore" />

            <!-- 查找 -->
            <EsunButton
              :button-type="'LOOKFOR'"
              @buttonClick="showSearchitem"
            /></div
        ></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        style="width:100%"
        :data="list"
        border
        stripe
        height="250"
        size="medium"
        highlight-current-row 

        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"  />
        <el-table-column label="序号" align="center"    >
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="操作"   align="center" >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="handleClick(scope.row)"
            >
              编辑</el-button
            >
            <el-button type="text" size="medium" @click="delRow(scope.row)">
              删除</el-button
            >
          </template>
        </el-table-column>

        <el-table-column label="规则ID"  >
          <template slot-scope="scope">
            {{ scope.row.ruleId }}
          </template>
        </el-table-column>
        <el-table-column label="流程ID" >
          <template slot-scope="scope">
            {{ scope.row.processId }}
          </template>
        </el-table-column>
        <el-table-column label="步骤ID">
          <template slot-scope="scope">
            {{ scope.row.stepId }}
          </template>
        </el-table-column>
        <el-table-column label="规则名称">
          <template slot-scope="scope">
            {{ scope.row.ruleName }}
          </template>
        </el-table-column>
        <el-table-column label="规则描述">
          <template slot-scope="scope">
            {{ scope.row.ruleDescription }}
          </template>
        </el-table-column>
        <el-table-column label="表达式关系">
          <template slot-scope="scope">
            {{ scope.row.expressionRelation }}
          </template>
        </el-table-column>
        <el-table-column label="TrueStepId">
          <template slot-scope="scope">
            {{ scope.row.trueStepId }}
          </template>
        </el-table-column>
        <el-table-column label="FalseStepId">
          <template slot-scope="scope">
            {{ scope.row.falseStepId }}
          </template>
        </el-table-column> 
      </el-table>
    </el-main>
    <el-footer>
      <pagination
        :total="total"
        :page.sync="pageIndex"
        :limit.sync="pageSize"
        @pagination="fetchData"
      />
    </el-footer>
    <el-dialog
    title="查找规则"
    :visible.sync="showSearch"
    @closed="closeDialog"
    >
    <el-form
    :model="searchlist"
    label-position="right"
    label-width="30%"
    style="width:100%">
    <el-form-item label="规则ID">
        <el-input v-model="searchlist.ruleId"/>
    </el-form-item> 
    </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showSearch = false">取消</el-button>
          <el-button type="primary" @click="sureSearch">确认</el-button>
        </div> 
    </el-dialog>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
        <el-form :mode="addFormList"
        :inline="true"
        lable-position="right"
        label-width="150px" 
        width="100%" >
            <el-form-item label="规则ID">
                <el-input v-model="addFormList.ruleId"   :disabled="formTitle ==='编辑'"/>
            </el-form-item>
            <el-form-item label="流程ID">
                <el-input v-model="addFormList.processId" :disabled="formTitle ==='编辑'"/>
            </el-form-item>
            <el-form-item label="步骤ID">
                <el-input v-model="addFormList.stepId" :disabled="formTitle ==='编辑'" />
            </el-form-item>
            <el-form-item label="规则名称">
                <el-input  v-model="addFormList.ruleName"/>
            </el-form-item>
            <el-form-item label="规则描述">
                <el-input v-model="addFormList.ruleDescription"/>
            </el-form-item>
            <el-form-item label="表达式关系">
                <el-input v-model="addFormList.expressionRelation"/>
            </el-form-item>
            <el-form-item label="TrueStepId">
                <el-input v-model="addFormList.trueStepId"/>
            </el-form-item>
            <el-form-item label="FalseStepId">
                <el-input v-model="addFormList.falseStepId"/>
            </el-form-item> 
        </el-form> 
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false" >取消</el-button>
            <el-button type="primary" @click="dialogStatus ==='create' ? createData():updateData()"
            >确认</el-button>
        </div> 
    </el-dialog>
  </el-container>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import EsunButton from '@/components/EsunButton'
import Pagination from '@/components/Pagination' 
Vue.use(VueAxios, axios)
export default {
  components: { EsunButton, Pagination },
  
  data(){ 
      return{
        list:null,
        searchlist: {},
        showSearch: false,
        formTitle:'新增',
        dialogFormVisible:false,
        addFormList:{},
        formData:{},
        total: 0,
        pageIndex: 1,
        pageSize: 30 
      }

  },
  methods: {
    fetchData() {
      console.log('adsf')
    },
    handleCreate(){
        //新增流程
        this.dialogFormVisible = true
        this.addFormListTitle = "新增"
        this.dialogStatus ='create'
        this.addFormList = {
                ruleId :'',
                processId :'',
                stepId :'',
                ruleName:'',
                ruleDescription :'',
                expressionRelation :'',
                trueStepId :'',
                falseStepId :''
        } 
    },
    createData(){
        this.formData.RuleId  = this.addFormList.ruleId
        this.formData.ProcessId  = this.addFormList.processId
        this.formData.StepId  = this.addFormList.stepId
         this.formData.ruleName  = this.addFormList.ruleName
        this.formData.RuleDescription  = this.addFormList.ruleDescription
        this.formData.ExpressionRelation  = this.addFormList.expressionRelation
        this.formData.TrueStepId  = this.addFormList.trueStepId
        this.formData.FalseStepId  = this.addFormList.falseStepId 
        this.$http
        .post(
            'http://10.124.0.40:10101/api/stepRules/' , this.formData
        )
        .then( response=>{
            alert("processs --" + JSON.stringify(Response.data))
            this.dialogFormVisible = false
            this.getProcess()
        })
        .catch(error =>{
            console.log(error.response)

              if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
          this.$message({
                type:'warning',
                message:'添加失败,错误原因:  ' + error.response.data
            })
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

            // this.$message({
            //     type:'warning',
            //     message:'添加失败'
            // })
        })
    },
    updateData(){
         this.formData.Id  = this.addFormList.Id
        this.formData.RuleId  = this.addFormList.ruleId
        this.formData.ProcessId  = this.addFormList.processId
        this.formData.StepId  = this.addFormList.stepId
          this.formData.ruleName  = this.addFormList.ruleName
        this.formData.RuleDescription  = this.addFormList.ruleDescription
        this.formData.ExpressionRelation  = this.addFormList.expressionRelation
        this.formData.TrueStepId  = this.addFormList.trueStepId
        this.formData.FalseStepId  = this.addFormList.falseStepId 
        this.$http
        .put(
            'http://10.124.0.40:10101/api/stepRules/' , this.formData
        )
        .then( response=>{
            alert("processs --" + JSON.stringify(Response.data))
            this.dialogFormVisible = false
            this.getProcess()
        })
        .catch(error =>{
            console.log(error)
            this.$message({
                type:'warning',
                message:'修改失败'
            })
        })
    },
    getProcess(){
        //判断查询走那个分支
        console.log("this.searchlist.processId" +this.searchlist.processId)
        // if(this.searchlist.processId != undefined && this.searchlist.processVersion != undefined){
        //            this.$http
        // .get("http://10.124.0.40:10101/api/processes/"+this.searchlist.processId + "/" + this.searchlist.processVersion )
        // .then(response =>{
        //     this.list = response.data
        //     this.showSearch = false
            
        // this.searchlist.processId = ''
        //  this.searchlist.processVersion = ''
        // })
        // .catch(error =>{
        //     console.log(error)
        //     this.$message({
        //         type:'warning',
        //         message:'查询失败'
        //     })

        // }) 
        // }else if(this.searchlist.processId != undefined){
        //             this.$http
        // .get("http://10.124.0.40:10101/api/processes/"+ this.searchlist.processId )
        // .then(response =>{
        //     this.list = response.data
        //     this.showSearch = false
            
        // this.searchlist.processId = ''
        //  this.searchlist.processVersion = ''
        // })
        // .catch(error =>{
        //     console.log(error)
        //     this.$message({
        //         type:'warning',
        //         message:'查询失败'
        //     })

        // })
        // }
        // else{

        this.$http
        .get("http://10.124.0.40:10101/api/stepRules")
        .then(response =>{
            this.list = response.data
            this.showSearch = false
            
        this.searchlist.processId = ''
         this.searchlist.processVersion = ''
        })
        .catch(error =>{
            console.log(error)
            this.$message({
                type:'warning',
                message:'查询失败'
            })

        })

        // }

    },
    delMore(){},
    showSearchitem(){
        this.showSearch = true
    },
    handleClick(row){
        this.addFormList ={
             ruleId : row.ruleId ,
            processId : row.processId ,
            stepId : row.stepId ,
            ruleName :row.ruleName,
            ruleDescription : row.ruleDescription ,
            expressionRelation : row.expressionRelation ,
            trueStepId : row.trueStepId ,
            falseStepId : row.falseStepId ,
        }
        this.formTitle = "编辑"
        this.dialogFormVisible = true
         this.dialogStatus = "update"


    },
    delRow(row){
              this.$confirm(
        '确认删除该规则? 规则ID为:  ' + row.ruleId,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.delJudge = ''
          this.deleteData(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteData(d){
              this.$http
        .delete(
          'http://10.124.0.40:10101/api/stepRules/' +
            d.ruleId 
           
        )
        .then(() => { 
           
            this.getProcess()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '删除失败!'
          })
        })


    },
    sureSearch(){
        this.getProcess()
    },
    handleSelectionChange(){},
    closeDialog(){
        this.showSearch = false
    }

  }
}
</script>
<style lang="less">
.el-header,
.el-footer {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  line-height: 40px;
  margin-top: 20px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

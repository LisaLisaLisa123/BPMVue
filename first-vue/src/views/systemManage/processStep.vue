<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="16"
          ><div class="grid-content bg-purple">流程步骤</div></el-col
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

        <el-table-column label="步骤ID"  >
          <template slot-scope="scope">
            {{ scope.row.stepId }}
          </template>
        </el-table-column>
        <el-table-column label="流程ID" >
          <template slot-scope="scope">
            {{ scope.row.processId }}
          </template>
        </el-table-column>
        <el-table-column label="流程版本">
          <template slot-scope="scope">
            {{ scope.row.processVersion }}
          </template>
        </el-table-column>
        <el-table-column label="步骤名称">
          <template slot-scope="scope">
            {{ scope.row.stepName }}
          </template>
        </el-table-column>
        <el-table-column label="步骤类型">
          <template slot-scope="scope">
            {{ scope.row.stepType }}
          </template>
        </el-table-column>
        <el-table-column label="PreviousStepId">
          <template slot-scope="scope">
            {{ scope.row.previousStepId }}
          </template>
        </el-table-column>
        <el-table-column label="下个步骤ID">
          <template slot-scope="scope">
            {{ scope.row.nextStepId }}
          </template>
        </el-table-column>
        <el-table-column label="规则ID">
          <template slot-scope="scope">
            {{ scope.row.ruleId }}
          </template>
        </el-table-column>
        <el-table-column label="接收类型">
          <template slot-scope="scope">
            {{ scope.row.recipientType }}
          </template>
        </el-table-column>
        <el-table-column label="接收人">
          <template slot-scope="scope">
            {{ scope.row.recipient }}
          </template>
        </el-table-column>
        <el-table-column label="IsMutipleApprove">
          <template slot-scope="scope">
            {{ scope.row.isMutipleApprove }}
          </template>
        </el-table-column>

        <el-table-column label="MinApprovalTimes">
          <template slot-scope="scope">
            {{ scope.row.minApprovalTimes }}
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
    title="查找流程步骤"
    :visible.sync="showSearch"
    @closed="closeDialog"
    >
    <el-form
    :model="searchlist"
    label-position="right"
    label-width="30%"
    style="width:100%">
    <el-form-item label="步骤ID">
        <el-input v-model="searchlist.stepId"/>
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
            <el-form-item label="步骤ID">
                <el-input v-model="addFormList.stepId"   :disabled="formTitle ==='编辑'"/>
            </el-form-item>
            <el-form-item label="流程ID">
                <el-input v-model="addFormList.processId" :disabled="formTitle ==='编辑'"/>
            </el-form-item>
            <el-form-item label="流程版本">
                <el-input v-model="addFormList.processVersion" :disabled="formTitle ==='编辑'" />
            </el-form-item>
            <el-form-item label="步骤名称">
                <el-input  v-model="addFormList.stepName"/>
            </el-form-item>
            <el-form-item label="步骤类型">
                <el-input v-model="addFormList.stepType"/>
            </el-form-item>
            <el-form-item label="PreviousStepId">
                <el-input v-model="addFormList.previousStepId"/>
            </el-form-item>
            <el-form-item label="下个步骤ID">
                <el-input v-model="addFormList.nextStepId"/>
            </el-form-item>
            <el-form-item label="规则ID">
                <el-input v-model="addFormList.ruleId"/>
            </el-form-item>
            <el-form-item label="接收类型">
                <el-input v-model="addFormList.recipientType"/>
            </el-form-item>
                <el-form-item label="接收人">
                <el-input v-model="addFormList.recipient"/>
            </el-form-item>
             
            <el-form-item label="IsMutipleApprove">
                <el-input v-model="addFormList.isMutipleApprove"/>
            </el-form-item>
            <el-form-item label="MinApprovalTimes">
                <el-input v-model="addFormList.minApprovalTimes"/>
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
                stepId : '',
                processId : '',
                processVersion : '',
                stepName : '',
                stepType : '',
                previousStepId : '',
                nextStepId : '',
                ruleId  : '',
                recipientType  : '',
                recipient : '',
                isMutipleApprove : '',
                minApprovalTimes : '',
        } 
    },
    createData(){
        this.formData.StepId  = this.addFormList.stepId
        this.formData.ProcessId  = this.addFormList.processId
        this.formData.ProcessVersion  = this.addFormList.processVersion
        this.formData.StepName  = this.addFormList.stepName
        this.formData.StepType  = this.addFormList.stepType
        this.formData.PreviousStepId  = this.addFormList.previousStepId
        this.formData.NextStepId  = this.addFormList.nextStepId
        this.formData.RuleId  = this.addFormList.ruleId
        this.formData.RecipientType  = this.addFormList.recipientType
        this.formData.Recipient  = this.addFormList.recipient
        this.formData.IsMutipleApprove  = this.addFormList.isMutipleApprove
        this.formData.MinApprovalTimes   = this.addFormList.minApprovalTimes
        this.$http
        .post(
            'http://10.124.0.40:10101/api/processSteps/' , this.formData
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
                message:'添加失败'
            })
        })
    },
    updateData(){
         this.formData.Id  = this.addFormList.Id
             this.formData.StepId  = this.addFormList.stepId
        this.formData.ProcessId  = this.addFormList.processId
        this.formData.ProcessVersion  = this.addFormList.processVersion
        this.formData.StepName  = this.addFormList.stepName
        this.formData.StepType  = this.addFormList.stepType
        this.formData.PreviousStepId  = this.addFormList.previousStepId
        this.formData.NextStepId  = this.addFormList.nextStepId
        this.formData.RuleId  = this.addFormList.ruleId
        this.formData.RecipientType  = this.addFormList.recipientType
        this.formData.Recipient  = this.addFormList.recipient
        this.formData.IsMutipleApprove  = this.addFormList.isMutipleApprove
        this.formData.MinApprovalTimes   = this.addFormList.minApprovalTimes
        this.$http
        .put(
            'http://10.124.0.40:10101/api/processSteps/' , this.formData
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
        .get("http://10.124.0.40:10101/api/processSteps")
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
            stepId  : row.stepId,
            processId  : row.processId,
            processVersion  : row.processVersion,
            stepName  : row.stepName ,
            stepType  : row.stepType ,
            previousStepId  : row.previousStepId ,
            nextStepId  : row.nextStepId ,
            ruleId   : row.ruleId ,
            recipientType   : row.recipientType ,
            recipient  : row.recipient,
            isMutipleApprove  : row.isMutipleApprove ,
            minApprovalTimes  : row.minApprovalTimes 
        }
        this.formTitle = "编辑"
        this.dialogFormVisible = true
         this.dialogStatus = "update"


    },
    delRow(row){
              this.$confirm(
        '确认删除该流程步骤? 流程步骤名称为:  ' + row.stepName,
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
          'http://10.124.0.40:10101/api/processSteps/' +
            d.stepId 
             
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

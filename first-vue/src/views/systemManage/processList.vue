<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="16"
          ><div class="grid-content bg-purple">流程列表</div></el-col
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

        <el-table-column label="流程ID"  >
          <template slot-scope="scope">
            {{ scope.row.processId }}
          </template>
        </el-table-column>
        <el-table-column label="流程版本" >
          <template slot-scope="scope">
            {{ scope.row.processVersion }}
          </template>
        </el-table-column>
        <el-table-column label="processCategoryId">
          <template slot-scope="scope">
            {{ scope.row.processCategoryId }}
          </template>
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            {{ scope.row.effective }}
          </template>
        </el-table-column>
        <el-table-column label="流程名称">
          <template slot-scope="scope">
            {{ scope.row.processName }}
          </template>
        </el-table-column>
        <el-table-column label="流程描述">
          <template slot-scope="scope">
            {{ scope.row.processDescription }}
          </template>
        </el-table-column>
        <el-table-column label="initiator">
          <template slot-scope="scope">
            {{ scope.row.initiator }}
          </template>
        </el-table-column>
        <el-table-column label="主表名称">
          <template slot-scope="scope">
            {{ scope.row.mainTableName }}
          </template>
        </el-table-column>
        <el-table-column label="明细表名">
          <template slot-scope="scope">
            {{ scope.row.detailTableName }}
          </template>
        </el-table-column>
        <el-table-column label="shortName">
          <template slot-scope="scope">
            {{ scope.row.shortName }}
          </template>
        </el-table-column>
        <el-table-column label="helpLink">
          <template slot-scope="scope">
            {{ scope.row.helpLink }}
          </template>
        </el-table-column>

        <el-table-column label="schemaId">
          <template slot-scope="scope">
            {{ scope.row.schemaId }}
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
    title="查找流程"
    :visible.sync="showSearch"
    @closed="closeDialog"
    >
    <el-form
    :model="searchlist"
    label-position="right"
    label-width="30%"
    style="width:100%">
    <el-form-item label="流程ID">
        <el-input v-model="searchlist.processId"/>
    </el-form-item>
        <el-form-item label="流程版本">
        <el-input v-model="searchlist.processVersion"/>
    </el-form-item> 
    </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showSearch = false">取消</el-button>
          <el-button type="primary" @click="sureSearch">确认</el-button>
        </div> 
    </el-dialog>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
        <el-form :mode="addFormList"
         
        lable-position="right"
        label-width="150px" 
        width="100%" >
            <el-form-item label="流程ID">
                <el-input v-model="addFormList.processId"   :disabled="formTitle ==='编辑'"/>
            </el-form-item>
            <el-form-item label="流程版本">
                <el-input v-model="addFormList.processVersion" :disabled="formTitle ==='编辑'"/>
            </el-form-item>
            <el-form-item label="processCategoryId">
                <el-input v-model="addFormList.processCategoryId"/>
            </el-form-item>
            <el-form-item label="是否有效">
                <el-input  v-model="addFormList.effective"/>
            </el-form-item>
            <el-form-item label="流程名称">
                <el-input v-model="addFormList.processName"/>
            </el-form-item>
            <el-form-item label="流程描述">
                <el-input v-model="addFormList.processDescription"/>
            </el-form-item>
            <el-form-item label="initiator">
                <el-input v-model="addFormList.initiator"/>
            </el-form-item>
            <el-form-item label="主表名称">
                <el-input v-model="addFormList.mainTableName"/>
            </el-form-item>
            <el-form-item label="明细表名">
                <el-input v-model="addFormList.detailTableName"/>
            </el-form-item>
                <el-form-item label="shortName">
                <el-input v-model="addFormList.shortName"/>
            </el-form-item>
             
            <el-form-item label="helpLink">
                <el-input v-model="addFormList.helpLink"/>
            </el-form-item>
            <el-form-item label="schemaId">
                <el-input v-model="addFormList.schemaId"/>
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
            processId:'',
            processVersion:'',
            processCategoryId:'',
            effective:'',
            processName:'',
            processDescription:'',
            initiator:'',
            mainTableName:'',
            detailTableName:'',
            shortName:'',
            helpLink:'',
            schemaId:''
        } 
    },
    createData(){
        this.formData.ProcessId  = this.addFormList.processId
        this.formData.ProcessVersion  = this.addFormList.processVersion
        this.formData.ProcessCategoryId  = this.addFormList.processCategoryId
        this.formData.Effective  = this.addFormList.effective
        this.formData.ProcessName  = this.addFormList.processName
        this.formData.ProcessDescription  = this.addFormList.processDescription
        this.formData.Initiator  = this.addFormList.initiator
        this.formData.MainTableName  = this.addFormList.mainTableName
        this.formData.DetailTableName  = this.addFormList.detailTableName
        this.formData.ShortName  = this.addFormList.shortName
        this.formData.HelpLink  = this.addFormList.helpLink
        this.formData.SchemaId   = this.addFormList.schemaId
        this.$http
        .post(
            'http://10.124.0.40:10101/api/processes/' , this.formData
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
         this.formData.ProcessId  = this.addFormList.processId
        this.formData.ProcessVersion  = this.addFormList.processVersion
        this.formData.ProcessCategoryId  = this.addFormList.processCategoryId
        this.formData.Effective  = this.addFormList.effective
        this.formData.ProcessName  = this.addFormList.processName
        this.formData.ProcessDescription  = this.addFormList.processDescription
        this.formData.Initiator  = this.addFormList.initiator
        this.formData.MainTableName  = this.addFormList.mainTableName
        this.formData.DetailTableName  = this.addFormList.detailTableName
        this.formData.ShortName  = this.addFormList.shortName
        this.formData.HelpLink  = this.addFormList.helpLink
        this.formData.SchemaId   = this.addFormList.schemaId
        this.$http
        .put(
            'http://10.124.0.40:10101/api/processes/' , this.formData
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
        .get("http://10.124.0.40:10101/api/processes/all")
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
            processId : row.processId ,
            processVersion : row.processVersion ,
            processCategoryId : row.processCategoryId ,
            effective : row.effective ,
            processName : row.processName ,
            processDescription : row.processDescription ,
            initiator : row.initiator ,
            mainTableName : row.mainTableName ,
            detailTableName : row.detailTableName ,
            shortName : row.shortName ,
            helpLink : row.helpLink ,
            schemaId : row.schemaId 
        }
        this.formTitle = "编辑"
        this.dialogFormVisible = true
         this.dialogStatus = "update"


    },
    delRow(row){
              this.$confirm(
        '确认删除该流程? 流程名称为:  ' + row.processName,
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
          'http://10.124.0.40:10101/api/processes/' +
            d.processId +
            '/' +
            d.processVersion  
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
  background-color: #ffffff;
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
  background: #ffffff;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

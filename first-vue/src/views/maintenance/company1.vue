<template>
  <div class="app-container">
    <el-container>
    
      <el-header>
        <!-- 操作栏 -->
       
          <!-- 增加 -->
          <EsunButton :button-type="'ADD'" @buttonClick="handleCreate" />

          <!-- 删除 -->
          <EsunButton :button-type="'DEL'" @buttonClick="delMore" />

          <!-- 查找 -->
          <EsunButton
            :button-type="'LOOKFOR'"
            @buttonClick="showSearchCompany"
          />
      </el-header>
   

      <el-container>
        <el-aside width="200px">
         
            <el-input
              placeholder="输入关键字进行过滤"
              height="50px"
              v-model="filterText"
            >
            </el-input>

            <el-tree
              class="filter-tree"
              :data="tree"
              @node-click="nodeClick"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              ref="tree"
            >
            </el-tree> </el-aside>
        <el-container>
          <el-main>
           
              <el-table
                style="width: 100%"
                :data="list"
                element-loading-text="Loading"
                border
                stripe
                size="medium"
                highlight-current-row
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" align="center" />
                <el-table-column label="序号" align="center" width="100%">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>

                <el-table-column label="操作" width="100%" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="medium"
                      @click="handleClick(scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      type="text"
                      size="medium"
                      @click="delCompany(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="options[0].ifShow"
                  label="公司ID"
                  height="50%"
                  width="100%"
                >
                  <template slot-scope="scope">
                    {{ scope.row.id }}
                  </template>
                </el-table-column>
                <el-table-column v-if="options[1].ifShow" label="公司名称">
                  <template slot-scope="scope">
                    <span> {{ scope.row.companyName }} </span>
                  </template>
                </el-table-column>

                <el-table-column v-id="options[2].ifShow" label="公司简介">
                  <template slot-scope="scope">
                    {{ scope.row.description }}
                  </template>
                </el-table-column>
                <el-table-column v-if="options[3].ifShow" label="是否有效">
                  <template slot-scope="scope">
                    <span>{{ scope.row.effective }}</span>
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
        </el-container>
      </el-container>
      <el-dialog
        title="查找公司"
        :visible.sync="showSearch"
        @closed="closeDialog"
      >
        <el-form
          :model="searchlist"
          label-position="right"
          label-width="30%"
          style="width:80%"
        >
          <el-form-item label="公司ID">
            <el-input v-model="searchlist.companyID" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showSearch = false">取消</el-button>
          <el-button type="primary" @click="getCompany">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
        <el-form
          :mode="temp"
          label-position="right"
          label-width="30%"
          style="width:80%"
        >
          <el-form-item label="公司ID">
            <el-input v-model="temp.id" :disabled="formTitle === '编辑'" />
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="temp.companyName" />
          </el-form-item>
          <el-form-item label="公司简介">
            <el-input v-model="temp.description" />
          </el-form-item>
          <el-form-item label="是否有效">
            <el-input v-model="temp.effective" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="dialogStatus === 'create' ? createData() : updateData()"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import EsunButton from '@/components/EsunButton'
import Pagination from '@/components/Pagination'
Vue.use(VueAxios, axios)
export default {
  name: 'Table',
  components: { EsunButton, Pagination },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      //  tableData: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }],
      options: [
        {
          name: '公司ID',
          ifShow: true
        },
        {
          name: '公司名称',
          ifShow: true
        },
        {
          name: '公司简介',
          ifShow: true
        },
        {
          name: '是否有效',
          ifShow: true
        }
      ],
      list: null,
      listLoading: true,
      searchlist: {},
      showSearch: false,
      formTitle: '新增',
      dialogFormVisible: false,
      formData: {},
      delList: [], // 多选删除数组
      filterText: '',
      data: [],
      tree: [],
      temp: {},
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      defaultProps: {
        children: 'children',
        label: 'companyName'
      }
    }
  },
  created() {
    this.showSearchCompany(), this.load(), this.fetchData()
  },
  methods: {
    load() {
      this.$http
        .get('http://10.124.0.40:10101/api/companies/all')
        .then(response => {
          this.data = response.data
          this.data.forEach(x => {
            x.parentid = 0
          })

          var parent = { id: 0, companyName: '公司', parentid: 99999 }
          this.data.unshift(parent)

          this.data.forEach(x => {
            //根节点为99999，然后依次展开
            if (x.parentid == 99999) {
              x.lv = 1
              x.children = []
              this.tree.push(x)
              console.log('lisa1 ' + x.id + 'lisa2' + JSON.stringify(x))
              this.getTree(x.id, x)
            }
          })
          console.log('tree1 ' + JSON.stringify(this.data))
          console.log('tree666 ' + JSON.stringify(this.tree))
        })
    },
    getTree(id, data) {
      console.log('lisa3333333 ' + JSON.stringify(data))
      this.data.forEach(x => {
        console.log('lisa3 ' + id + 'lisa4' + JSON.stringify(x))
        if (x.parentid == id) {
          console.log('lisa3 ==============s')
          x.lv = data.lv + 1
          if (!data.children) data.children = []
          data.children.push(x)
          this.getTree(x.id, x)
        }
      })
    },
    nodeClick(node) {
      this.searchlist.companyID = node.id
      this.getCompany()
    },
    filterNode(value, tree) {
      if (!value) return true
      return tree.companyName.indexOf(value) !== -1
    },
    //每次选中多选框时
    handleSelectionChange() {
      //每次清空数组
      this.delList = []
    },
    delCompany(company) {
      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delComp(company)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delComp(company) {
      this.listLoading = true
      alert('EEEEE' + JSON.stringify(company))
      this.$http
        .delete(
          'http://10.124.0.40:10101/api/companies/' + company.id + '/inactive'
        )
        .then(response => {
          alert('删除' + JSON.stringify(response))
          this.getCompany()
          this.listLoading = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(response => {
          console.log(response)
          this.listLoading = false
          this.$message({
            type: 'warning',
            message: '删除失败!'
          })
        })
    },
    getCompany() {
      this.listLoading = true
      if (
        this.searchlist.companyID != undefined &&
        this.searchlist.companyID != 0
      ) {
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' +
              this.searchlist.companyID
          )
          .then(response => {
            this.list = []
            this.list.push(response.data)
            // alert(response.data.id)
            this.listLoading = false
            this.showSearch = false
          })
          .catch(err => {
            console.log(err)
            this.list = []

            this.showSearch = false
          })
      } else {
        this.$http
          .get('http://10.124.0.40:10101/api/companies/all')
          .then(response => {
            this.list = response.data
            this.listLoading = false
            this.showSearch = false
          })
          .catch(err => {
            console.log(err)
            this.showSearch = false
          })
      }
    },
    showSearchCompany() {
      this.listLoading = true
      this.searchlist = {
        // name: getUsername(),
        // token: getToken(),
        // username: ''
      }
      this.showSearch = true
    },
    closeDialog() {
      this.showSearch = false
    },
    handleCreate() {
      this.formData = []
      this.formTitle = '新增'
      this.temp = {
        id: '',
        companyName: '',
        description: '',
        effective: ''
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      //将数据传入formData ,传给组件
      this.formData.formTitle = this.formTitle
      this.formData.temp = this.temp
      this.formData.dialogStatus = this.dialogStatus
      this.formData.dialogFormVisible = this.dialogFormVisible
    },
    createData() {
      this.listLoading = true
      this.$http
        .post('http://10.124.0.40:10101/api/companies', {
          companyName: this.temp.companyName,
          description: this.temp.description,
          effective: this.temp.effective
        })
        .then(response => {
          alert('insert' + JSON.stringify(response))
          this.dialogFormVisible = false
          this.getCompany()
        })
        .catch(response => {
          console.log(response)
          this.listLoading = false
          this.$message({
            type: 'warning',
            message: '添加失败!'
          })
        })
    },
    delMore() {},
    handleClick(row) {
      this.temp = {
        id: row.id === undefined ? '' : row.id,
        companyName: row.companyName === undefined ? '' : row.companyName,
        description: row.description === undefined ? '' : row.description,
        effective: row.effective === undefined ? '' : row.effective
      }

      this.formTitle = '编辑'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      //数据添加到formdata,传给子组件
      this.formData.formTitle = this.formTitle
      this.formData.temp = this.temp
      this.formData.dialogStatus = this.dialogStatus
      this.formData.dialogFormVisible = this.dialogFormVisible
    },
    updateData() {
      this.listLoading = true
      this.$http
        .put('http://10.124.0.40:10101/api/companies', {
          id: this.temp.id,
          companyName: this.temp.companyName,
          description: this.temp.description,
          effective: this.temp.effective
        })
        .then(response => {
          alert('update' + JSON.stringify(response))
          this.dialogFormVisible = false
          this.getCompany()
          this.tree = []
          this.load()
        })
        .catch(response => {
          alert('updateerr' + JSON.stringify(response))
          this.listLoading = false
          this.$message({
            type: 'warning',
            message: '编辑失败!'
          })
        })
    },
    fetchData() {
      this.listLoading = true
      this.$http
        .get('http://10.124.0.40:10101/api/companies/all')
        .then(response => {
          this.data = response.data
          this.total = response.data.length
          this.listLoading = false
        })
    }
  }
}
</script>
 
 <style>
 .el-aside{
   margin-top: 20px;
 }
 </style>

 

<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="tree"
            :props="defaultProps"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            @node-contextmenu="rightClick"
            @node-click="nodeClick"
            accordion
            ref="tree"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
          >
          </el-tree>
          <EsunButton :button-type="'ADD'" @buttonClick="handleCreate" />
          <EsunButton :button-type="'DEL'" @buttonClick="delMore" />
        </el-aside>
        <el-container>
          <el-main>
            <el-table
              style="width:100%"
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
                    @click="deldepartment(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>

              <el-table-column v-if="options[0].ifShow" label="父级名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.parentName }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[1].ifShow" label="公司">
                <template slot-scope="scope">
                  <span>{{ scope.row.compName }}</span>
                </template>
              </el-table-column>

              <el-table-column v-if="options[2].ifShow" label="域名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.domainName }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[3].ifShow" label="部门名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.departmentName }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[4].ifShow" label="是否有效">
                <template slot-scope="scope">
                  <span>{{ scope.row.effective }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[5].ifShow" label="是否虚构">
                <template slot-scope="scope">
                  <span>{{ scope.row.isVirtual }}</span>
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
        <!--鼠标右键点击出现页面-->
        <div v-show="menuVisible">
          <el-menu
            id="rightClickMenu"
            @select="handleRightSelect"
            active-text-color="red"
            text-color="black"
          >
            <el-menu-item index="1">
              <span solt="title">添加部门</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span solt="title">修改部门 </span>
            </el-menu-item>
            <el-menu-item index="3">
              <span solt="title">删除部门</span>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- 新增和修改节点 -->
        <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="公司ID" :label-width="formLabelWidth">
              <el-input v-model="form.companyId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="域ID" :label-width="formLabelWidth">
              <el-input v-model="form.domainId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="父级ID" :label-width="formLabelWidth">
              <el-input
                v-model="form.parentDepartmentId"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="父级名称" :label-width="formLabelWidth">
              <el-input v-model="form.parentName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="form.departmentName" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否有效" :label-width="formLabelWidth">
              <el-input v-model="form.effective" clearable></el-input>
            </el-form-item>
            <el-form-item label="isVirtual" :label-width="formLabelWidth">
              <el-input v-model="form.isVirtual" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogStatus === 'create' ? createData() : updateData()"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-container>
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
      options: [
        {
          name: '父级名称',
          ifShow: true
        },
        {
          name: '公司',
          ifShow: true
        },
        {
          name: '域名称',
          ifShow: true
        },
        {
          name: '部门名称',
          ifShow: true
        },
        {
          name: '是否有效',
          ifShow: true
        },
        {
          name: '是否虚构',
          ifShow: true
        }
      ],
      list: null,
      filterText: '',
      tree: [],
      menuVisible: false,
      NODE: null,
      DATA: null,
      objectID: null,
      delJudge: 'tree',
      dialogFormVisible: false,
      form: {
        CompanyId: '',
        domainId: '',
        parentDepartmentId: '',
        parentName: '',
        departmentName: '',
        effective: '',
        isVirtual: ''
      },
      formLabelWidth: '120px',
      formtitle: '新增部门',
      formData: {},
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      defaultProps: {
        children: 'children',
        label: 'orgName'
      }
    }
  },
  created() {
    this.load()
  },
  mounted() {
    window.treeAll = this.$refs.tree
  },
  methods: {
    load() {
      this.$http
        .get('http://10.124.0.40:10101/api/orgtree/department')
        .then(response => {
          alert('asdfas' + JSON.stringify(response.data))
          this.data = response.data
          this.data.forEach(x => {
            if (x.parentId == 0 && x.orgType == 1) {
              x.children = []
              this.tree.push(x)
              this.getTree(x.id, x)
            }
          })
        })
    },

    getTree(id, data) {
      this.data.forEach(x => {
        if (x.parentId == id) {
          if (!data.children) data.children = []
          data.children.push(x)
          this.getTree(x.id, x)
        }
      })
    },
    filterNode(value, tree) {
      if (!value) return true
      return tree.orgName.indexOf(value) !== -1
    },
    rightClick(event, object, value, element) {
      //如果是公司就不显示右键
      if (object.orgType != 1) {
        //判断重复点击右键只出现一个

        if (this.objectID !== object.id) {
          this.objectID = object.id
          this.menuVisible = true
          this.DATA = object
          this.NODE = value
        } else {
          this.menuVisible = !this.menuVisible
        }
      }

      document.addEventListener('click', e => {
        this.menuVisible = false
        console.log(e)
      })

      let menu = document.querySelector('#rightClickMenu')
      /* 菜单定位基于鼠标点击位置 */
      menu.style.left = event.clientX + 20 + 'px'
      menu.style.top = event.clientY + 'px'
      menu.style.position = 'absolute' // 为新创建的DIV指定绝对定位
      menu.style.width = 80 + 'px'
      menu.style.background = 'rgba(255,255,255,0.2)'
      console.log('右键被点击的左侧:', menu.style.left)
      console.log('右键被点击的顶部:', menu.style.top)
      console.log('右键被点击的event:', event)
      console.log('右键被点击的object:', JSON.stringify(object))
      console.log('右键被点击的value:', value)
      console.log('右键被点击的element:', element)
    },
    handleRightSelect(key) {
      console.log(key)
      if (key == 1) {
        this.NodeAdd(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key == 2) {
        this.NodeEdit(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key == 3) {
        this.NodeDel(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key == 4) {
        console.log('4')
        this.menuVisible = false
      }
    },
    NodeAdd(n, d) {
      //新增节点

      console.log(n)
      console.log('d' + JSON.stringify(d))
      this.form = {
        companyId: '',
        domainId: '',
        parentDepartmentId: '',
        parentName: '',
        departmentName: '',
        effective: '',
        isVirtual: ''
      }
      //判断层级
      // if (n.level >= 3) {
      //   this.$message.error('最多只支持三级！')
      //   return false
      // }
      this.dialogFormVisible = true

      this.formtitle = '新增部门'
      this.dialogStatus = 'create'
      let parentDomain = []
      //将已有的数据带出
      //判断当前节点是否是域，是就直接传id查找，否则就传parentId
      if (d.orgType == '2') {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, d.id)
      } else {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, d.parentId)
      }

      // alert('parentDomain' + parentDomain[0].CompanyId)

      this.form.companyId = parentDomain[0].CompanyId
      this.form.domainId = parentDomain[0].DomainId

      this.form.parentDepartmentId = d.id
      this.form.parentName = d.orgName
    },
    NodeEdit(n, d) {
      console.log(n)
      console.log('dlisa' + JSON.stringify(d))
      this.dialogFormVisible = true
      console.log('d.children.orgName ' + JSON.stringify(d.children))
      //点击编辑时，带出数据
      //判断当前节点是否是域，是就直接传id查找，否则就传parentId
      let parentDomain =[]
      if (d.orgType == '2') {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, d.id)
      } else {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, d.parentId)
      }

      this.form = { 
        id: d.id,
        companyId: parentDomain[0].CompanyId ===undefined?'':parentDomain[0].CompanyId,
        domainId : parentDomain[0].DomainId ===undefined?'':parentDomain[0].DomainId, 
        parentDepartmentId: d.parentId === undefined ? '' : d.parentId,
        parentName: parentDomain[0].parentName === undefined ? parentDomain[0].orgName : parentDomain[0].parentName,
        domainName:parentDomain[0].orgName === undefined ? '' : parentDomain[0].orgName,
        departmentName: d.orgName === undefined ? '' : d.orgName,
        effective: '',
        isVirtual:''
      }
      this.formtitle = '修改部门'
      this.dialogStatus = 'update'
    },
    NodeDel(n, d) {
      
      //判断是部门就删除
      if(d.orgType == 3){
        //判断有子级就不删除  
        console.log("删除的数据包含——————" + JSON.stringify(d))
      if (d.children) {
        this.$message.error('有子菜单，不允许删除')
        return false
      } 
      
      this.$confirm('确认删除该部门? 部门名称为:  ' + d.orgName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          alert("asdf")
          this.delJudge = 'tree'
          this.deleteData(d)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        }
    },
    createData() {
      //用于保存新增的数据

      this.formData.CompanyId = this.form.companyId
      this.formData.DomainId = this.form.domainId
      this.formData.ParentDepartmentId = this.form.parentDepartmentId
      this.formData.DepartmentName = this.form.departmentName
      this.formData.IsVirtual = this.form.isVirtual
      this.formData.Effective = this.form.effective

      this.$http
        .post(
          'http://10.124.0.40:10101/api/companies/' +
            this.formData.CompanyId +
            '/domains/' +
            this.formData.DomainId +
            '/departments',
          this.formData
        )
        .then(response => {
          alert('insert' + JSON.stringify(response))
          this.tree = []
          this.load()
          this.dialogFormVisible = false
        })
        .catch(response => {
          console.log('insert error' + JSON.stringify(response))
          this.$message({
            type: 'waring',
            messsage: '添加失败！'
          })
        })
    },
    updateData() {
      alert('update')
      //将数据放在实体中
      this.formData.Id = this.form.id
      this.formData.CompanyId = this.form.companyId
      this.formData.DomainId = this.form.domainId
      this.formData.ParentDepartmentId = this.form.parentDepartmentId 
      this.formData.DepartmentName = this.form.departmentName
      this.formData.Effective = this.form.effective
      this.formData.IsVirtual = this.form.isVirtual
      this.$http
        .put(
           'http://10.124.0.40:10101/api/companies/' +
            this.formData.CompanyId +
            '/domains/' +
            this.formData.DomainId +
            '/departments',
          this.formData
        )
        .then(response => {
          alert('update       ' + JSON.stringify(this.formData))
          this.dialogFormVisible = false
          this.tree = []
          this.load()
          this.getModFormDepartment(this.formData)
        })
        .catch(response => {
          alert('updateError' + JSON.stringify(response))
          this.$message({
            type: 'warning',
            message: '编辑失败！'
          })
        })
    },
    deleteData(d) {
      alert("sdfsdfsdf----" + JSON.stringify(d))
 
      this.$http
        .delete(
          'http://10.124.0.40:10101/api/companies/' +
            d.companyId +
            '/domains/' +
            d.domainId +
              '/departments/' + d.id
        )
        .then(() => {
           alert('treeParent删除--------' + d.id)
          this.tree = []
          this.load()
          //如果是树中的删除，不需要下面的更新
          if (this.delJudge != 'tree') {
            this.getDelFormDepartment(d)
          }

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
    handleSelectionChange() {},
    handleClick(row) {
      alert('行编辑查询' + JSON.stringify(row))
      this.form = { 
        id: row.id,
        companyId: row.companyId ,
        domainId : row.domainId, 
        parentDepartmentId: row.parentDepartmentId,
        parentName: row.parentName ,
        domainName:row.domainName ,
        departmentName: row.departmentName,
        effective: row.effective ,
        isVirtual:row.isVirtual 
      }

      this.formtitle = '修改部门'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    nodeClick(node) {
      console.log('点击的是神____' + JSON.stringify(node))

      //关闭右键点击的小功能
      this.menuVisible = false
      if(node.orgType != 1){
        //根据id查找当前点击数据
      this.getDomainDepartment(node)

      }
   
    },
    deldepartment(row) {
      this.$confirm('确认删除该部门? 部门名称为:  ' + row.departmentName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
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
    fetchData() {},
    getDomainDepartment(node) { 

      //判断当前节点是否是域，是就直接传id查找，否则就传parentId 
      let parentDomain =[]
      if (node.orgType == '2') {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, node.id)
      } else {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, node.parentId)
      }

      // console.log('treeParent——————————' + JSON.stringify(treeParent))
      //判断当前点击的是域还是部门，如果是域就带出所有的部门，否则带出子部门

      if (node.orgType == 2) {
        //如果点击的是域，获取域下所有的部门
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' +
              parentDomain[0].CompanyId +
              '/domains/' +
              node.id +
              '/departments/all'
          )
          .then(response => {
            this.list = []
            console.log('域下数据' + JSON.stringify(response.data))
 
            //整理公司数据让他满足list格式，用foreach(树结构中的)循
            this.data = response.data
            this.data.forEach(x => {
              if (node.id == x.domainId) {
                //加入公司名字，域名称
                x.compName = parentDomain[0].CompName
                x.domainName = node.orgName
               x.parentName = parentDomain[0].parentName === undefined ? parentDomain[0].orgName : parentDomain[0].parentName
              } 
              this.list.push(x)
            })
          })
          .catch(response => {
            alert('searchdata' + JSON.stringify(response))
            this.listLoading = false
            this.$message({
              type: 'warning',
              message: '查询数据失败!'
            })
          })
      }

      if (node.orgType == 3) {
        alert("node------" + JSON.stringify(node))
        // debugger
        console.log(this.$refs.tree.getCheckedKeys())

        console.log('nodeClick+++++ ' + this.$refs.tree) 
        //如果点击的是部门，展示该部门下所有的部门
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' +
              parentDomain[0].CompanyId +
               '/domains/' +
                parentDomain[0].DomainId+
              '/departments/parentDepartment/' + 
              node.id
          )
          .then(response => {
            this.list = []  
            //整理公司数据让他满足list格式，用foreach(树结构中的)循
            this.data = response.data
            this.data.forEach(x => { 
                  //加入公司名字，域名称
                x.compName = parentDomain[0].CompName
                x.parentName  = node.orgName
               x.domainName = parentDomain[0].parentName === undefined ? parentDomain[0].orgName : parentDomain[0].parentName
              this.list.push(x)
            })
          })
          .catch(response => {
            alert('searchdata1' + JSON.stringify(response))
            this.listLoading = false
            this.$message({
              type: 'warning',
              message: '查询数据失败!'
            })
          })
      }
    },
    getParent(array, key) {
      let result = []
      let toToo = true
      console.log('resultItem+++ ' + JSON.stringify(array))
      const catchData = (array, key) => {
        array.forEach(item => {
          if (!toToo) return
          if (item['parentId'] == '0') {
            console.log('reddddd' + result)
            //当新的parentid时，排除上一个的数据
            result.shift()

            console.log('resultItem666' + item['id'])
            result.push(item)
          }
          console.log('resultItem+----++ ' + item['id'] + 'key++' + key)
          if (item['id'] === key) {
            toToo = false
          } else if (item['children']) {
            console.log('children')
            catchData(item['children'], key)
          }
        })
      }
      catchData(array, key)
      console.log('result ++++' + JSON.stringify(result))
      // alert("result ++++" + JSON.stringify(result))
      return result
    },
    getParentDomainId(array, key) {
      let key1 = key
      //或许域和公司ID
      let result = []
      let ParentDomainId = {}
      let toToo = true
      let firstName = true
      let array1 = array
      console.log('getParentDomainId+++   ' + JSON.stringify(array))
      const catchData = (array, key) => {
        console.log('key     ' + key)

        array.forEach(item => {
          if (!toToo) return

          if (item['parentId'] == '0') {
            ParentDomainId.CompanyId = item['id']
            ParentDomainId.CompName= item['orgName']
          }
          //修改时带出父名称，判断ID相等且类型是3就是父名称
         if (item['id'] === key && item['orgType'] == 3){
           if(firstName){
               ParentDomainId.parentName = item['orgName']  
           }
           firstName = false
         
         }
          //当父ID = 当前ID 且类型是域表示是父级是域
          if (item['id'] === key && item['orgType'] == 2) {
            toToo = false
            ParentDomainId.DomainId = item['id']
            ParentDomainId.orgName  = item['orgName'] 
            result.push(ParentDomainId)
          } else if (item['id'] === key && item['orgType'] == 3) {
            //如果父ID是部门，就将父ID作为key再次重新与树结构比较
            key1 = item['parentId']
            console.log('key1___key1__' + key1 + '   key--' + key)
            if (key1 != key) {
              key = key1
              console.log('getParentDomainId____ ' + JSON.stringify(array1))
              array = array1
              catchData(array, key)
            }
            //  toToo = false
          }
          if (item['children']) {
            catchData(item['children'], key)
          }
        })
      }

      catchData(array, key)
      console.log('Resulit _____' + JSON.stringify(result))
      return result
    },

    handleCreate() {
      // debugger;
      console.log('nodeClick ---' + this.$refs.tree)

      //判断是否点击，没有点击报错
      let treeCurrent = this.$refs.tree.getCurrentNode()
         console.log('nodeClick ---AAAAAA-----' + JSON.stringify(treeCurrent) )
       if(treeCurrent === null ){
       
         this.$message.error('请选择父级')
        return false 
      } 
      
      //新增时只能是域和子部门，如果是公司就报错
      if(treeCurrent.orgType == 1){
          this.$message.error('请选择域或部门！')
        return false 

      }
 
      this.form = {
        companyId: '',
        domainId: '',
        parentDepartmentId: '',
        parentName: '',
        departmentName: '',
        effective: '',
        isVirtual: ''
      }
      this.dialogFormVisible = true

      this.formtitle = '新增部门'
      this.dialogStatus = 'create'

       let parentDomain = []
      //将已有的数据带出
      //判断当前节点是否是域，是就直接传id查找，否则就传parentId
      if (treeCurrent.orgType == '2') {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, treeCurrent.id)
      } else {
        parentDomain = this.getParentDomainId(this.$refs.tree.data, treeCurrent.parentId)
      }

      // alert('parentDomain' + parentDomain[0].CompanyId)

      this.form.companyId = parentDomain[0].CompanyId
      this.form.domainId = parentDomain[0].DomainId

      this.form.parentDepartmentId = treeCurrent.id
      this.form.parentName = treeCurrent.orgName 
    
    },
    delMore() { 
      let treeCurrent = this.$refs.tree.getCurrentNode()
      //如果没有选中需要删除的菜单就报错
      if(treeCurrent === null ){
       
           this.$message.error('请选择需要删除的菜单！')
        return false 
      } 
      this.$confirm(
        '确认删除该部门? 部门名称为:  ' + treeCurrent.orgName,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteData(treeCurrent)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getModFormDepartment(node) {
 
       let  parentDomain = this.getParentDomainId(this.$refs.tree.data, node.Id)
      // debugger
      alert('nodeClick  QQQQQAAAAA' +   'http://10.124.0.40:10101/api/companies/' +
            node.CompanyId +
            '/domains/'+
            node.DomainId
            +'/departments/parentDepartment/' +
            node.ParentDepartmentId)

      console.log('nodeClick  QQQQQ' + this.$refs.tree)
      //判断当前节点属于哪个父部门，根据node.id查找树结构中是否存在，存在就将树的id保存
      let treeParent = this.getParent(this.$refs.tree.data, node.Id)
      
      //如果点击的是部门，展示该部门下所有的部门
      this.$http
        .get(
         'http://10.124.0.40:10101/api/companies/' +
            node.CompanyId +
            '/domains/'+
            node.DomainId
            +'/departments/parentDepartment/' +
            node.ParentDepartmentId
        )
        .then(response => {
          this.list = []  
           this.data = response.data
            this.data.forEach(x => { 
                  //加入公司名字，域名称
                x.compName = parentDomain[0].CompName
                x.domainName = parentDomain[0].orgName
               x.parentName = parentDomain[0].parentName === undefined ? parentDomain[0].orgName : parentDomain[0].parentName
              this.list.push(x)
            })
        })
        .catch(response => {
          alert('searchdata1' + JSON.stringify(response))
          this.listLoading = false
          this.$message({
            type: 'warning',
            message: '查询数据失败!'
          })
        })
    },
    getDelFormDepartment(node) {
  
      //如果点击的是部门，展示该部门下所有的部门
      this.$http
        .get(
          'http://10.124.0.40:10101/api/companies/' +
            node.companyId +
            '/domains/'+
            node.domainId
            +'/departments/parentDepartment/' +
            node.parentDepartmentId
        )
        .then(response => {
          this.list = [] 

          //this.list.push(response.data)
          //整理公司数据让他满足list格式，用foreach(树结构中的)循
          this.data = response.data
          this.data.forEach(x => { 
                 x.compName = node.compName
                x.domainName = node.domainName
                x.parentName = node.parentName 
             
            this.list.push(x)
          })
        })
        .catch(response => {
          alert('searchdataDDDD' + JSON.stringify(response))
          this.listLoading = false
          this.$message({
            type: 'warning',
            message: '查询数据失败!'
          })
        })
    }
  }
}
</script>
<style>
.el-aside {
  margin-top: 20px;
}
</style>

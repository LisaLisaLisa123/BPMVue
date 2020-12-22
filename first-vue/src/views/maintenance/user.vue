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
              <el-table-column v-if="options[19].ifShow" label="公司名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.companyName }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[18].ifShow" label="域名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.domainName }}</span>
                </template>
              </el-table-column>

              <el-table-column v-if="options[17].ifShow" label="部门名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.departmentName }}</span>
                </template>
              </el-table-column>

              <el-table-column v-if="options[0].ifShow" label="员工号">
                <template slot-scope="scope">
                  <span>{{ scope.row.employeeNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[1].ifShow" label="登录名">
                <template slot-scope="scope">
                  <span>{{ scope.row.loginName }}</span>
                </template>
              </el-table-column>

              <el-table-column v-if="options[2].ifShow" label="中文名">
                <template slot-scope="scope">
                  <span>{{ scope.row.chineseName }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[3].ifShow" label="英文名">
                <template slot-scope="scope">
                  <span>{{ scope.row.englishName }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[4].ifShow" label="邮箱">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[5].ifShow" label="电话">
                <template slot-scope="scope">
                  <span>{{ scope.row.telePhone }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[6].ifShow" label="手机号">
                <template slot-scope="scope">
                  <span>{{ scope.row.mobilePhone }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[7].ifShow" label="性别">
                <template slot-scope="scope">
                  <span>{{ scope.row.gender }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[8].ifShow" label="照片">
                <template slot-scope="scope">
                  <span>{{ scope.row.image }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[9].ifShow" label="签名">
                <template slot-scope="scope">
                  <span>{{ scope.row.signature }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[10].ifShow" label="标签">
                <template slot-scope="scope">
                  <span>{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[11].ifShow" label="绩点">
                <template slot-scope="scope">
                  <span>{{ scope.row.grade }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[12].ifShow" label="上级领导">
                <template slot-scope="scope">
                  <span>{{ scope.row.parentUser }}</span>
                </template>
              </el-table-column>

              <el-table-column v-if="options[13].ifShow" label="是否有效">
                <template slot-scope="scope">
                  <span>{{ scope.row.effective }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[14].ifShow" label="员工状态">
                <template slot-scope="scope">
                  <span>{{ scope.row.status }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[15].ifShow" label="是否部门负责人">
                <template slot-scope="scope">
                  <span>{{ scope.row.isManager }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[16].ifShow" label="密码">
                <template slot-scope="scope">
                  <span>{{ scope.row.passWord }}</span>
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
              <span solt="title">添加人员</span>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- 新增和修改节点 s-->
        <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
          <el-form :model="form" :inline="true">
            <el-form-item label="公司ID" :label-width="formLabelWidth">
              <el-input v-model="form.CompanyId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="域ID" :label-width="formLabelWidth">
              <el-input v-model="form.DomainId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门ID" :label-width="formLabelWidth">
              <el-input v-model="form.DepartmentId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="员工号" :label-width="formLabelWidth">
              <el-input
                v-model="form.EmployeeNumber" 
              ></el-input>
            </el-form-item>
            <el-form-item label="登录名" :label-width="formLabelWidth">
              <el-input v-model="form.LoginName" clearable></el-input>
            </el-form-item>
            <el-form-item label="中文名" :label-width="formLabelWidth">
              <el-input v-model="form.ChineseName" clearable></el-input>
            </el-form-item>
            <el-form-item label="英文名" :label-width="formLabelWidth">
              <el-input v-model="form.EnglishName" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.Email" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.TelePhone" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
              <el-input v-model="form.MobilePhone" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="form.Gender" clearable></el-input>
            </el-form-item>
            <el-form-item label="照片" :label-width="formLabelWidth">
              <el-input v-model="form.Image" clearable></el-input>
            </el-form-item>
            <el-form-item label="签名" :label-width="formLabelWidth">
              <el-input v-model="form.Signature" clearable></el-input>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth">
              <el-input v-model="form.Title" clearable></el-input>
            </el-form-item>
            <el-form-item label="绩点" :label-width="formLabelWidth">
              <el-input v-model="form.Grade" clearable></el-input>
            </el-form-item>
            <el-form-item label="上级领导" :label-width="formLabelWidth">
              <el-input v-model="form.ParentUser" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否有效" :label-width="formLabelWidth">
              <el-input v-model="form.Effective" clearable></el-input>
            </el-form-item>
            <el-form-item label="员工状态" :label-width="formLabelWidth">
              <el-input v-model="form.Status" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否部门负责人" :label-width="formLabelWidth">
              <el-input v-model="form.IsManager" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.PassWord" clearable></el-input>
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
          name: '公司名称',
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
          name: '员工号',
          ifShow: true
        },
        {
          name: '登录名',
          ifShow: true
        },
        {
          name: '中文名',
          ifShow: true
        },
        {
          name: '英文名',
          ifShow: true
        },
        {
          name: '邮箱',
          ifShow: true
        },
        {
          name: '电话',
          ifShow: true
        },
        {
          name: '手机',
          ifShow: true
        },
        {
          name: '性别',
          ifShow: true
        },
        {
          name: '照片',
          ifShow: true
        },
        {
          name: '签名',
          ifShow: true
        },
        {
          name: '标签',
          ifShow: true
        },
        {
          name: '绩点',
          ifShow: true
        },
        {
          name: '上级领导',
          ifShow: true
        },
        {
          name: '是否有效',
          ifShow: true
        },
        {
          name: '员工状态',
          ifShow: true
        },
        {
          name: '是否部门负责人',
          ifShow: true
        },
        {
          name: '密码',
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
      //如果是部门就显示
      if (object.orgType == 3) {
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
      }
    },
    NodeAdd(n, d) {
      //新增节点

      console.log(n)
      console.log('d' + JSON.stringify(d))
      this.form = {
        CompanyId: '',
        DomainId: '',
        DepartmentId: '',
        EmployeeNumber: '',
        LoginName: '',
        ChineseName: '',
        EnglishName: '',
        Email: '',
        TelePhone: '',
        MobilePhone: '',
        Gender: '',
        Image: '',
        Signature: '',
        Title: '',
        Grade: '',
        ParentUser: '',
        Effective: '',
        Status: '',
        IsManager: '',
        PassWord: ''
      }

      this.dialogFormVisible = true

      this.formtitle = '新增人员'
      this.dialogStatus = 'create'
      let parentDomain = []
      //将已有的数据带出
      //查找当前部门的父域，公司和名称
      parentDomain = this.getParentDomainId(this.$refs.tree.data, d.parentId)
      this.form.CompanyId = parentDomain[0].CompanyId
      this.form.DomainId = parentDomain[0].DomainId
      this.form.DepartmentId = d.id
    },
    createData() {
      //用于保存新增的数据
      this.formData.CompanyId = this.form.CompanyId
      this.formData.DomainId = this.form.DomainId
      this.formData.DepartmentId = this.form.DepartmentId
      this.formData.EmployeeNumber = this.form.EmployeeNumber
      this.formData.LoginName = this.form.LoginName
      this.formData.ChineseName = this.form.ChineseName
      this.formData.EnglishName = this.form.EnglishName
      this.formData.Email = this.form.Email
      this.formData.TelePhone = this.form.TelePhone
      this.formData.MobilePhone = this.form.MobilePhone
      this.formData.Gender = this.form.Gender
      this.formData.Image = this.form.Image
      this.formData.Signature = this.form.Signature
      this.formData.Title = this.form.Title
      this.formData.Grade = this.form.Grade
      this.formData.ParentUser = this.form.ParentUser
      this.formData.Effective = this.form.Effective
      this.formData.Status = this.form.Status
      this.formData.IsManager = this.form.IsManager
      this.formData.PassWord = this.form.PassWord

      this.$http
        .post(
          'http://10.124.0.40:10101/api/companies/' +
            this.formData.CompanyId +
            '/domains/' +
            this.formData.DomainId +
            '/departments/' +
            this.formData.DepartmentId +
            '/users',
          this.formData
        )
        .then(response => {
          alert('insert' + JSON.stringify(response))
          //   this.tree = []
          //   this.load()
          this.getModFormDepartment(this.formData)
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
       this.formData.Id = this.form.Id
      this.formData.CompanyId = this.form.CompanyId
      this.formData.DomainId = this.form.DomainId
      this.formData.DepartmentId = this.form.DepartmentId
      this.formData.EmployeeNumber = this.form.EmployeeNumber
      this.formData.LoginName = this.form.LoginName
      this.formData.ChineseName = this.form.ChineseName
      this.formData.EnglishName = this.form.EnglishName
      this.formData.Email = this.form.Email
      this.formData.TelePhone = this.form.TelePhone
      this.formData.MobilePhone = this.form.MobilePhone
      this.formData.Gender = this.form.Gender
      this.formData.Image = this.form.Image
      this.formData.Signature = this.form.Signature
      this.formData.Title = this.form.Title
      this.formData.Grade = this.form.Grade
      this.formData.ParentUser = this.form.ParentUser
      this.formData.Effective = this.form.Effective
      this.formData.Status = this.form.Status
      this.formData.IsManager = this.form.IsManager
      this.formData.PassWord = this.form.PassWord
      this.$http
        .put(
           'http://10.124.0.40:10101/api/companies/' +
            this.formData.CompanyId +
            '/domains/' +
            this.formData.DomainId +
            '/departments/' +
            this.formData.DepartmentId +
            '/users',
          this.formData
        )
        .then(response => {
          alert('update       ' + JSON.stringify(this.formData))
          this.dialogFormVisible = false
        
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
      alert('sdfsdfsdf----' + JSON.stringify(d))

      this.$http
        .delete(
          'http://10.124.0.40:10101/api/companies/' +
            d.companyId +
            '/domains/' +
            d.domainId +
            '/departments/' +
            d.departmentId +
            '/users/'+ d.id
        )
        .then(() => {
          alert('treeParent删除--------' + d.id)
          
          //如果是树中的删除，不需要下面的更新 
            this.getDelFormDepartment(d)
        

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
         Id: row.id,
         CompanyId : row.companyId ,
         DomainId : row.domainId ,
         DepartmentId  : row.departmentId  ,
         EmployeeNumber : row.employeeNumber ,
         LoginName : row.loginName ,
         ChineseName : row.chineseName ,
         EnglishName : row.englishName ,
         Email : row.email ,
         TelePhone : row.telePhone ,
         MobilePhone : row.mobilePhone ,
         Gender : row.gender ,
         Image : row.image ,
         Signature : row.signature ,
         Title : row.title ,
         Grade : row.grade ,
         ParentUser : row.parentUser ,
         Effective : row.effective ,
         Status : row.status ,
         IsManager : row.isManager ,
         PassWord: row.passWord,
      }

      this.formtitle = '修改部门'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    nodeClick(node) {
      console.log('点击的是神____' + JSON.stringify(node))

      //关闭右键点击的小功能
      this.menuVisible = false 
        this.getDomainDepartment(node)
     
    },
    deldepartment(row) {
      this.$confirm(
        '确认删除该人员? 人员工号为:  ' + row.loginName,
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
    fetchData() {},
    getDomainDepartment(node) {
      //判断当前节点是否是域，是就直接传id查找，否则就传parentId
      let parentDomain = []

      parentDomain = this.getParentDomainId(this.$refs.tree.data, node.parentId)

      // console.log('treeParent——————————' + JSON.stringify(treeParent))
      //判断当前点击的是域还是部门，如果是域就带出所有的部门，否则带出子部门

     
        //如果点击的是域，获取域下所有的部门
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' +
              parentDomain[0].CompanyId +
              '/domains/' +
              parentDomain[0].DomainId +
              '/departments/' +
              node.id +
              '/users/all'
          )
          .then(response => {
            this.list = []
            console.log('域下数据' + JSON.stringify(response.data))

            //整理公司数据让他满足list格式，用foreach(树结构中的)循
            this.data = response.data
            this.data.forEach(x => {
              //加入公司名字，域名称
              x.companyName = parentDomain[0].CompName
              x.domainName = parentDomain[0].orgName
              x.departmentName = node.orgName
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
            ParentDomainId.CompName = item['orgName']
          }
          //修改时带出父名称，判断ID相等且类型是3就是父名称
          if (item['id'] === key && item['orgType'] == 3) {
            if (firstName) {
              ParentDomainId.parentName = item['orgName']
            }
            firstName = false
          }
          //当父ID = 当前ID 且类型是域表示是父级是域
          if (item['id'] === key && item['orgType'] == 2) {
            toToo = false
            ParentDomainId.DomainId = item['id']
            ParentDomainId.orgName = item['orgName']
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
      console.log('nodeClick ---AAAAAA-----' + JSON.stringify(treeCurrent))
      if (treeCurrent === null) {
        this.$message.error('请选择父级')
        return false
      }

      //新增时只能是域和子部门，如果是公司就报错
      if (treeCurrent.orgType  != 3) {
        this.$message.error('请选择部门！')
        return false
      }  
        this.form = {
        CompanyId: '',
        DomainId: '',
        DepartmentId: '',
        EmployeeNumber: '',
        LoginName: '',
        ChineseName: '',
        EnglishName: '',
        Email: '',
        TelePhone: '',
        MobilePhone: '',
        Gender: '',
        Image: '',
        Signature: '',
        Title: '',
        Grade: '',
        ParentUser: '',
        Effective: '',
        Status: '',
        IsManager: '',
        PassWord: ''
      }

      this.dialogFormVisible = true

      this.formtitle = '新增人员'
      this.dialogStatus = 'create'
      let parentDomain = []
      //将已有的数据带出
      //查找当前部门的父域，公司和名称
      parentDomain = this.getParentDomainId(this.$refs.tree.data, treeCurrent.parentId)
      this.form.CompanyId = parentDomain[0].CompanyId
      this.form.DomainId = parentDomain[0].DomainId
      this.form.DepartmentId = treeCurrent.id
  
    },
    delMore() {
      let treeCurrent = this.$refs.tree.getCurrentNode()
    //   //如果没有选中需要删除的菜单就报错
    //   if (treeCurrent === null) {
    //     this.$message.error('请选择需要删除的人员！')
    //     return false
    //   }
    //   this.$confirm(
    //     '确认删除该? 部门名称为:  ' + treeCurrent.orgName,
    //     '提示',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   )
    //     .then(() => {
    //       this.deleteData(treeCurrent)
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    },
    getModFormDepartment(node) {
      let parentDomain = this.getParentDomainId(this.$refs.tree.data, node.DepartmentId)
    

      //如果点击的是部门，展示该部门下所有的部门
      this.$http
        .get(
          'http://10.124.0.40:10101/api/companies/' +
              node.CompanyId +
              '/domains/' +
              node.DomainId +
              '/departments/' +
              node.DepartmentId +
              '/users/all'
        )
        .then(response => {
          this.list = []
          this.data = response.data
          this.data.forEach(x => {
            //加入公司名字，域名称
            x.companyName = parentDomain[0].CompName
            x.domainName = parentDomain[0].orgName
            x.departmentName = parentDomain[0].parentName
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
            '/domains/' +
            node.domainId +
            '/departments/' +
            node.departmentId +
            '/users/all'
        )
        .then(response => {
          this.list = []

          //this.list.push(response.data)
          //整理公司数据让他满足list格式，用foreach(树结构中的)循
          this.data = response.data
          this.data.forEach(x => {
            x.companyName = node.companyName
            x.domainName = node.domainName
            x.departmentName = node.departmentName

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

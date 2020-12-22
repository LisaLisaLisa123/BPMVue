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
            default-expand-all
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
                    @click="deldomain(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>

              <el-table-column v-if="options[0].ifShow" label="父域">
                <template slot-scope="scope">
                  <span>{{ scope.row.parentDomainId }}</span>
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
              <el-table-column v-if="options[3].ifShow" label="域描述">
                <template slot-scope="scope">
                  <span>{{ scope.row.description }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="options[4].ifShow" label="是否有效">
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
        <!--鼠标右键点击出现页面-->
        <div v-show="menuVisible">
          <el-menu
            id="rightClickMenu"
            @select="handleRightSelect"
            active-text-color="red"
            text-color="black"
          >
            <el-menu-item index="1">
              <span solt="title">添加域</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span solt="title">修改域 </span>
            </el-menu-item>
            <el-menu-item index="3">
              <span solt="title">删除域</span>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- 新增和修改节点 -->
        <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="公司ID" :label-width="formLabelWidth">
              <el-input v-model="form.CompanyId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="父级ID" :label-width="formLabelWidth">
              <el-input
                v-model="form.ParentDomainId"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="父级名称" :label-width="formLabelWidth">
              <el-input v-model="form.ParentName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="域名称" :label-width="formLabelWidth">
              <el-input v-model="form.DomainName" clearable></el-input>
            </el-form-item>
            <el-form-item label="域描述" :label-width="formLabelWidth">
              <el-input v-model="form.Description" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否有效" :label-width="formLabelWidth">
              <el-input v-model="form.Effective" clearable></el-input>
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
          name: '域名称',
          ifShow: true
        },
        {
          name: '域描述',
          ifShow: true
        },
        {
          name: '是否有效',
          ifShow: true
        },
        {
          name: '父域',
          ifShow: true
        },
        {
          name: '公司',
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
      delJudge:'tree',
      dialogFormVisible: false,
      form: {
        CompanyId: '',
        ParentDomainId: '',
        ParentName: '',
        DomainName: '',
        Description: '',
        Effective: ''
      },
      formLabelWidth: '120px',
      formtitle: '新增域',
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
        .get('http://10.124.0.40:10101/api/orgtree/domain')
        .then(response => {
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
      if (this.objectID !== object.id) {
        this.objectID = object.id
        this.menuVisible = true
        this.DATA = object
        this.NODE = value
      } else {
        this.menuVisible = !this.menuVisible
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
      console.log('右键被点击的object:', object)
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
        CompanyId: '',
        ParentDomainId: '',
        ParentName: '',
        DomainName: '',
        Description: '',
        Effective: ''
      }
      //判断层级
      // if (n.level >= 3) {
      //   this.$message.error('最多只支持三级！')
      //   return false
      // }
      this.dialogFormVisible = true

      this.formtitle = '新增域'
      this.dialogStatus = 'create'
      if (d.parentId == 0) {
        this.form.CompanyId = d.id
      } else {
        this.form.CompanyId = d.parentId
      }
      this.form.ParentDomainId = d.id
      this.form.ParentName = d.orgName
    },
    NodeEdit(n, d) {
      console.log(n)
      console.log('dlisa' + JSON.stringify(d))
      this.dialogFormVisible = true
      console.log('d.children.orgName ' + JSON.stringify(d.children))
      //点击编辑时，带出数据

      this.form = {
        // CompanyId:d.id ===0?d.id:d.parentId,
        Id: d.id,
        CompanyId: '706bdc41af5c46d8a3aa7a9eee4e5a76',
        ParentDomainId: d.parentId === undefined ? '' : d.parentId,
        ParentName: d.orgName === undefined ? '' : d.orgName,
        DomainName: d.orgName === undefined ? '' : d.orgName,
        Description: '',
        Effective: ''
      }
      this.formtitle = '修改域'
      this.dialogStatus = 'update'
    },
    NodeDel(n, d) {
      this.$confirm('确认删除该域? 域名称为:  ' + d.orgName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delJudge = "tree"
          this.deleteData(d)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    createData() {
      //用于保存新增的数据

      this.formData.CompanyId = this.form.CompanyId
      this.formData.ParentDomainId = this.form.ParentDomainId
      this.formData.DomainName = this.form.DomainName
      this.formData.Description = this.form.Description
      this.formData.Effective = this.form.Effective

      this.$http
        .post(
          'http://10.124.0.40:10101/api/companies/' +
            this.form.CompanyId +
            '/domains',
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
      this.formData.Id = this.form.Id
      this.formData.CompanyId = this.form.CompanyId
      this.formData.ParentDomainId = this.form.ParentDomainId
      this.formData.DomainName = this.form.DomainName
      this.formData.Description = this.form.Description
      this.formData.Effective = this.form.Effective

      this.$http
        .put(
          'http://10.124.0.40:10101/api/companies/' +
            this.form.CompanyId +
            '/domains',
          this.formData
        )
        .then(response => {
          alert('update       ' + JSON.stringify(this.formData))
          this.dialogFormVisible = false
          this.tree = []
          this.load()
          this.getModFormDomain(this.formData)
        })
        .catch(response => {
          alert('updateError' + JSON.stringify(response))
          this.$message({
            type: 'warning',
            message: '编辑失败！'
          })
        })
    },
    deleteData(domain) {
      console.log('删除' + JSON.stringify(domain))

      let treeParent = this.getParent(this.$refs.tree.data, domain.id)
      console.log('treeParent删除' + treeParent[0].id)

      this.$http
        .delete(
          'http://10.124.0.40:10101/api/companies/' +
            treeParent[0].id +
            '/domains/' +
            domain.id
        )
        .then(() => {
          this.tree = []
          this.load()
        //如果是树中的删除，不需要下面的更新 
        if(this.delJudge !="tree"){
            this.getDelFormDomain(domain)
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
        // CompanyId:d.id ===0?d.id:d.parentId,
        Id: row.id === undefined ? '' : row.id,
        CompanyId: row.companyId === undefined ? '' : row.companyId,
        ParentDomainId:
          row.parentDomainId === undefined ? '' : row.parentDomainId,
        ParentName: row.compName === undefined ? '' : row.compName,
        DomainName: row.domainName === undefined ? '' : row.domainName,
        Description: row.description === undefined ? '' : row.description,
        Effective: row.effective === undefined ? '' : row.effective
      }
      this.formtitle = '修改域'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    nodeClick(node) {
      alert('点击的是神' + JSON.stringify(node))
      //关闭右键点击的小功能
      this.menuVisible = false
      //根据id查找当前数据
      this.getDomain(node)
    },
    deldomain(row) {
      this.$confirm('确认删除该域? 域名称为:  ' + row.domainName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delJudge =""
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
    getDomain(node) {
      let orgCompname = node.orgName
      alert('orgCompname' + orgCompname)
      if (node.parentId == 0) {
        //如果点击的是公司，获取公司下所有的域
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' + node.id + '/domains/all'
          )
          .then(response => {
            this.list = []
            alert('公司下数据' + JSON.stringify(response.data))
            //this.list.push(response.data)
            //整理公司数据让他满足list格式，用foreach(树结构中的)循
            this.data = response.data
            this.data.forEach(x => {
              if (node.id == x.companyId) {
                x.compName = node.orgName
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
      else 
      {
        // debugger
        console.log(this.$refs.tree.getCheckedKeys())

        console.log('nodeClick+++++ ' + this.$refs.tree)
        //判断当前节点属于哪个父域，根据node.id查找树结构中是否存在，存在就将树的id保存
        let treeParent = this.getParent(this.$refs.tree.data, node.id)
        console.log('treeParentId' + treeParent[0].orgName)
        //如果点击的是域，展示该域下所有的域
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' +
              treeParent[0].id +
              '/domains/parentDomain/' +
              node.id
          )
          .then(response => {
            this.list = []

            console.log(
              '公司下数据' +
                JSON.stringify(response.data) +
                'http://10.124.0.40:10101/api/companies/' +
                treeParent[0].id +
                '/domains/parentDomain/' +
                node.id
            )
            console.log('公司下数据1' + JSON.stringify(node))
            //this.list.push(response.data)
            //整理公司数据让他满足list格式，用foreach(树结构中的)循
            this.data = response.data
            this.data.forEach(x => {
              if (node.id == x.parentDomainId) {
                //加入公司名字
                x.compName = treeParent[0].orgName
              }
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
    handleCreate() {
      // debugger;
      console.log('nodeClick ---' + this.$refs.tree)

      //判断是否点击，没有点击报错
      let treeCurrent = this.$refs.tree.getCurrentNode()
      alert('treeCurrent.id' + treeCurrent.id)
      if (treeCurrent.id != '') {
        this.form = {
          CompanyId: '',
          ParentDomainId: '',
          ParentName: '',
          DomainName: '',
          Description: '',
          Effective: ''
        }
        this.dialogFormVisible = true

        this.formtitle = '新增域'
        this.dialogStatus = 'create'
        if (treeCurrent.parentId == 0) {
          this.form.CompanyId = treeCurrent.id
        } else {
          this.form.CompanyId = treeCurrent.parentId
        }
        this.form.ParentDomainId = treeCurrent.id
        this.form.ParentName = treeCurrent.orgName
      } else {
        this.$message.error('请选择父级')
        return false
      }
    },
    delMore() {
      alert('asdf')
      let treeCurrent = this.$refs.tree.getCurrentNode()
      this.$confirm('确认删除该域? 域名称为:  ' + treeCurrent.orgName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
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
    getModFormDomain(node) {
      // debugger
      console.log('nodeClick  QQQQQAAAAA' + JSON.stringify(node))

      console.log('nodeClick  QQQQQ' + this.$refs.tree)
      //判断当前节点属于哪个父域，根据node.id查找树结构中是否存在，存在就将树的id保存
      let treeParent = this.getParent(this.$refs.tree.data, node.Id)
      console.log(
        'treeParentIdQQQQQQ' +
          'http://10.124.0.40:10101/api/companies/' +
          treeParent[0].id +
          '/domains/' +
          node.Id
      )
      //如果点击的是域，展示该域下所有的域
      this.$http
        .get(
          'http://10.124.0.40:10101/api/companies/' +
            treeParent[0].id +
            '/domains/' +
            node.Id
        )
        .then(response => {
          this.list = []
          console.log('xxxxx' + JSON.stringify(response.data))
          console.log('node' + JSON.stringify(node))
          //this.list.push(response.data)
          //整理公司数据让他满足list格式
          // this.data = response.data
          console.log(
            'yyyyy' + JSON.stringify(response.data.id) + treeParent[0].orgName
          )
          //单个编辑后刷新，将公司名称放入
          if (node.Id == response.data.id) {
            //加入公司名字
            response.data.compName = treeParent[0].orgName
          }
          console.log('GGGGG' + JSON.stringify(response.data))
          this.list.push(response.data)
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
    getDelFormDomain(node) { 
              
 

        console.log('DDDDDD ' + this.$refs.tree)
        //判断当前节点属于哪个父域，根据node.id查找树结构中是否存在，存在就将树的id保存
        let treeParent = this.getParent(this.$refs.tree.data, node.id)
     
        //如果点击的是域，展示该域下所有的域
        this.$http
          .get(
            'http://10.124.0.40:10101/api/companies/' +
              treeParent[0].id +
              '/domains/parentDomain/' +
              node.parentDomainId
          )
          .then(response => {
            this.list = []

            console.log(
              '公司下数据DDDDD' +
                JSON.stringify(response.data) +
                'http://10.124.0.40:10101/api/companies/' +
                treeParent[0].id +
                '/domains/parentDomain/' +
                node.parentDomainId
            )
            console.log('公司下数据FFFFF' + JSON.stringify(node))
            //this.list.push(response.data)
            //整理公司数据让他满足list格式，用foreach(树结构中的)循
            this.data = response.data
            this.data.forEach(x => {
              if (node.id == x.parentDomainId) {
                //加入公司名字
                x.compName = treeParent[0].orgName
              }
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

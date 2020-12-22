<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <el-tree
      class="filter-tree"
      :data="tree"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-contextmenu="rightClick"
      accordion
      ref="tree"
      node-key="id"
    >
    </el-tree>
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
          <el-input v-model="form.ParentDomainId" :disabled="true"></el-input>
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
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      tree: [],
      filterText: '',
      menuVisible: true,
      NODE: null,
      DATA: null,
      objectID: null,
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
      defaultProps: {
        children: 'children',
        label: 'orgName'
      }
    }
  },
  created() {
    this.load()
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
      if (n.level >= 3) {
        this.$message.error('最多只支持三级！')
        return false
      }
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
          alert('update' + JSON.stringify(response))
          this.dialogFormVisible = false
          this.tree = []
          this.load()
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
      alert('删除' + domain)
      this.$http
        .delete(
          'http://10.124.0.40:10101/api/companies/' +
            '706bdc41af5c46d8a3aa7a9eee4e5a76' +
            '/domains/' +
            domain.id
        )
        .then(() => {
          this.tree = []
          this.load()
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
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-container>
      <el-header>
          </el-header>
      <el-container>
        <el-aside width="200px">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <el-tree
      @node-click="handleNodeClick"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
    >
    </el-tree>
      </el-aside>
      </el-container></el-container>
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
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'companyName'
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.axios
        .get('http://10.124.0.40:10101/api/companies/all')
        .then(response => {
          this.tree = response.data
          this.tree.forEach(x => { 
            x.children = []
            this.data.push(x)
          })
        }) 
    },

    filterNode(value, data) {
      if (!value) return true
      return data.companyName.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      //判断是否是子节点
      if ('parentDomainId' in data) {
        console.log('handleNodeClick1--====--------' + JSON.stringify(data))
        this.getDetailTree(data.id, data.companyId, data)
      } else {
        console.log('handleNodeClick2--====--------' + JSON.stringify(data))
        this.getTree(data.id, data)
      }
    },
    getTree(id, data) {
      //防止重复点击时出现子节点
      data.children = []

      //根据companyid 构造树节点
      this.axios
        .get('http://10.124.0.40:10101/api/companies/' + id + '/domains/all')
        .then(response => {
          this.domain = response.data
          this.domain.forEach(x => {
            console.log('lisa3 ==============sc' + JSON.stringify(x))
            if (x.parentDomainId == 0) {
              console.log('lisa4 =================================')
              x.children = []
              x.companyName = x.description
              x.compName = data.companyName
              console.log(
                'lisa5 ==============sc' + JSON.stringify(data.children)
              )

              if (!data.children) data.children = []
              data.children.push(x)
              console.log('lisa3lisadomain6666   ' + JSON.stringify(data))
            }
          })
        })
    },
    getDetailTree(id, cid, data) {
          //防止重复点击时出现子节点
      data.children = []
      //根据companyid 构造树节点
      this.axios
        .get('http://10.124.0.40:10101/api/companies/' + cid + '/domains/all')
        .then(response => {
          this.childdomain = response.data
        
          this.childdomain.forEach(x => {
            console.log('lisa8888 =====sc' + JSON.stringify(x))
            if (x.parentDomainId == id) {
              console.log('lisa999 =================================')
              x.companyName = x.description
              x.compName = data.companyName
              x.children = [] 
              if (!data.children) data.children = [] 
              data.children.push(x)
              console.log('lisa111111   ' + JSON.stringify(this.data))
            } 
          })
        })
    }
  }
}
</script>

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
        <EsunButton :button-type="'LOOKFOR'" @buttonClick="showSearchCompany" />
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
      <el-container>
          <el-main>
              <el-table
                style="width:100%"
                :data ="list"
                element-loading-text="Loading"
                border
                stripe
                size="medium"
                highlight-current-row
                  @selection-change="handleSelectionChange"
              >
              <el-table-column type="selection" align="center"/>
              <el-table-column label="序号" align="center" width="100%">
                  <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column label="操作" width="100%" align="center">
                  <template slot-scope="scope">
                      <el-button 
                        type="text"
                        size="medium"
                        @click="handleClick(scope.row)">编辑</el-button>
                        <el-button
                            type="text"
                            size="medium"
                            @click="deldomain(scope.row)"
                            >删除</el-button> 
                  </template>
              </el-table-column>
              <el-table-column  v-if="options[0].ifShow" label="域名称">
                  <template slot-scope="scope">
                      <span>{{scope.row.domainName}}</span>
                  </template> 
              </el-table-column>
              <el-table-column  v-if="options[1].ifShow"  label="域描述">
                  <template slot-scope="scope">
                      <span>{{scope.row.description}}</span>
                  </template> 
              </el-table-column>
               <el-table-column  v-if="options[2].ifShow"   label="是否有效">
                  <template slot-scope="scope">
                      <span>{{scope.row.effective}}</span>
                  </template> 
              </el-table-column>


            <el-table-column  v-if="options[3].ifShow"  label="父域">
                  <template slot-scope="scope">
                      <span>{{scope.row.parentDomainId}}</span>
                  </template> 
              </el-table-column>
                 <el-table-column  v-if="options[4].ifShow"  label="公司">
                  <template slot-scope="scope">
                      <span>{{scope.row.compName}}</span>
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
    name:"Table",
  components: { EsunButton, Pagination },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      options:[
      {
          name:'域名称',
          ifShow:true
         
      },{
           name:'域描述',
           ifShow:true
         
      },{
            name:'是否有效',
            ifShow:true
         
      },{
            name:'父域',
            ifShow:true
        
      },{
            name:'公司',
            ifShow:true
         
      }
      ], 
      list:null,
      filterText: '',
      data: [], 
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
    },
    handleCreate() {},
    delMore() {},
    showSearchCompany() {},
    handleSelectionChange(){},
    fetchData(){}
  }
}
</script>

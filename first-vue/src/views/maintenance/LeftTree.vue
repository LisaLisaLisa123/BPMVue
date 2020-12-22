<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <el-tree
      class="filter-tree"
      :data="tree"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
    >
    </el-tree>
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
        this.$refs.tree.filter(val);
      }
    },
  data() {
    return {
      data: [],
      tree: [],
      filterText: '',
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
  filterNode(value,tree){
    if(!value) return true;
    return tree.companyName.indexOf(value) !== -1;
  }
  }

}
</script>

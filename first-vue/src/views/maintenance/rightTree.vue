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
      node-key="id"
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
            //根节点为99999，然后依次展开

            if (x.parentId == 0 && x.orgType ==1 ) { 
              x.children = []
              this.tree.push(x)
              x.lv =  1
              console.log('lisa1 ' + x.id + 'lisa2' + JSON.stringify(x))
              this.getTree(x.id, x)
            }
          })
          console.log('tree1 ' + JSON.stringify(this.data))
          console.log('tree666 ' + JSON.stringify(this.tree))
        })
       
      }, 

    getTree(id, data) {
 

      this.data.forEach(x => {
        console.log('lisa++++++   ' + id + 'lisa4' + JSON.stringify(x))

        if (x.parentId == id && x.orgType ==2) {
       
          console.log('lisa3 ==============s' + JSON.stringify(data))
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
  },
    removeAaary(_arr, _obj) {
         console.log('removeAaary   ' + JSON.stringify(_arr) + 'lisaend000   ' + JSON.stringify(_obj) )
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i] == _obj) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
           console.log('removeAaaryend     ' + JSON.stringify(_arr) + 'lisaend000end   ' + JSON.stringify(_obj) )
},
 deepClone(obj) {
    let _tmp = JSON.stringify(obj);//将对象转换为json字符串形式
    let result = JSON.parse(_tmp);//将转换而来的字符串转换为原生js对象 
    return result;
}
  }

}
</script>

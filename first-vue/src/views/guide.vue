<template>
  <div>
    
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item class="el-icon-edit"> </el-menu-item>
      <el-submenu index="1">
        <template slot="title">流程中心</template>
        <el-menu-item index="1-1">新建申请</el-menu-item>
        <el-menu-item index="1-2">待办任务</el-menu-item>
        <el-menu-item index="1-3">已办任务</el-menu-item>
        <el-menu-item index="1-4">我的申请</el-menu-item>
        <el-menu-item index="1-5">草稿箱</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">组织架构</template>
        <el-menu-item index="2-1" 
          target="_blank"
          @click="() =>{hidepage()
            this.$router.push({path:'/maintenance/domain'})
          }" 
        >域维护</el-menu-item>
        <el-menu-item 
        index="2-2"
        target="_blank"
        @click="
        () =>{
           hidepage()
          this.$router.push({path:'/maintenance/company'})
        }
        "
        >公司维护</el-menu-item>
        <el-menu-item index="2-3"
        target="_blank"
        @click="
        () =>{
          hidepage()
          this.$router.push({path:'/maintenance/department'})
        }
        "
        >部门维护</el-menu-item>
        <el-menu-item
          index="2-4"
          target="_blank"
          @click="
            () => {
              hidepage()
              this.$router.push({ path: '/maintenance/user' })
            }
          "
          >用户维护</el-menu-item
        >
        <el-menu-item 
          index="2-5"
          target="_blank"
          @click="
          ()=>{
            hidepage()
            this.$router.push({path:'/maintenance/group'})
          } 
          "
        >组维护</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot ="title">系统管理</template>
              <el-menu-item
        index="3-1"
        target="_blank"
        @click="
          () => {
             hidepage()
               this.$router.push({path:'/systemManage/processList'}) 
          }
        "
        >流程列表</el-menu-item>
              <el-menu-item
        index="3-2"
        target="_blank"
        @click="
          () => {
             hidepage()
               this.$router.push({path:'/systemManage/processStep'})
            
          }
        "
        >流程步骤</el-menu-item>
        <el-menu-item
        index="3-3"
        target="_blank"
        @click="
          () => {
            hidepage()
            this.$router.push({path:'/systemManage/processRule'}) 
          }
        ">规则信息
        </el-menu-item>
        <el-menu-item
        index="3-4"
        target="_blank"
        @click="
        () =>{
          hidepage()
          this.$router.push({path:'/systemManage/ruleExpress'})
        } ">规则表达式 </el-menu-item>
      </el-submenu>

<el-submenu index="4">
  <template slot="title">流程管理</template>

      <el-menu-item
        index="4-1"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >资源管理</el-menu-item>
             <el-menu-item
        index="4-2"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >多语言维护</el-menu-item>
             <el-menu-item
        index="4-3"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >全局参数维护</el-menu-item>
             <el-menu-item
        index="4-4"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >数据源维护</el-menu-item>
             <el-menu-item
        index="4-5"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >菜单管理</el-menu-item>

             <el-menu-item
        index="4-6"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >权限配置</el-menu-item>

      </el-submenu>

      <el-menu-item
        index="5"
        target="_blank"
        @click="
          () => {
            hidepage()
            this.$router.push({ path: '/pages/personcenter' })
          }
        "
        >个人中心</el-menu-item
      >
      <el-menu-item
        index="6"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/' })
          }
        "
        >安全退出</el-menu-item
      >

      <div class="user-header">
        <img :src="userImg" :onerror="errorImg" />

        <span>{{ userName }}</span>
        <br />
        <span @click="showTime">{{ date }}</span>
      </div>
    </el-menu>

    <div class="charts" id="demo">
      <div class="right">
        <div class="title">活跃用户榜</div>

        <div class="user-item">
          <div v-for="(item, index) in cell" :key="index" class="cell">
            <div class="primary">
              <span
                :class="{ top3: index < 3, badge: index >= 3 }"
                class="badge-count"
                >{{ index + 1 }}</span
              >

              <span class="name">{{ item.name }}</span>
              <span class="desc">{{ item.desc }}</span>
            </div>

            <div>{{ item.number }}</div>
          </div>
        </div>
      </div>

         <div class="right">
        <div class="title">活跃用户榜</div>

        <div class="user-item">
          <div v-for="(item, index) in cell" :key="index" class="cell">
            <div class="primary">
              <span
                :class="{ top3: index < 3, badge: index >= 3 }"
                class="badge-count"
                >{{ index + 1 }}</span
              >

              <span class="name">{{ item.name }}</span>
              <span class="desc">{{ item.desc }}</span>
            </div>

            <div>{{ item.number }}</div>
          </div>
        </div>
      </div>

         <div class="right">
        <div class="title">活跃用户榜</div>

        <div class="user-item">
          <div v-for="(item, index) in cell" :key="index" class="cell">
            <div class="primary">
              <span
                :class="{ top3: index < 3, badge: index >= 3 }"
                class="badge-count"
                >{{ index + 1 }}</span
              >

              <span class="name">{{ item.name }}</span>
              <span class="desc">{{ item.desc }}</span>
            </div>

            <div>{{ item.number }}</div>
          </div>
        </div>
      </div>

      
         <div class="right">
        <div class="title">活跃用户榜</div>

        <div class="user-item">
          <div v-for="(item, index) in cell" :key="index" class="cell">
            <div class="primary">
              <span
                :class="{ top3: index < 3, badge: index >= 3 }"
                class="badge-count"
                >{{ index + 1 }}</span
              >

              <span class="name">{{ item.name }}</span>
              <span class="desc">{{ item.desc }}</span>
            </div>

            <div>{{ item.number }}</div>
          </div>
        </div>
      </div>

      
         <div class="right">
        <div class="title">活跃用户榜</div>

        <div class="user-item">
          <div v-for="(item, index) in cell" :key="index" class="cell">
            <div class="primary">
              <span
                :class="{ top3: index < 3, badge: index >= 3 }"
                class="badge-count"
                >{{ index + 1 }}</span
              >

              <span class="name">{{ item.name }}</span>
              <span class="desc">{{ item.desc }}</span>
            </div>

            <div>{{ item.number }}</div>
          </div>
        </div>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>
<script>
 
export default {
  data() {
    return {
      theme_moel: false,
      errorImg: '',
      userName: 'lisa.zeng',
      userImg: '',
      date: '2020/12/04',
      activeIndex2: '1',
      cell: [
        {
          name: '小姐李好白',
          img:
            'https://imgs-1256993465.cos.ap-chengdu.myqcloud.com/u%3D1407034680%2C1803900872%26fm%3D26%26gp%3D0.jpg',
          number: '342,766',
          desc: '趁着eeeeee....',
          slider: 90
        },
        {
          name: '梦醒时分',
          // img: require("@/assets/imgs/h5/02.jpg"),
          img:
            'https://imgs-1256993465.cos.ap-chengdu.myqcloud.com/u%3D2546115535%2C3321343280%26fm%3D26%26gp%3D0.jpg',
          number: '438,12',
          desc: '人没eeeeee...',
          slider: 70
        },
        {
          name: '生末净旦你',
          img: '',
          number: '12,764',
          desc: '我不能eeeeeeeeee',
          slider: 45
        },
        {
          name: '大爷',
          img:
            'https://imgs-1256993465.cos.ap-chengdu.myqcloud.com/u%3D2030158350%2C58383224%26fm%3D26%26gp%3D0.jpg',
          number: '89,44',
          desc: '师eeeeeeeee',
          slider: 20
        },
        {
          name: '哈哈....',
          img:
            'https://imgs-1256993465.cos.ap-chengdu.myqcloud.com/u%3D538930594%2C714478555%26fm%3D26%26gp%3D0.jpg',
          number: '12,03',
          desc: '我以为我颓废，原来我报废了！',
          slider: 5
        }
      ]
    }
  },
  created() {
    // this.showTime();
  },
  methods: {
    hidepage() {
      alert('this is first time')
      // document.querySelector("demo").style="display: none";
      document.getElementById('demo').style = 'display: none'
    },
    showTime() {
      var week = new Array(
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      )
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minutes = date.getMinutes()
      var second = date.getSeconds()
      this.date =
        year +
        '.' +
        (month < 10 ? '0' + month : month) +
        '.' +
        (day < 10 ? '0' + day : day) +
        '' +
        ' ' +
        hour +
        ':' +
        minutes +
        ':' +
        (second < 10 ? '0' + second : second) +
        ' ' +
        (week[date.getDay() - 1] || '')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  position: relative;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px dotted #eee;
}
.user-header {
  background: #99647e;
  height: 40px;
  width: 52px;
  border-radius: 50%;
  margin-left: 1024px;
  top: 4px;
  position: relative;
  border: 1px solid #dfdfdf;
}
.user {
  padding: 12px;
  position: relative;
  display: inline-block;
}

.charts {
  margin: 25px 13px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 600px);
  grid-gap: 20px;
  justify-content: space-around;

  .right {
    padding: 25px 45px;
    background: white;
    float: left;
    margin-left: 1%;
    .badge-count {
      padding: 3px 7px;
      position: relative;
      border: 1px solid #eee;
      border-radius: 50%;

      margin-right: 11px;
    }
    .badge {
      background: #e2e2e2;
      color: #3a3535;
    }
    .top3 {
      background: #2db7f5;
      color: white;
    }
    .cell {
      position: relative;
      display: flex;
      padding: 10px 0;
      border-bottom: 1px dotted #eee;
    }
    .primary {
      flex: 1;
      display: flex;
    }
    .title {
      font-size: 16px;
      padding-bottom: 6px;
      border-bottom: 1px solid #eee;
      margin-bottom: 11px;
    }
    .name {
      font-size: 15px;
      position: relative;
      top: 5px;
      color: #303133;
      left: 12px;
    }
    .desc {
      margin-left: 27px;
      font-size: 12px;
      color: #b3b3b3;
      position: relative;
      top: 5px;
    }
  }
}
</style>

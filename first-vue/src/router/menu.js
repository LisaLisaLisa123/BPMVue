//主菜单界面路径以及各个菜单子页面路径
let menuTitle = [
  {
    path: '/views',
    name: 'views',
    redirect: '/views/guide'
  },

  {
    path: '/views/guide',
    name: '/views/guide',
    component: () => import('@/views/guide.vue'),
    meta: {
      anonymous: true
    },

    children: [
      {
        path: '/pages/process',
        name: '/pages/process',
        component: () => import('@/views/pages/process.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/pages/organization',
        name: '/pages/organization',
        component: () => import('@/views/pages/organization.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/pages/systemmanagement',
        name: '/pages/systemmanagement',
        component: () => import('@/views/pages/systemmanagement.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/pages/processmanagement',
        name: '/pages/processmanagement',
        component: () => import('@/views/maintenance/domain.vue'),
        // component: () => import('@/views/pages/processmanagement.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/pages/personcenter',
        name: '/pages/personcenter',
        // component: () => import('@/views/pages/personcenter.vue'),
        component: () => import('@/views/maintenance/user.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/maintenance/domain',
        name: '/maintenance/domain',
        component: () => import('@/views/maintenance/domain.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/maintenance/company',
        name: '/maintenance/company',
        component: () => import('@/views/maintenance/company.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/maintenance/department',
        name: '/maintenance/department',
        component: () => import('@/views/maintenance/department.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/maintenance/user',
        name: '/maintenance/user',
        component: () => import('@/views/maintenance/user.vue'),
        meta: {
          anonymous: true
        }
      },
      {
        path: '/maintenance/group',
        name: '/maintenance/group',
        component: () => import('@/views/maintenance/group.vue'),
        meta: {
          anonymous: true
        }
      },
      //流程管理路径
      {
        path:'/systemManage/processList',
        name:'/systemManage/processList',
        component:() => import('@/views/systemManage/processList.vue'),
        meta:{
          anonymous:true
        }
      },{
        path:'/systemManage/processStep',
        name:'/systemManage/processStep',
        component:() => import('@/views/systemManage/processStep.vue'),
        meta:{
          anonymous:true
        }
      },{
        path:'/systemManage/processRule',
        name:'/systemManage/processRule',
        component:() => import('@/views/systemManage/processRule.vue'),
        meta:{
          anonymous:true
        }
      },{
        path:'/systemManage/ruleExpress',
        name:'/systemManage/ruleExpress',
        component:() => import('@/views/systemManage/ruleExpress.vue'),
        meta:{
          anonymous:true
        }
      }
    ]
  }
]
export default menuTitle

# vue-admin

Vue 后台

[https://sohaha.73zls.com/vue-admin](https://sohaha.73zls.com/vue-admin)



##### 微信-会员管理
./router.json
```
  {
    "name": "会员管理",
    "path": "",
    "url": "",
    "icon": "icon-person-add",
    "meta": {
      "breadcrumb": true,
      "show": true,
      "has": true,
      "collapse": true
    },
    "children": [
      {
        "name": "微信用户",
        "path": "member/wechat",
        "url": "pages/member/wechat.vue",
        "icon": "icon-award",
        "meta": {
          "show": true,
          "has": true
        }
      }
    ]
  }
```

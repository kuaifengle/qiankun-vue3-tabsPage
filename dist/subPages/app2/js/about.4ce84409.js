(window["webpackJsonp_app2"]=window["webpackJsonp_app2"]||[]).push([["about"],{"57b5":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),o=Object(n["createElementVNode"])("h1",null,"App2 userDetailuserDetailuserDetailuserDetailuserDetailuserDetail",-1),a=Object(n["createTextVNode"])("to user"),u=Object(n["createTextVNode"])("返回User");function c(e,t,r,c,l,s){var i=Object(n["resolveComponent"])("router-link"),p=Object(n["resolveComponent"])("el-input"),b=Object(n["resolveComponent"])("el-button");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[o,Object(n["createVNode"])(i,{to:"/app2/user"},{default:Object(n["withCtx"])((function(){return[a]})),_:1}),Object(n["createVNode"])(p,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=function(e){return l.value=e}),placeholder:""},null,8,["modelValue"]),Object(n["createVNode"])(b,{onClick:t[1]||(t[1]=function(t){return e.$router.push("/app2/user")})},{default:Object(n["withCtx"])((function(){return[u]})),_:1})],64)}var l={name:"UserDetail",data:function(){return{value:""}},mounted:function(){}},s=r("6b0d"),i=r.n(s);const p=i()(l,[["render",c]]);t["default"]=p},"754b":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),o={class:"about"},a=Object(n["createElementVNode"])("h1",null,"This is an App2 about page",-1);function u(e,t,r,u,c,l){var s=Object(n["resolveComponent"])("el-input");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",o,[a,Object(n["createVNode"])(s,{modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=function(e){return c.value=e}),placeholder:""},null,8,["modelValue"])])}var c={name:"About",data:function(){return{value:""}},methods:{}},l=r("6b0d"),s=r.n(l);const i=s()(c,[["render",u]]);t["default"]=i},b843:function(e,t,r){"use strict";r.r(t);var n=r("7a23"),o=Object(n["createElementVNode"])("h1",null,"App2 UserUserUserUserUserUserUserUserUserUserUserUser",-1),a=Object(n["createElementVNode"])("div",{style:{"margin-top":"40px"}},"因为userDetail是User的子页面所以会在keepAliveList中=====>删除User====> 再添加UserDetail ",-1),u=Object(n["createTextVNode"])("to userDetail"),c=Object(n["createElementVNode"])("div",{style:{"margin-top":"40px"}},"因为about不是User的子页面所以不能用$router.push跳转 需要新生成一个tab标签",-1),l=Object(n["createTextVNode"])("点击跳转about");function s(e,t,r,s,i,p){var b=Object(n["resolveComponent"])("router-link"),d=Object(n["resolveComponent"])("el-button");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[o,a,Object(n["createVNode"])(b,{to:"/app2/user/detail"},{default:Object(n["withCtx"])((function(){return[u]})),_:1}),c,Object(n["createVNode"])(d,{onClick:s.jump},{default:Object(n["withCtx"])((function(){return[l]})),_:1},8,["onClick"])],64)}var i={name:"User",setup:function(){var e=Object(n["getCurrentInstance"])(),t=function(){e.appContext.config.globalProperties.$parentRouter.push("/app2/about")};return{jump:t}}},p=r("6b0d"),b=r.n(p);const d=b()(i,[["render",s]]);t["default"]=d}}]);
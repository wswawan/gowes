(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{177:function(t,e,n){"use strict";var r=n(0),o=n(255),c=n.n(o);r.a.use(c.a)},234:function(t,e,n){var content=n(295);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("6570a8f6",content,!0,{sourceMap:!1})},257:function(t,e,n){"use strict";n(7),n(5),n(9),n(12),n(8),n(13);var r=n(2),o=n(77);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var E={name:"Default",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-file-document-multiple-outline",title:"Report",to:"/report"},{icon:"mdi-map-marker-path",title:"Checkpoint",to:"/checkpoint"},{icon:"mdi-account-group-outline",title:"Users",to:"/users"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Etape Pasundan"}},methods:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)({logout:"users/logout"}))},l=n(83),_=n(114),S=n.n(_),d=n(382),f=n(383),T=n(384),m=n(385),h=n(193),v=n(386),O=n(168),R=n(169),A=n(108),C=n(170),k=n(79),D=n(387),x=n(388),I=n(389),w=n(181),component=Object(l.a)(E,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[t.$auth.loggedIn?n("v-navigation-drawer",{attrs:{"mini-variant":t.miniVariant,clipped:t.clipped,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.items,(function(e,i){return n("v-list-item",{key:i,attrs:{to:e.to,router:"",exact:""}},[n("v-list-item-action",[n("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)})),1)],1):t._e(),t._v(" "),t.$auth.loggedIn?n("v-app-bar",{attrs:{"clipped-left":t.clipped,fixed:"",app:""}},[t.$auth.user.is_admin?n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}):t._e(),t._v(" "),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:t.logout}},[n("v-icon",[t._v("mdi-logout")])],1)],1):t._e(),t._v(" "),n("v-main",[n("v-container",{staticClass:"fill-height"},[n("nuxt")],1)],1),t._v(" "),n("v-navigation-drawer",{attrs:{right:t.right,temporary:"",fixed:""},model:{value:t.rightDrawer,callback:function(e){t.rightDrawer=e},expression:"rightDrawer"}},[n("v-list",[n("v-list-item",{nativeOn:{click:function(e){t.right=!t.right}}},[n("v-list-item-action",[n("v-icon",{attrs:{light:""}},[t._v(" mdi-repeat ")])],1),t._v(" "),n("v-list-item-title",[t._v("Switch drawer (click me)")])],1)],1)],1),t._v(" "),t.$auth.loggedIn?n("v-bottom-navigation",{attrs:{"background-color":"teal",grow:"",fixed:"",app:""}},[n("v-btn",{attrs:{to:"/home"}},[n("span",[t._v("Home")]),n("v-icon",[t._v("mdi-home-outline")])],1),t._v(" "),n("v-btn",{attrs:{to:"/checkin"}},[n("span",[t._v("CheckIn")]),t._v(" "),n("v-icon",[t._v("mdi-fingerprint")])],1),t._v(" "),n("v-btn",{attrs:{to:"/profile"}},[n("span",[t._v("Profile")]),t._v(" "),n("v-icon",[t._v("mdi-account-cowboy-hat")])],1)],1):t._e()],1)}),[],!1,null,null,null);e.a=component.exports;S()(component,{VApp:d.a,VAppBar:f.a,VAppBarNavIcon:T.a,VBottomNavigation:m.a,VBtn:h.a,VContainer:v.a,VIcon:O.a,VList:R.a,VListItem:A.a,VListItemAction:C.a,VListItemContent:k.a,VListItemTitle:k.c,VMain:D.a,VNavigationDrawer:x.a,VSpacer:I.a,VToolbarTitle:w.a})},268:function(t,e,n){n(269),t.exports=n(270)},286:function(t,e,n){"use strict";n.r(e),e.default=function(t){var e=t.app,n=t.redirect;if(e.$auth.loggedIn)return n("/home")}},294:function(t,e,n){"use strict";n(234)},295:function(t,e,n){var r=n(16)(!1);r.push([t.i,"h1[data-v-495dc2cf]{font-size:20px}",""]),t.exports=r},351:function(t,e){},352:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"getters",(function(){return c})),n.d(e,"actions",(function(){return E})),n.d(e,"mutations",(function(){return l}));var r=n(11),o=(n(22),n(5),n(38),n(97),n(52),function(){return{checkpoints:[],editedIndex:-1,id:null,name:null,description:null,qrcode_url:null,user:{id:null,name:null},dialog:!1,dialogDelete:!1,loading:!1,snackbar:!1,color:"teal darken-3",success:"",error:""}}),c={checkpoints:function(t){return t.checkpoints}},E={fetchCheckpoints:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.commit,n.next=3,e.$axios.$get("/api/checkpoints");case 3:o=n.sent,r("SET_CHECKPOINTS",o);case 5:case"end":return n.stop()}}),n)})))()},createCheckpoint:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.state,o=t.commit,n.next=3,e.$axios.$get("/sanctum/csrf-cookie");case 3:return n.next=5,e.$axios.$post("/api/checkpoint",{name:r.name,description:r.description,user_id:r.user.id}).then((function(data){o("SET_SAVE_CHECKPOINT",data),o("SET_SNACKBAR",r.snackbar),o("SET_TEXT_SUCCESS","Created Successfully"),o("SET_DIALOG",r.dialog),o("SET_LOADING",r.loading),o("SET_RESET")})).catch((function(t){o("SET_COLOR","error"),o("SET_TEXT_SUCCESS",null),o("SET_TEXT_ERROR",t.response.data.errors),o("SET_SNACKBAR",r.snackbar),o("SET_LOADING",r.loading)}));case 5:case"end":return n.stop()}}),n)})))()},updateCheckpoint:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.state,o=t.commit,n.next=3,e.$axios.$get("/sanctum/csrf-cookie");case 3:return n.next=5,e.$axios.$put("/api/checkpoint/".concat(r.id),{name:r.name,description:r.description,user_id:r.user.id}).then((function(data){o("SET_SAVE_CHECKPOINT",data),o("SET_INDEX",-1),o("SET_DIALOG",r.dialog),o("SET_SNACKBAR",r.snackbar),o("SET_TEXT_SUCCESS","Updated Successfully"),o("SET_LOADING",r.loading),o("SET_RESET")}));case 5:case"end":return n.stop()}}),n)})))()},deleteCheckpoint:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.state,o=t.commit,n.next=3,e.$axios.$get("/sanctum/csrf-cookie");case 3:return n.next=5,e.$axios.$delete("/api/checkpoint/".concat(r.id)).then((function(){o("SET_DELETE_ITEM"),o("SET_INDEX",-1),o("SET_DIALOG_DELETE",r.dialogDelete),o("SET_COLOR","teal darken-3"),o("SET_LOADING",r.loading),o("SET_SNACKBAR",r.snackbar),o("SET_TEXT_SUCCESS","Deleted Successfully")}));case 5:case"end":return n.stop()}}),n)})))()}},l={SET_ID:function(t,e){t.id=e},SET_NAME:function(t,e){t.name=e},SET_DESCRIPTION:function(t,e){t.description=e},SET_QRCODE_URL:function(t,e){t.qrcode_url=e},SET_USER:function(t,e){t.user.id=e.id,t.user.name=e.name},SET_RESET:function(t){t.name=null,t.description=null,t.user.id=null,t.user.name=null},SET_CHECKPOINTS:function(t,e){t.checkpoints=e},SET_SAVE_CHECKPOINT:function(t,e){Object.assign(e,{"user.name":t.user.name}),t.editedIndex>-1?Object.assign(t.checkpoints[t.editedIndex],e):t.checkpoints.unshift(e)},SET_DELETE_ITEM:function(t){t.checkpoints.splice(t.editedIndex,1)},SET_DIALOG:function(t,dialog){t.dialog=!dialog},SET_DIALOG_DELETE:function(t,e){t.dialogDelete=!e},SET_LOADING:function(t,e){t.loading=!e},SET_TEXT_SUCCESS:function(t,e){t.success=e},SET_SNACKBAR:function(t,e){t.snackbar=!e},SET_INDEX:function(t,e){t.editedIndex=e},SET_COLOR:function(t,e){t.color=e},SET_TEXT_ERROR:function(t,e){t.error=e}}},353:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"getters",(function(){return c})),n.d(e,"actions",(function(){return E})),n.d(e,"mutations",(function(){return l}));var r=n(11),o=(n(52),function(){return{uuid:null,qrscans:[],summary:[],snackbar:!1,color:"success",error:[],success:"",loading:!1}}),c={qrscan:function(t){return t.qrscan},summary:function(t){return t.summary}},E={qrscan:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.state,o=t.commit,n.next=3,e.$axios.$get("/sanctum/csrf-cookie");case 3:return n.next=5,e.$axios.$post("/api/qrscan",{uuid:r.uuid}).then((function(){e.$router.push({name:"home"}),o("SET_SNACKBAR",r.snackbar),o("SET_COLOR","teal darken-3"),o("SET_UUID"),o("SET_LOADING",r.loading)})).catch((function(t){o("SET_SNACKBAR",r.snackbar),o("SET_COLOR","error"),o("SET_TEXT_ERROR",t.response.data.message),o("SET_LOADING",r.loading)}));case 5:case"end":return n.stop()}}),n)})))()},fetchQrscans:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.commit,n.next=3,e.$axios.$get("/api/qrscans").then((function(data){r("SET_QRSCANS",data)}));case 3:case"end":return n.stop()}}),n)})))()},fetchSummary:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.commit,n.next=3,e.$axios.$get("api/summary").then((function(data){r("SET_SUMMARY",data)}));case 3:case"end":return n.stop()}}),n)})))()}},l={SET_UUID:function(t,e){t.uuid=e},SET_QRSCANS:function(t,e){t.qrscans=e},SET_SUMMARY:function(t,summary){t.summary=summary},SET_TEXT_ERROR:function(t,e){t.error=e},SET_TEXT_SUCCESS:function(t,e){t.success=e},SET_COLOR:function(t,e){t.color=e},SET_SNACKBAR:function(t,e){t.snackbar=!e},SET_LOADING:function(t,e){t.loading=!e}}},354:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"getters",(function(){return c})),n.d(e,"actions",(function(){return E})),n.d(e,"mutations",(function(){return l}));var r=n(11),o=(n(22),n(97),n(52),function(){return{id:null,name:null,email:null,password:null,new_password:null,nik:null,date_of_birth:null,phone_number:null,is_admin:0,editedIndex:-1,users:[],alert:!1,timeout:1e4,dialog:!1,dialogDelete:!1,snackbar:!1,color:"success",error:[],success:"",loading:!1}}),c={users:function(t){return t.users}},E={fetchUsers:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.commit,n.next=3,e.$axios.$get("/api/users");case 3:o=n.sent,r("SET_USERS",o);case 5:case"end":return n.stop()}}),n)})))()},login:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.state,o=t.commit,n.next=3,e.$auth.loginWith("laravelSanctum",{data:{email:r.email,password:r.password}}).then((function(){o("SET_LOADING",r.loading),o("SET_RESET")})).catch((function(t){o("SET_COLOR","error"),o("SET_TEXT_SUCCESS",null),o("SET_TEXT_ERROR",t.response.data.message),o("SET_SNACKBAR",r.snackbar),o("SET_LOADING",r.loading)}));case 3:case"end":return n.stop()}}),n)})))()},logout:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$auth.logout();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))()},register:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.state,o=t.commit,n.next=3,e.$axios.$get("/sanctum/csrf-cookie");case 3:return n.next=5,e.$axios.$post("/api/register",{name:r.name,email:r.email,password:r.password,nik:r.nik,phone_number:r.phone_number,date_of_birth:r.date_of_birth,is_admin:r.is_admin}).then((function(data){o("SET_SAVE_USER",data),o("SET_DIALOG",r.dialog),o("SET_SNACKBAR",r.snackbar),o("SET_COLOR","teal darken-3"),o("SET_TEXT_SUCCESS","Registration Successful"),o("SET_LOADING",r.loading)})).catch((function(t){o("SET_COLOR","error"),o("SET_TEXT_SUCCESS",null),o("SET_TEXT_ERROR",t.response.data.errors),o("SET_SNACKBAR",r.snackbar),o("SET_LOADING",r.loading)}));case 5:case"end":return n.stop()}}),n)})))()},updateUser:function(t){var e=t.state,n=t.commit;this.$axios.$get("/sanctum/csrf-cookie"),this.$axios.$post("api/user/"+e.id,{name:e.name,email:e.email,nik:e.nik,phone_number:e.phone_number,date_of_birth:e.date_of_birth,is_admin:e.is_admin}).then((function(data){n("SET_SAVE_USER",data),n("SET_INDEX",-1),n("SET_DIALOG",e.dialog),n("SET_COLOR","teal darken-3"),n("SET_SNACKBAR",e.snackbar),n("SET_TEXT_SUCCESS","Update Successful"),n("SET_LOADING",e.loading),n("SET_ADMIN")}))},updatePassword:function(t){var e=t.state,n=t.commit;this.$axios.$get("/sanctum/csrf-cookie"),this.$axios.$post("api/profile/update_password",{password:e.password,new_password:e.new_password}).then((function(){n("SET_COLOR","teal darken-3"),n("SET_SNACKBAR",e.snackbar),n("SET_TEXT_SUCCESS","Update Successful"),n("SET_PASSWORD"),n("SET_NEW_PASSWORD"),n("SET_DIALOG",e.dialog),n("SET_LOADING",e.loading)})).catch((function(t){n("SET_COLOR","error"),n("SET_SNACKBAR",e.snackbar),n("SET_TEXT_SUCCESS",t.response.data.message),n("SET_LOADING",e.loading)}))},deleteUser:function(t){var e=t.state,n=t.commit;this.$axios.$get("/sanctum/csrf-cookie"),this.$axios.$delete("api/user/".concat(e.id)).then((function(){n("SET_DELETE_USER"),n("SET_INDEX",-1),n("SET_DIALOG_DELETE",e.dialogDelete),n("SET_LOADING",e.loading),n("SET_COLOR","teal darken-3"),n("SET_SNACKBAR",e.snackbar),n("SET_TEXT_SUCCESS","Delete Successful")})).catch((function(t){n("SET_LOADING",e.loading),n("SET_DIALOG_DELETE",e.dialogDelete),n("SET_SNACKBAR",e.snackbar),n("SET_COLOR","error"),n("SET_TEXT_SUCCESS",t.response.data)}))}},l={SET_ID:function(t,e){t.id=e},SET_NAME:function(t,e){t.name=e},SET_EMAIL:function(t,e){t.email=e},SET_PASSWORD:function(t,e){t.password=e},SET_NEW_PASSWORD:function(t,e){t.new_password=e},SET_PHONE_NUMBER:function(t,e){t.phone_number=e},SET_BIRTHDAY:function(t,e){t.date_of_birth=e},SET_NIK:function(t,e){t.nik=e},SET_ADMIN:function(t,e){t.is_admin=e},SET_USERS:function(t,e){t.users=e},SET_SAVE_USER:function(t,e){t.editedIndex>-1?Object.assign(t.users[t.editedIndex],e):t.users.unshift(e)},SET_RESET:function(t){t.id=null,t.name=null,t.email=null,t.password=null,t.nik=null,t.date_of_birth=null,t.phone_number=null,t.is_admin=null},SET_DELETE_USER:function(t){t.users.splice(t.editedIndex,1)},SET_INDEX:function(t,e){t.editedIndex=e},SET_ALERT:function(t,e){t.alert=e},SET_TEXT_ERROR:function(t,e){t.error=e},SET_TEXT_SUCCESS:function(t,e){t.success=e},SET_COLOR:function(t,e){t.color=e},SET_DIALOG:function(t,dialog){t.dialog=!dialog},SET_DIALOG_DELETE:function(t,e){t.dialogDelete=!e},SET_SNACKBAR:function(t,e){t.snackbar=!e},SET_LOADING:function(t,e){t.loading=!e}}},71:function(t,e,n){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(n(294),n(83)),c=n(114),E=n.n(c),l=n(382),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[404===t.error.statusCode?n("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):n("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),n("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"495dc2cf",null);e.a=component.exports;E()(component,{VApp:l.a})}},[[268,18,5,19]]]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{534:function(e,t,r){"use strict";r.r(t);r(7),r(5),r(8),r(12),r(9),r(13);var n=r(11),o=r(2),c=(r(52),r(436),r(23),r(56),r(77));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={middleware:["guest"],data:function(){return{valid:!0,menu:!1,activePicker:null,rules:{name:[function(e){return!!e||"Name is required"},function(e){return e&&e.length>=3||"Name must be 3 characters or more"}],email:[function(e){return!!e||"Email is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],phoneNumber:[function(e){return!!e||"Phone number is required"},function(e){return Number.isInteger(Number(e))||"The value must be an integer number"}],nik:[function(e){return!!e||"NIK is required"},function(e){return Number.isInteger(Number(e))||"The value must be an integer number"}],birthday:[function(e){return!!e||"Birthday date is required"}]}}},computed:v({},Object(c.e)("users",["name","email","nik","phone_number","date_of_birth","imageId","alert","color","error","success","snackbar"])),watch:{menu:function(e){var t=this;e&&setTimeout((function(){return t.activePicker="YEAR"}))}},methods:v(v(v({submitUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$refs.form.validate()){t.next=6;break}return e.$store.commit("users/SET_LOADING",e.loading),setTimeout((function(){e.register()}),2e3),t.next=5,e.$refs.form.resetValidation();case 5:setTimeout((function(){e.$store.commit("users/SET_SNACKBAR",e.snackbar)}),4e3);case 6:case"end":return t.stop()}}),t)})))()}},Object(c.b)({register:"users/register"})),Object(c.d)("users",["SET_NAME","SET_EMAIL","SET_PHONE_NUMBER","SET_NIK","SET_BIRTHDAY","SET_IMAGE_ID","SET_ALERT"])),{},{save:function(e){this.$refs.menu.save(e)}})},d=r(83),f=r(113),_=r.n(f),k=r(541),E=r(202),h=r(405),T=r(389),O=r(409),y=r(517),S=r(430),N=r(168),x=r(79),w=r(463),P=r(410),j=r(426),V=r(386),I=r(431),A=r(43),R=r(182),component=Object(d.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{cols:"12",md:"6",sm:"8"}},[r("v-card",[r("v-toolbar",{attrs:{dense:"",color:"grey darken-2"}},[r("v-toolbar-title",[e._v("Register")])],1),e._v(" "),r("v-card-text",[r("v-alert",{attrs:{value:e.alert,color:e.color,dense:"",border:"top"}},[e._l(e.error,(function(t,n){return r("div",{key:n},e._l(t,(function(t,n){return r("v-list-item-subtitle",{key:n},[e._v(e._s(t))])})),1)})),e._v("\n          "+e._s(e.success)+"\n        ")],2),e._v(" "),r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{value:e.name,rules:e.rules.name,label:"Name",required:""},on:{input:e.SET_NAME}}),e._v(" "),r("v-text-field",{attrs:{value:e.email,label:"Email",rules:e.rules.email,required:""},on:{input:e.SET_EMAIL}}),e._v(" "),r("v-text-field",{attrs:{type:"number",value:e.phone_number,label:"Phone Number",rules:e.rules.phoneNumber,required:""},on:{input:e.SET_PHONE_NUMBER}}),e._v(" "),r("v-text-field",{attrs:{value:e.nik,rules:e.rules.nik,label:"NIK",required:""},on:{input:e.SET_NIK}}),e._v(" "),r("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-text-field",e._g(e._b({attrs:{value:e.date_of_birth,rules:e.rules.birthday,readonly:"",label:"Birthday date","prepend-inner-icon":"mdi-calendar",required:""},on:{input:e.SET_BIRTHDAY}},"v-text-field",o,!1),n))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[e._v(" "),r("v-date-picker",{attrs:{value:e.date_of_birth,"active-picker":e.activePicker,max:"2014-12-31",required:""},on:{"update:activePicker":function(t){e.activePicker=t},"update:active-picker":function(t){e.activePicker=t},input:e.SET_BIRTHDAY,change:e.save}})],1),e._v(" "),r("v-card-actions",[r("span",{staticClass:"caption align-center"},[e._v("\n              Have an Account ?\n              "),r("v-btn",{staticClass:"text-capitalize",attrs:{text:"",to:"/",small:""}},[e._v("Login")])],1),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{staticClass:"mx-center",attrs:{disabled:!e.valid,color:"teal darken-3"},on:{click:function(t){return t.preventDefault(),e.submitUser(t)}}},[e._v("Submit")])],1)],1)],1)],1),e._v(" "),r("v-snackbar",{attrs:{value:e.snackbar,timeout:"5000",color:e.color}},[e.success?r("v-btn",{attrs:{text:"",small:""}},[r("v-icon",[e._v("mdi-information-outline")])],1):e._e(),e._v(" "),e.success?r("span",[e._v("\n        "+e._s(e.success)+"\n      ")]):r("div",e._l(e.error,(function(t,i){return r("ul",{key:i},[r("li",[e._v(e._s(t[0]))])])})),0)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;_()(component,{VAlert:k.a,VBtn:E.a,VCard:h.a,VCardActions:T.a,VCardText:T.c,VCol:O.a,VDatePicker:y.a,VForm:S.a,VIcon:N.a,VListItemSubtitle:x.b,VMenu:w.a,VRow:P.a,VSnackbar:j.a,VSpacer:V.a,VTextField:I.a,VToolbar:A.a,VToolbarTitle:R.a})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{435:function(t,e,r){"use strict";var n=r(2),o=(r(45),r(57),r(186),r(7),r(9),r(55),r(77),r(8),r(5),r(12),r(13),r(11)),c=r(88),l=r(118);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},501:function(t,e,r){var content=r(556);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(17).default)("89d42c4c",content,!0,{sourceMap:!1})},555:function(t,e,r){"use strict";r(501)},556:function(t,e,r){var n=r(16)(!1);n.push([t.i,".flipX{transform:scaleX(-1)}",""]),t.exports=n},596:function(t,e,r){"use strict";r.r(e);var n=r(4),o=(r(47),{data:function(){return{image:null,mediaStream:null,camera:"user"}},mounted:function(){this.init()},methods:{setImage:function(image){this.image=image},fileUpload:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("image",t.image),e.next=4,t.$axios.$get("/sanctum/csrf-cookie");case 4:return e.next=6,t.$axios.$post("/api/upload",r,{headers:{"Content-Type":"multipart/form-data"}}).then((function(data){return console.log(data)}));case 6:case"end":return e.stop()}}),e)})))()},init:function(){var t=this;navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia?navigator.mediaDevices.getUserMedia({video:{facingMode:this.camera}}).then((function(e){t.mediaStream=e,t.$refs.video.srcObject=e,t.$refs.video.play()})):alert("Cannot get media devices")}}}),c=(r(555),r(85)),l=r(117),d=r.n(l),f=r(189),h=r(400),v=r(421),m=r(548),w=r(435),O=r(110),_=r(422),y=r(399),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{cols:"12",md:"6",sm:"8"}},[r("video",{ref:"video",class:"user"===t.camera?"flipX":"",attrs:{autoplay:"true",width:"100%"}}),t._v(" "),r("v-card-actions",{staticClass:"justify-center"},[r("v-btn",{attrs:{icon:""}},[r("v-icon",[t._v("mdi-camera-flip-outline")])],1),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{icon:""}},[r("v-icon",[t._v("mdi-camera-outline")])],1)],1),t._v(" "),r("v-form",[r("v-file-input",{attrs:{label:"Upload Image Here",name:"image"},on:{change:t.setImage},model:{value:t.image,callback:function(e){t.image=e},expression:"image"}}),t._v(" "),r("v-btn",{on:{click:function(e){return e.preventDefault(),t.fileUpload(e)}}},[t._v("Submit")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:f.a,VCardActions:h.a,VCol:v.a,VFileInput:m.a,VForm:w.a,VIcon:O.a,VRow:_.a,VSpacer:y.a})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{541:function(t,e,r){"use strict";r.r(e);r(7),r(5),r(12),r(8),r(13);var n=r(2),c=(r(9),r(77));function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={components:{},middleware:"auth",data:function(){return{carousels:[{src:"https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/sky.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/bird.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/planet.jpg"}]}},computed:l(l({},Object(c.e)("qrscans",["qrscans"])),{},{qrAuth:function(){var t=this;return this.$store.state.qrscans.qrscans.filter((function(e){return e.user.id===t.$auth.user.id}))},checkIn:function(){return this.$store.state.qrscans.summary.filter((function(t){return t.qrscans.length>1}))}}),mounted:function(){this.fetchQrscans()},methods:l({},Object(c.b)({fetchQrscans:"qrscans/fetchQrscans"}))},d=r(83),m=r(114),f=r.n(m),h=r(193),y=r(409),j=r(391),O=r(550),_=r(551),w=r(411),C=r(386),V=r(431),k=r(467),P=r(412),x=r(534),D=r(535),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",[r("v-container",[r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-carousel",{attrs:{height:"300"}},t._l(t.carousels,(function(t,i){return r("v-carousel-item",{key:i,attrs:{src:t.src,"reverse-transition":"fade-transition",transition:"fade-transition"}})})),1),t._v(" "),r("v-col",{staticClass:"px-0",attrs:{cols:"12",sm:"8",md:"6"}},[r("v-card",[r("v-card-title",[t._v("Hi "+t._s(t.$auth.user.name))]),t._v(" "),r("v-card-subtitle",{staticClass:"subtitle-1"},[t._v("\n            Welcome to the Timeline\n          ")])],1),t._v(" "),r("v-divider",{staticClass:"grey darken-3"}),t._v(" "),r("v-card",{staticClass:"mx-auto"},[t.qrAuth.length?r("v-card-text",{staticClass:"py-0 pl-0"},t._l(t.qrAuth,(function(e){return r("v-timeline",{key:e.id,attrs:{"align-top":"",dense:""}},[r("v-timeline-item",{attrs:{small:"",color:"teal"}},[r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("v-btn",{staticClass:"teal darken-3",attrs:{small:""}},[t._v("\n                      "+t._s(e.time)+"\n                    ")])],1),t._v(" "),r("v-col",{attrs:{"align-self":"center"}},[t._v(t._s(e.checkpoint.name))])],1)],1)],1)})),1):r("v-card-text",[t._v("Currently you have no timeline")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VBtn:h.a,VCard:y.a,VCardSubtitle:j.b,VCardText:j.c,VCardTitle:j.d,VCarousel:O.a,VCarouselItem:_.a,VCol:w.a,VContainer:C.a,VDivider:V.a,VLayout:k.a,VRow:P.a,VTimeline:x.a,VTimelineItem:D.a})}}]);
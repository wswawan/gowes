(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{406:function(t,e,n){var content=n(407);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("63c9496b",content,!0,{sourceMap:!1})},407:function(t,e,n){var r=n(16)(!1);r.push([t.i,'.theme--light.v-snack__wrapper{color:rgba(0,0,0,.87)}.theme--dark.v-snack__wrapper{color:#fff}.v-sheet.v-snack__wrapper{border-radius:4px}.v-sheet.v-snack__wrapper:not(.v-sheet--outlined){box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-sheet.v-snack__wrapper.v-sheet--shaped{border-radius:24px 4px}.v-snack{bottom:0;display:flex;font-size:.875rem;justify-content:center;left:0;pointer-events:none;right:0;top:0;width:100%}.v-snack:not(.v-snack--absolute){height:100vh;position:fixed;z-index:1000}.v-snack:not(.v-snack--centered):not(.v-snack--top){align-items:flex-end}.v-snack__wrapper{align-items:center;border-color:currentColor!important;display:flex;margin:8px;max-width:672px;min-height:48px;min-width:344px;padding:0;pointer-events:auto;position:relative;transition-duration:.15s;transition-property:opacity,transform;transition-timing-function:cubic-bezier(0,0,.2,1)}.v-snack__wrapper.theme--dark{background-color:#333;color:hsla(0,0%,100%,.87)}.v-snack__content{flex-grow:1;font-size:.875rem;font-weight:400;letter-spacing:.0178571429em;line-height:1.25rem;margin-right:auto;padding:14px 16px;text-align:left;text-align:initial}.v-snack__action{align-items:center;align-self:center;display:flex}.v-snack__action .v-ripple__container{display:none}.v-application--is-ltr .v-snack__action{margin-right:8px}.v-application--is-rtl .v-snack__action{margin-left:8px}.v-snack__action>.v-snack__btn.v-btn{padding:0 8px}.v-snack__btn{margin:0;min-width:auto}.v-snack--absolute{height:100%;position:absolute;z-index:1}.v-snack--centered{align-items:center}.v-snack--left{justify-content:flex-start;right:auto}.v-snack--multi-line .v-snack__wrapper{min-height:68px}.v-snack--right{justify-content:flex-end;left:auto}.v-snack:not(.v-snack--has-background) .v-snack__wrapper{box-shadow:none!important}.v-snack--bottom{top:auto}.v-snack--text .v-snack__wrapper:before{background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;pointer-events:none;position:absolute;right:0;top:0}.v-snack--top{align-items:flex-start;bottom:auto}.v-snack--vertical .v-snack__wrapper{flex-direction:column}.v-snack--vertical .v-snack__wrapper .v-snack__action{align-self:flex-end;margin-bottom:8px}.v-snack-transition-enter.v-snack__wrapper{transform:scale(.8)}.v-snack-transition-enter.v-snack__wrapper,.v-snack-transition-leave-to.v-snack__wrapper{opacity:0}',""]),t.exports=r},426:function(t,e,n){"use strict";var r=n(2),o=(n(23),n(44),n(56),n(406),n(64)),c=n(25),l=n(29),h=n(45),d=n(115),m=n(10),f=n(1),v=n(6);e.a=Object(m.a)(o.a,c.a,h.a,Object(d.b)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"==typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:l.a.options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,n=t.bottom,footer=t.footer,r=t.insetFooter,o=t.left,c=t.right,l=t.top;return{paddingBottom:Object(f.g)(n+footer+r),paddingLeft:this.app?Object(f.g)(o):void 0,paddingRight:this.app?Object(f.g)(c):void 0,paddingTop:Object(f.g)(e+l)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(v.e)("auto-height",this),0==this.timeout&&Object(v.d)('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(f.s)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(r.a)({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(f.s)(this)])},genWrapper:function(){var t=this,data=(this.hasBackground?this.setBackgroundColor:this.setTextColor)(this.color,{staticClass:"v-snack__wrapper",class:o.a.options.computed.classes.call(this),style:o.a.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{mouseenter:function(){return window.clearTimeout(t.activeTimeout)},mouseleave:this.setTimeout}});return this.$createElement("div",data,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},430:function(t,e,n){"use strict";var r=n(2),o=(n(44),n(57),n(183),n(8),n(9),n(56),n(96),n(7),n(5),n(12),n(13),n(10)),c=n(86),l=n(116);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:d({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},469:function(t,e,n){var content=n(470);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("50788f08",content,!0,{sourceMap:!1})},470:function(t,e,n){var r=n(16)(!1);r.push([t.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:inherit}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),t.exports=r},530:function(t,e,n){"use strict";n.r(e);n(7),n(12),n(9),n(13);var r=n(11),o=n(2),c=(n(52),n(8),n(56),n(22),n(5),n(38),n(77));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={middleware:"auth",data:function(){return{timeout:4e3,valid:!1,search:"",form:null,select:{},rules:{name:[function(t){return!!t||"Checkpoint name is required"},function(t){return t&&t.length>=3||"Checkpoint name must be 3 characters or more"}],description:[function(t){return!!t||"Checkpoint description is required"},function(t){return t&&t.length>=3||"Description must be 3 characters or more"},function(t){return t&&t.length<=30||"Description must be less than or 30 characters"}],pic:[function(t){return!!t||"PIC is required"}]},CheckPointHeaders:[{text:"Name",align:"start",value:"name"},{text:"Description",sortable:!1,value:"description"},{text:"PIC",value:"user.name"},{text:"QRCode",value:"qrcode_url"},{text:"Actions",sortable:!1,align:"center",value:"actions"}]}},computed:h(h(h({},Object(c.e)("checkpoints",["name","description","qrcode_url","user","dialog","loading","snackbar","error","success","color","editedIndex","dialogDelete"])),Object(c.c)({checkpoints:"checkpoints/checkpoints",users:"users/users"})),{},{userAdmin:function(){return this.$store.state.users.users.filter((function(t){return t.is_admin}))}}),mounted:function(){this.fetchCheckpoints(),this.fetchUsers()},methods:h(h(h({},Object(c.b)({fetchCheckpoints:"checkpoints/fetchCheckpoints",fetchUsers:"users/fetchUsers",createCheckpoint:"checkpoints/createCheckpoint",updateCheckpoint:"checkpoints/updateCheckpoint",deleteCheckpoint:"checkpoints/deleteCheckpoint"})),Object(c.d)("checkpoints",["SET_NAME","SET_DESCRIPTION","SET_USER","SET_QRCODE_URL","SET_COLOR","SET_DIALOG","SET_LOADING","SET_SNACKBAR","SET_TEXT_SUCCESS","SET_INDEX"])),{},{open:function(){var t=this;this.$store.commit("checkpoints/SET_DIALOG",this.dialog),setTimeout((function(){t.$refs.form.reset()}),100)},close:function(){this.$store.commit("checkpoints/SET_DIALOG",this.dialog),this.$refs.form.resetValidation(),this.$refs.form.reset(),this.editedIndex>-1&&this.$store.commit("checkpoints/SET_INDEX",-1)},saveCheckpoint:function(){var t=this;this.$store.state.checkpoints.editedIndex>-1&&this.$refs.form.validate()&&(this.$store.commit("checkpoints/SET_LOADING",this.loading),setTimeout((function(){t.updateCheckpoint()}),1e3),setTimeout((function(){t.$store.commit("checkpoints/SET_SNACKBAR",t.snackbar),t.$refs.form.resetValidation(),t.$refs.form.reset()}),4100)),-1===this.$store.state.checkpoints.editedIndex&&this.$refs.form.validate()&&(this.$store.commit("checkpoints/SET_LOADING",this.loading),setTimeout((function(){t.createCheckpoint()})),setTimeout((function(){t.$refs.form.resetValidation(),t.$store.commit("checkpoints/SET_SNACKBAR",t.snackbar)}),5100))},editItem:function(t){this.$store.commit("checkpoints/SET_INDEX",this.checkpoints.indexOf(t)),this.$store.commit("checkpoints/SET_DIALOG",this.dialog),this.$store.commit("checkpoints/SET_ID",t.id),this.$store.commit("checkpoints/SET_NAME",t.name),this.$store.commit("checkpoints/SET_DESCRIPTION",t.description),this.$store.commit("checkpoints/SET_USER",t.user),this.select=t.user},deleteItem:function(t){this.$store.commit("checkpoints/SET_DIALOG_DELETE",this.dialogDelete),this.$store.commit("checkpoints/SET_INDEX",this.checkpoints.indexOf(t)),this.$store.commit("checkpoints/SET_ID",t.id),this.$store.commit("checkpoints/SET_QRCODE_URL",t.qrcode_url)},closeDelete:function(){this.$store.commit("checkpoints/SET_DIALOG_DELETE",this.dialogDelete),this.$store.commit("checkpoints/SET_ID",null),this.$store.commit("checkpoints/SET_INDEX",-1)},destroyCheckpoint:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.deleteCheckpoint();case 2:setTimeout((function(){t.$store.commit("checkpoints/SET_SNACKBAR",t.snackbar)}),2e3);case 3:case"end":return e.stop()}}),e)})))()}})},m=n(83),f=n(113),v=n.n(f),_=(n(55),n(61),n(96),n(44),n(57),n(469),n(451)),k=n(431),x=n(74),y=n(1);function I(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function S(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?I(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):I(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O=S(S({},_.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1}),w=_.a.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:_.a.options.props.menuProps.type,default:function(){return O}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return S(S({},_.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var n=Object(y.r)(e,t.itemText),text=null!=n?String(n):"";return t.filter(e,String(t.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=_.a.options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),S(S({},O),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(i){return t.valueComparator(t.getValue(i),t.getValue(t.internalValue))}))},listData:function(){var data=_.a.options.computed.listData.call(this);return data.props=S(S({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.blur(),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var n=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===y.y.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===y.y.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==y.y.backspace&&t!==y.y.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var r=t!==this.selectedItems.length-1?t:t-1;this.selectedItems[r]?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=r}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=null,_.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=k.a.options.methods.genInput.call(this);return input.data=Object(x.a)(input.data,{attrs:{"aria-activedescendant":Object(y.p)(this.$refs.menu,"activeTile.id"),autocomplete:Object(y.p)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=_.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?_.a.options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[y.y.home,y.y.end].includes(e)||_.a.options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){_.a.options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){_.a.options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){_.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){var e,n;if(-1!==this.selectedIndex){var r=this.selectedItems[this.selectedIndex],o=this.getText(r);null==(e=t.clipboardData)||e.setData("text/plain",o),null==(n=t.clipboardData)||n.setData("text/vnd.vuetify.autocomplete.item+plain",o),t.preventDefault()}}}}),C=n(202),D=n(405),T=n(389),E=n(383),j=n(528),$=n(524),V=n(427),A=n(430),P=n(168),B=n(502),L=n(426),N=n(386),R=n(43),M=n(182),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{"justify-center":""}},[n("v-container",[n("v-data-table",{attrs:{headers:t.CheckPointHeaders,items:t.checkpoints,loading:!t.checkpoints.length,search:t.search,"item-key":"id","fixed-header":""},scopedSlots:t._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{dense:""}},[n("v-text-field",{attrs:{label:"Search Checkpoint","append-icon":"mdi-magnify","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),n("v-dialog",{attrs:{value:t.dialog,"max-width":"500px",persistent:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-btn",t._g(t._b({attrs:{small:"",color:"primary"},on:{click:function(e){return e.preventDefault(),t.open(e)}}},"v-btn",o,!1),r),[t._v("create")])]}}])},[t._v(" "),n("v-card",[n("v-toolbar",{attrs:{dense:"",color:"grey darken-2"}},[n("v-toolbar-title",[t._v(t._s(t.editedIndex?"Create Checkpoint":"Update Checkpoint"))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"mx-center",attrs:{small:""},on:{click:t.close}},[t._v("Back")])],1),t._v(" "),n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-card-text",[n("v-text-field",{attrs:{value:t.name,rules:t.rules.name,required:"",label:"Checkpoint Name"},on:{input:t.SET_NAME}}),t._v(" "),n("v-text-field",{attrs:{value:t.description,rules:t.rules.description,required:"",label:"Checkpoint Description"},on:{input:t.SET_DESCRIPTION}}),t._v(" "),n("v-autocomplete",{attrs:{value:t.user,rules:t.rules.pic,required:"",label:"Select PIC",items:t.userAdmin,"item-text":"name","item-value":"id","return-object":""},on:{change:t.SET_USER},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}}),t._v(" "),n("v-divider"),t._v(" "),n("v-card-actions",{staticClass:"px-0"},[n("v-btn",{staticClass:"mx-center",attrs:{loading:t.loading,color:"teal darken-3",small:"",block:""},on:{click:function(e){return e.preventDefault(),t.saveCheckpoint(e)}}},[t._v("Submit")])],1)],1)],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{value:t.dialogDelete,"max-width":"500px",persistent:""}},[n("v-card",{attrs:{color:"grey darken-3"}},[n("v-card-title",{staticClass:"text-subtitle-1 justify-center"},[t._v("\n                Are you sure delete this item?\n              ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDelete}},[t._v("Cancel")]),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.destroyCheckpoint}},[t._v("OK")]),t._v(" "),n("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.qrcode_url",fn:function(e){var r=e.item;return[n("v-btn",{staticClass:"mx-center",attrs:{small:"",color:"blue",text:"",href:"https://biker.test/storage/"+r.qrcode_url,download:r.name}},[t._v("download\n        ")])]}},{key:"item.actions",fn:function(e){var r=e.item;return[n("v-icon",{staticClass:"mr-2",on:{click:function(e){return t.editItem(r)}}},[t._v("mdi-pencil")]),t._v(" "),n("v-icon",{on:{click:function(e){return t.deleteItem(r)}}},[t._v("mdi-delete")])]}}],null,!0)}),t._v(" "),n("v-snackbar",{attrs:{value:t.snackbar,timeout:t.timeout,color:t.color}},[n("v-btn",{attrs:{text:"",small:""}},[n("v-icon",[t._v("mdi-information-outline")])],1),t._v(" "),t.success?n("span",[t._v("\n        "+t._s(t.success)+"\n      ")]):t._e(),t._v(" "),t.error?n("span",[t._v("\n        "+t._s(t.error)+"\n      ")]):t._e()],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VAutocomplete:w,VBtn:C.a,VCard:D.a,VCardActions:T.a,VCardText:T.c,VCardTitle:T.d,VContainer:E.a,VDataTable:j.a,VDialog:$.a,VDivider:V.a,VForm:A.a,VIcon:P.a,VLayout:B.a,VSnackbar:L.a,VSpacer:N.a,VTextField:k.a,VToolbar:R.a,VToolbarTitle:M.a})}}]);
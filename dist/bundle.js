!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var a in i)("object"==typeof exports?exports:t)[a]=i[a]}}(self,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var a in i)t.o(i,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:i[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{ImageWallFall:()=>r,ImageWallWrap:()=>s});var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{style:{position:"relative",width:t.displayWidth+"px",height:t.position.maxHeight+"px"}},[t._t("default",null,{posData:t.position.list})],2)};function a(t,e,i,a){const l=t.concat([]),o=t.reduce(((t,e)=>t+e),0),s=e>o;let h=Math.abs(e-o);const n=l.length;for(;h>0;){let t=0;for(let e=0;e<n&&(s?l[e]<a?(l[e]++,h--):t++:l[e]>i?(l[e]--,h--):t++,0!==h);e++);if(t===n)break}return 0===h?l:[]}function l(t,e,i,a,l,o,s,h){var n,r="function"==typeof t?t.options:t;if(e&&(r.render=e,r.staticRenderFns=i,r._compiled=!0),a&&(r.functional=!0),o&&(r._scopeId="data-v-"+o),s?(n=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),l&&l.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},r._ssrRegister=n):l&&(n=h?function(){l.call(this,(r.functional?this.parent:this).$root.$options.shadowRoot)}:l),n)if(r.functional){r._injectStyles=n;var p=r.render;r.render=function(t,e){return n.call(e),p(t,e)}}else{var d=r.beforeCreate;r.beforeCreate=d?[].concat(d,n):[n]}return{exports:t,options:r}}i._withStripped=!0;var o=l({name:"ImageWallWrap",props:{displayWidth:{type:Number,default:0},imageMinAspectRatio:{type:Number,default:.75,validator:t=>t>0&&t<1/0},imageMaxAspectRatio:{type:Number,default:2.28,validator:t=>t>0&&t<1/0},imageHeight:{type:Number,default:240,validator:t=>t>0&&t<1/0},imageGap:{type:Number,default:16,validator:t=>t>=0},visibleTop:{type:Number,default:0,validator:t=>t>=0},imageRectData:{type:Array,default:()=>[]}},computed:{position(){const t=this.displayWidth,e=this.imageGap,i=this.imageHeight,l=this.imageRectData,o=this.visibleTop,s=this.imageMinAspectRatio,h=this.imageMaxAspectRatio;let n={};const r=Math.ceil(s*i),p=Math.floor(h*i);let d={},m=0,u=t;if(l.length>0)for(let n=0,f=l.length;n<f;n++){d[m]||(d[m]=[]);let f=d[m],{width:c=0,height:g=0}=l[n],v=Math.min(Math.max(c/g,s),h),b=v*i;b=v>(s+h)/2?Math.floor(b):Math.ceil(b);let y=u-b;const x=m*(i+e);if(y>0){const a=f[f.length-1],l={top:x,left:a?a.left+a.width+e:0,width:b,height:i,visible:x<=o};f.push(l),u=t-l.left-l.width-e}else if(y<0){const l=f.map((t=>t.width));let s=l.concat(b),h=t-e*l.length,d=a(s,h,r,p);if(0===d.length&&(h-=e,d=a(l,h,r,p)),0!==d.length){for(let t=0,a=d.length;t<a;t++){const a=f[t-1],l=a?a.left+a.width+e:0;f[t]={top:x,left:l,width:d[t],height:i,visible:x<=o}}u=t,m++}else u=t,m++,n--}else{const a=f[f.length-1],l={top:x,left:a?a.left+a.width+e:0,width:b,height:i,visible:x<=o};f.push(l),u=t,m++}}n.list=[];for(var f=0;f<=m;f++)n.list=n.list.concat(d[f]);return n.maxTop=m*(i+e),n.maxHeight=n.maxTop+i,n}},watch:{visibleTop(t){t>this.position.maxTop-100&&this.$emit("reachBottom")}}},i,[],!1,null,"639632e4",null);o.options.__file="components/ImageWallWrap.vue";const s=o.exports;var h=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{style:{position:"relative",width:t.wallWidth+"px",height:t.position.maxHeight+"px"}},[t._t("default",null,{posData:t.position.list})],2)};h._withStripped=!0;var n=l({name:"ImageWallFall",props:{displayWidth:{type:Number,default:0},imageMinWidth:{type:Number,default:190,validator:t=>t>0},imageMaxWidth:{type:Number,default:285,validator:t=>t>0&&t<1/0},imageGap:{type:Number,default:8,validator:t=>t>=0&&t<100},minColumns:{type:Number,default:3,validator:t=>t>0},maxColumns:{type:Number,default:1/0,validator:t=>t>0&&t<=1/0},visibleTop:{type:Number,default:0,validator:t=>t>=0},imageRectData:{type:Array,default:[]},hasBanner:{type:Boolean,default:!1}},computed:{minWidth(){const t=this.imageMinWidth,e=this.minColumns,i=this.imageGap/100;return e*t/(1-i)-i*t/(1-i)},columns(){const t=this.minColumns,e=this.imageMinWidth;if(e>0){const l=Math.max(this.imageMaxWidth,e/t*(t+1)),o=this.displayWidth;let s=this.imageGap/100;return Math.max(t,Math.ceil((i=l,a=s*o-s*l-o,0,Math.sqrt((Math.pow(a,2)-4*i*0)/(4*Math.pow(i,2)))-a/(2*i))))}var i,a;return t},calWidth(){const t=this.columns,e=this.imageGap/100,i=this.displayWidth,a=this.imageMinWidth,l=this.minColumns;return Math.max(t*i/(t-e),l*a/(1-e))},sImageWidth(){return this.calWidth/this.columns*(1-this.imageGap/100)},sImageGapWidth(){return this.calWidth/this.columns*(this.imageGap/100)},wallWidth(){const t=this.minWidth;let e=this.calWidth-this.sImageGapWidth;return Math.max(e,t)},position(){const t=this.columns,e=this.sImageWidth,i=this.sImageGapWidth,a=this.imageRectData,l=this.visibleTop,o=this.hasBanner;let s=[0],h=[];if(a.length>0)if(o)for(let o=0,n=a.length;o<n;o++){let{width:n=0,height:r=0}=a[o];if(0===o){let t=r/n*(2*e+i);h.push({top:0,left:o*(e+i),width:2*e+i,height:t,visible:0<=l}),s[0]=t,s[1]=t}else{let a=r/n*e;if(o+1-t<0)h.push({top:0,left:(o+1)*(e+i),width:e,height:a,visible:0<=l}),s[o+1]=a;else{let t=Math.min(...s),o=s.indexOf(t),n=t+i;h.push({top:n,left:o*(e+i),width:e,height:a,visible:n<=l}),s[o]=n+a}}}else for(let o=0,n=a.length;o<n;o++){let{width:n=0,height:r=0}=a[o],p=r/n*e;if(o-t<0)h.push({top:0,left:o*(e+i),width:e,height:p,visible:0<=l}),s[o]=p;else{let t=Math.min(...s),a=s.indexOf(t),o=t+i;h.push({top:o,left:a*(e+i),width:e,height:p,visible:o<=l}),s[a]=o+p}}let n={};return n.list=h,n.maxTop=Math.min(...s),n.maxHeight=Math.max(...s),n}},watch:{visibleTop(t){t>this.position.maxTop-100&&this.$emit("reachBottom")}}},h,[],!1,null,"0ce53995",null);n.options.__file="components/ImageWallFall.vue";const r=n.exports;return e})()));
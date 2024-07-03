(()=>{var e={};e.id=423,e.ids=[423],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},903:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>d}),s(5389),s(2474),s(5866);var r=s(3191),a=s(8716),n=s(7922),i=s.n(n),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let d=["",{children:["product-types",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,5389)),"/Users/paulodias/Documents/paulodias.dev/soft_expert_test/frontend/src/app/product-types/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,2474)),"/Users/paulodias/Documents/paulodias.dev/soft_expert_test/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/paulodias/Documents/paulodias.dev/soft_expert_test/frontend/src/app/product-types/page.tsx"],p="/product-types/page",u={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/product-types/page",pathname:"/product-types",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5280:(e,t,s)=>{Promise.resolve().then(s.bind(s,1551))},1551:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var r=s(326),a=s(7525),n=s(7577),i=s(1664),o=s(9752),l=s(1190),d=s(4794);function c({productType:e,onSave:t,onCancel:s,onChange:a}){return(0,r.jsxs)(o.Zb,{className:"w-[100%]",children:[r.jsx(o.Ol,{children:(0,r.jsxs)(o.ll,{children:[e?.id?"Update":"Create"," Product Type"]})}),r.jsx(o.aY,{children:r.jsx("form",{children:r.jsx("div",{className:"grid w-full items-center gap-4",children:(0,r.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[r.jsx(d._,{htmlFor:"name",children:"Name"}),r.jsx(l.I,{id:"name",placeholder:"Name of your project",onChange:t=>a({...e,name:t.target.value,id:e?.id||0}),value:e?.name})]})})})}),(0,r.jsxs)(o.eW,{className:"flex justify-between",children:[r.jsx(i.z,{variant:"outline",onClick:s,children:"Cancel"}),r.jsx(i.z,{onClick:t,children:"Save"})]})]})}var p=s(5009);function u(){let{dataProductType:e,createProductType:t,updateProductType:s,deleteProductType:o,loading:l,error:d}=(0,p.b)(),[u,x]=(0,n.useState)(null);if(l)return r.jsx("p",{children:"Loading..."});if(d)return(0,r.jsxs)("p",{children:["Error: ",d&&d?.message]});return(0,r.jsxs)(a.x,{className:"desktop-body flex w-full h-full py-16 mx-auto items-center justify-center overflow-auto pl-[230px] pr-[50px]",children:[r.jsx("h1",{className:"text-4xl font-bold text-center mb-8",children:"Product Types"}),u?r.jsx(c,{productType:u||{},onSave:m,onCancel:()=>x(null),onChange:x}):(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"flex justify-end w-full mb-4",children:r.jsx(i.z,{onClick:()=>x({}),children:"Add New"})}),r.jsx("div",{className:"overflow-x-auto w-full",children:(0,r.jsxs)("table",{className:"min-w-full bg-white border border-gray-200",children:[r.jsx("thead",{children:(0,r.jsxs)("tr",{children:[r.jsx("th",{className:"py-2 px-4 border-b text-left",children:"ID"}),r.jsx("th",{className:"py-2 px-4 border-b text-left",children:"Name"}),r.jsx("th",{className:"py-2 px-4 border-b text-right",children:"Actions"})]})}),r.jsx("tbody",{children:e&&e.map(e=>(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"py-2 px-4 border-b text-left",children:e.id}),r.jsx("td",{className:"py-2 px-4 border-b text-left",children:e.name}),(0,r.jsxs)("td",{className:"py-2 px-4 border-b text-right",children:[r.jsx("button",{onClick:()=>x(e),className:"text-blue-500 hover:underline mr-4",children:"Edit"}),r.jsx("button",{onClick:()=>h(e.id),className:"text-red-500 hover:underline",children:"Delete"})]})]},e.id))})]})})]})]});async function m(){u?.id?await s(u):await t(u),x(null)}async function h(e){confirm("Are you sure you want to delete this item?")&&await o(e)}}},5389:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>n,default:()=>o});var r=s(8570);let a=(0,r.createProxy)(String.raw`/Users/paulodias/Documents/paulodias.dev/soft_expert_test/frontend/src/app/product-types/page.tsx`),{__esModule:n,$$typeof:i}=a;a.default;let o=(0,r.createProxy)(String.raw`/Users/paulodias/Documents/paulodias.dev/soft_expert_test/frontend/src/app/product-types/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[948,945,621,231,252],()=>s(903));module.exports=r})();
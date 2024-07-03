(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[286],{5301:function(e,l,r){Promise.resolve().then(r.bind(r,6243))},6243:function(e,l,r){"use strict";r.r(l),r.d(l,{default:function(){return p}});var t=r(7437),s=r(23),n=r(2265),i=r(9733),d=r(8185),c=r(9888),a=r(7209),o=r(402);function x(e){var l;let{product:r,productTypes:s,onSave:n,onCancel:x,onChange:u}=e;return(0,t.jsxs)(d.Zb,{className:"w-[100%]",children:[(0,t.jsx)(d.Ol,{children:(0,t.jsxs)(d.ll,{children:[(null==r?void 0:r.id)?"Update":"Create"," Product"]})}),(0,t.jsx)(d.aY,{children:(0,t.jsx)("form",{children:(0,t.jsxs)("div",{className:"grid w-full items-center gap-4",children:[(0,t.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,t.jsx)(o._,{htmlFor:"name",children:"Name"}),(0,t.jsx)(a.I,{id:"name",placeholder:"Name of your project",onChange:e=>u({...r,name:e.target.value}),value:null==r?void 0:r.name})]}),(0,t.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,t.jsx)(o._,{htmlFor:"price",children:"Price"}),(0,t.jsx)(a.I,{id:"price",placeholder:"Price of your product",onChange:e=>u({...r,price:e.target.value}),value:null==r?void 0:r.price})]}),(0,t.jsxs)("div",{className:"flex flex-col space-y-1.5",children:[(0,t.jsx)(o._,{htmlFor:"product-type",children:"Product Type"}),(0,t.jsxs)(c.Ph,{onValueChange:e=>u({...r,product_type_id:parseInt(e,10)}),value:null==r?void 0:null===(l=r.product_type_id)||void 0===l?void 0:l.toString(),children:[(0,t.jsx)(c.i4,{id:"product-type",children:(0,t.jsx)(c.ki,{placeholder:"Select"})}),(0,t.jsx)(c.Bw,{position:"popper",children:s&&s.map(e=>(0,t.jsx)(c.Ql,{value:e.id.toString(),children:e.name},e.id))})]})]})]})})}),(0,t.jsxs)(d.eW,{className:"flex justify-between",children:[(0,t.jsx)(i.z,{variant:"outline",onClick:x,children:"Cancel"}),(0,t.jsx)(i.z,{onClick:n,children:"Save"})]})]})}var u=r(9354),h=r(5212);function p(){let{dataProduct:e,dataProductType:l,createProduct:r,updateProduct:d,deleteProduct:c,loading:a,error:o}=(0,h.b)(),[p,j]=(0,n.useState)(null);if(a)return(0,t.jsx)("p",{children:"Loading..."});if(o)return(0,t.jsxs)("p",{children:["Error: ",o&&(null==o?void 0:o.message)]});return(0,t.jsxs)(s.x,{className:"desktop-body flex w-full h-full py-16 mx-auto items-center justify-center overflow-auto pl-[230px] pr-[50px]",children:[(0,t.jsx)("h1",{className:"text-4xl font-bold text-center mb-8",children:"Products"}),p?(0,t.jsx)(x,{product:p||{},productTypes:l,onSave:m,onCancel:()=>j(null),onChange:j}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex justify-end w-full mb-4",children:(0,t.jsx)(i.z,{onClick:()=>j({}),children:"Add New"})}),(0,t.jsx)("div",{className:"overflow-x-auto w-full",children:(0,t.jsxs)("table",{className:"min-w-full bg-white border border-gray-200",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"py-2 px-4 border-b text-left",children:"ID"}),(0,t.jsx)("th",{className:"py-2 px-4 border-b text-left",children:"Name"}),(0,t.jsx)("th",{className:"py-2 px-4 border-b text-left",children:"Product Type"}),(0,t.jsx)("th",{className:"py-2 px-4 border-b text-left",children:"Price"}),(0,t.jsx)("th",{className:"py-2 px-4 border-b text-right",children:"Actions"})]})}),(0,t.jsx)("tbody",{children:e&&e.map(e=>{var r;return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"py-2 px-4 border-b text-left",children:e.id}),(0,t.jsx)("td",{className:"py-2 px-4 border-b text-left",children:e.name}),(0,t.jsx)("td",{className:"py-2 px-4 border-b text-left",children:null==l?void 0:null===(r=l.find(l=>l.id===e.product_type_id))||void 0===r?void 0:r.name}),(0,t.jsx)("td",{className:"py-2 px-4 border-b text-left",children:(0,u.xG)(parseFloat(e.price))}),(0,t.jsxs)("td",{className:"py-2 px-4 border-b text-right",children:[(0,t.jsx)("button",{onClick:()=>j(e),className:"text-blue-500 hover:underline mr-4",children:"Edit"}),(0,t.jsx)("button",{onClick:()=>f(e.id),className:"text-red-500 hover:underline",children:"Delete"})]})]},e.id)})})]})})]})]});async function m(){(null==p?void 0:p.id)?await d(p):await r(p),j(null)}async function f(e){confirm("Are you sure you want to delete this item?")&&await c(e)}}}},function(e){e.O(0,[707,833,24,971,23,744],function(){return e(e.s=5301)}),_N_E=e.O()}]);
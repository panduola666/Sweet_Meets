import{_ as w}from"./nuxt-link.81c3a003.js";import{a as N,_ as I}from"./entry.6cf64ed0.js";import{d as S,a as m,H as C,y as a,z as s,N as t,F as _,I as b,u as o,J as f,L as h,O as l,A as L,D as v,K as y,R as k,a7 as V,a8 as B}from"./swiper-vue.047cdbf7.js";const D=n=>(V("data-v-1dc01564"),n=n(),B(),n),R={class:"backLayout d-flex flex-column"},z={class:"bg-white bg-opacity-50 sticky-top"},F={class:"d-flex align-items-center justify-content-between px-md-8 px-4 blur boxShadow"},O={class:"nav h5 gap-6 d-none d-md-flex"},P=D(()=>t("div",{class:"py-3"},[t("span",{class:"fw-bold me-4 d-none d-md-inline-block"},"你好, admin001"),t("button",{type:"button",class:"btn btn-outline-secondary px-5"}," 登出 ")],-1)),$={key:0,class:"nav flex-column d-md-none h4 text-center py-6 position-absolute top-100 w-100 bg-white bg-opacity-50 blur",style:{"box-shadow":"rgba(0, 0, 0, 0.25) 0px 5px 6px"}},j={class:"mt-4 mt-md-8 flex-grow-1 container-fluid px-md-8 px-4"},A={key:0,"aria-label":"breadcrumb"},E={class:"breadcrumb fs-5 fw-bold mb-0"},H={class:"breadcrumb-item"},J=S({__name:"back",props:{breadPath:{default:()=>[]}},setup(n){const d=N(),u=m(!1),i=m(""),g=n;C(()=>{const r=p.value.find(c=>c.route===d.path);i.value=r?r.name:""});const p=m([{route:"/admin/products",name:"DIY 課程"},{route:"/admin/activities",name:"活動管理"},{route:"/admin/orders",name:"預約管理"}]);return(r,c)=>{const x=w;return a(),s("div",R,[t("header",z,[t("nav",F,[t("ul",O,[(a(!0),s(_,null,b(o(p),e=>(a(),s("li",{class:"nav-item",key:e.route},[v(x,{class:f(["pcNav nav-link fw-bold py-4 px-2 position-relative",{active:e.route===o(d).path}]),to:e.route},{default:y(()=>[k(l(e.name),1)]),_:2},1032,["class","to"])]))),128))]),t("span",{class:f(["material-symbols-outlined fs-1 d-md-none",{"bg-primary rounded-circle":!1}]),onClick:c[0]||(c[0]=e=>u.value=!o(u))}," menu "),P]),o(u)?(a(),s("ul",$,[(a(!0),s(_,null,b(o(p),e=>(a(),s("li",{class:"nav-item",key:e.route},[v(x,{class:f(["nav-link fw-bold mx-3",{"bg-primary":e.route===o(d).path}]),to:e.route},{default:y(()=>[k(l(e.name),1)]),_:2},1032,["class","to"])]))),128))])):h("",!0)]),t("main",j,[o(i)?(a(),s("nav",A,[t("ol",E,[t("li",H,l(o(i)),1),(a(!0),s(_,null,b(g.breadPath,e=>(a(),s("li",{class:"breadcrumb-item active","aria-current":"page",key:e},l(e),1))),128))])])):h("",!0),L(r.$slots,"default",{},void 0,!0)])])}}});const Y=I(J,[["__scopeId","data-v-1dc01564"]]);export{Y as default};

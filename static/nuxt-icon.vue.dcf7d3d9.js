import{d as l}from"./entry.6cf64ed0.js";import{d as m,a as p,ag as f,V as d,y as v,z as x,J as y,u as _}from"./swiper-vue.047cdbf7.js";const h=["innerHTML"],E=m({__name:"nuxt-icon",props:{name:{},filled:{type:Boolean,default:!1}},async setup(u){let s,o;const a=u,c=p("");let i=!1;async function r(){try{const t=await Object.assign({"/assets/icons/copy.svg":()=>l(()=>import("./copy.583209d3.js"),[],import.meta.url).then(n=>n.default),"/assets/icons/delete.svg":()=>l(()=>import("./delete.fb5fd4bf.js"),[],import.meta.url).then(n=>n.default)})[`/assets/icons/${a.name}.svg`]();t.includes("stroke")&&(i=!0),c.value=t}catch{console.error(`[nuxt-icons] Icon '${a.name}' doesn't exist in 'assets/icons'`)}}return[s,o]=f(()=>r()),await s,o(),d(r),(e,t)=>(v(),x("span",{class:y(["nuxt-icon",{"nuxt-icon--fill":!e.filled,"nuxt-icon--stroke":_(i)&&!e.filled}]),innerHTML:_(c)},null,10,h))}});export{E as _};

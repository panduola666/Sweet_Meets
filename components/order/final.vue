<template>
  <article class="py-7 w-75 w-xl-50 mx-auto position-relative">
    <div class="p-3" ref="download">
      <div class="border border-2 border-secondary p-5 mb-4 shadow-sm fs-4">
        <h1 class="fs-3 fs-lg-2 fw-bold text-center default mb-5">預約完成</h1>
        <div class="d-flex align-items-center gap-3 mb-3">
          <p class="mb-0 fw-bold">訂單編號: <span class="ms-3">wdqw312</span></p>
          <nuxt-icon name="copy" class="pointer" @click="copyText('wdqw312')"></nuxt-icon>
        </div>
        <p class="mb-8 fw-bold">預約日期: <span class="ms-3">2016/05/15 20:00</span></p>
        <p class="fw-bold">姓名: <span class="ms-3">張三</span></p>
        <p class="fw-bold">聯繫方式: <span class="ms-3">09*****546</span></p>
        <p class="fw-bold">甜點品項: <span class="ms-3">到店選擇</span></p>
        <p class="mb-5 fw-bold">生日: <span class="ms-3">1986/01/01</span></p>
        <p class="text-end fw-bold fs-4">依品項價格</p>
      </div>
    </div>
    <div class="d-flex justify-content-between gap-3">
      <button type="button" class="btn btn-primary fs-5 py-3 flex-grow-1" @click="pdfDownload(download)">訂單匯出</button>
      <NuxtLink to="/" class="btn btn-secondary fs-5 py-3 flex-grow-1">完成</NuxtLink>
    </div>
    <img class="position-absolute start-100 bottom-10 d-none d-xl-block" src="../../assets/img/thanks.png" alt="" width="230">
  </article>
</template>
<script setup lang="ts">
import html2Canvas from 'html2canvas';
import jspdf from 'jspdf';

const download = ref<HTMLElement | null>(null);

function pdfDownload(dom: HTMLElement | null) {
  if(!dom) return
  //获取页面标题，作为文件名称，也可以使用时间戳生成不重复的文件名使用
  var title = 'order';
  html2Canvas(dom, {
    allowTaint: true,
    //防止页面过宽导致右侧出现黑灰色背景区域
    scale: 2
  }).then((canvas) => {
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;
    //A4纸张标准宽高进行转换
    let pageHeight = (contentWidth / 592.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    let imgWidth = 595.28;
    let imgHeight = (592.28 / contentWidth) * contentHeight;
    let pageData = canvas.toDataURL('image/jpeg', 1.0);
    let PDF = new jspdf('', 'pt', 'a4');
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) {
          PDF.addPage();
        }
      }
    }
    //文件导出生成
    PDF.save(title + '.pdf');
  });
}
async function copyText(text:string) {
  await navigator.clipboard.writeText(text)
  alert('複製成功');
  
}
</script>

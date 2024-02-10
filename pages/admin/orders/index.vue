<template>
  <div>
    <NuxtLayout name="back">
      <div class="row">
        <div class="col-12 col-lg-9">
          <div class="d-flex align-items-center justify-content-end gap-3 mb-3">
            <button type="button" class="btn btn-outline-secondary">
              取消預約
            </button>
            <button type="button" class="btn btn-secondary">報到</button>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered align-middle text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">姓名</th>
                  <th scope="col">時間</th>
                  <th scope="col">電話</th>
                  <th scope="col">品項</th>
                  <th scope="col">費用</th>
                </tr>
              </thead>
              <tbody class="fs-lg-5">
                <tr>
                  <th scope="row">1</th>
                  <td class="text-nowrap position-relative">
                    張三
                    <NuxtIcon
                      name="info"
                      class="pointer fs-6 ms-2"
                      data-bs-toggle="modal"
                      data-bs-target="#remark"
                    />
                  </td>
                  <td class="text-nowrap">2016/05/15 20:00</td>
                  <td class="text-nowrap">0912365546</td>
                  <td class="text-nowrap">場地預約 - 6人(2 小時)</td>
                  <td class="text-nowrap">$3000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-3 mb-6">
            <Pagination :pagination="{}" @click="" />
          </div>
        </div>
        <div class="col bg-primary bg-opacity-50 py-5">
          <p class="d-flex justify-content-between fw-bold">
            <span>報到名單</span>
            <span>離場</span>
          </p>
          <ul class="mb-5 checkList px-3">
            <li class="d-flex align-items-center gap-3 mb-5" v-for="i in 5">
              <div class="bg-white rounded-3 flex-grow-1">
                <label
                  class="form-check-label d-flex flex-column fs-5 p-3"
                  for="check1"
                >
                  <p
                    class="mb-0 d-flex align-items-center justify-content-between"
                  >
                    <span class="fw-bold">張三</span>
                    <small class="fs-6">18:05</small>
                  </p>
                  <p class="fw-bold mb-4">焦糖布丁塔</p>
                  <p
                    class="mb-0 d-flex align-items-center justify-content-between"
                  >
                    <small class="fs-6">(未付款)</small>
                    <span class="fw-bold">$180</span>
                  </p>
                </label>
                <button type="button" class="btn btn-secondary w-100 rounded-0">
                  付款
                </button>
              </div>
              <input
                class="form-check-input p-2"
                type="checkbox"
                value=""
                id="check1"
              />
            </li>
          </ul>

          <!-- <nav>
            <ul class="pagination align-items-center justify-content-center">
              <li class="page-item" :class="{ disabled: false }">
                <button class="page-link">&lt;</button>
              </li>
              <li class="p-3 fw-bold">1</li>
              <li class="page-item" :class="{ disabled: true }">
                <button class="page-link">&gt;</button>
              </li>
            </ul>
          </nav> -->
        </div>
      </div>

      <!-- 備註 Modal -->
      <div
        class="modal fade"
        id="remark"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header py-2">
              <h1 class="modal-title fs-5">備註</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body fw-bold fs-5" style="min-height: 100px;">我們會自己另外帶一些包裝材料, 後續會清理乾淨</div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style lang="scss" scoped>
.checkList{
  overflow-y: auto;
  max-height: 450px;
}
</style>
<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-sm btn-outline-primary position-absolute end-0 bottom-0"
      @click="openModal"
    >
      系統管理
    </button>

    <!-- Modal -->
    <div
      id="adminLogin"
      ref="adminModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">廠家登入</h1>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <VeeForm :validation-schema="schema" @submit="submit">
              <div class="mb-3">
                <label for="username" class="form-label fw-bold">信箱</label>
                <VeeField
                  id="username"
                  v-model.trim="form.username"
                  class="form-control"
                  name="信箱"
                  type="email"
                  placeholder="請輸入信箱"
                />
                <VeeErrorMessage name="信箱" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label fw-bold">密碼</label>
                <VeeField
                  id="password"
                  v-model.trim="form.password"
                  class="form-control"
                  autocomplete="on"
                  name="密碼"
                  type="password"
                  placeholder="請輸入密碼"
                />
                <VeeErrorMessage name="密碼" class="text-danger" />
              </div>
              <button type="submit" class="btn btn-secondary w-100">
                登入
              </button>
            </VeeForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import User from '@/store/user'
import type { loginType } from '@/interface/user'

const { $bootstrap } = useNuxtApp()
const adminModal = ref(null)
let modal: any

const schema = {
  信箱: 'required|email',
  密碼: 'required',
}

const form = ref<loginType>({
  username: '',
  password: '',
})

async function submit() {
  const userStore = User()
  await userStore.login(form.value)

  if (userStore.isLogin) {
    await closeModal()

    useRouter().push('/admin/products')
  }
}

async function openModal() {
  await nextTick()
  modal = $bootstrap.modal(adminModal.value)
  modal.show()
}
function closeModal() {
  modal.hide()
}
</script>

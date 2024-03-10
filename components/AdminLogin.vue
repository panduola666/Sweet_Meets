<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-sm btn-outline-primary position-absolute end-0 bottom-0"
      @click="openModal"
    >
      {{ $t('home.systemBtn') }}
    </button>

    <!-- Modal -->
    <div
      id="adminLogin"
      ref="adminModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">
              {{ $t('home.loginTitle') }}
            </h1>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <VeeForm ref="veeForm" :validation-schema="schema" @submit="submit">
              <div class="mb-3">
                <label for="username" class="form-label fw-bold">{{
                  $t('order.mail')
                }}</label>
                <VeeField
                  id="username"
                  v-model.trim="form.username"
                  class="form-control"
                  :name="$t('order.mail')"
                  type="email"
                  :placeholder="$t('placeholder.userMail')"
                />
                <VeeErrorMessage :name="$t('order.mail')" class="text-danger" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label fw-bold">{{
                  $t('home.password')
                }}</label>
                <small v-if="isCapsLock" class="ms-2 text-danger">{{
                  $t('home.capsLock')
                }}</small>
                <div class="position-relative">
                  <VeeField
                    id="password"
                    ref="passwordBox"
                    v-model.trim="form.password"
                    class="form-control pe-7"
                    autocomplete="on"
                    :name="$t('home.password')"
                    :type="showPwd ? 'text' : 'password'"
                    :placeholder="$t('placeholder.password')"
                    @keydown="checkCapsLock"
                  />
                  <NuxtIcon
                    :name="showPwd ? 'eye_close' : 'eye'"
                    filled
                    class="position-absolute end-0 top-50 translate-middle pointer"
                    @click="showPwd = !showPwd"
                  />
                </div>
                <VeeErrorMessage
                  :name="$t('home.password')"
                  class="text-danger"
                />
              </div>
              <button type="submit" class="btn btn-secondary w-100">
                {{ $t('home.login') }}
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
const showPwd = ref<boolean>(false)
let modal: any

const schema = computed(() => ({
  [i18nT('order.mail')]: 'required|email',
  [i18nT('home.password')]: 'required',
}))

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

const veeForm = ref()
function closeModal() {
  if (veeForm.value) {
    veeForm.value.resetForm()
  }

  modal.hide()
}

// 大寫監聽
const isCapsLock = ref<boolean>(false)
function checkCapsLock(e: KeyboardEvent) {
  if (e && e.getModifierState) {
    isCapsLock.value = e.getModifierState('CapsLock')
  }
}
</script>

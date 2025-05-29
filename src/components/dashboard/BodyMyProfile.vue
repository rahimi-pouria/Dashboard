<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10" dir="rtl">

    <div>
      <!--begin::Content-->
          <!--begin::Form-->
          <form class="form">
            <!--begin::Card body-->
            <div class="card-body border-top p-9">
              <!--  show profile photo  -->
              <div class="row mb-7">
                <div class="col-lg-12 fv-row text-center">
                  <img src="/avatar/blank.svg"
                       onerror="this.src='/avatar/blank.svg';"
                       alt="image" class="symbol mb-6 profile-photo" />
                </div>
              </div>
              <!--begin::Input group-->
              <div class="row mb-3">
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label
                          class="form-label fw-bold">نام:
                      </label>
                    </div>
                    <!--end::Label-->
                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4">
                        {{ data?.name?.firstname === null || data?.name?.firstname  === '' ? '-' : data?.name?.firstname  }}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label class="form-label fw-bold">
                        نام خانوادگی  :</label>
                    </div>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4 ">
                        {{ data?.name?.lastname === null || data?.name?.lastname === '' ? '-' : data?.name?.lastname}}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-3">
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label
                          class="form-label fw-bold">شهر :
                      </label>
                    </div>
                    <!--end::Label-->
                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4">
                        {{ data?.address?.city === null || data?.address?.city === '' ? '-' : data?.address?.city }}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label class="form-label fw-bold">
                        خیابان  :</label>
                    </div>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4 ">
                        {{ data?.address?.street === null || data?.address?.street === '' ? '-' : data?.address?.street }}

                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-3">
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label
                          class="form-label fw-bold">کد پستی :
                      </label>
                    </div>
                    <!--end::Label-->
                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4">
                        {{ data?.address?.zipcode === null || data?.address?.zipcode === '' ? '-' : data?.address?.zipcode }}

                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label class="form-label fw-bold">
                        پلاک :</label>
                    </div>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4 ">
                        {{ data?.address?.number === null || data?.address?.number === '' ? '-' : data?.address?.number }}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-3">
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label
                          class="form-label fw-bold">لوکیشن شمال :
                      </label>
                    </div>
                    <!--end::Label-->
                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4">
                        {{ data?.address?.geolocation.lat === null || data?.address?.geolocation.lat === '' ? '-' : data?.address?.geolocation.lat }}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label class="form-label fw-bold">
                        لوکیشن جنوب :</label>
                    </div>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4 ">
                        {{ data?.address?.geolocation.long === null || data?.address?.geolocation.long === '' ? '-' : data?.address?.geolocation.long }}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-3">
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label
                          class="form-label fw-bold">تلفن :
                      </label>
                    </div>
                    <!--end::Label-->
                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4">
                        {{ data?.phone === null || data?.phone === '' ? '-' : data?.phone }}

                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label class="form-label fw-bold">
                        نام کاربری :</label>
                    </div>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4 ">
                        {{ data?.username === null || data?.username === '' ? '-' : data?.username }}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-3">
                <div class="col-lg-6">
                  <div class="row">
                    <!--begin::Label-->
                    <div class="col-lg-4 fv-row text-center">
                      <label
                          class="form-label fw-bold">پست الکترونیک :
                      </label>
                    </div>
                    <!--end::Label-->
                    <!--begin::Col-->
                    <div class="col-lg-8 fv-row text-center">
                      <label class="mb-4">
                        {{ data?.email === null || data?.email === '' ? '-' : data?.email}}
                      </label>
                    </div>
                    <!--end::Col-->
                  </div>
                </div>

              </div>
              <!--end::Input group-->
            </div>
          </form>
          <!--end::Form-->
      <!--end::Content-->
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
const store = useStore()
const data = computed(() => store.state.data)

onMounted(async () => {
 await  store.dispatch('getCurrentUserProfile')
})
</script>

<style scoped lang="scss">
.profile-photo{
  height: 280px;
  width: 200px;
}
</style>
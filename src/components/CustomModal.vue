<template>
  <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
  >
    <!--begin::Modal dialog-->
    <div
        class="modal-dialog"
        :class="[`mw-${maxWidth}px`, modalLocation]"
    >
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <slot name="header" :fireExit="fireExit">
          <div v-if="!noHeader" class="modal-header" :id="`${id}_type_header`">
            <!--begin::Modal title-->
            <h2 class="fw-bold">{{ $t(`${title}`) }}</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <CustomButton
                id="cancel"
                icon-name="cross"
                icon-class="fs-1"
                alt-icon
                color="none"
                btn-class="btn-sm"
                @click="fireExit(props.id)"
            />
            <!--end::Close-->
          </div>
        </slot>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body px-5 my-7" :class="[`modal-${id}`]">
          <!--begin::Form-->
          <form
              @submit.prevent="sendFormToServer(props.id)"
              id="modal-educational-group_type"
              class="form fv-plugins-bootstrap5 fv-plugins-framework"
          >
            <!--begin::Scroll-->
            <div
                class="d-flex flex-column px-5 px-lg-10"
                style="max-height: 585px"
                :class="{ 'scroll-y': props.scrollable }"
                id="modal-educational-group_type_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="true"
                data-kt-scroll-dependencies="#modal-educational-group_type_header"
                data-kt-scroll-wrappers="#modal-educational-group_type_scroll"
                data-kt-scroll-offset="300px"
            >
              <slot/>
            </div>
            <!--end::Scroll-->
            <div
                v-if="showBtnAddOption"
                class="form-group btn-Effectiveness-Degree"
            >
              <button
                  @click="checkValidationAddOption"
                  type="button"
                  id="add-Effectiveness-Degree"
                  data-repeater-create=""
                  class="btn btn-sm btn-light-primary"
              >
                <KTIcon icon-name="plus" icon-class="fs-2"/>
                {{ $t(btnLabelAddOption) }}
              </button>
            </div>
            <!--begin::Actions-->
            <div v-if="submitBtnLabel" class="text-center pt-10">
              <CustomButton
                  type="submit"
                  :id="submitBtnId"
                  :label="submitBtnLabel"
                  btn-class="btn btn-primary me-2"
                  has-loading
              />
              <CustomButton
                  id="cancel"
                  label="Cancel"
                  color="light"
                  btn-class="btn btn-light"
                  @click="fireExit(props.id)"
              />
            </div>
            <!--end::Actions-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {hideModal} from "@/core/helpers/dom";
import CustomButton from "@/components/Shared/CustomButton.vue";
import {showCancelAlert, showSuccessAlert} from "@/core/helpers/alert";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import {btnLoading} from "@/core/helpers/utility";

const v$ = useVuelidate({$stopPropagation: true});

const props = defineProps({
  // params: {type: Object, required: true, default: () => ({})},
  // submitEndPoint: {type: String, required: false, default: ''},
  id: {type: String, required: true, default: ""},
  title: {type: String, required: true, default: ""},
  noHeader: {type: Boolean, required: false, default: false},
  fetchListFunc: {type: Function, required: false},
  // NOTE: v-model list
  maxWidth: {type: String, default: 650, required: false},
  modelList: {type: Object, required: false, default: () => ({})},
  submitEvent: {type: Function, required: false},
  customCancelEvent: {type: Function, required: false},
  submitBtnId: {type: String, required: false, default: ""},
  submitBtnLabel: {type: String, required: false, default: ""},
  scrollable: {type: String, required: false, default: false},
  showBtnAddOption: {type: String, required: false, default: false},
  btnLabelAddOption: {type: String, required: false, default: false},
  modalLocation: {type: String, required: false, default: 'modal-dialog-centered'},
  btnEventAddOption: {type: Function, required: false},
  noCancelConfirmation: {type: Boolean, required: false, default: false},
});

// NOTE: close modal and reset model list
const modalCancelingProcess = (id: any) => {
  const modal = document.getElementById(id);
  hideModal(modal);
  // @ts-ignore
  if (props.modelList !== "") {
    props.customCancelEvent?.();
  }
  v$.value.$reset();
  for (let modelListKey in props.modelList) {
    props.modelList[modelListKey] = null;
  }
}

function fireExit(id: any) {
  if (props.submitBtnLabel === "") {
    const modal = document.getElementById(id);
    hideModal(modal);
    v$.value.$reset();
    for (let modelListKey in props.modelList) {
      props.modelList[modelListKey] = null;
    }
  } else {
    if (!props.noCancelConfirmation)
      showCancelAlert(() => {
        modalCancelingProcess(id)
      });
    else
      modalCancelingProcess(id)
  }
}

const sendFormToServer = async (id: number) => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  btnLoading(props.submitBtnId, 'on');
  // @ts-ignore
  const result = await props.submitEvent();
  btnLoading(props.submitBtnId, 'off');
  if (!result) return;
  await showSuccessAlert(() => {
    const modal = document.getElementById(id.toString());
    hideModal(modal);
    v$.value.$reset();
    // @ts-ignore
    if (props.fetchListFunc !== "") {
      props.fetchListFunc?.();
    }
    // @ts-ignore
    for (let modelListKey in props.modelList) {
      props.modelList[modelListKey] = null;
    }
  });
};

const checkValidationAddOption = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  // @ts-ignore
  const result = await props.btnEventAddOption();
};
</script>

<style scoped lang="scss">
html[dir="ltr"] .btn-Effectiveness-Degree {
  padding-left: 4.3rem;
}

html[dir="rtl"] .btn-Effectiveness-Degree {
  padding-right: 4.3rem;
}
</style>

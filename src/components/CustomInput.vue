<template>
  <div class="w-100 styleShowTitle" :class="[customClass]">
    <label v-if="title" :class='[labelClass]' class="form-label fs-6 mt-3 fw-semibold">
      <span :class="(required || requiredIf) && 'required'">{{ t(title) }} :</span>
      <b-icon :class="(required || requiredIf) && 'required'" icon="camera" font-scale="0.5"></b-icon>
      <el-tooltip v-if="toolTip" :content="toolTip" :enterable="false" placement="top" :hide-after="10">
        <span class="ms-1" data-bs-toggle="tooltip" :aria-label="t(title)">
         <KTIcon icon-name="information-5" icon-class="text-gray-500 fs-6"/>
        </span>
      </el-tooltip>
    </label>

    <!--begin::Input-->
    <div v-if="!textArea" class="d-flex position-relative">
      <input :id="id"
             v-model="model"
             :disabled="disabled"
             :maxlength="props.maxlength"
             :placeholder="t(placeholder)"
             :autocomplete="autocomplete"
             :class="[inputType === 'email' ? 'input-email-type form-control' : 'form-control', inputClass]"
             :type="showPassword ? 'text' : inputType"
             @input="props.inputEvent"
             @keyup="props.keyupEvent"
      />
      <template v-if="inputType === 'password' && canShowPassword">
        <span class="p-2 border-0 position-absolute icon-pass">
          <button type="button" @click="changeType" class="btn btn-icon w-30px h-30px ms-auto">
            <KTIcon :icon-name="showPassword ? 'eye-slash' : 'eye'" icon-class="fs-2qx me-3"/>
          </button>
        </span>
      </template>
    </div>

    <!--  custom textarea  -->
    <textarea v-else
              :id="id"
              v-model="model"
              :disabled="disabled"
              :placeholder="t(placeholder)"
              :class="['form-control', inputClass]"
              :rows="rowTextArea"
              :maxlength="props.maxlength"
              @focusout="focusoutTextArea"/>

    <div v-for="error of v$.value.$errors" :key="error.$uid" class="invalid-feedback d-block">
      {{ error.$message }}
    </div>

    <!--end::Input-->
  </div>
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {computed, type PropType, reactive, ref, watch} from "vue";
import {
  between, email, helpers, minLength, numeric, integer, decimal,
  required as fieldRequired, requiredIf as fieldRequiredIf
} from "@vuelidate/validators";
import {useI18n} from "vue-i18n";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";

const {t} = useI18n()
const setType = ref('')
const showPassword = ref(false)
const model: any = defineModel()

const props = defineProps({
  id: {type: String, required: true, default: ''},
  title: {type: String, required: false, default: ''},
  placeholder: {type: String, required: false, default: ''},
  inputType: {type: String, required: false, default: 'text'},
  autocomplete: {type: String, required: false, default: 'on'},
  maxlength: {type: Number, required: false, default: null},
  inputClass: {type: String, required: false, default: ''},
  labelClass: {type: String, required: false, default: ''},
  customClass: {type: String, required: false, default: ''},
  numeric: {type: Boolean, required: false, default: false},
  integer: {type: Boolean, required: false, default: false},
  decimal: {type: Boolean, required: false, default: false},
  required: {type: Boolean, required: false, default: false},
  requiredIf: {type: Boolean, required: false, default: false},
  minLength: {type: Number || String, required: false, default: 0},
  canShowPassword: {type: Boolean, required: false, default: true},
  toolTip: {type: String, required: false, default: ''},
  textArea: {type: Boolean, required: false, default: false},
  disabled: {type: Boolean, required: false, default: false},
  rowTextArea: {type: Number, required: false, default: 0},
  customValidationTitle: {type: String, required: false, default: ''},
  betweenValue: {type: Array<number>, required: false, default: 0},
  regex: {type: RegExp, required: false, default: ''},
  maximumFractalDigits: {type: Number, required: false, default: undefined},
  keyupEvent: {
    type: Function as PropType<(payload?: KeyboardEvent) => void>, required: false, default: () => {
    }
  },
  inputEvent: {
    type: Function as PropType<(payload?: Event) => void>, required: false, default: () => {
    }
  },
  focusoutTextArea: {
    type: Function as PropType<(payload?: FocusEvent) => void>, required: false, default: () => {
    }
  }
});

//NOTE: when props.betweenValue = true and the input field is filled with data and then got emptied again the remaining
// data would be '', which the api would then return a 400 error. to avoid this issue we are forced to null the emptied
// field. (I tried the model.number method it didn't work)
if (props.betweenValue) {
  watch(() => model.value, (val) => {
    if (!val)
      model.value = null;
  })
}

// rules validation
const rules = computed(() => ({
  value: {
    required: props.required ? helpers.withMessage('فیلد الزامی است', fieldRequired) : false,
    minLength: minLength(props.minLength),
    email: props.inputType === 'email' ? helpers.withMessage('فیلد الزامی است', email) : false,
  }
}))

const checkNumbersAfterFloatingPoint = (): any => {
  if (!model.value || !props.maximumFractalDigits)
    return true
  const parts = model.value.toString().split('.');
  // If there's no decimal point or there's at most "props.maximumFractalDigits" digits after it, return true
  return parts.length === 1 || parts[1].length <= props.maximumFractalDigits;
}

const inputModel = reactive({
  value: model
})


const v$ = useVuelidate(rules, inputModel)


const changeType = () => {
  showPassword.value = !showPassword.value
  if (showPassword.value) {
    setType.value = 'password'
  } else {
    setType.value = 'text'
  }
}

</script>

<style scoped lang="scss">
html[dir="rtl"] .icon-pass {
  left: 0;
  top: 0;
}

html[dir="ltr"] .icon-pass {
  right: 0;
  top: 0;
}

html[dir="rtl"] .input-email-type {
  text-align: end;
}

.styleShowTitle {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
</style>
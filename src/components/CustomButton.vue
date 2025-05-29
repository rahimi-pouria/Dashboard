<template>
  <template v-if="!icon && !altIcon">
    <template v-if="!to">
      <button :id="id"
              :type="type"
              :disabled="disabled"
              :class="[`btn btn-${color} btn-outline`, btnClass]"
              :data-bs-toggle="modalId ? 'modal' : ''"
              :data-bs-target="`#${modalId}`"
              :data-kt-menu-trigger="hasDropdown ? 'click' : ''"
              :data-kt-menu-placement="locale === 'en' ? 'bottom-start' : 'bottom-end'"
              @click="click">
        <KTIcon v-if="iconName && !hasLoading" :icon-name="iconName" :icon-type="iconType" :icon-class="iconClass"/>
        <span v-if="label" :class="{'ps-1':locale !== 'en' && iconName && !hasLoading, 'indicator-label': hasLoading}">
        {{ $t(label) }}
        <KTIcon v-if="iconName && hasLoading" :icon-name="iconName" :icon-type="iconType" :icon-class="iconClass"/>
      </span>
        <span v-show="hasLoading" class="indicator-progress">
        {{ `${$t('PleaseWait')}...` }}
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
      </button>
    </template>
    <template v-else>
      <router-link :id="id"
                   :to="to"
                   :disabled="disabled"
                   :class="[`btn btn-${color} btn-outline`, btnClass]">
        <KTIcon v-if="iconName" :icon-name="iconName" :icon-type="iconType" :icon-class="iconClass"/>
        {{ $t(label) }}
      </router-link>
    </template>
  </template>

  <template v-else>
    <el-tooltip :content="$t(label)" :enterable="false" placement="top" :hide-after="10" class="fs-5"
                :disabled="!label">
      <button v-if="!to"
              :id="id"
              type="button"
              tabindex="-1"
              :disabled="disabled"
              :data-bs-toggle="modalId ? 'modal' : ''"
              :data-bs-target="`#${modalId}`"
              :data-kt-menu-trigger="hasDropdown ? 'click' : ''"
              :data-kt-menu-placement="locale === 'en' ? 'bottom-start' : 'bottom-end'"
              :class="[`btn btn-icon btn-color-${color} btn-active-light-${color}`,
               !altIcon && 'w-30px h-30px ms-auto', btnClass]"
              @click="click">
         <span v-show="hasLoading" class="indicator-progress">
           <span class="spinner-border spinner-border-sm align-middle"></span>
         </span>
        <KTIcon v-if="iconName" :icon-type="iconType" :icon-name="iconName"
                :icon-class="`${iconClass} ${hasLoading && 'indicator-label'}`"/>
      </button>
      <template v-else>
        <router-link :id="id"
                     :to="to"
                     :disabled="disabled"
                     :class="[`btn btn-icon btn-color-${color} btn-active-light-${color}`,
                      !altIcon && 'w-30px h-30px ms-auto', btnClass]">
          <KTIcon v-if="iconName" :icon-name="iconName" :icon-type="iconType" :icon-class="iconClass"/>
        </router-link>
      </template>
    </el-tooltip>
  </template>
</template>

<script setup lang="ts">
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import {useI18n} from "vue-i18n";

const {locale} = useI18n()
defineProps({
  id: {type: String, required: true, default: ''},
  type: {type: () => 'button' || 'submit' || 'reset', required: false, default: 'button'},
  //NOTE: in icon mode, this label replaces the tooltip text
  label: {type: String, required: false, default: ''},
  btnClass: {type: String, required: false, default: ''},
  //NOTE: there are more color types. these are the only ones we need (for now), wouldn't let me add initialization func
  color: {
    type: () => "none" || 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'dark' ||
        'light' || 'light-primary' || 'light-success' || 'light-info' || 'light-warning' || 'light-danger',
    required: false,
    default: 'primary'
  },
  iconName: {type: String, required: false, default: ''},
  iconType: {type: String, required: false, default: 'duotone'},
  iconClass: {type: String, required: false, default: ''},
  modalId: {type: String, required: false, default: ''},
  //NOTE: add this to enable router-link
  to: {type: String, required: false, default: ''},
  //NOTE: like filters (must handle the dropdown outside the button)
  hasDropdown: {type: Boolean, required: false, default: false},
  icon: {type: Boolean, required: false, default: false},
  //NOTE: works like icon prop but is best used for icons outside the datatables
  altIcon: {type: Boolean, required: false, default: false},
  disabled: {type: Boolean, required: false, default: false},
  //NOTE: the loading itself is controlled depending on the button id
  hasLoading: {type: Boolean, required: false, default: false}
})

const emits = defineEmits(['click']);

const click = async (params: any) => {
  emits('click', params)
}
</script>
// out: ..
<template>
  <div v-bind:class="textarea?['row']:computedClass">
    <slot name="icon"></slot>
    <input ref="input" v-if="!textarea" :class="inputClass" :style="inputStyle"
      :type="type" :disabled="disabled" :readonly="readonly"
      :autofocus="autofocus" :placeholder="placeholder" v-model="value"
      @focus="onInputFocus" @blur="onInputBlur" @keyup.enter="onConfirmTrigger">
    <label v-if="(label || type=='search') && !textarea"
      style="pointer-events: none" :class="{active: isActive}"
      :data-error="dataError" :data-success="dataSuccess">
      {{label}}
      <slot name="label"></slot>
    </label>
    <slot name="iconafter"></slot>
    <span class="character-counter" v-if="length > 0 && !textarea"
      style="float:right;font-size:12px;height:0px">
      {{lengthString}}
    </span>
    <text-area ref="input" v-if="textarea" :class="computedClass"
      :taclass="inputClass" :style="inputStyle" :type="type"
      :readonly="readonly" :disabled="disabled" :autofocus="autofocus"
      :value="value" no-extra-line @input="onInput" @focus="onInputFocus"
      @blur="onInputBlur" @keyup.enter="onConfirmTrigger">
      <span slot="placeholder" v-if="placeholder">
        {{placeholder}}
      </span>
      <label slot="label" v-if="label" style="pointer-events: none"
        :class="{active: isActive}" :data-error="dataError"
        :data-success="dataSuccess">
        {{label}}
      </label>
      <span class="character-counter" slot="label" v-if="length > 0"
        style="float:right;font-size:12px;height:0px">
        {{lengthString}}
      </span>
    </text-area>
</template>

<script>
import TextArea from 'vue-textarea'

export default {
  components: {
    TextArea
  },
  mixins: [
    require("vue-mixins/class")
  ],
  props: {
    class: {
      default: () => []
    },
    "placeholder": {
      type: String,
      default: ""
    },
    "readonly": {
      type: Boolean
    },
    "autofocus": {
      type: Boolean
    },
    "textarea": {
      type: Boolean
    },
    "type": {
      type: String
    },
    "disabled": {
      type: Boolean
    },
    "validate": {
      type: Function,
      default: () => null,
    }
    "dataError": {
      type: String,
      default: ""
    },
    "dataSuccess": {
      type: String,
      default: ""
    },
    "label": {
      type: String,
      default: ""
    },
    "value": {
      type: String,
      default: ""
    },
    "length": {
      type: Number,
      default: 0,
      coerce: Number,
    }
  },
  data: () => {
    return {
      isFocused: false,
      isActive: false,
      isValid: null
    }
  },
  computed: {
    mergeClass () {
      return {
        "input-field": true,
        col: true
      }
    },
    inputClass () {
      return {
        validate: this.dataError || this.dataSuccess,
        invalid: this.isValid !== undefined || !this.isValid,
        valid: this.isValid !== undefined && this.isValid,
        "materialize-textarea": this.textarea
      }
    },
    lengthString () {
      if (this.isFocused) {
        return this.value.length + " / "+ this.length
      }
      return ""
    },
  },
  methods: {
    onInput (val) {
      this.value = val
    },
    setValid () {
      this.isValid = true
      this.$emit("valid", this.value)
    }
    setInvalid () {
      this.isValid = false
      this.$emit("invalid", this.value)
    },
    setActive () {
      this.isActive = true
    },
    setInactive () {
      this.isActive = false
    },
    setFocused () {
      this.isFocused = true
      for (child in this.$el.children) {
        if (child.nodeName == "I") {
          if (child.classList) {
            child.classList.add("active")
          } else {
            child.className += " active"
          }
        }
      }
    },
    setUnfocused () {
      this.isFocused = false
      for (child in this.$el.children) {
        if (child.nodeName === "I") {
          child.className = child.className.replace(" active", "")
        }
      }
    },
    checkValidity () {
      if (this.value) {
        result = this.validate(this.value)
        if (result !== undefined || result !== null) {
          if (result.then !== undefined || result.then !== null) {
            result
            .then this.setValid
            .catch this.setInvalid
          } else {
            if (result) {
              this.setValid()
            } else {
              this.setInvalid()
            }
          }
        } else if (this.length && this.value.length > this.length) {
          this.isValid = false
        } else {
          this.isValid = null
        }
      } else {
        if (!(this.isFocused || this.placeholder)) {
          this.setInactive()
        }
        this.isValid = null
      }
    }
    focus () {
      this.$refs.input.focus()
    },
    blur () {
      this.$refs.input.blur()
    },
    onInputFocus () {
      this.setActive()
      if (!this.readonly) {
        this.setFocused()
      }
      this.$emit("focus")
    },
    onInputBlur () {
      this.setUnfocused()
      if (!(this.value || this.placeholder)) {
        this.setInactive()
      }
      this.$emit("blur")
    },
    onChangeTrigger () {
      this.$emit("change", arguments)
      this.checkValidity()
    },
    onConfirmTrigger () {
      if (!this.isInvalid) {
        this.$emit("confirm")
      }
    }
  },
  watch: {
    "value": "onChangeTrigger"
  },
  ready () {
    if (this.value) {
      this.checkValidity()
    }
    if (!(this.autofocus || this.value || this.placeholder)) {
      this.setActive()
      if (this.readonly || this.placeholder) {
        this.setFocused()
      }
    }
  }
}
</script>

<template>
    <div>
        <select
                :id="id"
                class="form-select"
                aria-label="Default select example"
                v-model="selectedOptions" >
            <option
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option" >
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "InputMultiselect",
    props: {
        id: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        modelValue: {
            type: [Array, String, Number],
            default: () => []
        }
    },
    computed: {
        selectedOptions: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
}
</script>

<style scoped>
.form-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
<template>
    <div>
        <div class="row p-3">
            <div className="dropdown mb-4">
                <button className="btn btn-secondary dropdown-toggle" type="button"
                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                        aria-expanded="true">
                    {{ selectedYear ? selectedYear : "Select Year" }}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <InputMultiselect
                            :id="'year'"
                            :label="'Select year'"
                            :options="yearsOptions"
                            v-model="selectedYear"
                            @change="onYearChange"/>
                </ul>
            </div>
        </div>
        <div class="row p-3">
            <div className="dropdown mb-4" v-if="selectedYear">
                <button className="btn btn-secondary dropdown-toggle" type="button"
                        id="dropdownMenuButton2" data-bs-toggle="dropdown"
                        aria-expanded="true">
                    {{ selectedMake ? selectedMake : "Select Make" }}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <InputMultiselect
                            :id="'make'"
                            :label="'Select make'"
                            :options="makesOptions"
                            v-model="selectedMake"
                            @change="onMakeChange"/>
                </ul>
            </div>
        </div>
        <div class="row p-3">
            <div className="dropdown" v-if="selectedYear && selectedMake">
                <button className="btn btn-secondary dropdown-toggle" type="button"
                        id="dropdownMenuButton3" data-bs-toggle="dropdown"
                        aria-expanded="true">
                    {{ selectedModel ? selectedModel : "Select Model" }}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                    <InputMultiselect
                            :id="'model'"
                            :options="modelsOptions"
                            v-model="selectedModel"
                            @change="onModelChange"/>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import InputMultiselect from '@/components/InputMultiselect.vue';
import {useVehicleStore} from '@/stores/vehicleStore';

export default {
    components: {InputMultiselect},
    data() {
        return {
            selectedYear: null,
            selectedMake: null,
            selectedModel: null,
        };
    },
    computed: {
        vehicleStore() {
            return useVehicleStore();
        },
        yearsOptions() {
            return this.vehicleStore.years.map(item => item.year);
        },
        makesOptions() {
            return this.vehicleStore.makes.map(cars => cars.make);
        },
        modelsOptions() {
            return this.vehicleStore.models.map(model => `${model.make} ${model.model} ${model.year}`);
        },
    },
    methods: {
        async onYearChange() {
            if (this.selectedYear) {
                await this.vehicleStore.fetchMakes(this.selectedYear);
                this.selectedMake = null;
                this.vehicleStore.models = [];
            }
        },
        async onMakeChange() {
            if (this.selectedYear && this.selectedMake) {
                await this.vehicleStore.fetchModels(this.selectedYear, this.selectedMake);
            }
        },
        onModelChange() {
            // Prevent dropdown from closing automatically by not calling Bootstrap's dropdown methods
        }
    },
    mounted() {
        this.vehicleStore.fetchYears();
    }
};
</script>

<style scoped>
/* Customize dropdown appearance */
.dropdown-toggle {
    font-size: 1rem;
    padding: 10px;
    text-align: left;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    border: 1px solid #007bff;
    width: 20%;
}

.dropdown-toggle:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Customize dropdown menu */
.dropdown-menu {
    width: 20%;
    border-radius: 4px;
    padding: 0;
}

.dropdown-menu li {
    background-color: #f8f9fa;
}

.dropdown-menu li:hover {
    background-color: #e9ecef;
}

.dropdown-menu .form-select {
    width: 20%;
    padding: 8px;
    border-radius: 4px;
    margin: 5px 0;
}

/* Improve spacing between dropdowns */
.mb-4 {
    margin-bottom: 1.5rem;
}
</style>

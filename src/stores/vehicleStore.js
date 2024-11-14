
import { defineStore } from 'pinia';
import api from '@/api';

export const useVehicleStore = defineStore('vehicle', {
    state: () => ({
        years: [],
        makes: [],
        models: [],
        selectedYear: null,
        selectedMake: null
    }),

    actions: {
        async fetchYears() {
            try {
                const response = await api.get('vehicles/years/');
                this.years = response.data;
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        },

        async fetchMakes(year) {
            try {
                const response = await api.get('https://rateengine.ship.cars/v2/vehicles/makes/', {
                    params: {
                        year: year,
                        token: '5cbe12fb62f4941267d623499a2a4fd5948fd3ef'
                    }
                });
                this.makes = response.data;
            } catch (error) {
                console.error('Error fetching makes:', error);
            }
        },

        async fetchModels(year, make) {
            try {
                console.log(`Requesting models for year: ${year}, make: ${make}`);

                const response = await api.get('vehicles/models/', {
                    params: {
                        year: year,
                        make: make,
                        token: '5cbe12fb62f4941267d623499a2a4fd5948fd3ef'
                    }
                });

                console.log('Fetched models:', response.data);
                this.models = response.data;
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        },

        setSelectedYear(year) {
            this.selectedYear = year;
            this.makes = [];
            this.models = [];
            this.fetchMakes(year);
        },

        setSelectedMake(make) {
            this.selectedMake = make;
            this.models = [];
            this.fetchModels(this.selectedYear, make);
        }
    }
});
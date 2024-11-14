import { defineStore } from 'pinia'
import axios from 'axios'

export const useVehicleStore = defineStore('vehicle', {
    state: () => ({
        years: [], // Lista godina
        makes: [], // Lista marki
        models: [], // Lista modela
    }),

    actions: {
        async fetchYears() {
            try {
                const response = await axios.get(
                    'https://rateengine.ship.cars/v2/vehicles/years/?token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef'
                )
                this.years = response.data // Popuni godine
            } catch (error) {
                console.error('Error fetching years:', error)
            }
        },

        async fetchMakes(year) {
            try {
                const response = await axios.get(
                    `https://rateengine.ship.cars/v2/vehicles/makes/?year=${year}&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef`
                )
                this.makes = response.data // Popuni marke na osnovu godine
            } catch (error) {
                console.error('Error fetching makes:', error)
            }
        },

        async fetchModels(year, make) {
            try {
                const response = await axios.get(
                    `https://rateengine.ship.cars/v2/vehicles/models/?year=${year}&make=${make}&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef`
                )
                this.models = response.data // Popuni modele na osnovu godine i marke
            } catch (error) {
                console.error('Error fetching models:', error)
            }
        }
    }
})
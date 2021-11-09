const fs = require('fs');

const axios = require('axios').default;
require('dotenv').config();

const { inquirerSelec } = require('../inquirer/inquirer');



class Busquedas {

    historialBusquedas = [];
    path = `./db//historial.json`;

    constructor() {

        this.leerDB();

    }

    get paramsMap() {

        return {
            access_token: process.env.MAPBOX_KEY,
            language: 'es'
        }

    }

    get paramsOpenWeather() {

        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }

    }

    //TAKE THE CITY AND WRITE IT ON THE PREVIOUS SEARCHES AND DATABASE
    agregarLugarHistorial(lugar) {

        const finded = this.historialBusquedas.find((curr) => curr.id === lugar.id);

        if (!finded) {
            this.historialBusquedas.unshift(lugar);
            this.historialBusquedas.splice(5);
            fs.writeFileSync(this.path, JSON.stringify(this.historialBusquedas));
        };

    }


    leerDB() {

        if (fs.existsSync(this.path)) {
            const db = fs.readFileSync(this.path, { encoding: 'utf-8' });
            this.historialBusquedas = JSON.parse(db);
        } else {
            fs.writeFileSync(this.path, JSON.stringify(this.historialBusquedas));
            return;
        }

    }

    //CREATE A LIST WITH THE PREVIOUS SEARCHES
    async mostrarHistorialBusquedas() {


        const id = await inquirerSelec(this.historialBusquedas, 'Puede volver a consultar datos si lo desea');
        return id;

    }

    //CREATE A REQUEST TO GET DATA ABOUT THE CITY
    async conectMapBox(lugar = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMap
            });

            const res = await instance.get();
            return res.data.features.map((elem) => ({

                lugar: elem.place_name,
                lng: elem.center[0],
                lat: elem.center[1],
                id: elem.id

            }));

        } catch (error) {
            throw error;
        };

    };

    //CREATE A REQUEST TO GET DATA ABOUT THE WEATHER CITY
    async conectOpenWeather(lon, lat) {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    ...this.paramsOpenWeather
                }
            });

            const resp = await instance.get();
            return resp.data;

        } catch (error) {
            throw error;
        }

    };

}


module.exports = {
    Busquedas
};
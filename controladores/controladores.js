const fs = require('fs');

const { input, wait, inquirerSelec } = require('../inquirer/inquirer');



const switch_1 = async (busquedas) => {

    //TAKE THE INPUT AND THEN FIND ITS COORDINATES
    console.clear();
    const inputLugar = await input();
    const lugares = await busquedas.conectMapBox(inputLugar);

    //CHECK IF IT WAS A SUCCESSFUL SEARCHING
    if (undefined === lugares[0]) {

        console.log(`Lo sentimos :( \nNo encontramos ningún lugar con este nombre\n\n`);
        await wait('Presione ENTER para volver');
        console.clear();
        return;

    };

    //CREATE A LIST WITH THE OPTIONS FOUND
    const id = await inquirerSelec(lugares, 'Seleccione una opción');

    //FIND THE SELECT OPTION
    const lugar = lugares.find((elem) => elem.id == id);

    console.log(lugar)

    if (lugar) {
        busquedas.agregarLugarHistorial(lugar);
        await mostrarInfo(busquedas, lugar)
            .catch(err => console.log(err));
    } else {
        console.clear();
        return;        
    };

};


const switch_2 = async (busquedas) => {

    const path = busquedas.path;
    const id = await busquedas.mostrarHistorialBusquedas();
    const db = fs.readFileSync(path, { encoding: 'utf-8' });
    const obj = JSON.parse(db);
    const lugar = obj.find((elem) => elem.id === id);

    if (lugar) {
        await mostrarInfo(busquedas, lugar)
            .catch(err => console.log(err));
    } else {
        console.clear();
        return;
    }

};

const switch_3 = async () => {

    //Salir
    console.clear();
    await wait('Presione ENTER para salir');
};

const mostrarInfo = async (busquedas, lugar) => {

    console.clear();

    const { weather, main } = await busquedas.conectOpenWeather(lugar.lng, lugar.lat);

    console.log('\n===============================');
    console.log('     Información del clima');
    console.log('===============================\n');

    console.log('Lugar: ', lugar.lugar)
    console.log(`Estado: ${weather[0].description}`);
    console.log(`Sensación térmica: ${main.feels_like}°`);
    console.log(`Temp. máxima: ${main.temp_max}°`);
    console.log(`Temp. mínima: ${main.temp_min}°`);
    console.log(`Humedad: ${main.humidity}%\n`);

    await wait('\nPresione ENTER para continuar');   

}

module.exports = {
    switch_1,
    switch_2,
    switch_3
}
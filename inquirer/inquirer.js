const inquirer = require('inquirer');

const input = async () => {

    const initInput = [
        {
            type: 'input',
            name: 'initialValue',
            validate: function (value) {
                if (value.length !== 0) {
                    return true;
                } else {
                    console.log('Debes escribir el nombre de la ciudad!');
                    return false;
                }
            },
            message: 'Escribe el nombre de la ciudad que deseas buscar:'
        }
    ]

    const { initialValue } = await inquirer.prompt(initInput);
    return initialValue;
};

const inquirerMenu = async () => {

    const choices = [
        {
            name: `1. Buscar el clima de una ciudad`,
            value: 1
        },
        {
            name: `2. Historial de búsquedas`,
            value: 2
        },
        {
            name: `3. Salir de la app`,
            value: 3
        }
    ];

    const selecOption = [
        {
            choices,
            name: 'option',
            message: 'Seleccione una opcion',
            type: 'list'
        }
    ];

    const { option } = await inquirer.prompt(selecOption);
    return option;
};

const inquirerSelec = async (lugares, message) => {

    const choices = lugares.map((currObj, indx) => ({
        name: `${indx + 1}. ${currObj.lugar}`,
        value: currObj.id
    }));

    choices.unshift({
        name: '0. Atrás',
        value: 0
    });

    const lista = [
        {
            choices,
            message,
            type: 'list',
            name: 'id'
        }
    ];

    const { id } = await inquirer.prompt(lista);
    return id;

}

const wait = async (message) => {

    const enter = [
        {
            type: 'input',
            message,
            name: 'acces'
        }
    ];

    await inquirer.prompt(enter);
    console.clear();
};


module.exports = {
    input,
    inquirerMenu,
    inquirerSelec,
    wait
}


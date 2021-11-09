const { Busquedas } = require('./busquedas/busquedas');
const { inquirerMenu } = require('./inquirer/inquirer');
const { switch_1, switch_2, switch_3 } = require('./controladores/controladores');

console.clear();

const main = async () => {

    try {
        const busquedas = new Busquedas;
        let opt;
        do {
            opt = await inquirerMenu();
            switch (opt) {
                case 1:
                    await switch_1( busquedas );
                    break;

                case 2:
                    await switch_2( busquedas );
                    break;

                case 3:
                    await switch_3();
                    break;

            }
        } while (opt !== 3);

    } catch (error) {
        throw error;
    }
}
main()
    .catch((err) => console.log(err));







import type { Helyetesites, NewHelyetesites } from "./types.ts";
import { getHelyetesitesek, createHelyetesites, deleteHelyetesites } from "./api.ts";
import { getNextDayName } from "./getDay.ts";
import fs from "node:fs";
import util from 'node:util';
import readline from 'node:readline/promises';
using rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let helyetesitesek: Helyetesites[] = []

helyetesitesek = await getHelyetesitesek();

async function Folyamat() {
    let fut = true;

    do {
        console.log(`Helyetesítések listája: 
           \t1. Helyetesítések kilistáza
           \t2. Új helyetesítés felvétele
           \t3. Helyetesítések törlése egy megaddot értékelés alapján
           \t4. Helyetesítések lista exportálasa (.JSON formában)
           \t5. Kilépés`)

        let be = await rl.question(`válasz a lehetőségek közül (a sorszámmal): `);

        console.log()

        switch (be) {
            case "1":
                helyetesitesek.forEach(e => {
                    console.log(`${e.id}.) ${e.name} - ${e.dayofweek} ${e.hours}.óra`)
                })
                break;
            case "2":
                console.log("Új helyetesítés felvétele:")
                let nev: string = await rl.question(`\tAdja meg a helyetesítő tanár nevét: `);
                if (nev.trim() === "" || nev.trim() === null) {
                    console.log(util.styleText(['yellow'], 'A név megadása kötelező!'));
                    break;
                }
                else {
                    let oraszama: number = Number(await rl.question(`\tAdja meg a helyetesítendő óra számát: `));

                    if (oraszama >= 1 && oraszama <= 7) {
                        let day: string = getNextDayName();

                        const ujHelyetesites: NewHelyetesites = {
                            name: nev,
                            hours: oraszama,
                            dayofweek: day
                        }

                        await createHelyetesites(ujHelyetesites)

                        helyetesitesek = await getHelyetesitesek();

                        console.log(util.styleText(['green'], 'Sikeres felvétel!'))

                    }
                    else {
                        console.log(util.styleText(['yellow'], 'A helyetesítendő óra száma 1-7 között kell lennie!'))
                    }
                }
                break;
            case "3":
                console.log("Helyetesítések törlése:")
                let torlendoId: number = Number(await rl.question(`\tAdja meg a törölni kivánt óra sorszámát (a szám a '.)' előtt): `));

                if (helyetesitesek.some(e => e.id === torlendoId)) {
                    await deleteHelyetesites(torlendoId);

                    helyetesitesek = await getHelyetesitesek();
                    console.log(util.styleText(['green'], 'Sikeres törlés!'));
                }
                else {
                    console.log(util.styleText(['yellow'], 'Érvénytelen sorszám!'));
                }
                break;
            case "4":
                console.log("Helyetesítések exportálása (.JSON formában):")
                let fileName = await rl.question(`Adja meg az exportált fájl nevét (kiterjesztés nélkül): `);
                if (fileName.trim() === "" || fileName.trim() === null || fileName.includes(".")) {
                    console.log(util.styleText(['yellow'], 'A fájlnév megadása kötelező, kiterjesztés nélkül!'));
                }
                else {
                    fs.writeFileSync(`${fileName}.json`, JSON.stringify(helyetesitesek, null, 2), { encoding: 'utf-8' });
                    console.log(util.styleText(['green'], 'Sikeres exportálás!'));
                }
                break;
            case "5":
                console.log("Kilépés...")
                fut = false;
                break;
            default:
                console.log("Nincs ilyen opció, a megaddot lehetőségek sorszámát használja")
                break;
        }

        console.log();

    } while (fut)
}

await Folyamat();
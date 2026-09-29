console.log("hello word"); //- egyszerű kiírás

let szam: number = 2; //- A "numberrel" megadjuk hogy szám típusú (boolean, number, string)

document.getElementById("katt")/*?*/!.addEventListener('click', () => {  //pontcionálisan lehet null a müvelet: - ? ha nem létezik akkor ne fusson le
    console.log("Katt Ide")                                              //                                     - ! mi tudjuk hogy létezik
  })

 const szamMezo = document.getElementById("szammezo") as HTMLInputElement; // elmondja a mező az egy input

 document.getElementById("rendelesform")?.addEventListener("submit", (e) => {
    e.preventDefault()
    const adat = new FormData(e.currentTarget as HTMLFormElement) // lekéri az össes adatot a formből
    const faj = adat.get("faj")!.toString()                       // a name-re hivatkózva lehet elérni
    const szin = adat.get("szin_picker")!.toString();
    const size: number = parseInt(adat.get("size")!.toString());
})

// import fs from "node:fs"; -- fájl feldolgozás

// interface Film {
//     title: string;
//     year: number;
//     genre: string;
// }

// const tartalom = fs.readFileSync('filmek.csv', {encoding: 'utf-8'});

// console.log(tartalom);
// const darabolt = tartalom.trim().split('\n').toSpliced(0, 1);

// const filmek: Film[] = [];

// for(const sor of darabolt)
// {
//     const  mezok = sor.trim().split(',');
//     console.log(mezok);
//     const film: Film = {title: mezok[0]!, year: parseInt(mezok[1]!), genre: mezok[2]!}

//     filmek.push(film)
// }

// console.table(filmek)

//fs.writeFileSync("hoemersekletek.txt", homersekletek.join(","), { encoding: 'utf-8' }) - ("fájl.név, tartalom, szoveg tipus")

//import util from 'node:util';

//console.log(util.styleText(['yellow'], 'Nincs ilyen értékelésű film a listában')); - különleges kiírás (['stílus'], 'szöveg')


// api használat Typescript-el
// import type { Album, NewAlbum } from "./types";

// export const API_BASE_URL = "https://retoolapi.dev/SJ16mb/data";

// async function handleResponse<T>(res: Response): Promise<T> {
//   if (!res.ok) {
//     throw new Error(`API hiba: ${res.status} ${res.statusText}`);
//   }
//   const text = await res.text();
//   return text ? (JSON.parse(text) as T) : (undefined as T);
// }

// export async function getAlbums(): Promise<Album[]> {
//   const res = await fetch(API_BASE_URL);
//   return handleResponse<Album[]>(res);
// }

// export async function getAlbum(id: number): Promise<Album> {
//   const res = await fetch(`${API_BASE_URL}/${id}`);
//   return handleResponse<Album>(res);
// }

// export async function createAlbum(album: NewAlbum): Promise<Album> {
//   const res = await fetch(API_BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(album),
//   });
//   return handleResponse<Album>(res);
// }

// export async function updateAlbum(id: number, album: NewAlbum): Promise<Album> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(album),
//   });
//   return handleResponse<Album>(res);
// }

// export async function setPublished(id: number, published: boolean): Promise<Album> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ published }),
//   });
//   return handleResponse<Album>(res);
// }

// export async function deleteAlbum(id: number): Promise<void> {
//   await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
// }

//kiirász JSON-ba
//fs.writeFileSync(`${fileName}.json`, JSON.stringify(helyetesitesek, null, 2), { encoding: 'utf-8' });
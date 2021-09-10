const template = document.querySelector("template");
const headingOne = document.querySelector("h1");
const popUp = document.querySelector("#popup");
const buttonLuk = document.querySelector("#popup button");

const header = document.querySelector(".width h2");
const url = "https://outdoor-0753.restdb.io/rest/stayoutdoor";

const options = {
  headers: { "x-apikey": "6139e63e43cedb6d1f97eee7" },
};

window.addEventListener("DOMContentLoaded", start);
let vandreContent;
let filter = "alle";

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  //console.log(filterKnapper);

  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMenu));
  //EventListener vælger hvad for et filter der er aktivt
  hentData(url);
}

function filtrerMenu() {
  filter = this.dataset.outdoor;
  //This = det man trykker på og bestemmer kategori
  //Sætter filter på værdien menu (Alle vandreContent)
  console.log(this);

  document.querySelector(".valgt").classList.remove("valgt");
  //Fjerne class fra forrige knap
  this.classList.add("valgt");
  //Tilføjer class til klikket knap
  vis(); //Kalder vis function efter nyt filter er påsat

  header.textContent = this.textContent;
  //This henviser til klikket knap og ændrer overskrift til det der står i knappen
}

async function hentData(url) {
  //Promise - data lover program at komme med date, imen det køre videre
  const result = await fetch(url, options);
  vandreContent = await result.json();
  console.log(vandreContent);
  vis();
}

function vis() {
  const container = document.querySelector(".container");
  container.textContent = ""; //Ryd container inden loop
  //console.log(filter);

  //vandreContent = Alt indhold i db | vandreElement = Enkelte elementer i db

  vandreContent.forEach((vandreElement) => {
    if (filter == vandreElement.kategori || filter == "alle") {
      //Er filter det samme som objekt? || betyder eller
      //Bestemt kategori eller alle objekter
      console.log(filter);
      let klon = template.cloneNode(true).content;
      // const md = "-md.jpg";
      //Placer i HTML

      klon.querySelector("h3").textContent = vandreElement.navn;
      klon.querySelector("img").src = vandreElement.billede;
      klon.querySelector(".kortbeskrivelse").textContent =
        vandreElement.kortbeskrivelse;
      klon.querySelector("article").addEventListener("click", () => {
        location.href = "single_view.html?id=" + vandreElement._id;
      });

      //klon.querySelector("img").src = "faces/" + vandreElement.billede;
      container.appendChild(klon);
    }
  });
}

headingOne.addEventListener("click", openPopup);
buttonLuk.addEventListener("click", buttonClose);

function openPopup() {
  //console.log("Tjek heading");
  popUp.style.opacity = "1";
  popUp.style.pointerEvents = "all";
}
function buttonClose() {
  popUp.style.opacity = "0";
  popUp.style.pointerEvents = "none";
}

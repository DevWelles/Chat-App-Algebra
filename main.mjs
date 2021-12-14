import User from './user.mjs';
import Soba from './soba.mjs';

document.getElementById("chatApp").style.display = "none";


const prijava = document.getElementById("prijava");
prijava.onclick = (e) => {
  // console.log(e)
  User.prijava(e)
};
const odjava = document.getElementById("odjava");
odjava.onclick = () => {
  User.odjava();
};
const provjera = document.getElementById("provjeriStanje");
provjera.onclick = () => {
  console.log(User)
};

const posaljiPor = document.getElementById("posalji");
posaljiPor.onclick = () => {
  User.posaljiPoruku();
};

const svePor = document.getElementById("svePor");
svePor.onclick = () => {
  const soba = new Soba (User); //tu ce uzeti id sobe preko usera 
  console.log(soba)
  soba.dohvatiSvePoruke();
};

const odIndexPor = document.getElementById("odPor");
odIndexPor.onclick = () => {
  const soba = new Soba (User);
  soba.dohvatiPorOdIndexa();
};

const nBrojPor = document.getElementById("zadnjihPor");
nBrojPor.onclick = () => {
  const soba = new Soba (User);
  soba.dohvatiNBrojPor();
}

const createNewRoom = document.getElementById("createNewRoom");
createNewRoom.onclick = () => {
  User.dodajJavnuSobu();
}

const dohvatiSobe = document.getElementById("dohvatiSobe");
dohvatiSobe.onclick = () => {
  User.dohvatiSobe();
}

const reset = document.getElementById("reset")
reset.onclick = () =>  {
  User.listaJavnihSoba = [];
  User.listaPrivatnihSoba = [];
  User.trenSoba = "";
  User.trenSobaId = null;
  
  console.log(User)
}


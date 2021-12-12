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
  const soba = new Soba (User);
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


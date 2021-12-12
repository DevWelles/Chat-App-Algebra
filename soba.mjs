export default class Soba {
  constructor(user) {
    this.id = user.trenSobaId;
    this.imeSobe = user.trenSoba;
    this.tipSobe = "";
    this.osoba1 = user.nickname;
    this.osoba2 = "";
    this.poruke = [];
    this.listaOsoba = [];
  }

  async udjiUSobu (user) {
    document.getElementById("imeSobe").innerText = `Ime sobe: ${this.imeSobe}`;
    user.trenSobaId = this.id;//ovo cu korisitti u map metodi i tada ce this označavati tu pojedinu sobu jer ce backend vratiti objek svake sobe koja ima id
                              //pogledaj metodu dohvatiSobe u Useru najkompliciranija je
                               // i onda ce taj onclick event prominit proeprty u useru i to mi je najbitnije jer se taj prop koristi za slanje por u fetch metodi
    const poruke = document.getElementById("poruke")
    poruke.querySelectorAll('p').forEach(element => element.parentNode.removeChild(element)); //da maknem sve paragrafe iz poruka

    }                          

  async dohvatiSvePoruke() {
    const tip = "sve"
    const poruke = await fetch(`https://www.digital-abundance.hr/chatAPI/dohvatiPoruke.php?idSobe=${this.id}&&tip=${tip}&&broj`)
    const jsArrofObjects = await poruke.json();
    console.log(jsArrofObjects);

    for (let i=0; i<jsArrofObjects.length; i++){
      var p = document.createElement("p")
      document.getElementById("poruke").appendChild(p)
      if(jsArrofObjects[i].nick == this.osoba1){//dodajem classu za moje por da ih prikažem na desnoj strani
        p.classList.add("mojePor");
      }
      p.innerText = `${jsArrofObjects[i].nick}:
      ${jsArrofObjects[i].poruka}
      at: ${jsArrofObjects[i].vrijeme}`
    }
  };
  async dohvatiPorOdIndexa () {
    const tip = "od";
    const index = document.getElementById("index").value;
    if(index < 0){
      alert("Must be a positive number")
      return
    }
    const poruke = await fetch(`https://www.digital-abundance.hr/chatAPI/dohvatiPoruke.php?idSobe=${this.id}&&tip=${tip}&&broj=${index}`)
    const jsArrofObjects = await poruke.json();
    console.log(jsArrofObjects);

    for (let i=0; i<jsArrofObjects.length; i++){
      var p = document.createElement("p")
      document.getElementById("poruke").appendChild(p)
      if(jsArrofObjects[i].nick == this.osoba1){//dodajem classu za moje por da ih prikažem na desnoj strani
        p.classList.add("mojePor");
      }
      p.innerText = `${jsArrofObjects[i].nick}:
      ${jsArrofObjects[i].poruka}
      at: ${jsArrofObjects[i].vrijeme}`
    }
  };

  async dohvatiNBrojPor () {
    const tip = "zadnjih";
    const index = document.getElementById("n").value;
    if(index < 0){
      alert("Must be a positive number")
      return
    }
    const poruke = await fetch(`https://www.digital-abundance.hr/chatAPI/dohvatiPoruke.php?idSobe=${this.id}&&tip=${tip}&&broj=${index}`)
    const jsArrofObjects = await poruke.json();
    console.log(jsArrofObjects);

    for (let i=0; i<jsArrofObjects.length; i++){
      var p = document.createElement("p")
      document.getElementById("poruke").appendChild(p)
      if(jsArrofObjects[i].nick == this.osoba1){//dodajem classu za moje por da ih prikažem na desnoj strani
        p.classList.add("mojePor");
      }
      p.innerText = `${jsArrofObjects[i].nick}:
      ${jsArrofObjects[i].poruka}
      at: ${jsArrofObjects[i].vrijeme}`
    }
  };

}
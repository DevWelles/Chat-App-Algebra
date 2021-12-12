import Soba from './soba.mjs';

const User = {
  nickname: "Zvonimir",
  password: "Drazina",
  identSes: null,
  trenSobaId: null,
  trenSoba: "",
  login: false,
  logout: true,
  listaPrivatnihSoba: [], 
  listaJavnihSoba: [],

  dohvatiSobe: async function () {//za napunit listu soba prilikom logina i za prikazati te sobe u u rubrici lista aktivnih soba
    const response = await fetch(`https://www.digital-abundance.hr/chatAPI/dohvatiSobe.php?nick=${this.nickname}`);
    var jsObject = await response.json();//parsira body od responsa i pretvara ga u JS object
    console.log(jsObject);
    const privatne = jsObject.privatne;
    const javne = jsObject.javne;
    // console.log(privatne)
    console.log(javne);
    for(let i=0; i<privatne.length; i++){ //namještam parametre za privatne sobe
      const soba = new Soba(this); //this je User, pogledaj u modulu soba.mjs koje ce on propertije tamo namistiti
      soba.id = privatne[i].idSobe; //overridam(updateam) proeprtije i stavljam propertije koje mi je poslao backend
      soba.osoba2 = privatne[i].nick2;
      soba.imeSobe = `Privatna, korisnici: ${this.nickname} i ${privatne[i].nick2}`;
      soba.tipSobe = "Privatna";
      this.listaPrivatnihSoba.push(soba)
    }
     //console.log(this.listaPrivatnihSoba)
    for(let i = 0; i<javne.length; i++){
      const soba = new Soba(this);
      soba.id = javne[i].idSobe;
      soba.imeSobe = javne[i].imeSobe;
      soba.tipSobe = "Javna"
      this.listaJavnihSoba.push(soba)
    }
    console.log(this.listaJavnihSoba)
    //prikazivanje liste aktivnih soba:
    const aktivneSobe = document.getElementById("aktivneSobe");
    this.listaJavnihSoba.map(soba => {
      let p = document.createElement('p');
      let udiUsobu = document.createElement('button');
      aktivneSobe.append(p);
      aktivneSobe.append(udiUsobu);
      udiUsobu.innerText = `Udi u ${soba.imeSobe}`
      //udiUsobu.setAttribute('id', soba.id) //dodam id botunu da bude isti kao od sobe, to smijem napravit jer cu ovaj id koristit u htmlu za onclick event, a id od sobe koristim samo kao properti od Sobe. Lakše mi je tako nego ga dohvacati na neke druge nacine
      udiUsobu.onclick = () =>{//svaki botun ce imati ovu onclick funkciju definiranu u classu
        soba.udjiUSobu(this); //moram to jos dobro definirati i viditi clousure i u kojem je kontekstu this triba bi oznacavati usera
      };
      p.innerText = soba.imeSobe;  
    });
    this.listaPrivatnihSoba.map(soba => {
      let p = document.createElement('p');
      let udiUsobu = document.createElement('button');
      aktivneSobe.append(p);
      aktivneSobe.append(udiUsobu);
      udiUsobu.innerText = `Udi u ${soba.imeSobe}`
      //udiUsobu.setAttribute('id', soba.id) //ipak mi netriba id
      udiUsobu.onclick = () =>{//svaki botun ce imati ovu onclick funkciju definiranu u classu
        soba.udjiUSobu(this); //moram to jos dobro definirati i viditi clousure i u kojem je kontekstu this triba bi oznacavati usera
      };
      p.innerText = soba.imeSobe;  
    });
   
  },

  prijava: async function (event) {//trenutno radim bez eventa jer sam stavio btn logiraj se izvan forme jer mi baca error kad je u formi pa eto to mi je pitanje kkao to riješiti i napisati možda pomocu sintakse addeventlistener("click",func), a ne btn.onclick=func
    // event.preventDefalut(); zašto mi javlja error da event.preventdefault is not a function?
    this.nickname = document.getElementById("nick").value;
    this.password = document.getElementById("pass").value;
    if(this.nickname == "" || this.password == ""){ //mora sam ovu glupost staviti jer mi je botun izvan forme :(
      alert("You must enter a name and password");
      return
    }
    this.identSes = 1 //ovo daje backend?? neznam za sto smo ovo mislili koristiti?
    const response = await fetch(`https://www.digital-abundance.hr/chatAPI/prijava.php?nick=${this.nickname}&&pass=${this.password}`);
    var jsObject = await response.json();//parsira body od responsa i pretvara ga u JS object
    console.log("trenutna soba je:")
    console.log(jsObject);
    this.trenSobaId = jsObject.idSobe;
    this.trenSoba = jsObject.imeSobe;
    this.login = jsObject.login;
    this.logout = false,
    console.log('trenutni user je:')
    console.log(this);
    document.getElementById("chatApp").style.display = "flex";
    this.dohvatiSobe();
    document.getElementById("imeSobe").innerText= `Ime sobe: ${jsObject.imeSobe}`
  },

  odjava: async function() {
    const response = await fetch(`https://www.digital-abundance.hr/chatAPI/odjava.php?nick=${this.nickname}&&pass=${this.password}`)
    var jsObject = await response.json();
    console.log(jsObject);
    this.logout = jsObject.logout;
    this.trenSobaId = jsObject.idSobe;
    this.trenSoba = jsObject.imeSobe;
    this.login = false;
    this.nickname = "";
    this.password = "";
    console.log(this);
    document.getElementById("chatApp").style.display = "none"
  },

  posaljiPoruku:  async function () { //isto sam makao iz forme i ostavio samo input jer mi ne radi e.preventdefalut() kako očekujem
    const poruka = document.getElementById("novaPoruka").value
    const response = await fetch(`https://www.digital-abundance.hr/chatAPI/dodajPoruku.php?nick=${this.nickname}&&idSobe=${this.trenSobaId}&&poruka=${poruka}&&referentnaPoruka=0`)
    const jsObject = await response.json();
    console.log(jsObject);
    let p = document.createElement('p');
    document.getElementById("poruke").append(p);
    p.classList.add("mojePor"); //ovo koristim u cssu da svoje por pomaknem u desnu stranu chata,
    p.innerText = `${jsObject.nick}: ${jsObject.poruka}
    at: ${jsObject.vrijeme}`;
  }, //trebam napravit da mi se poruke pune od dolje prema gore tj da mi prva poruka se pojavi dolje
};

export default User
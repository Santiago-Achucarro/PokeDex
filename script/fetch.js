document.addEventListener("DOMContentLoaded", (e) => {

  let names = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40";

  let navbar = document.getElementById("contenedor-main-nav");
  let cardsConteiner = document.getElementById("contenedor-cards");
  let back = document.getElementById("back");
  let btnNext = document.getElementById("next");
  let btnPrev = document.getElementById("prev");
  let divInit = document.getElementById("init");
  let init = document.getElementById("pokeball");
  let loading = document.getElementById("loading");
  let home = document.getElementById("home")

  let next = [];
  let prev = [];

  // Declare events of start  & paginator
  home.addEventListener("click", returnHome)
  init.addEventListener("click", start);
  btnNext.addEventListener("click", nextPage);
  btnPrev.addEventListener("click", prevPage);
  
  function returnHome(){ 
    init.style.display = "";
    cardsConteiner.classList.add("hidden");
    divInit.classList.remove("hidden");
  
    navbar.classList.add("visible");

    btnPrev.classList.add("visible");
    btnNext.classList.add("visible");
  }

  function nextPage() {
    console.log(next);
    initA(next);
  }

  function prevPage() {
    console.log(prev);
    initA(prev);
  }

  function paginator(data) {
    if (data.next === null) {
      btnNext.classList.add("visible");
    } else {
      btnNext.classList.remove("visible");
    }

    if (data.previous === null) {
      btnPrev.classList.add("visible");
    } else {
      btnPrev.classList.remove("visible");
    }
  }
  
  function start() {
    init.style.display = "none";
    divInit.classList.add("hidden");
    loading.classList.remove("hidden");
    
    setTimeout(() => {
      loading.classList.add("hidden");
      cardsConteiner.classList.remove("hidden");
      navbar.classList.remove("visible");
      btnPrev.classList.remove("visible");
      btnNext.classList.remove("visible");
      initA(names);
    }, 3000);
  }
  
  function initA(a) {
    fetch(a)
    .then((res) => res.json())
    .then((data) => {
      clear();
      next.shift();
      prev.shift();
      next.push(data.next);
      prev.push(data.previous);
      
      paginator(data);
      initProcess(data);
    });
    
    function clear() {
      cardsConteiner.querySelectorAll(".card").forEach((element) => {
        element.remove(element);
      });
    }
    
  }
    
    


  function initProcess(value) {
    value = value.results;
    value.forEach((element) => {
      let url = element.url;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {

          console.log(data);
          // Create Card w/ img-name-weight-powers

          let cardsDiv = document.createElement("div");
              cardsDiv.classList.add("card");
          let imgDiv = document.createElement("div");
            imgDiv.classList.add("image")
            let imgPok = document.createElement("img");
              imgPok.classList.add("imagen");

          let firstElements = document.createElement("div");
                firstElements.classList.add("elements")
          let subElements = document.createElement("div");
              subElements.classList.add("subElements");
          let nombresDiv = document.createElement("div");
            let nombresPok = document.createElement("p");
          let habilidadesDiv = document.createElement("div");
            let habilidadesPok = document.createElement("p");
              habilidadesPok.classList.add("habilidades");
          let pesoDiv = document.createElement("div");
          let pesoPok = document.createElement("p");

          // Take the data

          let nombres = data.name;
          let powers = data.abilities;
          let peso = data.weight;
          let imagen = data.sprites.front_default;

          habilidades = powers.map((element) => {
            let habilidades = element.ability.name;
            return habilidades;
          });

          // Deposit data

          imgPok.setAttribute("src", imagen);
          habilidadesPok.innerText = `Habilidad principal: ${habilidades}`;
          nombresPok.innerText = `Nombre: ${nombres}`;
          pesoPok.innerText = `Peso: ${peso}kg.`;

          cardsConteiner.appendChild(cardsDiv);

          cardsDiv.appendChild(imgDiv);
          cardsDiv.appendChild(firstElements);

          firstElements.appendChild(subElements);

          subElements.appendChild(nombresDiv);
          subElements.appendChild(habilidadesDiv);
          subElements.appendChild(pesoDiv);

          imgDiv.appendChild(imgPok);
          nombresDiv.appendChild(nombresPok);
          habilidadesDiv.appendChild(habilidadesPok);
          pesoDiv.appendChild(pesoPok);

          subElements.classList.add("hidden");
          nombresDiv.classList.add("hidden");

          cardsDiv.addEventListener("click", entryData);
          back.addEventListener("click", backPrev);

          function entryData(e) {
            if (e.target === imgPok) {
              document.querySelectorAll(".card").forEach((producto) => {
                if (producto.childNodes[0].childNodes[0] !== e.target) {
                  producto.classList.add("hidden");
                  
                } else {
                  loading.classList.remove("hidden");
                  navbar.classList.add("visible");
                  cardsConteiner.classList.remove("contenedor-cards");
                  producto.classList.remove("card");
                  btnPrev.classList.add("visible");
                  btnNext.classList.add("visible");
                  producto.classList.add("hidden");

                  setTimeout(() => {
                    back.classList.remove("hidden");
                    loading.classList.add("hidden");
                    producto.classList.add("newCard");
                    producto.classList.remove("hidden");

                    cardsConteiner.classList.add("newContainer");
                    subElements.classList.remove("hidden");
                    nombresDiv.classList.remove("hidden");
                  }, 1000);

                }
              });

            }
  

          }
          function backPrev() {

            cardsDiv.classList.remove("hidden");
            cardsDiv.classList.add("card");
            subElements.classList.add("hidden");
            cardsConteiner.classList.remove("newContainer");
            cardsConteiner.classList.add("contenedor-cards");
            cardsDiv.classList.remove("newCard");

            nombresDiv.classList.add("hidden");
            navbar.classList.remove("visible");
            back.classList.add("hidden");

            
            btnPrev.classList.add("visible");
            btnNext.classList.add("visible");
          }
        });
    });
  }
});

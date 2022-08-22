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

  let next = []
  let prev = []
  init.addEventListener("click", start);
  btnNext.addEventListener("click", nextPage)
  btnPrev.addEventListener("click", prevPage)

  function nextPage(){
    console.log(next);
    initA(next)
  }
  
  function prevPage(){
    console.log(prev);
    initA(prev)
  }

  function start() {
    init.style.display = "none";
    cardsConteiner.classList.remove("hidden");
    divInit.classList.add("hidden");
    loading.classList.remove("hidden");

    setTimeout(() => {
      loading.classList.add("hidden");
      navbar.classList.remove("visible");
      btnPrev.classList.remove("visible");
      btnNext.classList.remove("visible");
      initA(names);
    }, 3000);
  }

  function initA(api) {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        
        clear()
        next.shift()
        prev.shift()
        next.push(data.next)
        prev.push(data.previous)

        paginator(data);
        initProcess(data);
      });
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

  function clear() {
    cardsConteiner.querySelectorAll(".card").forEach((element) => {
      element.remove(element);
    });
  }

  function initProcess(value) {
    value = value.results;
    value.forEach((element) => {
      let url = element.url;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let cardsDiv = document.createElement("div");
          let elements = document.createElement("div");

          let imgDiv = document.createElement("div");
          let imgPok = document.createElement("img");

          let nombresDiv = document.createElement("div");
          let nombresPok = document.createElement("h3");

          let habilidadesDiv = document.createElement("div");
          let habilidadesPok = document.createElement("h3");

          let pesoDiv = document.createElement("div");
          let pesoPok = document.createElement("h2");

          let nombres = data.name;

          let powers = data.abilities;

          habilidades = powers.map((element) => {
            let habilidades = element.ability.name;
            return habilidades;
          });

          habilidadesPok.classList.add("habilidades");
          habilidadesPok.innerText = `Habilidad principal:${habilidades}`;
          habilidadesDiv.appendChild(habilidadesPok);

          let peso = data.weight;
          let imagen = data.sprites.front_default;
          imgPok.setAttribute("src", imagen);
          imgPok.classList.add("imagen");
          nombresPok.innerText = `Nombre:${nombres}`;
          pesoPok.innerText = `Peso: ${peso}kg.`;

          cardsConteiner.appendChild(cardsDiv);
          cardsDiv.classList.add("card");
          cardsDiv.appendChild(imgDiv);
          cardsDiv.appendChild(elements);

          imgDiv.appendChild(imgPok);

          elements.appendChild(nombresDiv);
          elements.appendChild(habilidadesDiv);
          elements.appendChild(pesoDiv);
          nombresDiv.appendChild(nombresPok);
          pesoDiv.appendChild(pesoPok);

          elements.classList.add("hidden");
          nombresDiv.classList.add("hidden");

          cardsDiv.addEventListener("click", (e) => {
            if (e.target === imgPok) {
              document.querySelectorAll(".card").forEach((producto) => {
                if (producto.childNodes[0].childNodes[0] !== e.target) {
                  producto.classList.add("hidden");
                } else {
                  back.classList.remove("hidden");
                  producto.classList.remove("hidden");
                  producto.classList.remove("card");
                  cardsConteiner.classList.remove("contenedor-cards");
                  cardsConteiner.classList.add("newContainer");
                  producto.classList.add("newCard");
                  elements.classList.remove("hidden");
                  nombresDiv.classList.remove("hidden");
                }
              });
            }
          });

          back.addEventListener("click", backPrev);

          function backPrev() {
            cardsDiv.classList.remove("newCard");
            cardsDiv.classList.remove("hidden");
            cardsDiv.classList.add("card");
            back.classList.add("hidden");
            elements.classList.add("hidden");
            nombresDiv.classList.add("hidden");
            cardsConteiner.classList.remove("newContainer");
            cardsConteiner.classList.add("contenedor-cards");
          }
        });
    });
  }
});

// VARIABLES
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// EVENT LISTENERS
eventListeners();

function eventListeners() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el documento está listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHtml();
  });
}

// FUNCIONES
function agregarTweet(e) {
  e.preventDefault();

  // Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  // Validación...
  if (tweet === "") {
    mostrarError("El tweet no puede ir vacío");
    // Con el return evitamos que se ejecuten más lines de código
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir al arreglo el tweet
  tweets = [...tweets, tweetObj];

  // Una vez agregado el tweet creamos el Html
  crearHtml();

  // Reiniciar el formulario
  formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  // Insertar error en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 2000);
}

// Muestra el listado de los tweets
function crearHtml() {
  limpiarHtml();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Agregar un btn de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      // Añadir la función de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear el Html
      const li = document.createElement("li");

      // Añadir el texto
      li.innerHTML = tweet.tweet;

      // Asignar el botón
      li.appendChild(btnEliminar);

      // Insertamos en el Html los tweets
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agrega los Tweets actuales a LocalStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHtml();
}

// Limpiar Html
function limpiarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

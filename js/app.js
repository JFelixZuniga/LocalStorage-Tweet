// VARIABLES
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// EVENT LISTENERS
eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);
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
      // Crear el Html
      const li = document.createElement("li");
      // Añadir el texto
      li.innerHTML = tweet.tweet;
      // Insertamos en el Html los tweets
      listaTweets.appendChild(li);
    });
  }
}

// Limpiar Html
function limpiarHtml() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

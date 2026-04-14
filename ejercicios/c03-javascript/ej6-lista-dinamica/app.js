const inputProducto = document.querySelector("#producto");
const btnAgregar = document.querySelector("#btnAgregar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const error = document.querySelector("#error");

function actualizarContador() {
  const cantidad = lista.children.length;
  contador.textContent = `${cantidad} productos en la lista`;
}

function agregarProducto() {
  error.textContent = "";

  const nombre = inputProducto.value.trim();

  if (nombre === "") {
    error.textContent = "El nombre del producto no puede estar vacío.";
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = nombre;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", () => {
    li.remove();
    actualizarContador();
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  lista.appendChild(li);

  inputProducto.value = "";
  inputProducto.focus();
  actualizarContador();
}

btnAgregar.addEventListener("click", agregarProducto);

inputProducto.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarProducto();
});
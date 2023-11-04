<script setup lang="ts">
import type { Producto } from '@/models/producto'
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const props = defineProps<{
  ENDPOINT_API: string
}>()



const ENDPOINT = props.ENDPOINT_API ?? ''
var productos = ref<Producto[]>([])
var currentPage = ref(1)
const productosPerPage = 5

const idCategoriaProductos = ref('')
const codigoProducto = ref('')
const nombre = ref('')
const descripcion = ref('')
const precio = ref('')
const estado = ref('')
const stock = ref('')

async function getProducto() {
  productos.value = await http.get(ENDPOINT).then((response) => response.data)
}

async function crearProducto() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      precio: precio.value,
      descripcion: descripcion.value,
      estado: estado.value,
      stock: stock.value,
      codigoProducto: codigoProducto.value,
      idCategoriaProductos: idCategoriaProductos.value,
    })
    .then(() => router.push('/panel/productos/ver'));
    await getProducto();
    document.querySelector('[data-modal-hide="authentication-modal"]').click();
    toast.error("Usuario y/o contraseña incorrectos!", {
        position: toast.POSITION.TOP_RIGHT,
      });

}

function toEdit(id: number) {
  router.push(`/producto/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Intérprete?')
  if (r) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getProducto())
  }
}

onMounted(() => {
  getProducto()
})

const displayedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * productosPerPage;
  const endIndex = currentPage.value * productosPerPage;
  return productos.value.slice(startIndex, endIndex);
});

// Añadir lógica para manejar la paginación
const totalPages = computed(() => Math.ceil(productos.value.length / productosPerPage));

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};
</script>

<template>
  <nav class="flex mb-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a href="/panel"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <a href="/panel/productos/ver"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Productos</a>
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Ver</span>
        </div>
      </li>
    </ol>

    <div class="ml-auto flex items-center">




      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
        class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus-filled" width="40"
          height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z"
            fill="currentColor" stroke-width="0" />
        </svg>

      </button>

      <RouterLink to="/panel/productos/crear"
        class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <lord-icon src="https://cdn.lordicon.com/hqymfzvj.json" trigger="hover" style="width:40px;height:40px">
        </lord-icon>

      </RouterLink>

      <RouterLink to="/panel/productos/crear"
        class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus-filled" width="40"
          height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z"
            fill="currentColor" stroke-width="0" />
        </svg>

      </RouterLink>
    </div>


  </nav>

  <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
    Adminitración de Productos</h2>


  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            N°
          </th>
          <th scope="col" class="px-6 py-3">
            NOMBRE
          </th>
          <th scope="col" class="px-6 py-3">
            PRECIO
          </th>
          <th scope="col" class="px-6 py-3">
            DESCRIPCIÓN
          </th>
          <th scope="col" class="px-6 py-3">
            Estado
          </th>
          <th scope="col" class="px-6 py-3">

          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in displayedProducts" :key="producto.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

          <td class="px-6 py-4">
            {{ index + 1 }}
          </td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ producto.nombre }}
          </th>
          <td class="px-6 py-4">
            {{ producto.precio }}
          </td>
          <td class="px-6 py-4">
            {{ producto.descripcion }}
          </td>
          <td class="px-6 py-4">
            {{ producto.estado }}
          </td>
          <td class="px-6 py-4">

            <button class="btn btn-link" @click="toEdit(producto.id)">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn-link" @click="toDelete(producto.id)">
              <span class="material-symbols-outlined">
                delete
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex justify-center mt-3">

    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="previousPage" :disabled="currentPage === 1">
            Atras
          </a>
        </li>
        <li v-for="pageNumber in totalPages" :key="pageNumber">
          <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight" :class="{
            'text-blue-600': currentPage === pageNumber,
            'text-gray-500': currentPage !== pageNumber,
            'bg-blue-50': currentPage === pageNumber,
            'bg-white': currentPage !== pageNumber,
            'border-gray-300': true,
            'border': true,
            'hover:bg-blue-100': currentPage !== pageNumber,
            'hover:text-blue-700': currentPage !== pageNumber,
            'dark:bg-gray-700': currentPage === pageNumber,
            'dark:border-gray-700': currentPage === pageNumber,
            'dark:text-white': currentPage === pageNumber,
            'dark:text-gray-400': currentPage !== pageNumber,
            'dark:hover:bg-gray-700': currentPage !== pageNumber,
            'dark:hover:text-white': currentPage === pageNumber
          }" @click="goToPage(pageNumber)">
            {{ pageNumber }}
          </a>
        </li>
        <li>
          <a href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="nextPage" :disabled="currentPage === totalPages">
            Siguiente
          </a>
        </li>
      </ul>
    </nav>

  </div>


  <!-- Main modal -->
  <div id="authentication-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>

          <form @submit.prevent="crearProducto" class="form-container">
            <h2 class="">Crear Producto</h2>

            <div class="form-group">
              <div class="row flex space-x-4">
                <div class="w-1/2">
                  <label for="nombre">Nombre</label>
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row flex space-x-4">
                <div class="col">
                  <label for="estado">Estado</label>
                  <input type="text" class="form-control" v-model="estado" placeholder="Estado" required />
                </div>

                <div class="col">
                  <label for="precio">Precio</label>
                  <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row flex space-x-4">

                <div class="col">
                  <label for="codigoProducto">Código</label>
                  <input type="number" class="form-control" v-model="codigoProducto" placeholder="Código Producto"
                    required />
                </div>

                <div class="col">
                  <label for="stock">Stock</label>
                  <input type="number" class="form-control" v-model="stock" placeholder="Stock" required />
                </div>

              </div>
            </div>


            <div class="form-group">
              <div class="row flex space-x-4">

                <div class="col">
                  <label for="idCategoriaProductos">Categoría Producto</label>
                  <input type="number" class="form-control" v-model="idCategoriaProductos"
                    placeholder="Categoría Producto" required />
                </div>

                <div class="col">
                  <label for="descripcion">Descripción</label>
                  <input type="text" class="form-control" v-model="descripcion" placeholder="Descripción" required />
                </div>


              </div>
            </div>


            <div class="form-group">
              <label for="estado" class="form-label">Imagen</label>
              <input type="file" name="file" class="form-input" @change="handleImageChange" placeholder="imagen"
                required />
            </div>


            <div class="text-center">
              <button type="submit" class="btn btn-success btn-lg">Crear</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>


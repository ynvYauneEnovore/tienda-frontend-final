<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import Header from "../Header.vue"
import Footer from "../Footer.vue"

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const idCategoriaProductos = ref('')
const codigoProducto = ref('')
const nombre = ref('')
const descripcion = ref('')
const precio = ref('')
const estado = ref('')
const stock = ref('')

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
    .then(() => router.push('/producto'))
}

function goBack() {
  router.go(-1)
}
</script>


<template>
  <Header />
  <br>
  <h2 class="intro-y text-lg font-medium">Crear Producto</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <!-- ... -->
  </div>
  <form @submit.prevent="crearProducto">
    <div class="form-floating mb-3">
      <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
      <label for="nombre">Nombre</label>
    </div>
    <div class="form-floating mb-3">
      <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
      <label for="precio">Precio</label>
    </div>

    <div class="form-floating mb-3">
      <input type="text" class="form-control" v-model="estado" placeholder="Precio" required />
      <label for="precio">estado</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" v-model="descripcion" placeholder="Descripción" required />
      <label for="descripcion">Descripción</label>
    </div>

    <div class="form-floating mb-3">
      <input type="number" class="form-control" v-model="idCategoriaProductos" placeholder="Mínimo" required />
      <label for="min">categoriaproducto</label>
    </div>
    <div class="form-floating mb-3">
      <input type="number" class="form-control" v-model="codigoProducto" placeholder="Máximo" required />
      <label for="max">codigo producto</label>
    </div>
    <div class="form-floating mb-3">
      <input type="number" class="form-control" v-model="stock" placeholder="Stock" required />
      <label for="stock">Stock</label>
    </div>

    <div class="text-center mt-3">
    <button type="submit" class="btn btn-success btn-lg">Crear</button>
  </div>>
  </form>
  <Footer />
</template>

<style></style>

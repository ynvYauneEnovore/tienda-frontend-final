<script setup lang="ts">
import type { Producto } from '@/models/producto'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var productos = ref<Producto[]>([])

async function getProducto() {
  productos.value = await http.get(ENDPOINT).then((response) => response.data)
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
</script>

<template>
    <br>
    <h2 class="intro-y text-lg font-medium">Adminitración de Productos</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <RouterLink to="/panel/verProducto/crear" class="btn btn-primary shadow-md mr-2">Crear Nuevo</RouterLink>
            <div class="hidden md:block mx-auto text-slate-500">
            </div>
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><RouterLink to="/panel">Inicio</RouterLink></li>
                  <li class="breadcrumb-item active" aria-current="page">Producto</li>
                </ol>
              </nav>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table class="table table-report -mt-2">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>DESCRIPCIÓN</th>
                        <th>ESTADO</th>
                        <th>STOCK</th>

                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(producto, index) in productos.values()" :key="producto.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.estado }}</td>
            <td>{{ producto.stock }}</td>
      
            <td>
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
        <!-- END: Data List -->
    </div>
    <!-- BEGIN: Delete Confirmation Modal -->

</template>

<style scoped></style>


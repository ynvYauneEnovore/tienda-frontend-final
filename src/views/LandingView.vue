<script setup lang="ts">
import Header from "@/components/Header.vue";
import DefaultFooter from "@/components/Footer.vue";
import axios from "axios"; 
import { onMounted, ref } from 'vue'
import type { CatProducto } from '@/models/catproducto'

const apiUrl = "http://127.0.0.1:3000/api/productos"; // Reemplaza con la URL correcta de tu endpoint

const catProductos = ref<CatProducto[]>([]); 

onMounted(async () => {
  try {
    const response = await axios.get(apiUrl);
    catProductos.value = response.data; 
    console.log(catProductos);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});




</script>





<template>
 

  <Header />

  

    <div class="gallery grow">
  <div class="image" v-for="producto in catProductos" :key="producto.id">
    <p>{{ producto.nombre }}</p>
  </div>
  <div class="box">
  <div class="inner-box"></div>
</div>
</div>




  <div class="menu-lado">
 

    <div transition-style class="--in-custom"><h1>Filtro de Productos</h1></div>

   
        <form id="filtro-tienda">
            <label for="categoria">Categoría:</label>
            <select id="categoria" name="categoria">
                <option value="todos">Todos</option>
                <option value="ropa">Ropa</option>
                <option value="electronicos">Electrónicos</option>
                <option value="hogar">Hogar</option>
            </select>

            <label for="precio-min">Precio Mínimo:</label>
            <input type="number" id="precio-min" name="precio-min" min="0" step="1">
            
            <label for="precio-max">Precio Máximo:</label>
            <input type="number" id="precio-max" name="precio-max" min="0" step="1">
            
            <input type="submit" value="Filtrar">
        </form>
        
</div>



  <DefaultFooter />


</template>

<style>

 /*
    Copy the provided snippet from
    Shadow Palette Generator.

    (I'm using a simplified snippet
    here, to make it easier to follow)
  */
  :root {
    --shadow-color: 286deg 36% 58%;
    --shadow-elevation-medium:
      2px 4px 8px
      hsl(var(--shadow-color) / 0.5);
  }

  .box {
    background: hsl(0deg 0% 95%);
    /*
      Use the purple-tinted shadow
      on the outer box:
    */
    box-shadow:
      var(--shadow-elevation-medium);
  }

  .inner-box {
    /*
      This box should have a
      different shadow color! So we
      provide a new --shadow-color, and
      reset --shadow-elevation-medium
    */
    --shadow-color: 0deg 0% 58%;
    --shadow-elevation-medium:
      2px 4px 8px
      hsl(var(--shadow-color) / 0.5);

    background: white;
    box-shadow:
      var(--shadow-elevation-medium);
  }
  
.grow{
    transition: .5s, color .10s;
        -webkit-transition: .5s, color .10s;
        -moz-transition: .5s, color .10s;
}
.grow:hover{
    transform: scale3d(1.5, 1.5, 0.3);
        -webkit-transform: scale3d(1.5, 1.5, 0.3);
        -moz-transform: scale3d(1.5, 1.5, 0.3);
}


@keyframes in-circle-swoop {
  from {
    clip-path: var(--circle-top-right-out);
  }
  to {
    clip-path: var(--circle-bottom-right-in);
  }
}

.--in-custom {
  --transition__duration: 5s;
  animation-name: in-circle-swoop;
}

.menu-lado {

  padding: 5px;
  background-color: lightgreen;
  overflow: auto;
  position: fixed;
  top: 19%;
  left: 1%;
  right: 89%;
  width: 350px;
  z-index: 1;

  
}

h1 {
            color: #333;
        }

        label {
            display: block;
            margin-top: 10px;
        }

        select, input[type="number"], input[type="submit"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }

        input[type="submit"] {
            background-color: #007BFF;
            color: #fff;
            cursor: pointer;
        }


        .gallery {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            max-width: 90%;
            padding-left: 40%;
            padding-top: 7%;

        }

        .image {
            position: relative;
            overflow: hidden;
            border: 2px solid #fff;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }

        .image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }

        .image:hover {
            transform: scale(1.05);
        }

</style>



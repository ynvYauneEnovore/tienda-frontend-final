<template>
  <div class="dashboard">
    
    <aside class="sidebar">
      <!-- Barra lateral con menú -->
      <div class="logo">
        Panel
      </div>

      <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button">
        <router-link to="/panel">Resumen</router-link>
      </button>
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Ventas
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
     
      <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
  <button type="button" class="btn btn-primary">Button</button>
</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Productos
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="button-container">
    <router-link to="/panel/verProducto/ver" class="btn btn-primary">Lista</router-link>
    <router-link to="/panel/verProducto/" class="btn btn-primary">Categorias</router-link>
</div>

    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Reportes
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>


      <ul class="menu">
        <li><router-link to="/panel">Resumen</router-link></li>
        <li :class="{ active: showDropdown }" @click="toggleDropdown">Productos</li>
        <ul class="submenu" :class="{ show: showDropdown }">
          <li :class="{ active: showSubmenu1 }" @click="toggleSubmenu1">Categorías
            <ul class="subsubmenu" :class="{ show: showSubmenu1 }">
              <li><router-link to="/panel/crear">Ver</router-link></li>
              <li><router-link to="/panel/crear">Crear</router-link></li>
            </ul>
          </li>
          <li><router-link to="/configuracion/opcion2">Producto</router-link></li>
          <li :class="{ active: showSubmenu2 }" @click="toggleSubmenu2">Submenu 2
            <ul class="subsubmenu" :class="{ show: showSubmenu2 }">
              <li><router-link to="/panel/crear">Ver</router-link></li>
              <li><router-link to="/panel">Crear</router-link></li>
            </ul>
          </li>
        </ul>
      </ul>
    </aside>

    

    <main class="main-dash">
      <RouterView />
    </main>
  </div>
</template>

<script setup>

import { ref } from 'vue';

const showDropdown = ref(false);
const showSubmenu1 = ref(false);
const showSubmenu2 = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleSubmenu1 = () => {
  showSubmenu1.value = !showSubmenu1.value;
};

const toggleSubmenu2 = () => {
  showSubmenu2.value = !showSubmenu2.value;
};
</script>

<style scoped>
.dashboard {
  display: flex;
}

.sidebar {
  width: 350px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  position: flex;
}

.main-dash {
  top: 80%;
  width: 100%;
}

.logo {
  font-size: 24px;
  margin-bottom: 20px;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  margin-bottom: 10px;
  cursor: pointer;
}

.menu a {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}

.menu .submenu {
  display: none;
}

.menu .submenu.show {
  display: block;
}

.menu .subsubmenu {
  display: none;
}

.menu .subsubmenu.show {
  display: block;
}

.menu .active {
  font-weight: bold;
}


.button-container {
  display: flex;
  flex-direction: column;
}

.button-container button {
  margin-bottom: 10px; /* Opcional: añade espacio entre los botones si lo deseas */
}

</style>

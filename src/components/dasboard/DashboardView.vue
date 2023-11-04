<template>
    <main class="dashboard-content">
      <h2>Bienvenido al Panel de Control</h2>
      <div class="widget">
        <h3>Resumen</h3>
        <p>Estadísticas aleatorias: {{ randomStats }}</p>
      </div>
      <div class="widget">
        <h3>Últimos Elementos</h3>
        <ul>
          <li v-for="item in randomItems" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        randomStats: Math.floor(Math.random() * 100),
        randomItems: [
          { id: 1, name: 'Producto 1' },
          { id: 2, name: 'Producto 2' },
          { id: 3, name: 'Producto 3' },
          // Agrega más elementos aleatorios según sea necesario
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard-content {
    padding: 20px;
    margin-top: 10%;

  }
  
  .widget {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .widget h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
  
<script>
export default {
  data() {
    return {
      showSearchBox: false,
      searchText: "",
    };
  },
  methods: {
    openSearchBox() {
      this.showSearchBox = true;
    },
    closeSearchBox() {
      this.showSearchBox = false;
      this.searchText = "";
    },
  },
};
</script>

<template>
   <div class="boton-apertura" @click="openSearchBox">
      <lord-icon
    src="https://cdn.lordicon.com/swcqkzdc.json"
    trigger="hover"
    style="width:150px;height:150px">
</lord-icon>
   </div>

   <div class="floating-search-box">
     <div class="header">
       <h2>Búsqueda</h2>
       <button class="custom-close-button" @click="showSearchBox">Cerrar</button>
     </div>
     <div class="main">
       <input type="text" placeholder="Buscar..." v-model="searchText">
     </div>
     <div class="footer">
       <!-- Aquí puedes agregar contenido adicional para el footer si lo deseas -->
     </div>
   </div>
 </template>
 
 <style scoped>
 .floating-search-box {
   
   position: fixed;
   top: 30%;
   right: 0%;
   width: 300px;
   background-color: #fff;
   border: 1px solid #ccc;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   z-index: 999;
 }

 .boton-apertura {
   
   position: fixed;
   top: 30%;
   right: 0%;
   background-color: #fff;
   border: 1px solid #ccc;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   z-index: 999;
 }
 
 .header {
   background-color: #007bff;
   color: #fff;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px;
   border-radius: 5px 5px 0 0; /* Borde redondeado solo en la parte superior */
 }
 
 .header h2 {
   margin: 0;
 }
 
 .main {
   padding: 10px;
 }
 
 input {
   width: 100%;
   padding: 5px;
   margin-bottom: 10px;
 }
 
 .footer {
   /* Estilos del footer, puedes personalizarlo según tus necesidades */
 }
 
 button.custom-close-button {
   background-color: #007bff;
   color: #fff;
   border: 1px solid #007bff;
   border-radius: 0 0 5px 0; /* Borde redondeado solo en el lado izquierdo (parte inferior del header) */
   padding: 5px 10px;
   cursor: pointer;
 }
 
 button.custom-close-button:hover {
   background-color: #0056b3;
 }
 </style>
 
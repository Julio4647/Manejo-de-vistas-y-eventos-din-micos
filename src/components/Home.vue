<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr;">
    <div style="display: flex;">
    <div style="width: 300px; height: 300px;  margin-right: 20px;" class="drop-zone" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
      <div v-for="item in listOne" :key="item.title" class="drag-el" draggable @dragstart="startDrag($event, item)">
        <form  @submit.prevent="guardarLibro">
          <label for="autor" >Autor</label>
          <b-form-input v-model="libro.autor" required></b-form-input>
          <label  for="anio">Año</label>
          <b-form-input  v-model="libro.anio" required></b-form-input>
          <label for="nombre">Nombre del Libro</label>
          <b-form-input v-model="libro.nombre" required></b-form-input>
          <label for="genero">Genero</label>
          <b-form-input v-model="libro.genero" required></b-form-input>
        </form>
      </div>
    </div>
    <div  style="width: 300px; height: 300px;" class="drop-zone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
      <div v-for="item in listTwo" :key="item.title" class="drag-el" draggable @dragstart="startDrag($event, item)">
        <form  @submit.prevent="guardarLibro">
          <label for="autor">Autor</label>
          <b-form-input v-model="libro.nombre" required></b-form-input>
          <label for="anio">Año</label>
          <b-form-input @input="restrictToNumbers"  v-model="libro.anio" required></b-form-input>
          <label for="nombre">Nombre del Libro</label>
          <b-form-input v-model="libro.nombre" required></b-form-input>
          <label for="genero">Genero</label>
          <b-form-input v-model="libro.genero" required></b-form-input>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      libro:{nombre:"", anio:null ,autor:"",genero:""}
      ,
      items: [
        {
          id: 0,
          title: "Nuevo Libro",
          list: 1,
        },
        
      ],
    };
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
      this.crearLibro()
    },
    crearLibro(){
      const url ="http://localhost:8080/api/libreria/libro/";
        const jsonData = {
          nombre: this.libro.nombre,
          autor:this.libro.autor,
          anio: this.libro.anio,
          genero: {id:this.libro.genero}
        } 
        const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
          body: JSON.stringify(jsonData)
        } 

        fetch(url, options)
        .then(response => {  
          if (response.ok) {
            return response.json(); // Devuelve los datos en formato JSON
            
          }
          throw new Error('Error en la solicitud POST');
        })
        .then(data => {
          console.log('Respuesta:', data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error:', error);

        });
    
    }
  },
  computed: {
    listOne() {
      return this.items.filter((item) => item.list === 1);
    },
    listTwo() {
      return this.items.filter((item) => item.list === 2);
    },
  },
};
</script>


<style>
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
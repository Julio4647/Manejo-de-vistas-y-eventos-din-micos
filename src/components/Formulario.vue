<template>
  <div>

    <b-container>
      <!-- <span class="search-clear" v-show="showElementX" @click="limpiarBusqueda">&#10005;</span> -->
        <input style="width:400px;" placeholder="Ingresa nombre de Libro a buscar" v-model="nombreLibro">
        <b-button style="margin:10px;" @click="buscadorNombre">Buscar</b-button>
        <!-- <span class="search-clear" v-show="showElementX" @click="limpiarBusqueda">&#10005;</span> -->
        <input style="width:400px;" placeholder="Ingresa nombre de Autor a buscar" v-model="nombreAutor">
        <b-button style="margin:10px;" @click="buscadorAutor">Buscar</b-button> <br>
        <b-form-select style="width: 200px;" :options="generos" :value-field="'id'" :text-field="'nombre'" v-model="idGnero"></b-form-select>
        <b-button style="margin:10px;" @click="buscadorGenero">Buscar</b-button>
        <input type="number" maxlength="4" style="width:150px;" placeholder="Fecha Inicip" v-model="fechaInicio">
        <input type="number" maxlength="4" style="width:150px;" placeholder="Fecha Final" v-model="fechafin">
        <b-button style="margin:10px;" @click="buscadorFecha">Buscar</b-button>
        <b-button style="margin:10px;" @click="buscadorFechaDesc">Buscar de Manera Descendiente</b-button>
    </b-container>  
    <br>
<!-- Sección del Formulario -->
<div style="width: 500px;">

</div>
<div v-show="showElement">
    <div  style="display: grid;  grid-template-columns: 1fr 1fr;">
    <div style="display: flex;">
    <div style="width: 300px; height: 300px; margin:20px;  " class="drop-zone" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
      <div v-for="item in listOne" :key="item.title" class="drag-el" draggable @dragstart="startDrag($event, item)">
        <form  @submit.prevent="guardarLibro">
          <label for="autor">{{item.title}}</label><br>
          <label for="autor" >Autor</label>
          <b-form-input v-model="libro.autor" required></b-form-input>
          <label  for="anio">Año</label>
          <b-form-input  v-model="libro.anio" required></b-form-input>
          <label for="nombre">Nombre del Libro</label>
          <b-form-input v-model="libro.nombre" required></b-form-input><br>
          <label for="genero">Genero</label>
          <b-form-select style="width: 200px;" :options="generos" :value-field="'id'" :text-field="'nombre'" v-model="libro.genero"></b-form-select>
        </form>
      </div>
    </div>
    <div  style="width: 300px; height: 300px; margin:20px;" class="drop-zone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
      <div v-for="item in listTwo" :key="item.title" class="drag-el" draggable @dragstart="startDrag($event, item)">
        <form  @submit.prevent="guardarLibro">
          <label for="autor">{{item.title}}</label><br>
          <label for="autor">Autor</label>
          <b-form-input v-model="libro.nombre" required></b-form-input>
          <label for="anio">Año</label>
          <b-form-input @input="restrictToNumbers"  v-model="libro.anio" required></b-form-input>
          <label for="nombre">Nombre del Libro</label>
          <b-form-input v-model="libro.nombre" required></b-form-input><br>
          <label for="genero">Genero</label>
          <b-form-select style="width: 200px;" :options="generos" :value-field="'id'" :text-field="'nombre'" v-model="libro.genero"></b-form-select>
        </form>
      </div>
    </div>
  </div>
  </div>
</div>
  <!-- Seccion de las card -->
  
    <b-row>
      <transition-group name="bounce" tag="div" class="d-flex flex-row flex-wrap">
      <b-col v-for="(libro, index) in libros" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
       
        <b-card :title="libro.nombre" :img-src="`https://picsum.photos/600/300/?image=${index}`" img-alt="Image" img-top
          tag="article" style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            {{ libro.nombre }}<br>
            Año: {{ libro.anio }}<br>
            Categoría: {{ libro.genero.nombre }}<br>
            Autor: {{ libro.autor }}
          </b-card-text>
          <b-button @click="editarLibro(index)" variant="primary">Editar</b-button>
          <b-button @click="eliminarLibro(index)" variant="danger">Eliminar</b-button>
        </b-card>
     
      </b-col>
    </transition-group>
    </b-row>



  </div>
</template>

<script>
export default {
  data() {
    return {
      showElement: true,
      showElementX: false,
      lastScrollPosition: 0,
      libro:{nombre:"", anio:null ,autor:"",genero:0}
      ,
      items: [
        {
          id: 0,
          title: "Nuevo Libro",
          list: 1,
        },
        
      ],
      nuevoLibro: { anio: 0, autor: '', nombre: '', genero: '' },
      libroEditandoIndex: null,
      libros: [],
      generos:[],

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
      this.createLibro()
    },
    buscadorNombre(){
      fetch(`http://localhost:8080/api/libreria/libro/name/${this.nombreLibro}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;
          this.showElement = false;
         e

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorAutor(){
      fetch(`http://localhost:8080/api/libreria/libro/autor/${this.nombreAutor}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;
          this.showElement = false;
        

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorGenero(){
      fetch(`http://localhost:8080/api/libreria/libro/genero/${this.idGnero}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;
          this.showElement = false;
         

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorFecha(){
      fetch(`http://localhost:8080/api/libreria/libro/anio/${this.fechaInicio}/${this.fechafin}`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;
          this.showElement = false;


        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    buscadorFechaDesc(){
      fetch(`http://localhost:8080/api/libreria/libro/anio/desc/`)
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;
          this.showElement = false;
          

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },

    mostrarModal() {
      this.$refs['modal-1'].show();
    },

    cerrarModal() {
      this.nuevoLibro = { anio: '', autor: '', nombre: '', genero: '' };
      this.libroEditandoIndex = null;
      this.$refs['modal-1'].hide();
    },

    getAllLibros() {
      fetch('http://localhost:8080/api/libreria/libro/')
        .then(response => response.json())
        .then(data => {
          this.libros = data.data;

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },
    getAllGeneros() {
      fetch('http://localhost:8080/api/libreria/genero/')
        .then(response => response.json())
        .then(data => {
          this.generos = data.data;
          console.log(data)

        })
        .catch(error => {
          console.error('Error al obtener libros:', error);
        });
    },

    createLibro() {
      console.log(this.libro)
      const url ="http://localhost:8080/api/libreria/libro/";
        const jsonData = {
          nombre: this.libro.nombre,
          autor: this.libro.autor,
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
          window.location.reload()
        })
        .catch(error => {
          console.error('Error:', error);

        });

    },

    updateLibro(libro) {
      fetch('http://localhost:8080/api-crudvueback/libro/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ libro }),
      })
        .then(response => response.json())
        .then(data => {
          this.libros[this.libroEditandoIndex] = data.data;
          this.cerrarModal();
        })
        .catch(error => {
          console.error('Error al actualizar libro:', error);
        });
    },

    deleteLibro(id) {
      fetch(`http://localhost:8080/api/libreria/libro/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          this.libros.splice(this.libroEditandoIndex, 1);
          this.cerrarModal();
        })
        .catch(error => {
          console.error('Error al eliminar libro:', error);
        });
    },

    guardarLibro() {
      if (this.libroEditandoIndex !== null) {
        this.updateLibro(this.nuevoLibro);
      } else {
        this.createLibro(this.nuevoLibro);
      }
    },

    agregarLibroModal() {
      this.createLibro(this.nuevoLibro);
    },
    editarLibro(index) {
      const libroSeleccionado = this.libros[index];

      if (libroSeleccionado) {
        this.nuevoLibro = {
          anio: libroSeleccionado.anio || '',
          autor: libroSeleccionado.autor || '',
          nombre: libroSeleccionado.nombre || '',
          genero: libroSeleccionado.genero || ''
        };
        this.libroEditandoIndex = index;
        this.mostrarModal();
      }
    },

    eliminarLibro(index) {
      const id = this.libros[index].id;
      this.deleteLibro(id);
    },
    limpiarBusqueda() {
      window.location.reload()
      this.showElementX = false
    },
    onScroll() {

      // Obtiene la posición actual del scroll
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        console.log(currentScrollPosition);

      // La función abs para tener valores absolutos y se delimita con un offset o bien llamado 
      // margen para que el valor de la posición sea después de desplazarce y no desde que uno se desplaza
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      // aqui determinamos si la posición es mayor a la posición anterior. Entonces, si lo es, mostramos el elemento.
      this.showElement = currentScrollPosition < this.lastScrollPosition;
      //  
      this.lastScrollPosition = currentScrollPosition;
},
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.getAllLibros();
    this.getAllGeneros();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
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

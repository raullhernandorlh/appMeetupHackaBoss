<template>
  <div class="search">
    <vue-headful title=" Search Meetup" />
    <div class="searchform">
      <!-- Input para la fecha . Se selecciona del calendario -->
      <input type="date" v-model="date"  class="date"/>
      <!-- Input para buscar por fecha -->
      <!-- Input para la localizacion . Se mete a mano . Ejemplo Bilbao -->
      <input type="text" placeholder="Seach By Location" v-model="location" class="text" />
      <!-- Se hace un  select para buscar por una de las categorias pre guardadas -->
       <div class="div-select">
        <select type="select" v-model="category" name="category"  class="select">
          <option  selected value="">Choose a Category ⇩ </option>
          <option value="natureandadventure">Nature And Adventure</option>
          <option value="sociallife">Social Life</option>
          <option value="languages">Languages</option>
          <option value="beliefs">Beliefs</option>
          <option value="sportsandphysicalcondition">Sports and Physical Condition</option>
          <option value="careersandbusiness">Careers and Business</option>
          <option value="travels">Travels</option>
        </select>
       </div>
      <!-- Se hace un select para filtrar por año -->
      <div class="div-select">
        <select type="select" v-model="dateyear" name="dateyear"  class="select">
          <option selected value="">Choose a Year ⇩ </option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

       <!-- Select para filtrar por rangos de fecha : FRee, Cheap, Intermediate, Expensive -->
      <div class="div-select"> 
        <select  type="select" v-model="price" name="price"  class="select">
            <option selected value="">Choose a Price ⇩</option>
            <option value="free">FREE</option>
            <option value="cheap">CHEAP</option>
            <option value="intermediate">INTERMEDIATE</option>
            <option value="expensive">EXPENSIVE</option>
          </select> 
        </div>
      <!-- Se hace un select para filtrar por franja horaria "Mañana" o "Tarde" -->
        <div :style="{ backgroundImage: `url(' + require(@/utilities/images/down-arrow.svg) + ')` }" class="div-select"> 
        <select  type="select" v-model="timezone" name="timezone"  class="select">
          <option selected value="">Choose a Time Zone ⇩ </option>
          <option value="morning">MORNING</option>
          <option value="afternoon">AFTERNOON</option>
        </select>
      </div>
       <button title ="Search Your Meetup" @click="enviarInformacion()"><fa-icon :icon="['fas','search-plus']" size="2x" /></button>
    </div> 

    <!-- ESTA ES LA INFORMACION QUE QUIERO MOSTRAR CON LA PAGINACION -->

    <div class="meetup-information"> 
     <ul class="meetups-list">
      <li v-for="(meetup,index) in showedMeetups" :key="meetup.id">
        <div class="meetups-data">
          <p class="meetup-search-text">{{ meetup.title }}</p>
          <p class="meetup-search-image"><img :src="meetup.meetup_principal_image"></p>
         
           <p class="meetup-search-text"><span> Date </span>{{meetup.date | mydate }}</p>
          <p class="meetup-search-text"><span> Hour </span>{{ meetup.time}}</p>
          <p class="meetup-search-text"><span> Location </span>{{ meetup.location}}</p>
          <div class="button-submit">
            <button title = "Meetup Detail" @click="sendDataMeetup(index)"><fa-icon :icon="['fas','info-circle']" size="2x"/></button>
          </div>
        </div>
      </li>
    </ul>
  </div>


  <!-- Pagination -->
     <nav aria-label="Page navigation example">
            <ul class="pagination-menu">
                <li class="page-item"  :class="{'disabled': searchmeetups.length === 0}">
                    <button class="page-link" @click="previousPage"><fa-icon :icon="['fas','arrow-left']" size="2x"/></button>
                </li>

                <li v-for="page in pages" :key="page" class="page-item" :class="{'active': currentPage === page}">
                    <button class="page-link" @click="goToPage(page)">{{ page + 1 }}</button>
                </li>

                <li class="page-item" :class="{'disabled': searchmeetups.length === pages.length - 1}">
                    <button class="page-link" @click="nextPage"><fa-icon :icon="['fas','arrow-right']" size="2x"/></button>
                </li>
            </ul>
        </nav>

  </div>
</template>

<script>

export default {
  name: "Search",
  props: {
    searchmeetups: Array,
  },
  data() {
    return {
      info : {
        date: '',
        category: '',
        location:'',
        price:'',
        dateyear:'',
        timezone:'',
      },
      date: "",
      time:"",
      category: "",
      location: "",
      price:"",
      dateyear:"",
      timezone:"",
      // Data for pagination
      currentIndex:0,
      elementsPerPage:5,
      currentPage:0,
      // Default ordering(Javascript Sort function)
      sortName:0
    };
  },

   computed: {
        showedMeetups() {
            let slice = this.searchmeetups;
            if(this.sortName !== 0) {
                if (this.sortName > 0) {
                    slice = orderBy(slice, ['username'], ['asc']);
                } else {
                    slice = orderBy(slice, ['username'], ['desc']);
                }
            }

            return slice.slice(this.currentIndex, this.currentIndex + this.elementsPerPage);
        },
        pages() {
            let numberOfPages = Math.ceil(this.searchmeetups.length / this.elementsPerPage);
            let pageArray = [];
            for (let i = 0; i < numberOfPages; i++) {
                pageArray.push(i);
            }
            return pageArray;
        },

      
},

  methods:{
    enviarInformacion(){
      this.info.date = this.date;
      this.info.location = this.location;
      this.info.category = this.category;
      this.info.price = this.price;
      this.info.dateyear = this.dateyear
      this.info.timezone = this.timezone
      this.$emit ('parametros',this.info)
    },

     sendDataMeetup(index){
      let dataMeetup = this.searchmeetups[index]
      this.$emit('data',dataMeetup)
    },

    previousPage() {
            this.currentPage = this.currentPage - 1;
            this.currentIndex = this.currentIndex - this.elementsPerPage;
        },
      nextPage() {
            this.currentPage = this.currentPage + 1;
            this.currentIndex = this.currentIndex + this.elementsPerPage;
        },

        goToPage(page) {
            this.currentPage = page;
            this.currentIndex = page * this.elementsPerPage;
        },

        changeSort() {
            switch (this.sortName) {
                case 0:
                    this.sortName = 1;
                    break;
                case 1:
                    this.sortName = -1;
                    break;
                case -1:
                    this.sortName = 0;
                    break;
            }
        }

  }


 
};
</script>

<style scoped>

.meetup-information{
  margin-bottom:10rem;
}

button {
  border-radius:20px; 
  width:10rem;
  height:2.5rem;
  color:#fff;
  text-decoration: none;
  border:3px solid #fff;
  background-color: #00a896;
}

button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  cursor:pointer;
  color:#00a896
}

button:hover a{
  color: #00a896;
}

.searchform{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  align-items: center;
  margin:3rem;
}

.div.search{
  display:flex;
  flex-direction: column;
  align-items: baseline;
}
div.meetups-data{
  margin-left:2rem;
  align-items: center;
  background-color: #fff;
  border-radius:2rem;
  border:3px solid #00a896;
  width:80%;
}

li{
  width:50%;
}

.button-submit{
  margin:1rem;
}
img{
  width:8rem;
  height:8rem;
}

span{
  margin-right:1rem;
}
.text{
  margin-bottom: 0.5rem;
  width:70%;

}


.select{
  margin-bottom: 2rem;
  width:70%;
  appearance:none;
  background:transparent;
  outline:none;
  border:none;
}

.div-select{
  width:40%;
  height: 1.5rem;
  color:#00a896;
  border-radius:8rem;
  border:3px solid #00a896;
  background-color: #ffff;
}

li{
  list-style: none;
  margin-bottom:2rem;
}

/* Meetups List */

ul.meetups-list{
  display:flex;
  width:100%;
}

/* Calendar class */

input.date{
  width:40%;
  color:green;
  border:3px solid #00a896;
  height:1.5rem;
  margin-bottom:1rem;
  border-radius:4rem;
}

/* Input to search */

.text{
  width:40%;
  height:1.5rem;
  color:green;
  border-radius:5rem;
  border:3px solid  #00a896;
  text-align: center;
  margin:2rem;
  outline:none;
 
}

ul.pagination-menu{
  display:flex;
  margin-bottom:5rem;
  justify-content: flex-end;
}

button.page-link{
  margin-right:1rem;
  width: 3rem;
}

.disabled{
  visibility:hidden;
}


@media only screen and (min-width: 300px) { 

  ul.meetups-list{
    margin-top:2rem;
    width:auto;
    margin-left:-9%
  }
}

/* Media Queries for Filter */
@media only screen and (max-width: 600px) { 


  ul.meetups-list{
    display:flex;
    flex-direction:column;

  }

  input.date{
    width:25rem;
    align-items:center;
  }

  .text{
    margin:0.5rem
  }

  input.text{
    width:20rem;
    height:1.5rem;
    color:green;
    border-radius:5rem;
    border:3px solid #00a886;
    text-align:center;
    outline:none
  }

  .div-select{

    width:20rem;
    margin-bottom:2rem;
    height:1.5rem;
    border-radius:8rem;
    border: 3px solid #00A896;
    background-color:#fff;
  }

}

@media only screen and (max-width: 524px) { 

inpu.date{
  width:40rem
}

input.text{
  width:25rem
}

.div-select{
  width:35rem
}

}


@media only screen and (min-width: 670px) { 

inpu.date{
  width:35rem
}

input.text{
  width:25rem
}

.div-select{
  width:35rem
}

}


@media only screen and (min-width: 1000px) { 

  .div-select{
    width:20rem;
    text-align:end;
  }

  .searchform{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-evenly;
    margin:3rem;
    align-items:baseline;
  }

  input.date{
    margin-left:1.6rem;
    width:20rem;
  }

  input.text{
    width:20rem;
  }


  div.meetups-data{
    margin-left: 2rem;
    align-items:center;
    background-color:#fff;
    border-radius:2rem;
    border:3px solid #00a896;
    display:flex;
    flex-direction:column;
    width:30rem;
    flex-wrap:wrap;
  }

  ul.meetups-list{
    display:flex;
    margin-left:auto;
    margin-right:auto;
    flex-wrap:wrap;
    justify-content:space-around;
  }


  img{
    width:18rem;
    height:18rem;
    border: 3px outset green;
    border-radius:2rem;

  }


  li{
    width: auto;
  }


}

</style>
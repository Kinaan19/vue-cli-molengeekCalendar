<template>
  <div id="filters">
    <nav>
      <ul class="px-5 m-0 d-flex justify-content-between">
       <li><router-link to="/"><button class="btn bg-transparent">Deadpool</button></router-link></li>
       <li><button class="btn">GTO</button></li>
       <li><button class="btn">Joker</button></li>
       <li><button class="btn">Star Wars</button></li>
       <li><button class="btn">Meeting #1</button></li>
       <li><button class="btn">Meeting #2</button></li>
       <li><button class="btn">Brain Storming</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
// import AddToCalendar from 'vue-add-to-calendar'

export default {
 
}

</script>

<style scoped>

#filters {
  background-color: #fff;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}
li {
  list-style: none;
  padding: 30px 0;
}
.btn {
  color: #777;
  transition: 0.5s;
  background-color: transparent;
}
.btn:focus {
  /* -webkit-box-shadow: -11px 11px 92px 0px rgba(0,0,0,0.43);
  -moz-box-shadow: -11px 11px 92px 0px rgba(0,0,0,0.43); */
  box-shadow: -10px 10px 5px 0px #ccc;
  border: 1px solid #ccc;
}

</style>

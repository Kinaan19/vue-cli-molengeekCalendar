<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';


@font-face {
  font-family: 'wildwest';
  src: url('../public/fonts/Wildwest.ttf');
}

@font-face {
  font-family: 'milestone';
  src: url('../public/fonts/MilestoneFreeVersion-Script.otf');
}

@font-face {
  font-family: 'sunset';
  src: url('../public/fonts/SunsetBoulevard.otf');
}

#app {
  font-family: 'courrier', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  background-color: #eee;
}

</style>

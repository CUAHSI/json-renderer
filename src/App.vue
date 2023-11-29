<template>
  <v-app app>

    <v-main app>
      <v-container id="main-container">
        <v-sheet
          min-height="70vh"
          rounded
          :elevation="$route.meta.hideNavigation || $route.meta.flat ? 0 : 2"
        >
          <router-view name="content" :key="$route.fullPath" />
        </v-sheet>
      </v-container>
    </v-main>

    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { APP_NAME } from "./constants";
import User from "@/models/user.model";

@Component({
  name: "app"
})
export default class App extends Vue {
  async created() {
    document.title = APP_NAME;
    User.fetchSchemas();
  }

}
</script>

<style lang="scss" scoped>
.logo {
  height: 100%;
  cursor: pointer;

  img {
    height: 100%;
  }
}

#footer {
  width: 100%;
  margin: 0;
  min-height: unset;
  margin-top: 4rem;
  box-shadow: none;
}

.v-toolbar.v-app-bar--is-scrolled > .v-toolbar__content > .container {
  align-items: center !important;
  will-change: padding;
  padding-top: 0;
  padding-bottom: 0;
}

.nav-items {
  border-radius: 2rem !important;
  overflow: hidden;

  & > a.v-btn:first-child {
    border-top-left-radius: 2rem !important;
    border-bottom-left-radius: 2rem !important;
  }

  & > a.v-btn:last-child {
    border-top-right-radius: 2rem !important;
    border-bottom-right-radius: 2rem !important;
  }

  .v-btn {
    margin: 0;
    border-radius: 0;
    height: 39px !important;
  }
}

// .nav-items .v-btn.is-active,
// .mobile-nav-items .v-list-item.is-active {
//   background-color: #1976d2 !important;
//   color: #FFF;
// }
</style>

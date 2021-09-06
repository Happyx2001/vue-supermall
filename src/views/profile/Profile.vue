<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <!-- 运用NavBar组件的插槽 -->
      <div slot="center">购物街</div>
    </nav-bar>
    <login></login>
    <money></money>
    <profile-list></profile-list>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
// import Scroll from "@/components/common/scroll/Scroll";
import Login from "./childComps/Login.vue";
import Money from "./childComps/money.vue";
import ProfileList from "./childComps/profileList.vue";

export default {
  name: "Profile",
  components: {
    NavBar,
    Login,
    Money,
    ProfileList,
    // Scroll,
  },
};
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  z-index: 999;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  box-shadow: none;
}
</style>
<template>
  <div class="colorPicker w-100 m-0 p-0 my-3">
    <div class="container d-flex align-items-start m-0 p-0">
      <div v-for="i in 6" :key="i" class="color-group d-flex m-0 p-0 me-2">
        <ul v-for="i in 6" :key="i" class="d-flex flex-column m-0 p-0 me-1">
          <li
            v-for="i in 3"
            :key="i"
            class="color col-2 border"
            :style="{ backgroundColor: '#ffffaa', color: 'red' }"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorPicker",
};
</script>

<style scoped>
.colorPicker {
  overflow-x: scroll;
}
.colorPicker > .container {
  /* overflow-x: scroll; */
  flex-wrap: nowrap;
}
.color {
  display: block;
}
li {
  width: 50px;
  height: 50px;
}
</style>

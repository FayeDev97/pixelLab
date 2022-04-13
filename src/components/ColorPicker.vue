<template>
  <div class="color-picker m-0 p-0" @click="$emit('setColor')">
    <div class="d-flex m-0 p-0">
      <div class="border-dark">
        <ul v-for="i in 4" :key="i" class="d-flex m-0 p-0 px-2 border bg-light">
          <li
            v-for="ii in 4"
            :key="ii"
            class="color border"
            :style="{ backgroundColor: primaries[i - 1][ii - 1] }"
          ></li>
        </ul>
      </div>
      <div v-for="hue in 90" :key="hue" class="color-group d-flex m-0 p-0">
        <ul
          v-for="saturation in [70, 75, 80]"
          :key="saturation"
          class="d-flex flex-column m-0 p-0"
        >
          <li
            v-for="lightness in 4"
            :key="lightness"
            class="color border"
            :style="{
              backgroundColor:
                'hsl(' +
                hue * 4 +
                ',' +
                saturation +
                '%,' +
                lightness * 15 +
                '%)',
            }"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorPicker",
  data: function () {
    return {
      primaries: [
        ["#fff", "#ccc", "#888", "#000"],
        ["#f00", "#800", "#ff0", "#880"],
        ["#0f0", "#080", "#0ff", "#088"],
        ["#008", "#f0f", "#808", "crimson"], //bwaaaahahahaa !!!
      ],
    };
  },
};
</script>

<style scoped>
/* .color-picker {
  border-top: 10px solid #ffffff;
} */
.color-picker > .d-flex {
  overflow-x: scroll;
  max-width: calc(100vw - 60px);
}
.color {
  display: block;
}
li {
  width: 30px;
  height: 30px;
}
.color:hover {
  cursor: crosshair;
  transform: scale(1.3);
  border-radius: 25%;
}
</style>

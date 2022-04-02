<template>
  <div class="editor">
    <canvas
      id="editor"
      :width="editorWidth"
      :height="editorHeight"
      @mousedown="startDrawMode"
      @mouseup="endDrawMode"
      @mousemove="constinuousDraw"
      @click.left="drawPixel"
    ></canvas>
  </div>
  <color-picker />
</template>

<script>
// @ is an alias to /src
import ColorPicker from "../components/ColorPicker.vue";

export default {
  name: "EditorView",
  components: { ColorPicker },
  data: function () {
    return {
      editorWidth: 600,
      editorHeight: 600,
      blockSize: 50,
      ctx: null,
      isDrawing: false,
    };
  },
  computed: {
    editorPos: function () {
      let editor = document.getElementById("editor");
      return {
        x: editor.offsetLeft,
        y: editor.offsetTop,
      };
    },
  },
  mounted: function () {
    var canvas = document.getElementById("editor");
    this.ctx = canvas.getContext("2d");

    this.showGrid();
  },
  methods: {
    showGrid() {
      console.log("showing grid.....");
      this.ctx.strokeStyle = "rbg(0,0,0)";
      this.ctx.beginPath();
      for (let i = this.blockSize; i < this.editorWidth; i += this.blockSize) {
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, this.editorHeight);
        this.ctx.moveTo(0, i);
        this.ctx.lineTo(this.editorWidth, i);
      }
      this.ctx.stroke();
      return;
    },
    getCoords() {
      var clickX = event.clientX - this.editorPos.x;
      var clickY = event.clientY - this.editorPos.y;

      var startX = clickX - (clickX % this.blockSize);
      var startY = clickY - (clickY % this.blockSize);
      return { x: startX, y: startY };
    },
    constinuousDraw() {
      if (!this.isDrawing) {
        return;
      }
      var coords = this.getCoords();
      this.ctx.fillStyle = "rgb(12,24,88)";
      this.ctx.fillRect(coords.x, coords.y, this.blockSize, this.blockSize);
    },

    drawPixel() {
      var coords = this.getCoords();
      this.ctx.fillStyle = "rgb(12,24,88)";
      this.ctx.fillRect(coords.x, coords.y, this.blockSize, this.blockSize);
      this.endDrawMode();
    },
    startDrawMode() {
      this.isDrawing = true;
    },
    endDrawMode() {
      this.isDrawing = false;
    },
  },
};
</script>
<style scoped>
/* #editor {
  border: 5px solid black;
} */
.editor {
  display: inline-block;
  border: 2px solid black;
}
</style>

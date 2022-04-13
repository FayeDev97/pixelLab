<template>
  <div class="editor-view vh-100 vw-100 m-0 p-0 d-flex bg-white">
    <side-bar
      id="sidebar"
      class="h-100"
      @set-tool="changeTool"
      :toggles="{ showGrid: showGrid }"
    />
    <div class="editor-container m-0 p-0 w-100">
      <div class="editor-area">
        <canvas
          id="editor"
          :width="editorWidth"
          :height="editorHeight"
          @mousedown="startDrawing"
          @mouseup="endDrawing"
          @mousemove="drawPixel"
          @click.left="
            startDrawing();
            drawPixel();
            endDrawing();
          "
          @mouseleave="endDrawing"
          class="border"
        ></canvas>
      </div>
      <color-picker @set-color="setColor" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ColorPicker from "../components/ColorPicker.vue";
import SideBar from "../components/SideBar.vue";

export default {
  name: "EditorView",
  components: { ColorPicker, SideBar },
  data: function () {
    return {
      editorWidth: 600,
      editorHeight: 600,
      blockSize: 30,
      ctx: null,
      isDrawing: false,
      currentColor: "rgb(0, 0, 0)",
      lastColor: "rgb(0, 0, 0)",
      showGrid: true,
      currentTool: "pencil",
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

    if (this.showGrid) {
      this.drawGrid();
    }
  },
  methods: {
    drawGrid() {
      this.ctx.strokeStyle = "lightgray";
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
    drawPixel() {
      if (!this.isDrawing) {
        return;
      }
      this.drawRoutine(this.getCoords());
    },
    startDrawing() {
      this.isDrawing = true;
    },
    endDrawing() {
      this.isDrawing = false;
      if (this.showGrid) {
        this.drawGrid();
      }
    },
    drawRoutine(coords) {
      this.ctx.fillStyle = this.currentColor;
      this.ctx.fillRect(coords.x, coords.y, this.blockSize, this.blockSize);
    },
    setColor(color) {
      this.lastColor = this.currentColor;
      if (color) {
        this.currentColor = color;
      } else if (event.target.tagName == "LI") {
        this.currentColor = "" + event.target.style.backgroundColor;
      }
    },
    changeTool() {
      const tool = event.target.className.baseVal;
      if (!tool) {
        return;
      }
      switch (tool) {
        case "eraser":
          this.setEraser();
          break;
        case "pencil":
          this.setPencil();
          break;
        case "trash":
          this.clearEditor();
          break;
      }
    },
    clearEditor() {
      this.ctx.clearRect(0, 0, this.editorWidth, this.editorHeight);
      if (this.showGrid) {
        this.drawGrid();
      }
    },
    setEraser() {
      if (this.currentTool == "eraser") {
        return;
      }
      this.currentTool = "eraser";
      this.setColor("white");
    },
    setPencil() {
      if (this.currentTool == "pencil") {
        return;
      }
      this.currentTool = "pencil";
      this.setColor(this.lastColor);
    },
  },
};
</script>
<style scoped>
/* #editor {
  border: 5px solid black;
} */
/* .editor-area {
} */
.editor-container {
  display: inline-grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: auto 150px;
}
/* .editor-container {
} */
</style>

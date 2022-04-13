<template>
  <div class="side-bar m-0 p-0 h-100">
    <span class="bg-white icon"><ph-arrow-left size="26" /></span>
    <div class="tools" @click="$emit('setTool')">
      <span class="bg-white icon"
        ><ph-pencil-simple-line size="26" class="pencil"
      /></span>
      <span class="bg-white icon"><ph-eraser size="26" class="eraser" /></span>
      <span class="bg-white icon"
        ><ph-trash size="26" class="trash" color="red"
      /></span>
    </div>
  </div>
</template>

<script>
export default { name: "SideBar" };
</script>

<style>
.side-bar {
  display: inline-grid;
  grid-template-columns: 60px;
  grid-template-rows: 60px auto;
  background-color: #ececec;
}
.tools {
  background-color: #6f6f6f;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 3px;
}
.tools .icon {
  margin-bottom: 5px;
  margin-top: 5px;
}
.icon:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>

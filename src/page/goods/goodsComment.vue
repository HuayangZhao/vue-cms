<template>
  <div class="goodsComment">
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
import comment from "../../components/comment.vue"

export default {
  components: {
    cmtbox:comment
  }
};
</script>

<style lang="less" scoped>
.goodsComment {
  padding: 10px;
}
</style>

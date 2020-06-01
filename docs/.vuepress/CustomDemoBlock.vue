<template>
  <div>
    <a-card>
      <slot name="description"></slot>
    </a-card>
    <a-card>
      <slot name="demo"></slot>
    </a-card>
    <a-card>
      <slot name="source"></slot>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>

</style>

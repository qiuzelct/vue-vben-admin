<template>
  <span :class="getClass">
    <RightOutlined />
  </span>
</template>
<script lang="ts">
  import type { PropType } from 'vue';

  import { defineComponent, computed } from 'vue';

  import { RightOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'BaseArrow',
    components: { RightOutlined },
    props: {
      // Expand contract, expand by default
      expand: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
    },
    setup(props) {
      const getClass = computed(() => {
        const preCls = 'base-arrow';
        const cls = [preCls];

        props.expand && cls.push(`${preCls}__active`);
        return cls;
      });

      return {
        getClass,
      };
    },
  });
</script>
<style lang="less" scoped>
  .base-arrow {
    transform: rotate(-90deg) !important;
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &.right {
      transform: rotate(0deg);
    }

    &__active {
      transform: rotate(90deg) !important;
      transition: all 0.3s ease 0.1s !important;
    }
  }
</style>

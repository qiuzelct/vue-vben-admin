<template>
  <Button v-bind="getBindValue" :class="[getColor, $attrs.class]">
    <template v-slot:[item] v-for="item in Object.keys($slots)">
      <slot :name="item" />
    </template>
  </Button>
</template>
<script lang="ts">
  import { PropType } from 'vue';

  import { defineComponent, computed, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  // import { extendSlots } from '/@/utils/helper/tsxHelper';
  import { useThrottle } from '/@/hooks/core/useThrottle';
  import { isFunction } from '/@/utils/is';
  export default defineComponent({
    name: 'AButton',
    inheritAttrs: false,
    components: { Button },
    props: {
      // 按钮类型
      type: {
        type: String as PropType<'primary' | 'default' | 'danger' | 'dashed' | 'link'>,
        default: 'default',
      },
      // 节流防抖类型 throttle debounce
      throttle: {
        type: String as PropType<'throttle' | 'debounce'>,
        default: 'throttle',
      },
      color: {
        type: String as PropType<'error' | 'warning' | 'success'>,
      },
      // 防抖节流时间
      throttleTime: {
        type: Number as PropType<number>,
        default: 0,
      },
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    setup(props, { attrs }) {
      const getListeners = computed(() => {
        const { throttle, throttleTime = 0 } = props;
        // 是否开启节流防抖
        const throttleType = throttle!.toLowerCase();
        const isDebounce = throttleType === 'debounce';
        const openThrottle = ['throttle', 'debounce'].includes(throttleType) && throttleTime > 0;

        const on: {
          onClick?: Fn;
        } = {};

        if (attrs.onClick && isFunction(attrs.onClick) && openThrottle) {
          const [handler] = useThrottle(attrs.onClick as any, throttleTime!, {
            debounce: isDebounce,
            immediate: true,
          });
          on.onClick = handler;
        }

        return {
          ...attrs,
          ...on,
        };
      });

      const getColor = computed(() => {
        const res: string[] = [];
        const { color, disabled } = props;
        color && res.push(`ant-btn-${color}`);
        disabled && res.push('is-disabled');
        return res;
      });

      const getBindValue = computed((): any => {
        return { ...unref(getListeners), ...props };
      });
      return { getBindValue, getColor };
    },
  });
</script>

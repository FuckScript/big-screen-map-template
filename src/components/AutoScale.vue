<template>
  <div id="auto-scale">
    <template v-if="ready">
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Object
  }
})

// 屏幕宽度
const width = ref(0)
// 屏幕高度
const height = ref(0)
// 原始屏幕宽度
const originalWidth = ref(0)
// 原始屏幕高度
const originalHeight = ref(0)
// 控制显示
const ready = ref(false)
/*
 * dom:well-container的dom
 * observer: window.MutationObserver(Bom实例)监听dom改变
 */
// interface ApiDataTypes {
//   clientWidth: number
//   clientHeight: number
// }

let dom: HTMLElement | any, observer: MutationObserver | null

//设置初始值
const initSize = () => {
  return new Promise<void>((resolve) => {
    nextTick(() => {
      dom = document.getElementById('auto-scale')
      // 获取大屏的传入尺寸
      if (props.options && props.options.width && props.options.height) {
        //传入宽高
        width.value = props.options.width
        height.value = props.options.height
      } else {
        //可见宽高
        width.value = dom.clientWidth
        height.value = dom.clientHeight
      }
      // 获取画布尺寸
      if (!originalWidth.value || !originalHeight.value) {
        //屏幕分辨率宽高
        originalWidth.value = window.screen.width
        originalHeight.value = window.screen.height
        // originalWidth.value = 1920
        // originalHeight.value = 90
      }
      resolve()
    })
  })
}

const updateSize = () => {
  if (width.value && height.value) {
    dom.style.width = `${width.value}px`
    dom.style.height = `${height.value}px`
  } else {
    dom.style.width = `${originalWidth.value}px`
    dom.style.height = `${originalHeight.value}px`
  }
}

const updateScale = () => {
  // 获取真实的视口尺寸
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  // 获取大屏最终的宽高
  const realWidth = width.value || originalWidth.value
  const realHeight = height.value || originalHeight.value
  console.log(currentWidth, currentHeight)
  // 缩放比例  = 分辨率宽高 / 传入宽高(可视宽高)
  const widthScale = currentWidth / realWidth
  const heightScale = currentHeight / realHeight
  //如果dom存在,就按照比例缩放

  // if (dom && dom.firstElementChild && dom.firstElementChild.style) {
  //   console.dir(dom.firstElementChild.clientWidth)
  //   console.dir(dom.firstElementChild.clientHeight)
  //   dom.firstElementChild.style.transform = `scale(${widthScale}, ${heightScale})`
  // }
  dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`)
}

//重置缩放比例
const onResize = async () => {
  await initSize()
  updateScale()
}

const initMutationObserver = () => {
  //监听元素属性变化
  const MutationObserver = window.MutationObserver
  //如果变化,就用onResize重置屏幕所缩放比例
  observer = new MutationObserver(onResize)
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })
}
//移除监听属性
const removeMutationObserver = () => {
  if (observer) {
    observer.disconnect()
    observer.takeRecords()
    observer = null
  }
}
//
onMounted(async () => {
  ready.value = false

  await initSize()
  updateSize()
  updateScale()
  // window.addEventListener('resize', debounce(100, onResize))
  initMutationObserver()
  ready.value = true
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  removeMutationObserver()
})
</script>

<style>
#auto-scale {
  position: absolute;
  /* top: 0; */
  /* left: 0; */
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>

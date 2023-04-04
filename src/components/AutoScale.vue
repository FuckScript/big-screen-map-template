<template>
  <div ref="autoScale" id="auto-scale">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Object
  }
})

const width = ref(0)
const height = ref(0)
const autoScale = ref(null)

let dom: HTMLElement | any, observer: MutationObserver | null

//设置初始值
const initSize = () => {
  return new Promise<void>((resolve) => {
    nextTick(() => {
      dom = autoScale.value
      if (props.options) {
        width.value = props.options.width
        height.value = props.options.height

        dom.style.top = (parseInt(props.options.top) * 100) / 1080 + '%'
        if (props.options.left) {
          dom.style.left = props.options.left + 'px'
          dom.style.transformOrigin = 'left top'
        }
        if (props.options.right) {
          dom.style.right = props.options.right + 'px'
          dom.style.transformOrigin = 'right top'
        }
      }
      resolve()
    })
  })
}

const updateSize = () => {
  dom.style.width = `${width.value}px`
  dom.style.height = `${height.value}px`
}

const updateScale = () => {
  // 获取真实的视口尺寸
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  // 获取大屏最终的宽高
  const realWidth = 1920
  const realHeight = 1080
  // console.log(realWidth, realHeight)
  // console.log(currentWidth, currentHeight)
  // 缩放比例  = 分辨率宽高 / 传入宽高(可视宽高)
  const widthScale = currentWidth / realWidth
  const heightScale = currentHeight / realHeight
  //如果dom存在,就按照比例缩放
  dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`)
}

//重置缩放比例
const onResize = async () => {
  await initSize()
  updateScale()
}

// const initMutationObserver = () => {
//   //监听元素属性变化
//   const MutationObserver = window.MutationObserver
//   //如果变化,就用onResize重置屏幕所缩放比例
//   observer = new MutationObserver(onResize)
//   observer.observe(dom, {
//     attributes: true,
//     attributeFilter: ['style'],
//     attributeOldValue: true
//   })
// }
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
  await initSize()
  updateSize()
  updateScale()
  window.addEventListener('resize', onResize)
  // initMutationObserver()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  removeMutationObserver()
})
</script>

<style>
#auto-scale {
  position: absolute;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
  background-color: #ccc6;
  /* border: 1px solid red; */
}
</style>

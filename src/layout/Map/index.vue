<template>
  <div class="map">
    <MapboxMap
      style="height: 100%"
      v-bind="options"
      @mb-created="(mapInstance: any) => (map = mapInstance)"
    >
      <!-- map-style="mapbox://styles/mapbox/streets-v11" -->
      <MapboxMarker
        draggable
        popup
        @mb-drag="mbDrag"
        :lng-lat="[114.07798699999998, 22.52946899999999]"
      >
        <template #popup>
          <p>Hello world!</p>
        </template>
      </MapboxMarker>
    </MapboxMap>
  </div>
</template>

<script setup lang="ts">
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { shenzhen } from './shenzhen'
import options from './options'
import { baseLayers } from './baseLayers'
import { getCountBjDataByArea } from '@/api/modules/mapBase'

const map = ref()
// const mapPath = ref(['shenzhen'])

let hoveredStateId: null

const mbDrag = (e: any) => {
  console.log('🚀 ~ file: Map.vue:69 ~ mbDrag ~ e:', e)
}

const addSource = () => {
  // map.value.addSource('shenzhen', { type: 'geojson', data: null })
  // map.value.addSource('circle', { type: 'geojson', data: null })
  // map.value.addSource('circlePoints', { type: 'geojson', data: null })
  // map.value.addSource('circleRadius', { type: 'geojson', data: null })
  map.value.addSource('map-source', { type: 'geojson', data: shenzhen })
}
const addLayers = () => {
  baseLayers.forEach((layer) => {
    map.value.addLayer(layer)
  })
}

// 地图填充颜色
const mapColorFill = (mapData: { type?: string; features: any }) => {
  const datas = mapData.features
    .map((item: { properties: { nums: string } }) => Number.parseInt(item.properties.nums) ?? 0)
    .sort((a: number, b: number) => a - b)
  const [v0 = 0, v1 = 0, v2 = 0, v3 = 0, v4 = 0, v5 = 0, v6 = 0, v7 = 0, v8 = 0] =
    [10, 20, 100, 30, 200, 50, 60, 70, 90] || datas
  // console.log(v0, v1, v2, v3, v4, v5, v6, v7, v8)
  const filters = {
    nums1: ['<=', ['get', 'nums'], v0],
    nums2: ['all', ['>', ['get', 'nums'], v0], ['<=', ['get', 'nums'], v1]],
    nums3: ['all', ['>', ['get', 'nums'], v1], ['<=', ['get', 'nums'], v2]],
    nums4: ['all', ['>', ['get', 'nums'], v2], ['<=', ['get', 'nums'], v3]],
    nums5: ['all', ['>', ['get', 'nums'], v3], ['<=', ['get', 'nums'], v4]],
    nums6: ['all', ['>', ['get', 'nums'], v4], ['<=', ['get', 'nums'], v5]],
    nums7: ['all', ['>', ['get', 'nums'], v5], ['<=', ['get', 'nums'], v6]],
    nums8: ['all', ['>', ['get', 'nums'], v6], ['<=', ['get', 'nums'], v7]],
    nums9: ['>=', ['get', 'nums'], v8]
  }
  map.value.setPaintProperty('map-area-fill-extrusion', 'fill-extrusion-color', [
    'case',
    filters.nums1,
    '#42bfe6',
    filters.nums2,
    '#298ecf',
    filters.nums3,
    '#2f77bc',
    filters.nums4,
    '#1c54a4',
    filters.nums5,
    '#1458ba',
    filters.nums6,
    '#123893',
    filters.nums7,
    '#0e3b6e',
    filters.nums8,
    '#183064',
    filters.nums9,
    '#112e6d',
    '#23e6f2'
  ])
}

const addEventListeners = () => {
  //鼠标悬停事件
  map.value.on('mousemove', 'map-area-base', (e: { features: string | any[] }) => {
    if (hoveredStateId === e.features[0].properties.adcode) {
      return
    }
    // 设定鼠标移入的样式
    map.value.getCanvas().style.cursor = 'pointer'

    if (e.features.length) {
      const { name, adcode } = e.features[0].properties
      hoveredStateId = adcode
      // 设置当前区域高亮
      map.value.setFeatureState(
        { source: 'map-source', id: hoveredStateId },
        { hover: hoveredStateId ? true : false }
      )
      // 当鼠标经过区域时 区域 name 值匹配的数据边界高亮
      map.value.setFilter('map-area-fill-height-light', ['==', ['get', 'name'], name])
    }
  })

  // 鼠标移出
  map.value.on('mouseleave', 'map-area-base', () => {
    //改变鼠标样式
    map.value.getCanvas().style.cursor = ''
    if (hoveredStateId) {
      // 移除区域高亮
      map.value.setFeatureState({ source: 'map-source', id: hoveredStateId }, { hover: false })
    }
    hoveredStateId = null
    // 鼠标移开是移除边界高亮
    map.value.setFilter('map-area-fill-height-light', false)
  })

  // 绑定点位图层的点击事件 获取当前点击的要素
  map.value.on('click', 'map-area-base', (e: { point: any }) => {
    const features = map.value.queryRenderedFeatures(e.point)
    if (features.length) {
      const name = features[0].properties.name ?? ''
      console.log('name', name)
      // if (mapPath.value.length > 1 && mapPath.value.contains(name)) return
    }
  })
}

onMounted(() => {
  map.value.on('load', () => {
    addSource()
    addLayers()
    addEventListeners()

    mapColorFill(shenzhen)
    getCountBjDataByArea({ addressLevel: 6, addressId: '4403' }).then((res) => {
      const { features } = res.data
      shenzhen.features.forEach((item: any) => {
        item.properties.nums = 0
        item.properties.percentage = '0%'
        features.forEach((d: { properties: { address: string; cnt: any; percent: any } }) => {
          if (
            (item.properties.name === '光明区' && d.properties.address === '光明新区') ||
            (item.properties.name === '光明新区' && d.properties.address === '光明区')
          ) {
            item.properties.nums = d.properties.cnt
            item.properties.percentage = d.properties.percent
          }
          if (item.properties.name === d.properties.address) {
            item.properties.nums = d.properties.cnt
            item.properties.percentage = d.properties.percent
          }
        })
      })
      mapColorFill(shenzhen)
    })
  })
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

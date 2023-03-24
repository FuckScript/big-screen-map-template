export const baseLayers: object[] = [
  {
    id: 'map-area-fill-extrusion',
    type: 'fill-extrusion',
    source: 'map-source',
    layout: {},
    paint: {
      'fill-extrusion-color': [
        'case',
        ['==', ['get', 'nums'], null],
        '#00d0f3',
        ['<', ['get', 'nums'], 500],
        '#00d0f3',
        ['all', ['>=', ['get', 'nums'], 500], ['<', ['get', 'nums'], 5000]],
        '#08abff',
        ['all', ['>=', ['get', 'nums'], 5000], ['<', ['get', 'nums'], 10000]],
        '#008bef',
        ['all', ['>=', ['get', 'nums'], 10000], ['<', ['get', 'nums'], 20000]],
        '#0060ff',
        ['>=', ['get', 'nums'], 200000],
        '#0030ff',
        '#627BC1'
      ],
      'fill-extrusion-height': 2010,
      'fill-extrusion-base': 2000
    }
  },
  {
    id: 'map-area-base',
    beforeId: 'map-area-fill-extrusion',
    type: 'fill-extrusion',
    source: 'map-source',
    layout: {},
    paint: {
      'fill-extrusion-color': '#0f2d66',
      'fill-extrusion-height': 2000
    }
  },

  // 绘制边界线
  /* {
    id: 'map-area-border',
    type: 'line',
    source: 'map-source',
    layout: {},
    paint: {
      'line-color': '#ffffff',
      'line-width': 2
    }
  }, */
  {
    id: 'map-area-fill-height-light',
    // type: 'fill',
    type: 'fill-extrusion',
    source: 'map-source',
    filter: false,
    paint: {
      'fill-extrusion-color': '#0773BF',
      'fill-extrusion-height': 2020,
      'fill-extrusion-base': 2000
    }
  },
  {
    id: 'map-area-name',
    beforeId: false,
    type: 'symbol',
    source: 'map-source',
    layout: {
      'text-field': ['get', 'name'],
      'text-anchor': 'bottom',
      'text-offset': [0, 0],
      'text-allow-overlap': false,
      'text-size': 12,
      'text-font': ['Microsoft YaHei']
    },
    paint: {
      'text-color': '#ffffff',
      'text-halo-color': 'rgba(0,0,0,.9)',
      'text-halo-width': 1,
      'text-halo-blur': 1
    }
  }
  /* {
    id: 'circle',
    type: 'fill',
    source: 'circle',
    paint: {
      'fill-color': 'rgba(0, 222, 233, 0.4)',
      'fill-outline-color': '#98ceff'
    }
  },
  {
    id: 'circleRadius',
    type: 'line',
    source: 'circleRadius',
    paint: {
      'line-width': 1,
      'line-color': 'rgba(0, 222, 233, 0.8)'
    }
  },
  {
    id: 'circleRadiusValue',
    type: 'symbol',
    source: 'circleRadius',
    layout: {
      'text-field': ['get', 'radius'],
      'text-allow-overlap': true,
      'text-offset': [0, -0.5],
      'text-size': 16
    },
    paint: {
      'text-color': '#98ceff'
    }
  } */
  // {
  //   id: 'selectedCompanys',
  //   source: 'selectedCompanys',
  //   type: 'symbol',
  //   paint: {
  //     // "text-color": "red",
  //   },
  //   layout: {
  //     // "icon-image": "nan",
  //     visibility: 'none',
  //     'icon-image': [
  //       'case',
  //       ['==', ['get', 'gender'], '0'],
  //       'nan',
  //       ['==', ['get', 'gender'], '1'],
  //       'nv',
  //       'weizhi'
  //     ],
  //     'icon-size': 0.5,
  //     'symbol-z-offset': 1000
  //   }
  //   // minzoom: 10,
  // },
  // {
  //   id: 'inCirclePoints',
  //   source: 'inCirclePoints',
  //   type: 'symbol',
  //   paint: {},
  //   layout: {
  //     'icon-image': [
  //       'case',
  //       ['==', ['get', 'gender'], '0'],
  //       'nan',
  //       ['==', ['get', 'gender'], '1'],
  //       'nv',
  //       'weizhi'
  //     ],
  //     'icon-size': 0.8
  //   }
  // },
  // {
  //   id: 'hospital',
  //   source: 'hospital',
  //   type: 'symbol',
  //   paint: {
  //     // "text-color": "red",
  //   },
  //   layout: {
  //     visibility: 'none',
  //     'icon-image': 'yiyuan',
  //     'icon-size': 0.5
  //   }
  //   // minzoom: 10,
  // },
  // {
  //   id: 'circlePoints',
  //   source: 'circlePoints',
  //   type: 'symbol',
  //   paint: {
  //     // "text-color": "red",
  //   },
  //   layout: {
  //     // "icon-image": "nan",
  //     'icon-image': [
  //       'case',
  //       ['==', ['get', 'gender'], '0'],
  //       'nan',
  //       ['==', ['get', 'gender'], '1'],
  //       'nv',
  //       'weizhi'
  //     ],
  //     'icon-size': 1
  //   }
  // }
]

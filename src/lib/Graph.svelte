<script>
  import {pointsToString} from './graph.js'

  export let id = ''
  export let title = ''
  let classes = "graph"
  export {classes as class}
  export let c = ''
  export let w = 2
  export let style = ''
  style = `color: ${c}; ${style}`

  export let points
  export let min = {x: 0, y: 0}
  export let max = {x: 100, y: 100}

  let box = calcBox(min, max)
  $: box = calcBox(min, max)

  let viewBox = box.join(' ')
  $: viewBox = box.join(' ')

  let yrange = box[3]
  $: yrange = box[3]

  function calcBox () {
    return [min.x, min.y, max.x - min.x, max.y - min.y]
  }
</script>

<svg class={classes} {style} {viewBox} preserveaspectratio="none">
  <title>{title}</title>
  <g transform="translate(0,{yrange}) scale(1,-1)">
    <polyline
      stroke="currentColor"
      stroke-width={w}
      fill="none"
      points={pointsToString(points)}
      vector-effect="non-scaling-stroke" />
  </g>
</svg>

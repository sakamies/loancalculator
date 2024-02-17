<script>
  import {pointsToString} from "./graph.js"

  export let id = ""
  let classes = "graph"
  export {classes as class}
  export let title = ''

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

<svg class={classes} {viewBox} preserveaspectratio="none">
  <title>{title}</title>
  <g transform="translate(0,{yrange}) scale(1,-1)">
    <polyline points={pointsToString(points)} vector-effect="non-scaling-stroke" />
  </g>
</svg>

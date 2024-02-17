//TODO: take in preset so i can conform all generated graphs to the same min & max. This is good for drawing multiple loans on graphs that have identical min&max so they can be compared.

export function loanToGraphs (loan, preset) {
  return {
    principal: seriesToGraph(loan.principal, preset),
    interest: seriesToGraph(loan.interest, preset),
    expense: seriesToGraph(loan.expense, preset),
    remaining_loan: seriesToGraph(loan.remaining_loan, preset),
  }
}

export function seriesToGraph (series, preset) {
  const points = seriesToPoints(series)

  const first = points[0]
  const last = points[points.length-1]

  const min = {
    x: preset?.min?.x || first.x,
    y: preset?.min?.y || 0, //in this app, floor always starts at zero
  }

  const max = {
    x: preset?.max?.x || last.x,
    y: preset?.max?.y || getMax('y', points),
  }

  return {
    min,
    max,
    points,
  }
}

export function seriesToPoints (series) {
   //{m,v} object to string that's `x,y` for polyline path attribute
  return series.map(({month, value}) => ({x: month, y: value}))
}

export function pointsToString (points) {
  return points.map(({x, y}) => [x,y].join(',')).join(' ')
}

export function getMax (key, arr) {
  //Sort array of object by value in [key], return value in [key] of first object in array
  const sorted = arr.sort((a, b) => a[key] > b[key])
  return sorted[0][key]
}
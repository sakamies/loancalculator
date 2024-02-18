//TODO: take in preset so i can conform all generated graphs to the same min & max. This is good for drawing multiple loans on graphs that have identical min&max so they can be compared.

export function loanToMonthlyGraphs ({principal, interest, expense}, preset) {
  return {
    principal: seriesToGraph(principal, preset),
    interest: seriesToGraph(interest, preset),
    expense: seriesToGraph(expense, preset),
  }
}

export function loanToGraph (loan, preset) {
  return seriesToGraph(loan.remaining_loan, preset)
}

export function seriesToGraph (series, preset) {
  const points = seriesToPoints(series)

  const graph = {
    min: preset?.min,
    max: preset?.max,
    points,
  }

  return graph
}

export function seriesToPoints (series) {
   //{m,v} object to string that's `x,y` for polyline path attribute
  return series.map(({month, value}) => ({x: month, y: value}))
}

export function pointsToString (points) {
  return points.map(({x, y}) => [x,y].join(',')).join(' ')
}

export function seriesMax (key, series) {
  //Sort array of object by value in [key], return value in [key] of first object in array
  const sorted = series.sort((a, b) => a[key] - b[key])
  const maxItem = sorted[sorted.length-1][key]
  return maxItem
}

export function seriesMin (key, series) {
  //Duplicate of seriesMax, just returns the first instead of last array item
  const sorted = series.sort((a, b) => a[key] - b[key])
  const minItem = sorted[0][key]
  return minItem
}
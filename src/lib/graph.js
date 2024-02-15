export function loanToGraphs (loan) {
  return {
    principal: seriesToGraph(loan.principal),
    interest: seriesToGraph(loan.interest),
    expense: seriesToGraph(loan.expense),
    remaining_loan: seriesToGraph(loan.remaining_loan),
  }
}

export function seriesToGraph (series) {
  const first = series[0]
  const last = series[series.length-1]

  const points = seriesToPath(series)

  const min = {
    x: first.month,
    y: 0, //in this app, floor always starts at zero
  }

  const max = {
    x: last.month,
    y: seriesMax('value', series),
  }

  return {
    min,
    max,
    points,
  }
}

export function seriesToPath (series) {
  return series.map(({month, value}) => {
    return [month,value].join(',')
  }).join(' ') //{m,v} object to string that's `x,y` for polyline path attribute
}

export function seriesMax (key, series) {
  //sort method
  const sorted = series.sort((a, b) => a[key] > b[key])
  return sorted[0][key]

  //reduce method
  // const max = series.reduce((a, b) => a[key] > b[key] ? a[key] : b[key] )
  // return max
}
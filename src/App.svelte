<script>

  import Graph from './lib/Graph.svelte'
  import Form from './lib/Form.svelte'
  import {calculateLoan} from './lib/calc.js'
  import {loanToGraphs} from './lib/graph.js'
  import {ANNUITY, EQUAL} from './lib/config.js'

  const presets = {
    "asuntolaina": {
      loan_type: ANNUITY,
      loan_sum: 200000,
      loan_period_years: 25,
      interest_rate_percentage: 5,
      margin_percentage: 1,
      monthly_expense_sum: 5,
    }
  }

  //Loan parameters, get initial params from preset
  let loan_params = presets['asuntolaina']

  let extra_payment_sum = 0
  let interest_rate_uncertainty_percentage = 1 //TODO: get low & high loans based on interest rate percentage number +/- this
  //TODO: make area graphs that high/low uncertainty range

  let fullLoan = calculateLoan(loan_params)
  $: fullLoan = calculateLoan(loan_params)

  let reducedLoan = calculateLoan({
    ...loan_params,
    loan_sum: loan_params.loan_sum - extra_payment_sum
  })
  $: reducedLoan = calculateLoan({
    ...loan_params,
    loan_sum: loan_params.loan_sum - extra_payment_sum
  })
  //TODO: get ranges for full & reduced loan based on interest_rate_uncertainty, so one loan for interest percentage minus uncertainty and one loan for interest rate plus uncertainty, then use those to draw uncertainty ranges on the graphs.

  //TODO: Do math on points etc
  const graphPreset = {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: 100,
      y: 100,
    }
  }
  let graphs = loanToGraphs(reducedLoan)
  $: graphs = loanToGraphs(reducedLoan)
  console.log(graphs)

</script>

<main>
  <h1>Lainalaskuri</h1>
  <div style="display: flex; gap: 1em;">
    <div>
      <h2>Principal</h2>
      <Graph {...graphs.principal} />
      <h2>Interest</h2>
      <Graph {...graphs.interest} />
      <h2>Expense</h2>
      <Graph {...graphs.expense} />
      <h2>Remaining loan</h2>
      <Graph {...graphs.remaining_loan} />
    </div>
    <Form
      bind:loan_params
      bind:extra_payment_sum
      bind:interest_rate_uncertainty_percentage
      {fullLoan}
      {reducedLoan}
    />
  </div>
</main>
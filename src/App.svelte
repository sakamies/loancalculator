<script>

  import Graph from './lib/Graph.svelte'
  import Form from './lib/Form.svelte'
  import {calculateLoans} from './lib/calc.js'
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
      extra_payment_sum: 0,
    }
  }
  let opts = presets['asuntolaina']

  let loans = calculateLoans(opts)
  $: loans = calculateLoans(opts)

  //TODO: Do math on points etc
  let graphs = loanToGraphs(loans.reduced)
  $: graphs = loanToGraphs(loans.reduced)
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
    <Form bind:opts {loans} />
    <pre>{JSON.stringify(loans, null, '  ')}</pre>
  </div>
</main>
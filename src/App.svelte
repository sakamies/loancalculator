<script>

  import Graph from './lib/Graph.svelte'
  import Form from './lib/Form.svelte'
  import {calculateLoan} from './lib/calc.js'
  import {
    loanToMonthlyGraphs,
    loanToGraph,
    seriesMax
  } from './lib/graph.js'
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

  $: fullLoan = calculateLoan(loan_params)
  $: reducedLoan = calculateLoan({
    ...loan_params,
    loan_sum: loan_params.loan_sum - extra_payment_sum
  })
  $: console.log(fullLoan.total_paid_sum, reducedLoan.total_paid_sum)
  //TODO: get ranges for full & reduced loan based on interest_rate_uncertainty, so one loan for interest percentage minus uncertainty and one loan for interest rate plus uncertainty, then use those to draw uncertainty ranges on the graphs.

  $: monthlyBox = {
    min: {x: 0, y: 0
    },
    max: {
      x: fullLoan.loan_period_months,
      y: Math.max(
        seriesMax('value', fullLoan.principal),
        seriesMax('value', fullLoan.interest)
      )
    }
  };
  $: monthlyGraphs = loanToMonthlyGraphs(fullLoan, monthlyBox)

  $: loanBox = {
    min: {x: 0, y: 0
    },
    max: {
      x: fullLoan.loan_period_months,
      y: fullLoan.loan_sum
    }
  }
  $: fullLoanGraph = loanToGraph(fullLoan, loanBox)
  $: reducedLoanGraph = loanToGraph(reducedLoan, loanBox)

</script>

<main>
  <h1>Lainalaskuri</h1>
  <div style="display: flex; gap: 1em;">
    <div>
      <h2>Kuukausierät</h2>
      <div class="graphs">
        <Graph c="green" title="Pääomanerän suuruus" {...monthlyGraphs.principal} />
        <Graph c="orange" title="Korkoerän suuruus" {...monthlyGraphs.interest} />
        <Graph c="red" title="Kiinteä kulu" {...monthlyGraphs.expense} />
      </div>
      <h2>Lainaa jäljellä</h2>
      <div class="graphs">
        <Graph {...fullLoanGraph} />
        <Graph {...reducedLoanGraph} />
      </div>
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

<style>

</style>
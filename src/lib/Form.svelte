<script>

  export let opts
  export let loans

</script>

<form class="controls">
  <div class="control">
    <b>{opts.loan_type}</b>
  </div>
  <div class="control">
    <label for="loan_sum_number loan_sum_range">Minulla on</label>
    <input id="loan_sum_number" type="number" min="1000" step="1000" bind:value={opts.loan_sum} aria-describedby="loan_sum_number_unit loan_sum_number_desc">
    <span id="loan_sum_number_unit" class="unit">€</span>
    <span id="loan_sum_number_desc" class="desc">lainaa jäljellä</span>
    <input id="loan_sum_range" type="range" min="1000" max="320000" step="1000" bind:value={opts.loan_sum}>
  </div>
  <div class="control">
    <label for="loan_period_years_number loan_period_years_range">Laina-aikaa on</label>
    <input id="loan_period_years_number" type="number" min="1" max="" step="100" bind:value={opts.loan_period_years} aria-describedby="loan_period_years_number_unit loan_period_years_number_desc">
    <span id="loan_period_years_number_desc" class="desc">vuotta jäljellä</span>
    <input id="loan_period_years_range" type="range" min="1" max="30" step="1" bind:value={opts.loan_period_years}>
  </div>
  <div class="control">
    <label for="interest_rate_percentage_number">Maksan korkoa</label>
    <input id="interest_rate_percentage_number interest_rate_percentage_range" type="number" min="0" max="30" step="0.01" bind:value={opts.interest_rate_percentage} aria-describedby="interest_rate_percentage_number_unit interest_rate_percentage_number_desc">
    <span id="interest_rate_percentage_unit" class="unit">%</span>
    <input id="interest_rate_percentage_range" type="range" min="0" max="12" step="0.1" bind:value={opts.interest_rate_percentage}>
    <small id="interest_rate_percentage_desc" class="desc help">(arvioi keskimäärä lainan ajalle)</small>
  </div>
  <div class="control">
    <label for="margin_percentage_number margin_percentage_range">Marginaalini on</label>
    <input id="margin_percentage_number" type="number" min="0" max="10" step="0.01" bind:value={opts.margin_percentage} aria-describedby="margin_percentage_number_unit margin_percentage_number_desc">
    <span id="margin_percentage_unit" class="unit">%</span>
    <input id="margin_percentage_range" type="range" min="0" max="4" step="0.1" bind:value={opts.margin_percentage}>
  </div>
  <div class="control">
    <label for="monthly_expense_sum_number monthly_expense_sum_range">Kiinteät kulut ovat</label>
    <input id="monthly_expense_sum_number" type="number" min="0" max="" step="1" bind:value={opts.monthly_expense_sum} aria-describedby="monthly_expense_sum_number_unit monthly_expense_sum_number_desc">
    <span id="monthly_expense_sum_number_unit" class="unit">€</span>
    <span id="monthly_expense_sum_number_desc" class="desc">kuussa</span>
    <input id="monthly_expense_sum_range" type="range" min="0" max="100" step="1" bind:value={opts.monthly_expense_sum}>
  </div>

  <div class="text" tabindex="0">
    <p>
      Maksan lainasta kokonaisuudessaan
      <br>
      <b><span class="total_paid_sum">{loans.full.total_paid_sum}</span> €</b>
    </p>
  </div>

  <div class="control">
    <label for="extra_payment_sum_number extra_payment_sum_range">Jos lyhentäisin</label>
    <input id="extra_payment_sum_number" type="number" min="0" step="1" bind:value={opts.extra_payment_sum} aria-describedby="extra_payment_sum_number_unit extra_payment_sum_number_desc">
    <span id="extra_payment_sum_number_unit" class="unit">€</span>
    <span id="extra_payment_sum_number_desc" class="desc">tänään</span>
    <input id="extra_payment_sum_range" type="range" min="0" max="1500" step="10" bind:value={opts.extra_payment_sum}>
  </div>

  <div class="text" tabindex="0">
    <p>
      Voisin säästää kokonaissummasta
      <br>
      <b>
        <span class="total_saved_sum">
          {loans.full.total_paid_sum - loans.reduced.total_paid_sum}
        </span> €
      </b>
    </p>
  </div>

<!--   <div class="control">
    <button class="button-link" type="reset" on:click={reset}>
      Nollaa valinnat
    </button>
  </div> -->
</form>
import {ANNUITY, EQUAL} from '/src/lib/config.js'

export function calculateLoans (opts) {
  const {
    loan_type,
    loan_sum,
    loan_period_years,
    interest_rate_percentage,
    margin_percentage,
    monthly_expense_sum,
    extra_payment_sum,
  } = opts

  const total_interest_factor_per_year = (interest_rate_percentage + margin_percentage) / 100
  const total_interest_factor_per_month = total_interest_factor_per_year / 12
  const loan_period_months = loan_period_years * 12

  let data = {
    total_interest_factor_per_year,
    total_interest_factor_per_month,
    loan_period_months
  }

  /*
    TODO:
    - Make both types of loan calculation into functions
    - Calculate both normal payments for loan and the loan with extra payment subtracted from the loan_sum

    With those two calculations I can compare what happens when you do an extra payment on your loan.
  */
  if (loan_type === ANNUITY) {
    const full = calculateAnnuityLoan(opts, data)

    const opts2 = {...opts}
    opts2.loan_sum = opts2.loan_sum - extra_payment_sum
    const reduced = calculateAnnuityLoan(opts2, data)

    return {full, reduced}
  }

  if (loan_type === EQUAL) {
    // TODO
    // calculateEqualLoan()
  }
}



function calculateAnnuityLoan (opts, data) {

  const {
    loan_sum,
    loan_period_years,
    interest_rate_percentage,
    margin_percentage,
    monthly_expense_sum,
    extra_payment_sum,
  } = opts

  const {
    total_interest_factor_per_year,
    total_interest_factor_per_month,
    loan_period_months
  } = data

  const annuity_numerator = (Math.pow(1 + total_interest_factor_per_month, loan_period_months) - 1)
  // Like (0.0004464 * 1+0.0004464 ^ 300)
  const annuity_denominator = (total_interest_factor_per_month * Math.pow(1 + total_interest_factor_per_month, loan_period_months))

  const annuity_factor = annuity_numerator / annuity_denominator

  const monthly_total_payment_sum = loan_sum / annuity_factor

  const total_interest_sum = (monthly_total_payment_sum * loan_period_months) - loan_sum
  const total_expense_sum = monthly_expense_sum * loan_period_months
  const total_paid_sum = loan_sum + total_interest_sum + total_expense_sum

  const principal = []
  const interest = []
  const remaining_loan = []
  const expense = []

  let remaining_loan_sum = loan_sum

  for (let i = 0; i <= loan_period_months; i++) {

    const installment_interest_sum = remaining_loan_sum * total_interest_factor_per_month
    const installment_principal_payment_sum = monthly_total_payment_sum - installment_interest_sum
    remaining_loan_sum -= installment_principal_payment_sum;

    principal.push({
      month: i,
      value: Math.max(installment_principal_payment_sum, 0)
    })
    interest.push({
      month: i,
      value: Math.max(installment_interest_sum, 0)
    })
    expense.push({
      month: i,
      value: Math.max(monthly_expense_sum, 0)
    })
    remaining_loan.push({
      month: i,
      value: Math.max(remaining_loan_sum, 0)
    })
  }

  data = {
    ...data,
    total_paid_sum, //How much money overall you paid
    total_interest_sum, //How much interest you paid in total
    monthly_total_payment_sum, //How much money you actually pay per month in total
    loan_period_months,
    principal,
    interest,
    expense,
    remaining_loan,
  }

  return data
}

//TODO: make this output the same format as annuity calculator
function calculateEqualLoan (opts, data) {
  const installment_principal_payment_sum = loan_sum / loan_period_months
  const total_interest_sum = loan_sum * total_interest_factor_per_year * loan_period_years / 2

  results += `<h2>Tasaerälaina</h2>`
  results += `Lainaa yhteensä: ${loan_sum.toFixed(2)} €<br>`
  results += `Korkoprosentti: ${total_interest_factor_per_year * 100} %<br>`
  results += `Laina-aika: ${loan_period_years} vuotta<br>`
  results += `Korkoa yhteensä: ${total_interest_sum.toFixed(2)} €<br>`
  results += `Kuukausilyhennys: ${installment_principal_payment_sum.toFixed(2)} €<br>`
  results += `Maksueriä: ${loan_period_months}<br>`

  paymentTable += `<h3>Tasaerälainan maksuerät kuukausittain:</h3>`
  paymentTable += `<table border="1">`
  paymentTable += `<tr><th>Erä</th><th>Kuukausikorko</th><th>Kuukausilyhennys</th><th>Kuukausierä</th><th>Lainan pääomaa jäljellä</th></tr>`
  let remaining_loan_sum = loan_sum
  for (let i = 1; i <= loan_period_months; i++) {
    const installment_interest_sum = remaining_loan_sum * total_interest_factor_per_month
    const monthly_total_payment_sum = installment_principal_payment_sum + installment_interest_sum
    remaining_loan_sum -= installment_principal_payment_sum
    paymentTable += `<tr><td>${i}</td><td>${installment_interest_sum.toFixed(2)} €</td><td>${installment_principal_payment_sum.toFixed(2)} €</td><td>${monthly_total_payment_sum.toFixed(2)} €</td><td>${remaining_loan_sum.toFixed(2)} €</td></tr>`
  }
  paymentTable += `</table>`
}
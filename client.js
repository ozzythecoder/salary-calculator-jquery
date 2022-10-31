$( document ).ready(onReady);

// global variables
let employees = [
  {
    firstName: 'Thomas',
    lastName: 'Anderson',
    employeeID: '7039',
    jobTitle: 'Sales Lead',
    annualSalary: 50000,
    globalID: 0
  },
  {
    firstName: 'Ebenezer',
    lastName: 'Scrooge',
    employeeID: '4401',
    jobTitle: 'CFO',
    annualSalary: 70000,
    globalID: 1
  },
  {
    firstName: 'Søren',
    lastName: 'Kierkegaard',
    employeeID: '0021',
    jobTitle: 'Public Relations',
    annualSalary: 65500,
    globalID: 2
  },
  {
    firstName: 'Marie-Ann',
    lastName: 'Lindegård',
    employeeID: '2234',
    jobTitle: 'L6 Supervisor',
    annualSalary: 59000,
    globalID: 4
  }
];

// unique identifier for employees
let globalID = employees.length;

// regex for employee names and job title names
const invalidNameRegex = /[^a-zA-Z\u00c0-\u024f\u1e00-\u1eff_-]/ // inclusive of diacritics
const invalidTitleRegex = /[^a-zA-Z\u00c0-\u024f\u1e00-\u1eff0-9_-]|^[0-9]*$/ // inclusive of diacritics and numbers, but cannot contain only numbers

function onReady() {
  console.log('jQ');

  render();
  // handle submit event
  $('#submit-employee').on('click', onSubmit)

  // handle delete event
  $('#table-body').on('click', '.delete-btn', onDelete)
}

// handle errors
function handleErrors(obj) {
  
  // if any field is blank, reject input
  if (!obj.firstName || !obj.lastName || obj.employeeID === '' || !obj.jobTitle || obj.annualSalary === '') {
    console.log('all fields required');
    clearErrors();
    printErrors('noInput');
    return false;
  }
  
  // if any numerical input is zeror or less, reject input
  if (obj.employeeID <= 0 || obj.annualSalary <= 0) {
    console.log('positive input required');
    clearErrors();
    printErrors('zeroNumber');
    return false;
  }

  // if either first name or last name contains restricted characters, reject input
  if (invalidNameRegex.test(obj.firstName) || invalidNameRegex.test(obj.lastName)) {
    console.log('invalid name');
    clearErrors();
    printErrors('badName');
    return false;
  }

  // if job title contains restricted characters, reject input
  if (invalidTitleRegex.test(obj.jobTitle)) {
    console.log('invalid job title');
    clearErrors();
    printErrors('badTitle');
    return false;
  }
  
  return true;
} // end handleErrors

// add new employee to array
function onSubmit(event) {
  
  event.preventDefault();

  let newEmployee = {
    firstName: $('#first-name').val(),
    lastName: $('#last-name').val(),
    employeeID: $('#employee-id').val(),
    jobTitle: $('#job-title').val(),
    annualSalary: $('#annual-salary').val(), // left as a number for error comparison
    globalID: globalID
  }
  
  // check input for errors; if no errors, continue
  if (!handleErrors(newEmployee)) {
    console.log('error!');
    return false;
  }

  // convert annual salary to a number
  newEmployee.annualSalary = Number(newEmployee.annualSalary)
  employees.push(newEmployee); // push new employee to array
  globalID++; // increment global ID
  
  // empty error field, empty inputs, and render
  clearErrors();
  clearForm();
  render();
} // end onSubmit()

// delete employee
function onDelete() {

  // traverse DOM & grab the global ID to delete
  let idToDelete = $(this).parent().parent().data('id');

  // loop over employees array
  for (let emp of employees) {
    if (emp.globalID == idToDelete) {
      // if ID to delete is a match, remove said employee from the array
      employees.splice(employees.indexOf(emp), 1);
    }
  }

  render();
} // end onDelete()

// calculate monthly cost of all employees' salaries
function monthlyCost() {
  let total = 0;

  for (let emp of employees) {
    total += emp.annualSalary;
  } // get total salaries per year

  return Math.ceil(total / 12); // divide by 12 and round up to the nearest dollar
} // end monthlyCost()

// format a number as currency
function formatDollars(num) {
  let dollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'})
  return dollars.format(num).slice(0, -3); // remove cents
} // end formatDollars()

function clearForm() {
  $('input').val('');
}

function clearErrors() {
  $('#feedback-area').empty();
}

function printErrors(err) {

  const errorTypes = {
    noInput: `<p>All inputs required.</p>`,
    zeroNumber: `<p>Invalid input. ID and salary inputs must be greater than zero.</p>`,
    badName: `<p>Invalid input. Names may only contain letters.</p>`,
    badTitle: `<p>Invalid input. Job title may only contain letters and numbers, and must include at least one letter.</p>`
  }

  clearErrors();
  $('#feedback-area').append(errorTypes[err])
}

function render() {
  
  $('#table-body').empty();

  for (let emp of employees) {
    // add employee detais to a new table row
    $('#table-body').append(`    
    <div class="table-row" data-id="${emp.globalID}">
      <div class="table-row-cell first-name-cell">
        ${emp.firstName}
      </div>    
      <div class="table-row-cell last-name-cell">
        ${emp.lastName}
      </div>    
      <div class="table-row-cell employee-id-cell">
        ${emp.employeeID}
      </div>    
      <div class="table-row-cell job-title-cell">
        ${emp.jobTitle}
      </div>    
      <div class="table-row-cell salary-cell">
        ${formatDollars(emp.annualSalary)}
      </div>
      <div class="table-row-cell delete-cell">
        <button class="delete-btn">Delete</button>
      </div>    
    </div>
    `); // end append
  } // end for loop

  let monthly = monthlyCost(); // get monthly salary cost

  // update monthly salary cost
  $('#total-salaries').empty();
  $('#total-salaries').append(`
  <span id="monthly-cost">${formatDollars(monthly)}</span><br>/ month
  `)

  // if cost is over 20k, add a red background
  if (monthly >= 20000) {
    $('#total-salaries').addClass('red-background')
  } else {
    $('#total-salaries').removeClass('red-background')
  }
    
} // end render
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
    firstName: 'Jennifer',
    lastName: 'Hale',
    employeeID: '0021',
    jobTitle: 'Public Relations',
    annualSalary: 65500,
    globalID: 2
  }
];

// unique identifier for employees
let globalID = employees.length;

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
    $('#feedback-area').empty();
    $('#feedback-area').append(`
    <p>All inputs required.</p>
    `)
    return false;
  }
  
  if (obj.employeeID <= 0 || obj.annualSalary <= 0) {
    console.log('positive input required');
    $('#feedback-area').empty();
    $('#feedback-area').append(`
    <p>Invalid input. ID and salary inputs must be greater than zero.</p>
    `)
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
    annualSalary: $('#annual-salary').val(),
    globalID: globalID
  }
  
  // check input for errors
  if (!handleErrors(newEmployee)) {
    console.log('error!');
    return false;
  }
  // if no errors, turn annual salary to a number, push new employee, increment global id, and clear errors
  newEmployee.annualSalary = Number(newEmployee.annualSalary)
  employees.push(newEmployee);
  globalID++;
  $('#feedback-area').empty();
  
  // empty inputs
  $('#first-name').val('');
  $('#last-name').val('');
  $('#employee-id').val('');
  $('#job-title').val('');
  $('#annual-salary').val('');

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
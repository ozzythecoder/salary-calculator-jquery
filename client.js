$( document ).ready(onReady);

// global variables
let employees = [
  {
    firstName: 'Thomas',
    lastName: 'Anderson',
    employeeID: 78309,
    jobTitle: 'Button Pusher',
    annualSalary: 55000,
    globalID: 0
  },
  {
    firstName: 'Thelonius',
    lastName: 'Monk',
    employeeID: 202910,
    jobTitle: 'Master of Soul',
    annualSalary: 100000,
    globalID: 1
  },
  {
    firstName: 'Ebenezer',
    lastName: 'Scrooge',
    employeeID: 01,
    jobTitle: 'Pincher of Pennies',
    annualSalary: 10000000,
    globalID: 2
  }
];

let globalID = employees.length; // unique identifier for employees

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
  if (!obj.firstName || !obj.lastName || !obj.employeeID || !obj.jobTitle || !obj.annualSalary) {
    console.log('all fields required');
    $('#feedback-area').empty();
    $('#feedback-area').append(`
      <p>All inputs required.</p>
    `)
    return false;
  }

  if (obj.employeeID < 0 || obj.annualSalary <= 0) {
    console.log('positive input required');
    $('#feedback-area').empty();
    $('#feedback-area').append(`
    <p>Invalid input. Numbers must be positive.</p>
    `)
    return false;
  }
  
  return true;
} // end handleErrors

// add new employee to array
function onSubmit() {
  
  let newEmployee = {
    firstName: $('#first-name').val(),
    lastName: $('#last-name').val(),
    employeeID: $('#employee-id').val(),
    jobTitle: $('#job-title').val(),
    annualSalary: Number($('#annual-salary').val()),
    globalID: globalID
  }
  
  // check input for errors
  if (!handleErrors(newEmployee)) {
    console.log('error!');
    return false;
  }
  // if no errors, push new employee, increment global id, and clear errors
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
  console.log('in onDelete()');
  let idToDelete = $(this).parent().parent().data('id');
  console.log('id to delete is', idToDelete);

  for (let emp of employees) {
    if (emp.globalID == idToDelete) {
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
  }
  return Math.ceil(total / 12); // rounds up to the nearest dollar
} // end monthlyCost()

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
        $${emp.annualSalary}
      </div>
      <div class="table-row-cell delete-cell">
        <button class="delete-btn">Delete</button>
      </div>    
    </div>
    `); // end append
  } // end for loop


  // update monthly salary
  $('#total-salaries').empty();
  $('#total-salaries').append(`
  <span id="monthly-cost">$${monthlyCost()}</span><br>/ month
  `)

  // if cost is over 20k, add a red background
  if (monthlyCost() >= 20000) {
    $('#total-salaries').addClass('red-background')
  } else {
    $('#total-salaries').removeClass('red-background')
  }
    
} // end render
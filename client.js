$( document ).ready(onReady);

let employees = [
  {
    firstName: 'Thomas',
    lastName: 'Anderson',
    employeeID: 78309,
    jobTitle: 'Button Pusher',
    annualSalary: 55000,
    globalID: 4
  },
  {
    firstName: 'Thelonius',
    lastName: 'Monk',
    employeeID: 202910,
    jobTitle: 'Master of Soul',
    annualSalary: 100000,
    globalID: 89
  },
  {
    firstName: 'Ebenezer',
    lastName: 'Scrooge',
    employeeID: 01,
    jobTitle: 'Pincher of Pennies',
    annualSalary: 10000000,
    globalID: 420
  }
];
let globalID = 0;

// calculate monthly cost of all employees' salaries
const monthlyCost = () => {
  let total = 0;
  for (let emp of employees) {
    total += emp.annualSalary;
  }
  return Math.ceil(total / 12); // rounds up to the nearest dollar
}

function onReady() {
  console.log('jQ');

  render();
  // handle submit event
  $('#submit-employee').on('click', onSubmit)

  // handle delete event
  $('#table-body').on('click', '.delete-btn', onDelete)
}

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
}

function render() {
  $('#table-body').empty();

  // to count total salaries
  let totalSalaries = 0;

  for (let emp of employees) {

    // add employee's salary to the count
    totalSalaries += emp.annualSalary;
 
    // add employee detais to the table
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
    `);
  }


  $('#total-salaries').empty();
  $('#total-salaries').append(`
  <span id="monthly-cost">$${monthlyCost()}</span><br>/ month
  `)

  if (monthlyCost() >= 20000) {
    $('#total-salaries').addClass('red-background')
  } else {
    $('#total-salaries').removeClass('red-background')
  }
    
}
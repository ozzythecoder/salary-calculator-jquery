$( document ).ready(onReady);

let employees = [
  {
    firstName: 'Thomas',
    lastName: 'Anderson',
    employeeID: 78309,
    jobTitle: 'Button Pusher',
    annualSalary: 55000,
    globalID: 4
  }
];
let globalID = 0;

function onReady() {
  console.log('jQ');

  render();
  // handle submit event
  $('#submit-employee').on('click', onSubmit)
  // handle delete event
}

function handleErrors(obj) {
  
  // if any field are blank, reject input
  if (!obj.firstName || !obj.lastName || !obj.employeeID || !obj.jobTitle || !obj.annualSalary) {
    console.log('all fields required');
    return false;
  }

  return true;
}

function onSubmit() {

  let newEmployee = {
    firstName: $('#first-name').val(),
    lastName: $('#last-name').val(),
    employeeID: $('#employee-id').val(),
    jobTitle: $('#job-title').val(),
    annualSalary: Number($('#annual-salary').val()),
    globalID: globalID
  }

  if (!handleErrors(newEmployee)) {
    console.log('error!');
    return false;
  }

  // if no errors, push new employee and increment global id
  employees.push(newEmployee);
  globalID++;

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

  let totalSalaries = 0;

  for (let emp of employees) {
    totalSalaries += emp.annualSalary;
    $('#table-body').append(`    
    <div class="table-row" data="${emp.globalID}">
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

  $('#total-salaries').append(`
    $${totalSalaries}
  `)
    
}
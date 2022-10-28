$( document ).ready(onReady);

let employees = [];
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
    annualSalary: $('#annual-salary').val(),
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
  $('#annual-salary').val('');

  render();
}

function render() {

}
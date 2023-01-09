const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};
//data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    //if there's 0, array[-1] is undefined and false (i think??) ,anything greater is true.
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);

  /* res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }); */
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find((e) => e.id === parseInt(req.body.id));

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (e) => e.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  //i think its done like this bc arrays have no keys to values to autoreplace with

  data.setEmployees(unsortedArray.sort((a, b) => a.id - b.id));
  //data.setEmployees(unsortedArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(data.employees);

  /* res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }); */
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((e) => e.id === parseInt(req.body.id));

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (e) => e.id !== parseInt(req.body.id)
  );

  data.setEmployees(filteredArray);
  res.json(data.employees);
  //res.json({ id: req.body.id });
};

const getEmployee = (req, res) => {
  const employee = data.employees.find((e) => e.id === parseInt(req.params.id));

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  res.json(employee);
  //res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};

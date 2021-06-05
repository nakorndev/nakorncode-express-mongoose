const Employees = require('../models/Employees')

module.exports = async (req, res) => {
  const employees = await Employees
    .find()
    .populate('department')
  return res.render('employees.pug', { employees })
}

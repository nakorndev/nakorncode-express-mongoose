require('./connect-database')

const faker = require('faker')
const _ = require('lodash')
const Employees = require('./models/Employees')
const Departments = require('./models/Departments')

// mongodb -> insertOne, insertMany
// mongoose (model) -> create, insertMany
async function seed () {
  try {
    await Departments.deleteMany()
    await Employees.deleteMany()
    const departments = [
      { name: 'Back-end Developer', short: 'BED' },
      { name: 'Front-end Developer', short: 'FED' },
      { name: 'Administrator', short: 'ADM' }
    ]
    const departmentsCreated = await Departments.insertMany(departments)
    const users = []
    for (const i of _.range(100)) {
      users.push({
        code: 'E' + String(i + 1).padStart(4, '0'),
        name: faker.name.findName(),
        email: faker.internet.exampleEmail(),
        salary: _.random(10, 50) * 1000,
        gender: _.sample(['male', 'female']),
        birthDate: faker.date.between('1970-01-01', '2000-01-01'),
        isActive: Math.random() < 0.9 ? true : false,
        department: _.sample(departmentsCreated)._id
      })
    }
    await Employees.insertMany(users)
    console.log('ok!')
  } catch (err) {
    console.error(err)
  } finally {
    process.exit()
  }
}

seed()

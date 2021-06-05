require('./Departments')

const mongoose = require('mongoose')
const { DateTime } = require('luxon')
const { isEmail } = require('validator').default

// employees -> { _id, code, name, email, salary, gender, birthDate, isActive, departmentId }
const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    validate: {
      validator (value) {
        if (value.charAt(0) !== 'E') {
          return false
        }
        const numberOnly = value.substr(1)
        if (numberOnly.length !== 4 || Number.isNaN(Number(numberOnly))) {
          return false
        }
        return true
      },
      message: 'โค้ดไม่ถูกต้อง'
    }
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator (value) {
        return isEmail(value)
      },
      message: 'ที่อยู่อีเมลไม่ถูกต้อง'
    }
  },
  salary: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  birthDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: 'Departments',
    required: true
  }
})

// function () {} <-- reference this
// () => {}       <-- reference this (?)
schema.virtual('genderLocale').get(function () {
  switch (this.gender) {
    case 'male': return 'ผู้ชาย'
    case 'female': return 'ผู้หญิง'
  }
})

schema.virtual('birthDateLocale').get(function () {
  if (!this.birthDate) {
    return ''
  }
  const date = DateTime.fromJSDate(this.birthDate)
  return date.toLocaleString({ ...DateTime.DATE_HUGE, locale: 'th' })
})

schema.virtual('salaryLocale').get(function () {
  return this.salary.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
})

module.exports = mongoose.model('Employees', schema)

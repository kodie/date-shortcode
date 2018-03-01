'use strict'

const diff = require('diff')
const replaceOnce = require('replace-once')

function getDayOfYear (date) {
  var start = new Date(date.getFullYear(), 0, 0)
  var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)
  var oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

function getMonth (month) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[month]
}

function getSuffixedNumber (number) {
  var suffixes = ['th', 'st', 'nd', 'rd']
  var v = number % 100
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

function getWeekday (day) {
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return weekdays[day]
}

function getWeekOfYear (date) {
  var dayOne = new Date(date.getFullYear(), 0, 1)
  return Math.ceil((((date - dayOne) / 86400000) + dayOne.getDay() + 1) / 7)
}

function zeroPad (number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
}

module.exports = {
  codes: (date) => {
    var n

    if (date) {
      if (date instanceof Date) {
        n = date
      } else {
        n = new Date(date)
      }
    } else {
      n = new Date()
    }

    return [
      // Month
      {
        code: 'MMMM',
        value: getMonth(n.getMonth()),
        description: 'Month',
        example: 'January February ... November December'
      },
      {
        code: 'MMM',
        value: getMonth(n.getMonth()).substr(0, 3),
        description: 'Month (3 characters)',
        example: 'Jan Feb ... Nov Dec'
      },
      {
        code: 'MM',
        value: zeroPad(n.getMonth() + 1, 2),
        description: 'Month Number (Padded)',
        example: '01 02 ... 11 12'
      },
      {
        code: 'Mo',
        value: getSuffixedNumber(n.getMonth() + 1),
        description: 'Month Number (Suffixed)',
        example: '1st 2nd ... 11th 12th'
      },
      {
        code: 'M',
        value: (n.getMonth() + 1),
        description: 'Month Number',
        example: '1 2 ... 11 12'
      },

      // Quarter
      {
        code: 'Qo',
        value: getSuffixedNumber(Math.floor((n.getMonth() + 3) / 3)),
        description: 'Quarter (Suffixed)',
        example: '1st 2nd 3rd 4th'
      },
      {
        code: 'Q',
        value: Math.floor((n.getMonth() + 3) / 3),
        description: 'Quarter',
        example: '1 2 3 4'
      },

      // Day of Year
      {
        code: 'DDDD',
        value: zeroPad(getDayOfYear(n), 3),
        description: 'Day of Year (Padded)',
        example: '001 002 ... 364 365'
      },
      {
        code: 'DDDo',
        value: getSuffixedNumber(getDayOfYear(n)),
        description: 'Day of Year (Suffixed)',
        example: '1st 2nd ... 364th 365th'
      },
      {
        code: 'DDD',
        value: getDayOfYear(n),
        description: 'Day of Year',
        example: '1 2 ... 364 365'
      },

      // Day of Month
      {
        code: 'DD',
        value: zeroPad(n.getDate(), 2),
        description: 'Day of Month (Padded)',
        example: '01 02 ... 30 31'
      },
      {
        code: 'Do',
        value: getSuffixedNumber(n.getDate()),
        description: 'Day of Month (Suffixed)',
        example: '1st 2nd ... 30th 31st'
      },
      {
        code: 'D',
        value: n.getDate(),
        description: 'Day of Month',
        example: '1 2 ... 30 31'
      },

      // Day of Week
      {
        code: 'dddd',
        value: getWeekday(n.getDay()),
        description: 'Day of Week',
        example: 'Sunday Monday ... Friday Saturday'
      },
      {
        code: 'ddd',
        value: getWeekday(n.getDay()).substr(0, 3),
        description: 'Day of Week (3 characters)',
        example: 'Sun Mon ... Fri Sat'
      },
      {
        code: 'dd',
        value: getWeekday(n.getDay()).substr(0, 2),
        description: 'Day of Week (2 characters)',
        example: 'Su Mo ... Fr Sa'
      },
      {
        code: 'do',
        value: getSuffixedNumber(n.getDay()),
        description: 'Day of Week Number (Suffixed)',
        example: '0th 1st ... 5th 6th'
      },
      {
        code: 'd',
        value: n.getDay(),
        description: 'Day of Week Number',
        example: '0 1 ... 5 6'
      },

      // Week of Year
      {
        code: 'ww',
        value: zeroPad(getWeekOfYear(n), 2),
        description: 'Week of Year (Padded)',
        example: '01 02 ... 52 53'
      },
      {
        code: 'wo',
        value: getSuffixedNumber(getWeekOfYear(n)),
        description: 'Week of Year (Suffixed)',
        example: '1st 2nd ... 52nd 53rd'
      },
      {
        code: 'w',
        value: getWeekOfYear(n),
        description: 'Week of Year',
        example: '1 2 ... 52 53'
      },

      // Year
      {
        code: 'YYYY',
        value: n.getFullYear(),
        description: 'Year',
        example: '1970 1971 ... 2029 2030'
      },
      {
        code: 'YY',
        value: String(n.getFullYear()).substr(2),
        description: 'Year (2 characters)',
        example: '70 71 ... 29 30'
      },

      // AM/PM
      {
        code: 'A',
        value: ((n.getHours() >= 12) ? 'PM' : 'AM'),
        description: 'AM/PM',
        example: 'AM PM'
      },
      {
        code: 'a',
        value: ((n.getHours() >= 12) ? 'pm' : 'am'),
        description: 'am/pm',
        example: 'am pm'
      },

      // Hour
      {
        code: 'kk',
        value: zeroPad((n.getHours() + 1), 2),
        description: 'Hour (24 hours/Padded)',
        example: '01 02 ... 23 24'
      },
      {
        code: 'k',
        value: (n.getHours() + 1),
        description: 'Hour (24 hours)',
        example: '1 2 ... 23 24'
      },
      {
        code: 'hh',
        value: zeroPad(((n.getHours() + 11) % 12 + 1), 2),
        description: 'Hour (12 hours/Padded)',
        example: '01 02 ... 11 12'
      },
      {
        code: 'h',
        value: ((n.getHours() + 11) % 12 + 1),
        description: 'Hour (12 hours)',
        example: '1 2 ... 11 12'
      },
      {
        code: 'HH',
        value: zeroPad(n.getHours(), 2),
        description: 'Hour (24 hours/0-Index/Padded)',
        example: '00 01 ... 22 23'
      },
      {
        code: 'H',
        value: n.getHours(),
        description: 'Hour (24 hours/0-Index)',
        example: '0 1 ... 22 23'
      },

      // Minute
      {
        code: 'mm',
        value: zeroPad(n.getMinutes(), 2),
        description: 'Minute (Padded)',
        example: '00 01 ... 58 59'
      },
      {
        code: 'm',
        value: n.getMinutes(),
        description: 'Minute',
        example: '0 1 ... 58 59'
      },

      // Second
      {
        code: 'ss',
        value: zeroPad(n.getSeconds(), 2),
        description: 'Second (Padded)',
        example: '00 01 ... 58 59'
      },
      {
        code: 's',
        value: n.getSeconds(),
        description: 'Second',
        example: '0 1 ... 58 59'
      }
    ]
  },

  conf: {
    openTag: '{',
    closeTag: '}'
  },

  config: (conf) => {
    Object.assign(module.exports.conf, conf)
    return module.exports
  },

  parse: (str, date) => {
    var codes = []
    var values = []

    module.exports.codes(date).forEach(c => {
      codes.push(c.code)
      values.push(c.value)
    })

    var conf = module.exports.conf
    var reg = new RegExp(conf.openTag + '(.*?)' + conf.closeTag, 'g')

    return str.replace(reg, (match, found) => {
      return replaceOnce(found, codes, values, 'g')
    })
  },

  strip: (str) => {
    var conf = module.exports.conf
    var reg = new RegExp(conf.openTag + '(.*?)' + conf.closeTag, 'g')
    return str.replace(reg, '')
  },

  test: (str1, str2) => {
    str1 = module.exports.strip(str1)
    str2 = module.exports.strip(str2)

    var compare = diff
      .diffChars(str1, str2)
      .filter(p => !p.added && !p.removed)
      .map(p => p.value)
      .join('')

    return compare === str1 || compare === str2
  }
}

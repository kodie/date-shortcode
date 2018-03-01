import test from 'ava'

const dateShortcode = require('.')

var date1 = new Date('2001-11-17T19:37:22+00:00').toLocaleString('en-US', {timeZone: 'America/Chicago'})
var date2 = new Date('1992-04-07T04:48:07+00:00').toLocaleString('en-US', {timeZone: 'America/Chicago'})

test('General', t => {
  var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}'
  var parsed = dateShortcode.parse(str, date1)
  t.is(parsed, 'It is 1:37 PM on the 17th day of November 2001')
})

test('Month formats', t => {
  var str = 'Month formats: {MMMM MMM MM Mo M}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Month formats: April Apr 04 4th 4')
})

test('Quater formats', t => {
  var str = 'Quater formats: {Qo Q}'
  var parsed = dateShortcode.parse(str, date1)
  t.is(parsed, 'Quater formats: 4th 4')
})

test('Day of Year formats', t => {
  var str = 'Day of Year formats: {DDDD DDDo DDD}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Day of Year formats: 097 97th 97')
})

test('Day of Month formats', t => {
  var str = 'Day of Month formats: {DD Do D}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Day of Month formats: 06 6th 6')
})

test('Day of Week formats', t => {
  var str = 'Day of Week formats: {dddd ddd dd do d}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Day of Week formats: Monday Mon Mo 1st 1')
})

test('Week of Year formats', t => {
  var str = 'Week of Year formats: {ww wo w}'
  var parsed = dateShortcode.parse(str, date1)
  t.is(parsed, 'Week of Year formats: 47 47th 47')
})

test('Year formats', t => {
  var str = 'Year formats: {YYYY YY}'
  var parsed = dateShortcode.parse(str, date1)
  t.is(parsed, 'Year formats: 2001 01')
})

test('AM/PM formats', t => {
  var str = 'AM/PM formats: {A a}'
  var parsed = dateShortcode.parse(str, date1)
  t.is(parsed, 'AM/PM formats: PM pm')
})

test('Hour formats', t => {
  var str = 'Hour formats: {kk k hh h HH H}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Hour formats: 24 24 11 11 23 23')
})

test('Minute formats', t => {
  var str = 'Minute formats: {mm m}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Minute formats: 48 48')
})

test('Second formats', t => {
  var str = 'Second formats: {ss s}'
  var parsed = dateShortcode.parse(str, date2)
  t.is(parsed, 'Second formats: 07 7')
})

test('Strip function', t => {
  var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}'
  var parsed = dateShortcode.strip(str)
  t.is(parsed, 'It is  on the  day of ')
})

test('Test function true', t => {
  var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}'
  var parsed = dateShortcode.parse(str)
  var tested = dateShortcode.test(str, parsed)
  t.true(tested)
})

test('Test function false', t => {
  var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}'
  var str2 = 'This string isnt anything like the one above'
  var tested = dateShortcode.test(str, str2)
  t.false(tested)
})

test('Config function', t => {
  var dateShortcode2 = dateShortcode.config({ openTag: '\\[', closeTag: '\\]' })
  var str = 'It is [h:mm A] on the [Do] day of [MMMM YYYY]'
  var parsed = dateShortcode2.parse(str, date1)
  t.is(parsed, 'It is 1:37 PM on the 17th day of November 2001')
})

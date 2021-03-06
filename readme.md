# date-shortcode

[![npm package version](https://img.shields.io/npm/v/date-shortcode.svg?style=flat-square)](https://www.npmjs.com/package/date-shortcode)
[![Travis build status](https://img.shields.io/travis/kodie/date-shortcode.svg?style=flat-square)](https://travis-ci.org/kodie/date-shortcode)
[![npm package downloads](https://img.shields.io/npm/dt/date-shortcode.svg?style=flat-square)](https://www.npmjs.com/package/date-shortcode)
[![code style](https://img.shields.io/badge/code_style-standard-yellow.svg?style=flat-square)](https://github.com/standard/standard)
[![license](https://img.shields.io/github/license/kodie/date-shortcode.svg?style=flat-square)](license.md)

A small and simple date shortcode library.

## Installation

```shell
npm install --save date-shortcode
```

## Usage

```javascript
const dateShortcode = require('date-shortcode')

var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}.'
dateShortcode.parse(str)
//=> 'It is 3:26 PM on the 1st day of March 2018.'
```

### API

#### codes([ date ])

Returns an `Array` containing all possible codes, their current values, descriptions, and examples.

##### Parameters

###### date (`String`/`Date`)

*Optional*

A Date object or a String to pass to a Date object. Defaults to now.

##### Example

```javascript
dateShortcode.codes('2007-06-12')
//=> [ { code: 'MMMM',
//=>     value: 'June',
//=>     description: 'Month',
//=>     example: 'January February ... November December' },
//=>   { code: 'MMM',
//=>     value: 'Jun',
//=>     description: 'Month (3 characters)',
//=>     example: 'Jan Feb ... Nov Dec' },
//=>   { code: 'MM',
//=>     value: '06',
//=>   ...
```

#### config(conf)

Change configuration parameters. Returns an instance of `date-shortcode`.

##### Parameters

###### conf (`Object`)

The configuration parameters to change.

##### Example

```javascript
var dateShortcodeConfig = {
  openTag: '\\[',
  closeTag: '\\]'
}

const dateShortcode = require('date-shortcode').config(dateShortcodeConfig)

var str = 'It\'s the [wo] week of \'[YY]!'
dateShortcode.parse(str)
//=> "It's the 9th week of '18!"
```


#### parse(str, [ date ])

Parse a String with [date shortcodes](#shortcodes) in it. Returns a String.

##### Parameters

###### str (`String`)

The String to do the parsing on.

###### date (`String`/`Date`)

*Optional*

A Date object or a String to pass to a Date object. Defaults to now.

##### Example

```javascript
var str = 'Current date: {MMMM Do, YYYY}'
dateShortcode.parse(str, '2006-10-09')
//=> 'Current date: October 9th, 2006'
```


#### strip(str)

Strip [date shortcodes](#shortcodes) from a string.

##### Parameters

###### str (`String`)

The string to strip date shortcodes from.

##### Example

```javascript
var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}.'
dateShortcode.strip(str)
//=> 'It is  on the  day of .'
```


#### test(str1, str2)

Test if two Strings would be the same without [date shortcodes](#shortcodes).

##### Parameters

###### str1 (`String`)

First string to test.

###### str2 (`String`)

Second string to test.

##### Example

```javascript
var str1 = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}.'
var str2 = 'It is 3:26 PM on the 1st day of March 2018.'
dateShortcode.test(str1, str2)
//=> true

var str3 = 'This string is nothing like the rest.'
dateShortcode.test(str1, str3)
//=> false
```

##### Note

This function will return `true` if the two supplied strings are very similar.

For example:

```javascript
var str1 = 'Hey, it\'s {h}!'
var str2 = 'Hey, it\'s Bob!'
dateShortcode.test(str1, str2)
//=> true

var str1 = 'Hey, it\'s {h} o\'clock!'
var str2 = 'Hey, it\'s Bob Saget!'
dateShortcode.test(str1, str2)
//=> false
```

### Shortcodes

These are the codes that you can use with the above functions. They are case-sensitive. You may use a combination of multiple codes as well as non-shortcode characters in a set of brackets (i.e `{H:mmA} {M/D/YY}`).

| Description                    | Code  | Example                                  |
|--------------------------------|-------|------------------------------------------|
| Month                          | MMMM  | January February ... November December   |
| Month (3 characters)           | MMM   | Jan Feb ... Nov Dec                      |
| Month Number (Padded)          | MM    | 01 02 ... 11 12                          |
| Month Number (Suffixed)        | Mo    | 1st 2nd ... 11th 12th                    |
| Month Number                   | M     | 1 2 ... 11 12                            |
| Quarter (Suffixed)             | Qo    | 1st 2nd 3rd 4th                          |
| Quarter                        | Q     | 1 2 3 4                                  |
| Day of Year (Padded)           | DDDD  | 001 002 ... 364 365                      |
| Day of Year (Suffixed)         | DDDo  | 1st 2nd ... 364th 365th                  |
| Day of Year                    | DDD   | 1 2 ... 364 365                          |
| Day of Month (Padded)          | DD    | 01 02 ... 30 31                          |
| Day of Month (Suffixed)        | Do    | 1st 2nd ... 30th 31st                    |
| Day of Month                   | D     | 1 2 ... 30 31                            |
| Day of Week                    | dddd  | Sunday Monday ... Friday Saturday        |
| Day of Week (3 characters)     | ddd   | Sun Mon ... Fri Sat                      |
| Day of Week (2 characters)     | dd    | Su Mo ... Fr Sa                          |
| Day of Week Number (Suffixed)  | do    | 0th 1st ... 5th 6th                      |
| Day of Week Number             | d     | 0 1 ... 5 6                              |
| Week of Year (Padded)          | ww    | 01 02 ... 52 53                          |
| Week of Year (Suffixed)        | wo    | 1st 2nd ... 52nd 53rd                    |
| Week of Year                   | w     | 1 2 ... 52 53                            |
| Year                           | YYYY  | 1970 1971 ... 2029 2030                  |
| Year (2 characters)            | YY    | 70 71 ... 29 30                          |
| AM/PM                          | A     | AM PM                                    |
| am/pm                          | a     | am pm                                    |
| Hour (24 hours/Padded)         | kk    | 01 02 ... 23 24                          |
| Hour (24 hours)                | k     | 1 2 ... 23 24                            |
| Hour (12 hours/Padded)         | hh    | 01 02 ... 11 12                          |
| Hour (12 hours)                | h     | 1 2 ... 11 12                            |
| Hour (24 hours/0-Index/Padded) | HH    | 00 01 ... 22 23                          |
| Hour (24 hours/0-Index)        | H     | 0 1 ... 22 23                            |
| Minute (Padded)                | mm    | 00 01 ... 58 59                          |
| Minute                         | m     | 0 1 ... 58 59                            |
| Second (Padded)                | ss    | 00 01 ... 58 59                          |
| Second                         | s     | 0 1 ... 58 59                            |

## License
MIT. See the [license.md file](license.md) for more info.

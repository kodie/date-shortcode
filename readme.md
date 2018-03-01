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

#### config(conf)

Change `date-shortcode` configuration parameters.

##### Parameters

###### conf (Object)

An object containing the configuration parameters to change.

##### Example

```javascript
var dateShortcodeConfig = {
  openTag: '\\[',
  closeTag: '\\]'
}

const dateShortcode = require('date-shortcode').config(dateShortcodeConfig)
```


#### parse(str, [ date ])

Parse a string with [date shortcodes](#shortcodes) in it.

##### Parameters

###### str (String)

The string to do the parsing on.

###### date (String/Date)

*Optional*

A date object or a string to pass to a date object. Defaults to now.

##### Example

```javascript
var str = 'Current date: {MMMM Do, YYYY}'
dateShortcode.parse(str, '2006-10-09')
//=> 'Current date: October 9th, 2006'
```


#### strip(str)

Strip date shortcodes from a string.

##### Parameters

###### str (String)

The string to strip [date shortcodes](#shortcodes) from.

##### Example

```javascript
var str = 'It is {h:mm A} on the {Do} day of {MMMM YYYY}.'
dateShortcode.strip(str)
//=> 'It is  on the  day of .'
```


#### test(str1, str2)

Test if two strings would be the same without [date shortcodes](#shortcodes).

##### Parameters

###### str1 (String)

First string to test

###### str2 (String)

Second string to test

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

### Shortcodes

| Description                    | Token | Output                                   |
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

var date = new Date(2019, 1, 5)
// Date对象的月份从0到11，所以当前月减一才能得到当前月
// Date对象越界时自动退减位
console.log(date)
console.log(date.getDate()) // 根据本地时间返回指定日期对象的月份中的第几天（1-31）。
// 周一到周日 [1,2,3,4,5,6,0]
console.log(date.getDay()) // 根据本地时间返回指定日期对象的星期中的第几天（0-6）。
console.log(date.getFullYear()) // 根据本地时间返回指定日期对象的年份（四位数年份时返回四位数字）。
console.log(date.getMonth()) // 根据本地时间返回指定日期对象的月份（0-11）。

// 当月第一天 new Date(year, month-1, 1)
var firstDayOfTheMonth = new Date(2019, 1, 1)
console.log(firstDayOfTheMonth)

// 当月最后一天 new Date(year, month, 0)
// 由于不确定当月最后一天为31、30还是28，所以用下个月第0天，退位后即为当月最后一天
var lastDayOfTheMonth = new Date(2019, 2, 0)
console.log(lastDayOfTheMonth)

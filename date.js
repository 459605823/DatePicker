(function(){
  var datePicker = {}

  datePicker.getMonthData = function(year, month) {
    // 结果数组
    var ret = []
    // 如果没有传递参数，就以当前日期作为默认参数
    if(!year || !month) {
      var today = new Date()
      year = today.getFullYear()
      month = today.getMonth() + 1
    }
    // 当月的第一天
    var firstDay = new Date(year, month - 1, 1)
    // 获取第一天是周几
    var firstDayWeekday = firstDay.getDay()
    if(firstDayWeekday === 0) firstDayWeekday === 7

    year = firstDay.getFullYear()
    month = firstDay.getMonth() + 1

    // 上个月的最后一天
    var lastDayOfLastMonth = new Date(year, month - 1, 0)
    // 获取上个月最后一天的日期
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate()
    // 需要在日历上显示多少个上个月的日期
    var preMonthDayCount = firstDayWeekday - 1
    // 当月的最后一天
    var lastDay = new Date(year, month, 0)
    var lastDate = lastDay.getDate()

    for(var i = 0; i < 42; i++){
      // 当前循环对应的日期，可能越界
      var date = i + 1 - preMonthDayCount
      // 真正渲染的日期
      var showDate = date
      var thisMonth = month
      // 处理边界情况
      if(date <= 0){
        //上个月
        thisMonth = month - 1
        showDate = lastDateOfLastMonth + date
      } else if(date > lastDate){ // 下个月
        thisMonth = month + 1
        showDate = date - lastDate
      }
      // 上一年
      if(thisMonth === 0) thisMonth = 12
      // 下一年
      if(thisMonth === 13) thisMonth = 1

      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }
    return {
      year: year,
      month: month,
      days: ret
    }
  }

  window.datePicker = datePicker
})();

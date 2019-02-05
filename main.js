(function(){
  var datePicker = window.datePicker
  var monthData, $wrapper
  // 渲染数据
  datePicker.buildUi = function(year, month) {
    monthData = datePicker.getMonthData(year, month)
    var html = `
    <div class="datePicker-header">
      <a href="#" class="datePicker-btn datePicker-prev-btn">&lt;</a>
      <a href="#" class="datePicker-btn datePicker-next-btn">&gt;</a>
      <span class="datePicker-curr-month">${monthData.year}-${monthData.month}</span>
    </div>
    <div class="datePicker-body">
      <table>
        <thead>
          <tr>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
            <th>日</th>
          </tr>
        </thead>
        <tbody>
        `
        for(var i=0;i<monthData.days.length;i++){
          var date = monthData.days[i]
          if(i % 7 === 0){ // 一行开头
            html += '<tr>'
          }
          html += '<td data-date="'+date.date+'">' + date.showDate + '</td>'
          if(i % 7 === 6){ // 一行结尾
            html += '</tr>'
          }
        }
        html += `
        </tbody>
      </table>
    </div>
    `
    return html
  }

  datePicker.render = function (dir) {
    var year,month
    if(monthData) { //当MonthData存在时才获取
      year = monthData.year
      month = monthData.month
    }
    if(dir === 'prev') {
      if(month <= 1) {
        month = 12
        year--
      }else {
        month--
      }
    }
    if(dir === 'next') {
      if(month > 11) {
        month = 1
        year++
      }else {
        month++
      }
    }
    var html = datePicker.buildUi(year, month)
    $wrapper = document.querySelector('.datePicker-wrapper')
    if(!$wrapper) { // wrapper元素只在初始时创建，之后仅改变其内容
      $wrapper = document.createElement('div')
      $wrapper.className = 'datePicker-wrapper'
      document.body.appendChild($wrapper)
    }
    $wrapper.innerHTML = html
  }

  datePicker.init = function (input) {
    datePicker.render() // 初始渲染不传递参数
    var $input = document.querySelector(input)
    var isOpen = false
    // addEventListener第三个参数为true表示捕获（从外向里），为false表示冒泡（从里向外）
    $input.addEventListener('click', function(){ // 点击输入框后显示日期
      if(!isOpen) {
        $wrapper.classList.add('datePicker-wrapper-show')
        isOpen = true
        // 日历始终定位在输入框下方
        var left = $input.offsetLeft
        var top = $input.offsetTop
        var height = $input.offsetHeight
        $wrapper.style.top = top + height + 2 + 'px'
        $wrapper.style.left = left + 'px'
      } else if(isOpen) { // 再次点击隐藏
        $wrapper.classList.remove('datePicker-wrapper-show')
        isOpen = false
      }
    }, false)
    // 利用父元素事件冒泡为其子元素绑定事件
    // 因为wrapper一直存在，而按钮在每次数据切换时都会被销毁和重新渲染
    $wrapper.addEventListener('click', function(e){
      var target = e.target
      if(!target.classList.contains('datePicker-btn')) return
      if(target.classList.contains('datePicker-prev-btn')){
          datePicker.render('prev')
      } else if(target.classList.contains('datePicker-next-btn')){
          datePicker.render('next')
      }
    }, false)
    $wrapper.addEventListener('click', function(e){
      var target = e.target
      if(target.tagName.toLowerCase() !== 'td') return
      // dataset获取dom中自定义data-*数据集
      var date = new Date(monthData.year, monthData.month - 1, target.dataset.date)
      $input.value = format(date)
      $wrapper.classList.remove('datePicker-wrapper-show')
      isOpen = false
    }, false)
  }

  function format(date) {
    var preFix = function(num) {
      if(num <= 9){
        return '0' + num
      }
      return num
    }
    var ret = `${date.getFullYear()}-${preFix(date.getMonth() + 1)}-${preFix(date.getDate())}`
    return ret
  }
})()

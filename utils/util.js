function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function urlParam(name){
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);

  if (!results) {
    return '';
  }

  return results[1] || '';
}



module.exports = {
  formatTime: formatTime,
  urlParam: urlParam
}

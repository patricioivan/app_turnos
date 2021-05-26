var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date('2021/02/19');
var dayName = days[d.getDay()];

console.log(dayName)
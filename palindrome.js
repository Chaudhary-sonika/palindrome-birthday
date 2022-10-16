var dateInputRef = document.querySelector("#date-input");
var showBtnRef = document.querySelector("#ans-btn");
var resultRef = document.querySelector("#output");

function reverseStr(str) {
    var charsList = str.split("");
    var reverseCharList = charsList.reverse();
    var reversedStr = reverseCharList.join("");
    return reversedStr;
}
function isPalindromeDOB(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}
function convertDataToStr(date) {
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;  
}
function allDateSet(date) {
    var dateStr = convertDataToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  function isPalindromeForAllDateSet(date){
    var listOfPalindromes = allDateSet(date);
  
    var flag = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindromeDOB(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
    
    return flag;
  }
  function checkLeapYr(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  function nextDateIs(date){
    var day = date.day + 1; 
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month ===2) {
        if (checkLeapYr(year)) {
            If (day > 29); {
                day = 1;
                month++;
            }
        } else {
            if (day >28){
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day:day,
        month: month,
        year: year
    };
 }
  function takeNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = nextDateIs(date);
  
    while(1){
      ctr++;
      var isPalindrome = isPalindromeForAllDateSet(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = nextDateIs(nextDate);
    }
    return [ctr, nextDate];
  }


function btnClick(e){
    var bdayStr = dateInputRef.value; 
    
    if(bdayStr !== ''){
      var listOfDate = bdayStr.split('-'); 
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = isPalindromeForAllDateSet(date);
  
      if(isPalindrome){
         resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
      }
      else {
        var [ctr, nextDate] = takeNextPalindromeDate(date);
  
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
      }
    }
  }
  
  showBtnRef.addEventListener('click', btnClick);
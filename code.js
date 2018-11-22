
var today = new Date();
var TodayYear = today.getFullYear();
var TodayMonth = today.getMonth()+1;
var TodayDay = today.getDate();
var Tday = TodayYear + "-" + TodayMonth + "-" + TodayDay;
var eventName ;
// get date and name ,by selecting an option except birthday,calculate button enabled
function DropOption(item){
	var SelectItemValue= item.value;
	eventName = item.options[item.selectedIndex].text;
	document.getElementById("ResultScreen").style.display = "none";
	if(SelectItemValue != ""){
		
		if (SelectItemValue == "YB") { // check if birthday are chosen,display date input
			document.getElementById("lb").style.display = "block";
			document.getElementById("Date").style.display = "block";
			document.getElementById("CalculateButton").disabled = true;
			document.getElementById("Date").setAttribute("min",Tday);
		}
		else{
			
			document.getElementById("lb").style.display = "none";
			document.getElementById("Date").style.display = "none";

			document.getElementById("CalculateButton").disabled = false;

		}
	}	

}
//when got birthday date,from date input,enable calculate button
function getBirthday(){
	if(document.getElementById("Date").value !=""){
		document.getElementById("CalculateButton").disabled = false;
	}
}
	
function CalculateFunction(){
	
	var year = -1,month,day;
	
	// birthday date
	if (document.getElementById("service").value == "YB"){
		year = document.getElementById("Date").value.substring(0, 4);
		month = document.getElementById("Date").value.substring(5, 7);
		day = document.getElementById("Date").value.substring(8, 10);

	}
	//find the date of the next event(if it is in next year,or the same year)
	else{
		month = parseInt(document.getElementById("service").value.substring(0, 2));
		day = parseInt(document.getElementById("service").value.substring(3, 5));
		if((TodayMonth > month) ||(TodayMonth == month && TodayDay == day) ){
			year = TodayYear + 1;
		}
		
		else if(TodayMonth== month){
			if(TodayDay > day){
				year = TodayYear + 1;
			}
			else{
				year = TodayYear;
			}
			
		}
		else{
			year = TodayYear;
		}

	}
	// create date object of today and selected option
	var todayDate = new Date(Tday);
	var eventDate = new Date(year + "-" + month + "-" + day);
	var dayDiff = Math.floor((eventDate - todayDate)/(1000*60*60*24)); // day difference between today and selected option
	var week = parseInt(dayDiff/7) ; // calculate number of week
	var weekLeftDay = dayDiff%7 ; 
	
	// show the results
	document.getElementById("ResultScreen").style.display = "block";
	document.getElementById("ResultScreen").innerHTML = "The next " + eventName+" is in <strong> "+dayDiff + " </strong> " + DaysOrWeeks("day",dayDiff)+" from today.<br><br>";
	if(week > 1){
		document.getElementById("ResultScreen").innerHTML += "In other word,it is <strong> " + week + "</strong> "+DaysOrWeeks("week",week) ;
		if(weekLeftDay!=0){
			document.getElementById("ResultScreen").innerHTML += " and <strong> " + weekLeftDay + "</strong> "+ DaysOrWeeks("day",weekLeftDay);
		}
		document.getElementById("ResultScreen").innerHTML +=".";
		
	}	
		
}
//check if it is day or days,week or weeks
function DaysOrWeeks(str,num){
	if(str == "day"){
		if(num > 1){
			return "days"
		}
		else{
			return "day"
		}
	}
	else {
		if(num > 1){
			return "weeks"
		}
		else{
			return "week"
		}
	}
}


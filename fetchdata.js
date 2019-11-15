let $ = function (id) { return document.getElementById(id); };

//Main function for getting the Weather Data from API
let getData = function () {
	
	let request = new XMLHttpRequest();
	let cityField = $("city");
	
	let city = cityField.value;
	
	var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&mode=xml&units=metric&APPID=e4de365056f5a84bc47a15a71227f389";
	if(request) {
		request.onreadystatechange = function () {
			parseResponse(request);
		};

		request.open("GET", url, true);
		request.send();
	}
};
//function to parse the data obtained from API
let parseResponse = function(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			let xmlDoc = request.responseXML;
			let weatherData = xmlDoc.getElementsByTagName('weatherdata');
			let symbolid =  weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('symbol')[0].getAttribute('var').substr(0,2);
			let logoimg = $('documentIconImg');

			let box = $('box');
			switch(symbolid) {
				case '01':
					box.style.backgroundImage = 'url(images/clear.jpg)';
					logoimg.src = "logos/sun.png"
					break;
				case '02':
					box.style.backgroundImage = 'url(images/clouds.jpg)';
					logoimg.src = "logos/cloudy.png"
					break;
				case '03':
					box.style.backgroundImage = 'url(images/clouds.jpg)';
					logoimg.src = "logos/cloudy.png"
					break;
				case '04':
					box.style.backgroundImage = 'url(images/clouds.jpg)';
					logoimg.src = "logos/cloudy.png"
					break;
				case '09':
					box.style.backgroundImage = 'url(images/rain.jpg)';
					logoimg.src = "logos/rain.png"
					break;
				case '10':
					box.style.backgroundImage = 'url(images/rain.jpg)';
					logoimg.src = "logos/rain.png"
					break;
				case '11':
					box.style.backgroundImage = 'url(images/storm.jpg)';
					logoimg.src = "storm/cloudy.png"
					break;
				case '13':
					box.style.backgroundImage = 'url(images/snow.jpg)';
					logoimg.src = "logos/snow.png"
					break;
				case '50':
					box.style.backgroundImage = 'url(images/snow.jpg)';
					logoimg.src = "logos/snow.png"
					break;
				default:
					break;	
			}
			
			
			let city = weatherData[0].getElementsByTagName('location')[0].getElementsByTagName('name')[0].firstChild.nodeValue;
			let temperatureData = weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('temperature')[0].getAttribute('value');
			let  weatherDescriptionData = weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('symbol')[0].getAttribute('name');
			let windspeedData = weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('windSpeed')[0].getAttribute('mps');
			let humidityData = weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('humidity')[0].getAttribute('value');
			
			let day1day = $('day1day');
			let day2day = $('day2day');
			let day3day = $('day3day');
			let day4day = $('day4day');
			let day5day = $('day5day');
			
			let d = new Date();	
			let timeData =  d.getDay();

			day1day.innerHTML = getDay(timeData);
			day2day.innerHTML = getDay(timeData+1);
			day3day.innerHTML = getDay(timeData+2);
			day4day.innerHTML = getDay(timeData+3);
			day5day.innerHTML = getDay(timeData+4);
			
			let daylabel = [getDay(timeData),getDay(timeData+1),getDay(timeData+2),getDay(timeData+3),getDay(timeData+4)]


			let day1maxaverage = calculateAverageofDay(0,8, weatherData,"max");
			let day2maxaverage = calculateAverageofDay(8,16, weatherData, "max");
			let day3maxaverage = calculateAverageofDay(16,24, weatherData, "max");
			let day4maxaverage = calculateAverageofDay(24,32, weatherData, "max");
			let day5maxaverage = calculateAverageofDay(32,40, weatherData, "max");

			let day1minaverage = calculateAverageofDay(0,8, weatherData, "min");
			let day2minaverage = calculateAverageofDay(8,16, weatherData, "min");
			let day3minaverage = calculateAverageofDay(16,24, weatherData, "min");
			let day4minaverage = calculateAverageofDay(24,32, weatherData, "min");
			let day5minaverage = calculateAverageofDay(32,40, weatherData, "min");

			
			let cityheader = $('cityHeader');
			let temperature = $('temperature');
			let weatherDescriptionHeader = $('weatherDescriptionHeader');
			let windSpeed = $('windSpeed');
			let humidity = $('humidity');
			let minmaxDiv1 = $('minmaxDiv1');
			let minmaxDiv2 = $('minmaxDiv2');
			let minmaxDiv3 = $('minmaxDiv3');
			let minmaxDiv4 = $('minmaxDiv4');
			let minmaxDiv5 = $('minmaxDiv5');
		   
			let symbolid1 =  weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[0].getElementsByTagName('symbol')[0].getAttribute('var').substr(0,2);
			let symbolid2 =  weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[8].getElementsByTagName('symbol')[0].getAttribute('var').substr(0,2);
			let symbolid3 =  weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[16].getElementsByTagName('symbol')[0].getAttribute('var').substr(0,2);
			let symbolid4 =  weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[24].getElementsByTagName('symbol')[0].getAttribute('var').substr(0,2);
			let symbolid5 =  weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[32].getElementsByTagName('symbol')[0].getAttribute('var').substr(0,2);

			
			
			let day1img = $('day1');
			let day2img = $('day2');
			let day3img = $('day3');
			let day4img = $('day4');
			let day5img = $('day5');
			
			day1img.src = getImageUrl(symbolid1);
			day2img.src = getImageUrl(symbolid2);
			day3img.src = getImageUrl(symbolid3);
			day4img.src = getImageUrl(symbolid4);
			day5img.src = getImageUrl(symbolid5);

			cityheader.innerHTML = city;
			temperature.innerHTML = Math.floor(temperatureData)+"&deg;C ~ ";
			weatherDescriptionHeader.innerHTML = weatherDescriptionData.charAt(0).toUpperCase()+weatherDescriptionData.slice(1)+"~";
			minmaxDiv1.innerHTML = "Max:"+day1maxaverage+" Min:"+day1minaverage;
			minmaxDiv2.innerHTML = "Max:"+day2maxaverage+" Min:"+day2minaverage;
			minmaxDiv3.innerHTML = "Max:"+day3maxaverage+" Min:"+day3minaverage;
			minmaxDiv4.innerHTML = "Max:"+day4maxaverage+" Min:"+day4minaverage;
			minmaxDiv5.innerHTML = "Max:"+day5maxaverage+" Min:"+day5minaverage;
			weatherContainer.style.visibility = "visible";
			minarr = [day1minaverage,day2minaverage,day3minaverage,day4minaverage,day5minaverage];
			maxarr = [day1maxaverage,day2maxaverage,day3maxaverage,day4maxaverage,day5maxaverage,];
			getChart(minarr, maxarr, daylabel);
		}
	}
	 
};
//function to get the Days of the Week according to today's Day
function getDay(num) {
	let day = "";
	if(num == 1 || num == 8) {
		day = "MON";
	} else if(num == 2 || num == 9) {
		day="TUE";
	} else if(num == 3 || num == 10) {
		day="WED";
	} else if(num == 4 || num == 11) {
		day="THUR";
	} else if(num == 5 || num == 12) {
		day="FRI";
	} else if(num == 6) {
		day="SAT";
	} else if(num == 7) {
		day="SUN";
	 } 
	return day;
}

//To get the Image url accroding to the symbol Id of weather Image
function getImageUrl(symbolid) {
	let url = "";
	switch(symbolid) {
		case '01':
			url = "logos/sun.png"
			break;
		case '02':
			url = "logos/cloudy.png"
			break;
		case '03':
			url = "logos/cloudy.png"
			break;
		case '04':
			url = "logos/cloudy.png"
			break;
		case '09':
			url = "logos/rain.png"
			break;
		case '10':
			url = "logos/rain.png"
			break;
		case '11':
			url = "storm/cloudy.png"
			break;
		case '13':
			url = "logos/snow.png"
			break;
		case '50':
			url = "logos/snow.png"
			break;
		default:
			break;	
	}
	return url;
}

//To get minimum and max temerature 
function calculateAverageofDay(index1, index2, weatherData, minmax) {
	let temps = [];
	let val = 0;
	let times = weatherData[0].getElementsByTagName('forecast')[0].getElementsByTagName('time');
	for(let i = index1; i < index2; i++) {
		temps.push(parseFloat(times[i].getElementsByTagName('temperature')[0].getAttribute(minmax)));
	}
	if(minmax == "max") {
		let value = temps.reduce(function(a, b) {
			return Math.max(a, b);
		});
		val = value;
		
	} else if(minmax == "min") {
		let value = temps.reduce(function(a, b) {
			return Math.min(a, b);
		});
		val = value;
	}
	return Math.floor(val);	
}

//to get chart data
let getChart = function(minarr, maxarr, daylabel) {
	var lineChartData = {
		labels: daylabel,
		datasets: [{
			label: 'Maximum Temperature',
			fill: false,
			data: maxarr,backgroundColor: ['rgba(54, 162, 235, 0.2)'],
			backgroundColor : ['rgb(231,233,237)'],
			borderColor: ['rgb(231,233,237)'],
			fill: "-1",
			yAxisID: 'y-axis-1',
		}, {
			label: 'Minimum Temperature',
			fill: false,
			data: minarr,backgroundColor: [
			'rgba(255, 99, 132, 0.2)'],
			borderColor: [
			'rgba(255, 99, 132, 1)'],
			fill: "-1"
		}]
	};

		var ctx = document.getElementById('canvas').getContext('2d');
		window.myLine = Chart.Line(ctx, {
			data: lineChartData,
			options: {
				responsive: true,
				hoverMode: 'index',
				stacked: false,
				title: {
					display: true,
					text: 'Minimum and Maximum Temperature Chart'
				},
				scales: {
					yAxes: [{
						type: 'linear', 
						display: true,
						position: 'left',
						id: 'y-axis-1',
					}, {
						gridLines: {
							drawOnChartArea: false, 
						},
					}],
				}
			}
		});

}
// to get search suggestions
let searchCity = function (val) {
	let request = new XMLHttpRequest();
	getcityurl = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix="+val;
	if(request) {
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 304) {
					var jsonObj = JSON.parse(request.responseText);
					datalist = $("cityname");
					if(datalist.hasChildNodes()) {
						while(datalist.firstChild) {
							datalist.removeChild(datalist.firstChild);
						}
					}
					for(i=0;i<jsonObj.data.length;i++) {
						let cities = document.createElement("option");
					//	cities.setAttribute("value",jsonObj.data[i].city+", "+jsonObj.data[i].country+" ( "+jsonObj.data[i].countryCode+" )");
						cities.setAttribute("value",jsonObj.data[i].city);
						datalist.appendChild(cities);
					}
				}	
			}	
		};

		request.open("GET", getcityurl, true);
		request.send();
	}
};


window.onload = function(){

	$("city").addEventListener('input', () => searchCity(city.value));
	$("city").focus();	
};
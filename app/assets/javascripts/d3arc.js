//create or edit event tool

var width = window.innerHeight, height = window.innerHeight, radius = (window.innerHeight*0.55)/2;

var now = new Date();

var decimalHour = now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600;

var radians = Math.PI*2;

var decimalHourDegrees = ((decimalHour/24)*360);

var svg = d3.select("#clock")
	.append("svg")
	.attr("width", width)
	.attr("height", height*0.79);

	var rootGroup = svg.append("g")
		.attr("transform", "translate(0,"+height*-0.135+")");




	// year circle
		
		var yearCircle = rootGroup.append("g")
							.attr("transform", "translate("+width/2+","+height/2+")")
							.attr("id", "yearCircle");

			var yearRadius = radius * 1.3;

			var monthWkArcInnerR = yearRadius * 0.1;

			var monthWkArcOuterR = yearRadius * 0.14;

			var yearCircleShape = yearCircle.append("circle")
									.attr("cx", 00)
									.attr("cy", 00)
									.attr("r", yearRadius)
									.attr("fill", function() {return "url(#dayGrad)";});

			var dayGrads = yearCircle.append("radialGradient")
								.attr("gradientUnits", "userSpaceOnUse")
								.attr("cx", 0)
								.attr("cy", 0)
								.attr("r", "50%")
								.attr("id", "dayGrad");

			dayGrads.append("stop").attr("offset", "0%").style("stop-color", "rgba(50,70,90,1)");
			dayGrads.append("stop").attr("offset", "100%").style("stop-color", "rgba(10,10,10,1)");

		var sunday2014wk1 = 16061;

		var sunday2015wk1 = 16425;

		var currentWkSunday;

		var todayWkDay = now.getDay();

		var epoch = now.getTime();

		var epochDay = Math.floor(epoch/8.64e7);

		var eventDay;

		var eventDate;

		var dateForDisplay;

		var eventDayWkDay = (eventDay - sunday2015wk1) % 7;

		var dayField = document.getElementById("event_day");

		var monthDaysTextRadius = yearRadius * -0.16;

		if (eventDay) {		// editing an existing event
			eventDay = eventDay;	
			currentWkSunday = eventDay - eventDayWkDay;
			eventDate = new Date((eventDay+1)*8.64e7);
			dateForDisplay = eventDate.getMonth()+1+"/"+eventDate.getDate()+"/"+eventDate.getYear().toString().substr(1,2);
			}
			else {			// creating a new event
			eventDay = epochDay;
			currentWkSunday = epochDay - todayWkDay;
			dateForDisplay = now.getMonth()+1+"/"+now.getDate()+"/"+now.getYear().toString().substr(1,2);
		};
		
		dayField.value =  eventDay;

		var eventWk = Math.round((currentWkSunday-(sunday2015wk1-3))/7);

		assignWk(eventWk);
			console.log(eventWk);

		function assignWk(selectedWk) {
			currentWkSunday = (selectedWk * 7) + sunday2015wk1;
		};

		// jan circle
			var janCircle = yearCircle.append("g")
									.attr("id", "jan")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(15), translate(0," + (yearRadius * -0.78) + "), rotate(-15), scale(1,1)");

				var janCircleShape = janCircle.append("circle")
										.attr("class", "winterMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var janText = janCircle.append("text")
										.attr("y", 4)
										.text("Jan");

					var janDaysText = [];

					for (var j=1; j<32; j++) {
						janDaysText.push(j);
					};

					var janDaysAngleOffset = 360 / janDaysText.length;

					var janDText = janCircle.selectAll("#janDaysText")
						.data(janDaysText)
						.enter()
						.append("text")
						.attr("id", "janDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*janDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(janDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});

					var janwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/janDaysText.length)*radians)
						.endAngle((2.8/janDaysText.length)*radians);

					var janwk1path = janCircle.append("path")
						.attr("d", janwk1arc)
						.attr("class", function(){
							if (eventWk == 53)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(53);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var janwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((3/janDaysText.length)*radians)
						.endAngle((9.8/janDaysText.length)*radians);

					var janwk2path = janCircle.append("path")
						.attr("d", janwk2arc)
						.attr("class", function(){
							if (eventWk == 54)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(54);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var janwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((10/janDaysText.length)*radians)
						.endAngle((16.8/janDaysText.length)*radians);

					var janwk3path = janCircle.append("path")
						.attr("d", janwk3arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(55);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var janwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((17/janDaysText.length)*radians)
						.endAngle((23.8/janDaysText.length)*radians);

					var janwk4path = janCircle.append("path")
						.attr("d", janwk4arc)
						.attr("class", function(){
							if (eventWk == 56)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(56);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var janwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((24/janDaysText.length)*radians)
						.endAngle((30.8/janDaysText.length)*radians);

					var janwk5path = janCircle.append("path")
						.attr("d", janwk5arc)
						.attr("class", function(){
							if (eventWk == 57)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(57);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var janwk6arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((31/janDaysText.length)*radians)
						.endAngle((31.8/janDaysText.length)*radians);

					var janwk6path = janCircle.append("path")
						.attr("d", janwk6arc)
						.attr("class", function(){
							if (eventWk == 58)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(58);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});
						

		// feb circle
			var febCircle = yearCircle.append("g")
									.attr("id", "feb")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(45), translate(0," + (yearRadius * -0.78) + "), rotate(-45)");

				var febCircleShape = febCircle.append("circle")
										.attr("class", "winterMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18)
										.attr("fill", "#3cf");

					var febText = febCircle.append("text")
										.attr("y", 4)
										.text("Feb");

					var febDaysText = [1];

					for (var j=2; j<29; j++) {
						febDaysText.push(j);
					};

					var febDaysTextRadius = yearRadius * -0.156;
					var febDaysAngleOffset = 360 / febDaysText.length;

					var febDText = febCircle.selectAll("#febDaysText")
						.data(febDaysText)
						.enter()
						.append("text")
						.attr("id", "febDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*febDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(febDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});

					var febwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/febDaysText.length)*radians)
						.endAngle((7.8/febDaysText.length)*radians);

					var febwk1path = febCircle.append("path")
						.attr("d", febwk1arc)
						.attr("class", function(){
							if (eventWk == 58)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(58);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var febwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((8/febDaysText.length)*radians)
						.endAngle((14.8/febDaysText.length)*radians);

					var febwk2path = febCircle.append("path")
						.attr("d", febwk2arc)
						.attr("class", function(){
							if (eventWk == 59)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(59);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var febwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((15/febDaysText.length)*radians)
						.endAngle((21.8/febDaysText.length)*radians);

					var febwk3path = febCircle.append("path")
						.attr("d", febwk3arc)
						.attr("class", function(){
							if (eventWk == 60)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(60);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var febwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((22/febDaysText.length)*radians)
						.endAngle((28.8/febDaysText.length)*radians);

					var febwk4path = febCircle.append("path")
						.attr("d", febwk4arc)
						.attr("class", function(){
							if (eventWk == 61)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(61);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					

		// mar circle
			var marCircle = yearCircle.append("g")
									.attr("id", "mar")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(75), translate(0," + (yearRadius * -0.78) + "), rotate(-75)");

				var marCircleShape = marCircle.append("circle")
										.attr("class", "springMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var marText = marCircle.append("text")
										.attr("y", 4)
										.text("Mar");

					var marDaysText = [1];

					for (var j=2; j<32; j++) {
						marDaysText.push(j);
					};

					var marDaysTextRadius = yearRadius * -0.156;
					var marDaysAngleOffset = 360 / marDaysText.length;

					var marDText = marCircle.selectAll("#marDaysText")
						.data(marDaysText)
						.enter()
						.append("text")
						.attr("id", "marDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*marDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(marDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var marwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/marDaysText.length)*radians)
						.endAngle((7.8/marDaysText.length)*radians);

					var marwk1path = marCircle.append("path")
						.attr("d", marwk1arc)
						.attr("class", function(){
							if (eventWk == 62)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(62);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var marwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((8/marDaysText.length)*radians)
						.endAngle((14.8/marDaysText.length)*radians);

					var marwk2path = marCircle.append("path")
						.attr("d", marwk2arc)
						.attr("class", function(){
							if (eventWk == 63)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(63);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var marwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((15/marDaysText.length)*radians)
						.endAngle((21.8/marDaysText.length)*radians);

					var marwk3path = marCircle.append("path")
						.attr("d", marwk3arc)
						.attr("class", function(){
							if (eventWk == 64)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(64);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var marwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((22/marDaysText.length)*radians)
						.endAngle((28.8/marDaysText.length)*radians);

					var marwk4path = marCircle.append("path")
						.attr("d", marwk4arc)
						.attr("class", function(){
							if (eventWk == 65)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(65);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var marwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((29/marDaysText.length)*radians)
						.endAngle((31.8/marDaysText.length)*radians);

					var marwk5path = marCircle.append("path")
						.attr("d", marwk5arc)
						.attr("class", function(){
							if (eventWk == 66)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(66);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					

		// apr circle
			var aprCircle = yearCircle.append("g")
									.attr("id", "apr")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(105), translate(0," + (yearRadius * -0.78) + "), rotate(-105)");

				var aprCircleShape = aprCircle.append("circle")
										.attr("class", "springMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var aprText = aprCircle.append("text")
										.attr("y", 4)
										.text("Apr");

					var aprDaysText = [1];

					for (var j=2; j<31; j++) {
						aprDaysText.push(j);
					};

					var aprDaysTextRadius = yearRadius * -0.156;
					var aprDaysAngleOffset = 360 / aprDaysText.length;

					var aprDText = aprCircle.selectAll("#aprDaysText")
						.data(aprDaysText)
						.enter()
						.append("text")
						.attr("id", "aprDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*aprDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(aprDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var aprwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/aprDaysText.length)*radians)
						.endAngle((4.8/aprDaysText.length)*radians);

					var aprwk1path = aprCircle.append("path")
						.attr("d", aprwk1arc)
						.attr("class", function(){
							if (eventWk == 66)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(66);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var aprwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((5/aprDaysText.length)*radians)
						.endAngle((11.8/aprDaysText.length)*radians);

					var aprwk2path = aprCircle.append("path")
						.attr("d", aprwk2arc)
						.attr("class", function(){
							if (eventWk == 67)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(67);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var aprwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((12/aprDaysText.length)*radians)
						.endAngle((18.8/aprDaysText.length)*radians);

					var aprwk3path = aprCircle.append("path")
						.attr("d", aprwk3arc)
						.attr("class", function(){
							if (eventWk == 68)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(68);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var aprwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((19/aprDaysText.length)*radians)
						.endAngle((25.8/aprDaysText.length)*radians);

					var aprwk4path = aprCircle.append("path")
						.attr("d", aprwk4arc)
						.attr("class", function(){
							if (eventWk == 69)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(69);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var aprwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((26/aprDaysText.length)*radians)
						.endAngle((30.8/aprDaysText.length)*radians);

					var aprwk5path = aprCircle.append("path")
						.attr("d", aprwk5arc)
						.attr("class", function(){
							if (eventWk == 70)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(70);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					
		// may circle
			var mayCircle = yearCircle.append("g")
									.attr("id", "may")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(135), translate(0," + (yearRadius * -0.78) + "), rotate(-135)");

				var mayCircleShape = mayCircle.append("circle")
										.attr("class", "springMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var mayText = mayCircle.append("text")
										.attr("y", 4)
										.text("May");

					var mayDaysText = [1];

					for (var j=2; j<32; j++) {
						mayDaysText.push(j);
					};

					var mayDaysTextRadius = yearRadius * -0.156;
					var mayDaysAngleOffset = 360 / mayDaysText.length;

					var mayDText = mayCircle.selectAll("#mayDaysText")
						.data(mayDaysText)
						.enter()
						.append("text")
						.attr("id", "mayDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*mayDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(mayDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var maywk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/mayDaysText.length)*radians)
						.endAngle((2.8/mayDaysText.length)*radians);

					var maywk1path = mayCircle.append("path")
						.attr("d", maywk1arc)
						.attr("class", function(){
							if (eventWk == 70)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(70);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var maywk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((3/mayDaysText.length)*radians)
						.endAngle((9.8/mayDaysText.length)*radians);

					var maywk2path = mayCircle.append("path")
						.attr("d", maywk2arc)
						.attr("class", function(){
							if (eventWk == 71)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(71);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var maywk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((10/mayDaysText.length)*radians)
						.endAngle((16.8/mayDaysText.length)*radians);

					var maywk3path = mayCircle.append("path")
						.attr("d", maywk3arc)
						.attr("class", function(){
							if (eventWk == 72)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(72);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var maywk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((17/mayDaysText.length)*radians)
						.endAngle((23.8/mayDaysText.length)*radians);

					var maywk4path = mayCircle.append("path")
						.attr("d", maywk4arc)
						.attr("class", function(){
							if (eventWk == 73)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(73);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var maywk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((24/mayDaysText.length)*radians)
						.endAngle((30.8/mayDaysText.length)*radians);

					var maywk5path = mayCircle.append("path")
						.attr("d", maywk5arc)
						.attr("class", function(){
							if (eventWk == 74)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(74);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var maywk6arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((31/mayDaysText.length)*radians)
						.endAngle((31.8/mayDaysText.length)*radians);

					var maywk6path = mayCircle.append("path")
						.attr("d", maywk6arc)
						.attr("class", function(){
							if (eventWk == 75)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(75);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});


		// jun circle
			var junCircle = yearCircle.append("g")
									.attr("id", "jun")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(165), translate(0," + (yearRadius * -0.78) + "), rotate(-165)");

				var junCircleShape = junCircle.append("circle")
										.attr("class", "summerMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var junText = junCircle.append("text")
										.attr("y", 4)
										.text("Jun");

					var junDaysText = [1];

					for (var j=2; j<31; j++) {
						junDaysText.push(j);
					};

					var junDaysTextRadius = yearRadius * -0.156;
					var junDaysAngleOffset = 360 / junDaysText.length;

					var junDText = junCircle.selectAll("#junDaysText")
						.data(junDaysText)
						.enter()
						.append("text")
						.attr("id", "junDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*junDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(junDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var junwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/junDaysText.length)*radians)
						.endAngle((7.8/junDaysText.length)*radians);

					var junwk1path = junCircle.append("path")
						.attr("d", junwk1arc)
						.attr("class", function(){
							if (eventWk == 23)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(23);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var junwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((8/junDaysText.length)*radians)
						.endAngle((14.8/junDaysText.length)*radians);

					var junwk2path = junCircle.append("path")
						.attr("d", junwk2arc)
						.attr("class", function(){
							if (eventWk == 77)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(77);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var junwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((15/junDaysText.length)*radians)
						.endAngle((21.8/junDaysText.length)*radians);

					var junwk3path = junCircle.append("path")
						.attr("d", junwk3arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var junwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((22/junDaysText.length)*radians)
						.endAngle((28.8/junDaysText.length)*radians);

					var junwk4path = junCircle.append("path")
						.attr("d", junwk4arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var junwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((29/junDaysText.length)*radians)
						.endAngle((30.8/junDaysText.length)*radians);

					var junwk5path = junCircle.append("path")
						.attr("d", junwk5arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});


		// jul circle
			var julCircle = yearCircle.append("g")
									.attr("id", "jul")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(195), translate(0," + (yearRadius * -0.78) + "), rotate(-195)");

				var julCircleShape = julCircle.append("circle")
										.attr("class", "summerMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var julText = julCircle.append("text")
										.attr("y", 4)
										.text("Jul");

					var julDaysText = [1];

					for (var j=2; j<32; j++) {
						julDaysText.push(j);
					};

					var julDaysTextRadius = yearRadius * -0.156;
					var julDaysAngleOffset = 360 / julDaysText.length;

					var julDText = julCircle.selectAll("#julDaysText")
						.data(julDaysText)
						.enter()
						.append("text")
						.attr("id", "julDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*julDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(julDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var julwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/julDaysText.length)*radians)
						.endAngle((5.8/julDaysText.length)*radians);

					var julwk1path = julCircle.append("path")
						.attr("d", julwk1arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var julwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((6/julDaysText.length)*radians)
						.endAngle((12.8/julDaysText.length)*radians);

					var julwk2path = julCircle.append("path")
						.attr("d", julwk2arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var julwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((13/julDaysText.length)*radians)
						.endAngle((19.8/julDaysText.length)*radians);

					var julwk3path = julCircle.append("path")
						.attr("d", julwk3arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var julwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((20/julDaysText.length)*radians)
						.endAngle((26.8/julDaysText.length)*radians);

					var julwk4path = julCircle.append("path")
						.attr("d", julwk4arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var julwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((27/julDaysText.length)*radians)
						.endAngle((31.8/julDaysText.length)*radians);

					var julwk5path = julCircle.append("path")
						.attr("d", julwk5arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});


		// aug circle
			var augCircle = yearCircle.append("g")
									.attr("id", "aug")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(225), translate(0," + (yearRadius * -0.78) + "), rotate(-225)");

				var augCircleShape = augCircle.append("circle")
										.attr("class", "summerMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var augText = augCircle.append("text")
										.attr("y", 4)
										.text("Aug");

					var augDaysText = [1];

					for (var j=2; j<32; j++) {
						augDaysText.push(j);
					};

					var augDaysTextRadius = yearRadius * -0.156;
					var augDaysAngleOffset = 360 / augDaysText.length;

					var augDText = augCircle.selectAll("#augDaysText")
						.data(augDaysText)
						.enter()
						.append("text")
						.attr("id", "augDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*augDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(augDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var augwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/augDaysText.length)*radians)
						.endAngle((2.8/augDaysText.length)*radians);

					var augwk1path = augCircle.append("path")
						.attr("d", augwk1arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var augwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((3/augDaysText.length)*radians)
						.endAngle((9.8/augDaysText.length)*radians);

					var augwk2path = augCircle.append("path")
						.attr("d", augwk2arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var augwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((10/augDaysText.length)*radians)
						.endAngle((16.8/augDaysText.length)*radians);

					var augwk3path = augCircle.append("path")
						.attr("d", augwk3arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var augwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((17/augDaysText.length)*radians)
						.endAngle((23.8/augDaysText.length)*radians);

					var augwk4path = augCircle.append("path")
						.attr("d", augwk4arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var augwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((24/augDaysText.length)*radians)
						.endAngle((30.8/augDaysText.length)*radians);

					var augwk5path = augCircle.append("path")
						.attr("d", augwk5arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var augwk6arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((31/augDaysText.length)*radians)
						.endAngle((31.8/augDaysText.length)*radians);

					var augwk6path = augCircle.append("path")
						.attr("d", augwk6arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});


		// sep circle
			var sepCircle = yearCircle.append("g")
									.attr("id", "sep")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(255), translate(0," + (yearRadius * -0.78) + "), rotate(-255)");

				var sepCircleShape = sepCircle.append("circle")
										.attr("class", "fallMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var sepText = sepCircle.append("text")
										.attr("y", 4)
										.text("Sep");

					var sepDaysText = [1];

					for (var j=2; j<31; j++) {
						sepDaysText.push(j);
					};

					var sepDaysTextRadius = yearRadius * -0.156;
					var sepDaysAngleOffset = 360 / sepDaysText.length;

					var sepDText = sepCircle.selectAll(".sepDaysText")
						.data(sepDaysText)
						.enter()
						.append("text")
						.attr("id", "sepDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*sepDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(sepDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var sepwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/sepDaysText.length)*radians)
						.endAngle((6.8/sepDaysText.length)*radians);

					var sepwk1path = sepCircle.append("path")
						.attr("d", sepwk1arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var sepwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((7/sepDaysText.length)*radians)
						.endAngle((13.8/sepDaysText.length)*radians);

					var sepwk2path = sepCircle.append("path")
						.attr("d", sepwk2arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var sepwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((14/sepDaysText.length)*radians)
						.endAngle((20.8/sepDaysText.length)*radians);

					var sepwk3path = sepCircle.append("path")
						.attr("d", sepwk3arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var sepwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((21/sepDaysText.length)*radians)
						.endAngle((27.8/sepDaysText.length)*radians);

					var sepwk4path = sepCircle.append("path")
						.attr("d", sepwk4arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					var sepwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((28/sepDaysText.length)*radians)
						.endAngle((30.8/sepDaysText.length)*radians);

					var sepwk5path = sepCircle.append("path")
						.attr("d", sepwk5arc)
						.attr("class", function(){
							if (eventWk == 55)
								return "thisWeek";
							else
								return "weeks";
						});

					
		// oct circle
			var octCircle = yearCircle.append("g")
									.attr("id", "oct")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(285), translate(0," + (yearRadius * -0.78) + "), rotate(-285)");

				var octCircleShape = octCircle.append("circle")
										.attr("class", "fallMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var octText = octCircle.append("text")
										.attr("y", 4)
										.text("Oct");

					var octDaysText = [1];

					for (var j=2; j<32; j++) {
						octDaysText.push(j);
					};

					var octDaysTextRadius = yearRadius * -0.156;
					var octDaysAngleOffset = 360 / octDaysText.length;

					var octDText = octCircle.selectAll("#octDaysText")
						.data(octDaysText)
						.enter()
						.append("text")
						.attr("id", "octDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*octDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(octDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var octwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/octDaysText.length)*radians)
						.endAngle((3.8/octDaysText.length)*radians);

					var octwk1path = octCircle.append("path")
						.attr("d", octwk1arc)
						.attr("class", function(){
							if (eventWk == 40)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(40);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var octwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((4/octDaysText.length)*radians)
						.endAngle((10.8/octDaysText.length)*radians);

					var octwk2path = octCircle.append("path")
						.attr("d", octwk2arc)
						.attr("class", function(){
							if (eventWk == 41)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(41);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var octwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((11/octDaysText.length)*radians)
						.endAngle((17.8/octDaysText.length)*radians);

					var octwk3path = octCircle.append("path")
						.attr("d", octwk3arc)
						.attr("class", function(){
							if (eventWk == 42)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(42);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var octwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((18/octDaysText.length)*radians)
						.endAngle((24.8/octDaysText.length)*radians);

					var octwk4path = octCircle.append("path")
						.attr("d", octwk4arc)
						.attr("class", function(){
							if (eventWk == 43)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(43);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var octwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((25/octDaysText.length)*radians)
						.endAngle((31.8/octDaysText.length)*radians);

					var octwk5path = octCircle.append("path")
						.attr("d", octwk5arc)
						.attr("class", function(){
							if (eventWk == 44)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(44);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					
		// nov circle
			var novCircle = yearCircle.append("g")
									.attr("id", "nov")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(315), translate(0," + (yearRadius * -0.78) + "), rotate(-315)");

				var novCircleShape = novCircle.append("circle")
										.attr("class", "fallMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18);

					var novText = novCircle.append("text")
										.attr("y", 4)
										.text("Nov");

					var novDaysText = [1];

					for (var j=2; j<31; j++) {
						novDaysText.push(j);
					};

					var novDaysTextRadius = yearRadius * -0.156;
					var novDaysAngleOffset = 360 / novDaysText.length;

					var novDText = novCircle.selectAll("#novDaysText")
						.data(novDaysText)
						.enter()
						.append("text")
						.attr("id", "novDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*novDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(novDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var novwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/novDaysText.length)*radians)
						.endAngle((7.8/novDaysText.length)*radians);

					var novwk2path = novCircle.append("path")
						.attr("d", novwk2arc)
						.attr("class", function(){
							if (eventWk == 45)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(45);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((8/novDaysText.length)*radians)
						.endAngle((14.8/novDaysText.length)*radians);

					var novwk3path = novCircle.append("path")
						.attr("d", novwk3arc)
						.attr("class", function(){
							if (eventWk == 46)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(46);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((15/novDaysText.length)*radians)
						.endAngle((21.8/novDaysText.length)*radians);

					var novwk4path = novCircle.append("path")
						.attr("d", novwk4arc)
						.attr("class", function(){
							if (eventWk == 47)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(47);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((22/novDaysText.length)*radians)
						.endAngle((28.8/novDaysText.length)*radians);

					var novwk5path = novCircle.append("path")
						.attr("d", novwk5arc)
						.attr("class", function(){
							if (eventWk == 48)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(48);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk6arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((29/novDaysText.length)*radians)
						.endAngle((30.8/novDaysText.length)*radians);

					var novwk6path = novCircle.append("path")
						.attr("d", novwk6arc)
						.attr("class", function(){
							if (eventWk == 49)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(49);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});


		// dec circle
			var decCircle = yearCircle.append("g")
									.attr("id", "dec")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(345), translate(0," + (yearRadius * -0.78) + "), rotate(-345)");

				var decCircleShape = decCircle.append("circle")
										.attr("class", "winterMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", yearRadius * 0.18)
										.attr("fill", "#3cf");
					var decText = decCircle.append("text")
										.attr("y", 4)
										.text("Dec");

					var decDaysText = [1];

					for (var j=2; j<32; j++) {
						decDaysText.push(j);
					};

					var decDaysTextRadius = yearRadius * -0.156;
					var decDaysAngleOffset = 360 / decDaysText.length;

					var decDText = decCircle.selectAll("#decDaysText")
						.data(decDaysText)
						.enter()
						.append("text")
						.attr("id", "decDaysText")
						.attr("class", "monthDaysText")
						.attr("x",0)
						.attr("y",3)
						.attr("transform", function(d,j) {return "rotate("+d*decDaysAngleOffset+")translate(0,"+monthDaysTextRadius+") rotate("+(decDaysAngleOffset*-d)+")"})
						.text(function(d) {return d});


					var decwk1arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((1/decDaysText.length)*radians)
						.endAngle((5.8/decDaysText.length)*radians);

					var decwk1path = decCircle.append("path")
						.attr("d", decwk1arc)
						.attr("class", function(){
							if (eventWk == 49)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(49);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk2arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((6/decDaysText.length)*radians)
						.endAngle((12.8/decDaysText.length)*radians);

					var decwk2path = decCircle.append("path")
						.attr("d", decwk2arc)
						.attr("class", function(){
							if (eventWk == 50)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(50);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk3arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((13/decDaysText.length)*radians)
						.endAngle((19.8/decDaysText.length)*radians);

					var decwk3path = decCircle.append("path")
						.attr("d", decwk3arc)
						.attr("class", function(){
							if (eventWk == 51)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(51);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk4arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((20/decDaysText.length)*radians)
						.endAngle((26.8/decDaysText.length)*radians);

					var decwk4path = decCircle.append("path")
						.attr("d", decwk4arc)
						.attr("class", function(){
							if (eventWk == 52)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(52);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk5arc = d3.svg.arc()
						.outerRadius(monthWkArcOuterR)
						.innerRadius(monthWkArcInnerR)
						.startAngle((27/decDaysText.length)*radians)
						.endAngle((31.8/decDaysText.length)*radians);

					var decwk5path = decCircle.append("path")
						.attr("d", decwk5arc)
						.attr("class", function(){
							if (eventWk == 53)
								return "thisWeek";
							else
								return "weeks";
						})
						.on("click", function () {
							assignWk(53);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});
					



	// week circle
		var weekCircle = rootGroup.append("g")
							.attr("transform", "translate("+width/2+","+height/2+")");

			var weekRadius = radius * 0.6;
							
			var weekCircleShape = weekCircle.append("circle")
									.attr("cx", 0)
									.attr("cy", 0)
									.attr("r", weekRadius)
									.attr("fill", "none");

			var weekDayArcInnerR = weekRadius * 1;

			var weekDayArcOuterR = weekRadius * 1.25;

			

			function assignDay(selectedDay) {
				eventDay = currentWkSunday + selectedDay;
				eventDate = new Date((eventDay+1)*8.64e7);
				dateForDisplay = eventDate.getMonth()+1+"/"+eventDate.getDate()+"/"+eventDate.getYear().toString().substr(1,2);
				innerTimes.select("#dateDisplay").text(dateForDisplay);
				dayField.value = eventDay;
			};


			var daysInWk = d3.range(7);

			var weekArc = d3.svg.arc()
					.innerRadius(weekDayArcInnerR)
					.outerRadius(weekDayArcOuterR)
					.startAngle(function(d) {
						return (d/7)*radians+(1/140)*radians; 
					})
					.endAngle(function(d) {
						return ((d+0.9)/7)*radians+(1/140)*radians;
					});

			weekCircle.selectAll("path")
				.data(daysInWk)
				.enter()
				.append("path")
				.attr("d", weekArc)
				.attr("class", function(d){
					if (d==eventDayWkDay)
						return "today";
					else
						return "weekDays";
				})
				.on("click", function(d){
					assignDay(d);
					d3.select(".today").classed({'today': false, 'weekDays': true});
					d3.select(this).classed({'today': true, 'weekDays': false});
				});


			var dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

				for (var i=0; i<dayLabels.length; i++) {
					var dayLabel = weekCircle.append("text")
										.text(function () {return dayLabels[i]})
										.attr("class", "dayLabels")
										.attr("x", 0)
										.attr("y", 3)
										.attr("transform", "rotate("+(i*(360/7)+2+(360/14))+"), translate(-4,"+ (weekRadius * -1.125) +"), rotate("+(i*(-360/7)-2-(360/14))+")")
				};



		var yearText = yearCircle.append("text")
								.text("2014")
								.attr("class", "yearText")
								.attr("x", 0)
								.attr("y", 15);




	// timeCircle
		var timeCircle = rootGroup.append("g")
			.attr("transform", "translate("+width/2+","+height/2+"), scale(0.5,0.5), rotate(20)")
			.attr("opacity" ,0);

			var timeRadius = radius * 0.6;

			var circleShape = timeCircle.append("circle")
				.attr("cx",0)
				.attr("cy",0)
				.attr("r",timeRadius)
				.attr("fill", function() {return "url(#formGrad)";})
				.attr("id", "timeCircle");

			var formGrads = timeCircle.append("radialGradient")
				.attr("gradientUnits", "userSpaceOnUse")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", "50%")
				.attr("id", "formGrad");

			formGrads.append("stop").attr("offset", "0%").style("stop-color", "rgba(150,150,150,1)");
			formGrads.append("stop").attr("offset", "100%").style("stop-color", "rgba(200,200,200,1)");

			timeCircle.transition().delay(500).duration(800).attr("transform", "translate("+width/2+","+height/2+"), scale(0.9,0.9)").attr("opacity" ,1);



		// time arcs

			var eventDay, eventStart, eventDur;

			// hour start, end, duration calculators
			var startH = function() {return d3.round(hourStartAngle/radians*12);},
			 endH = function() {return d3.round(hourEndAngle/radians*12);},
			 durH = function() {return d3.round((hourEndAngle-hourStartAngle)/radians*12);};


			var eventStartField = document.getElementById("event_start");
			var eventDurationField = document.getElementById("event_duration");
			

			var fillInForm = function () {
				eventStartField.value = startH() + startM()/60;
		        eventDurationField.value = endH() - startH() + endM()/60- startM()/60;
			};

		

		// hourArc
			var hInRadius = timeRadius * 0.44, hOutRadius = timeRadius * 0.72;

			var hourStartAngle = ((eventStart-eventStart%1)/12)*radians, 
				hourEndAngle = ((eventDur-eventDur%1)/12)*radians + ((eventStart-eventStart%1)/12)*radians;

			var hourArc = d3.svg.arc()
				.outerRadius(hOutRadius)
				.innerRadius(hInRadius);
				
			var hPath = timeCircle.append("path")
				.datum({endAngle: hourEndAngle})
				.each(function(d) { d.endAngle = hourEndAngle; })
				.each(function(d) { d.startAngle = hourStartAngle; })
				.attr("d", hourArc)
			    .attr("id", "hArcy");

			    
			
			d3.select("#startHNums").text(startH()+":");
	        d3.select("#endHNums").text(endH()+":");
	        d3.select("#durHNums").text(durH()+":");


		// hour startAngle drag function
			var hDrag = d3.behavior.drag()
			    .on("drag", function(d,i) {
			        hourStartAngle += d3.event.dx*radians/748;
			        hStartSliderStartAngle += d3.event.dx*radians/748;
			        hStartSliderEndAngle += d3.event.dx*radians/748;
			        hEndSliderStartAngle += d3.event.dx*radians/748;
			        hEndSliderEndAngle += d3.event.dx*radians/748;
			        hourEndAngle += d3.event.dx*radians/748;
			        d3.select(this)
			        .transition().duration(0).call(hStartArcTween, hourStartAngle)
			        .transition().duration(0).call(hEndArcTween, hourEndAngle)
			        d3.select("#hStartSliderArcy")
			        .transition().duration(0).call(hStartSliderArcTween, hStartSliderStartAngle, hStartSliderEndAngle)
			        d3.select("#hEndSliderArcy")
			        .transition().duration(0).call(hEndSliderArcTween, hEndSliderStartAngle, hEndSliderEndAngle)
			        d3.select("#startHNums").text(startH()+":")
			        d3.select("#endHNums").text(endH()+":")
			        d3.select("#durHNums").text(durH()+":")
			        fillInForm();
			    });	

			hPath.call(hDrag);



		// hStartArcTween
			function hStartArcTween(transition, newAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.startAngle, newAngle);
					return function(t) {
						d.startAngle=interpolate(t);
						return hourArc(d);
					};
				});
			}



		// hEndArcTween
			function hEndArcTween(transition, newAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.endAngle, newAngle);
					return function(t) {
						d.endAngle=interpolate(t);
						return hourArc(d);
					};
				});
			}




		// hourEndSlider
			var hEndSliderInRadius = timeRadius * 0.42, hEndSliderOutRadius = timeRadius * 0.74;

			var hEndSliderStartAngle = hourEndAngle - 1/8, hEndSliderEndAngle = hourEndAngle + 1/8

			var hEndSliderArc = d3.svg.arc()
				.outerRadius(hEndSliderOutRadius)
				.innerRadius(hEndSliderInRadius);

			var hEndSliderPath = timeCircle.append("path")
				.datum({startAngle: hEndSliderStartAngle})
				.each(function(d) { d.endAngle = hEndSliderEndAngle; })
				.each(function(d) { d.startAngle = hEndSliderStartAngle; })
			    .attr("d", hEndSliderArc)
			    .attr("id", "hEndSliderArcy");



		// hour End slider drag functionS
			var hEndSliderDrag = d3.behavior.drag()
			    .on("drag", function(d,i) {
			        hEndSliderStartAngle += d3.event.dx*radians/748;
			        hEndSliderEndAngle += d3.event.dx*radians/748;
			        hourEndAngle += d3.event.dx*radians/748;
			        d3.select(this)
			        .transition().duration(0).call(hEndSliderArcTween, hEndSliderStartAngle, hEndSliderEndAngle)
			        d3.select("#hArcy")
			        .transition().duration(0).call(hEndArcTween, hourEndAngle)
			        d3.select("#startHNums").text(startH()+":")
			        d3.select("#endHNums").text(endH()+":")
			        d3.select("#durHNums").text(durH()+":")
			        fillInForm();
			    });	

			hEndSliderPath.call(hEndSliderDrag);



		// hEndSliderArcTween
			function hEndSliderArcTween(transition, newStartAngle, newEndAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.startAngle, newStartAngle);
					var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
					return function(t) {
						d.startAngle=interpolate(t);
						d.endAngle=interpolate2(t);
						return hEndSliderArc(d);
					};
				});
			};


			// hourStartSlider
					var hStartSliderInRadius = timeRadius * 0.42, hStartSliderOutRadius = timeRadius * 0.67;

					var hStartSliderStartAngle = hourStartAngle - 1/8, hStartSliderEndAngle = hourStartAngle + 1/8;

					var hStartSliderArc = d3.svg.arc()
						.outerRadius(hStartSliderOutRadius)
						.innerRadius(hStartSliderInRadius);

					var hStartSliderPath = timeCircle.append("path")
						.datum({startAngle: hStartSliderStartAngle})
						.each(function(d) { d.endAngle = hStartSliderEndAngle; })
						.each(function(d) { d.startAngle = hStartSliderStartAngle; })
					    .attr("d", hStartSliderArc)
					    .attr("id", "hStartSliderArcy");



					// hour start slider drag function
					var hStartSliderDrag = d3.behavior.drag()
					    .on("drag", function(d,i) {
					        hStartSliderStartAngle += d3.event.dx*radians/748;
					        hStartSliderEndAngle += d3.event.dx*radians/748;
					        hourStartAngle += d3.event.dx*radians/748;
					        d3.select(this)
					        .transition().duration(0).call(hStartSliderArcTween, hStartSliderStartAngle, hStartSliderEndAngle)
					        d3.select("#hArcy")
					        .transition().duration(0).call(hStartArcTween, hourStartAngle)
					        d3.select("#startHNums").text(startH()+":")
					        d3.select("#endHNums").text(endH()+":")
					        d3.select("#durHNums").text(durH()+":")
					        fillInForm();
					    });	

					hStartSliderPath.call(hStartSliderDrag);



					// hStartSliderArcTween
					function hStartSliderArcTween(transition, newStartAngle, newEndAngle) {
						transition.attrTween("d", function(d) {
							var interpolate=d3.interpolate(d.startAngle, newStartAngle);
							var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
							return function(t) {
								d.startAngle=interpolate(t);
								d.endAngle=interpolate2(t);
								return hStartSliderArc(d);
							};
						});
					};




		// MinuteArc
			var mInRadius = timeRadius * 0.78, mOutRadius = timeRadius * 1.05;

			var zero = d3.format("02d");

			var minuteArc = d3.svg.arc()
				.outerRadius(mOutRadius)
				.innerRadius(mInRadius);

			var minuteStartAngle = (eventStart%1)*radians, minuteEndAngle = (eventDur%1)*radians+(eventStart%1)*radians; 

			var mPath = timeCircle.append("path")
				.datum({endAngle: minuteEndAngle})
				.each(function(d) { d.endAngle = minuteEndAngle; })
				.each(function(d) { d.startAngle = minuteStartAngle; })
			    .attr("d", minuteArc)
			    .attr("id", "mArcy");

			d3.select("#startMNums").text(startM)
	        d3.select("#endMNums").text(endM)


			// minute start, end, duration calculators

			var startM = function() {return zero(d3.round(minuteStartAngle/radians*60), 2)},
			endM = function() {return zero(d3.round(minuteEndAngle/radians*60), 2);},
			durM = function() {
							var roundedMinuteStartAngle = d3.round(minuteStartAngle/radians*60),
							roundedMinuteEndAngle = d3.round(minuteEndAngle/radians*60);
							return zero((roundedMinuteEndAngle - roundedMinuteStartAngle), 2);
			 				};


			// minute drag function
			var mDrag = d3.behavior.drag()
			    .on("drag", function(d,i) {
			        minuteStartAngle += d3.event.dx*radians/748;
			        mStartSliderStartAngle += d3.event.dx*radians/748;
			        mStartSliderEndAngle += d3.event.dx*radians/748;
			        minuteEndAngle += d3.event.dx*radians/748;
			        mEndSliderStartAngle += d3.event.dx*radians/748;
			        mEndSliderEndAngle += d3.event.dx*radians/748;
			        d3.select(this)
			        .transition().duration(0).call(mStartArcTween, minuteStartAngle)
			        .transition().duration(0).call(mEndArcTween, minuteEndAngle)
			        d3.select("#mStartSliderArcy")
			        .transition().duration(0).call(mStartSliderArcTween, mStartSliderStartAngle, mStartSliderEndAngle)
			        d3.select("#mEndSliderArcy")
			        .transition().duration(0).call(mEndSliderArcTween, mEndSliderStartAngle, mEndSliderEndAngle)
			        d3.select("#startMNums").text(startM)
			        d3.select("#endMNums").text(endM)
			        d3.select("#durMNums").text(durM)
			        fillInForm();
			    });	

			mPath.call(mDrag);

			

			// mStartArcTween
			function mStartArcTween(transition, newAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.startAngle, newAngle);
					return function(t) {
						d.startAngle=interpolate(t);
						return minuteArc(d);
					};
				});
			}



			// mEndArcTween
			function mEndArcTween(transition, newAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.endAngle, newAngle);
					return function(t) {
						d.endAngle=interpolate(t);
						return minuteArc(d);
					};
				});
			}






			// minute end Slider
			var mEndSliderInRadius = timeRadius * 0.75, mEndSliderOutRadius = timeRadius * 1.08;

			var mEndSliderStartAngle = minuteEndAngle - 1/18, mEndSliderEndAngle = minuteEndAngle + 1/18;

			var mEndSliderArc = d3.svg.arc()
				.outerRadius(mEndSliderOutRadius)
				.innerRadius(mEndSliderInRadius);

			var mEndSliderPath = timeCircle.append("path")
				.datum({startAngle: mEndSliderStartAngle})
				.each(function(d) { d.endAngle = mEndSliderEndAngle; })
				.each(function(d) { d.startAngle = mEndSliderStartAngle; })
			    .attr("d", mEndSliderArc)
			    .attr("id", "mEndSliderArcy");



			// minute end slider drag function
			var mEndSliderDrag = d3.behavior.drag()
			    .on("drag", function(d,i) {
			        mEndSliderStartAngle += d3.event.dx*radians/748;
			        mEndSliderEndAngle += d3.event.dx*radians/748;
			        minuteEndAngle += d3.event.dx*radians/748;
			        d3.select(this)
			        .transition().duration(0).call(mEndSliderArcTween, mEndSliderStartAngle, mEndSliderEndAngle)
			        d3.select("#mArcy")
			        .transition().duration(0).call(mEndArcTween, minuteEndAngle)
			        d3.select("#startMNums").text(startM)
			        d3.select("#endMNums").text(endM)
			        d3.select("#durMNums").text(durM)
			        fillInForm();
			    });	

			mEndSliderPath.call(mEndSliderDrag);



			// mEndSliderArcTween
			function mEndSliderArcTween(transition, newStartAngle, newEndAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.startAngle, newStartAngle);
					var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
					return function(t) {
						d.startAngle=interpolate(t);
						d.endAngle=interpolate2(t);
						return mEndSliderArc(d);
					};
				});
			};




			// minute start slider

			var mStartSliderInRadius = timeRadius * 0.76, mStartSliderOutRadius = timeRadius;

			var mStartSliderStartAngle = minuteStartAngle - 1/18, mStartSliderEndAngle = minuteStartAngle + 1/18;

			var mStartSliderArc = d3.svg.arc()
				.outerRadius(mStartSliderOutRadius)
				.innerRadius(mStartSliderInRadius);

			var mStartSliderPath = timeCircle.append("path")
				.datum({startAngle: mStartSliderStartAngle})
				.each(function(d) { d.endAngle = mStartSliderEndAngle; })
				.each(function(d) { d.startAngle = mStartSliderStartAngle; })
			    .attr("d", mStartSliderArc)
			    .attr("id", "mStartSliderArcy");

			// minute start slider drag function
			var mStartSliderDrag = d3.behavior.drag()
			    .on("drag", function(d,i) {
			        mStartSliderStartAngle += d3.event.dx*radians/748;
			        mStartSliderEndAngle += d3.event.dx*radians/748;
			        minuteStartAngle += d3.event.dx*radians/748;
			        d3.select(this)
			        .transition().duration(0).call(mStartSliderArcTween, mStartSliderStartAngle, mStartSliderEndAngle)
			        d3.select("#mArcy")
			        .transition().duration(0).call(mStartArcTween, minuteStartAngle)
			        d3.select("#startMNums").text(startM)
			        d3.select("#endMNums").text(endM)
			        d3.select("#durMNums").text(durM)
			        fillInForm();
			    });	

			mStartSliderPath.call(mStartSliderDrag);
			// mStartSliderPath.call(link_to_edit/delete);

			// mStartSliderArcTween
			function mStartSliderArcTween(transition, newStartAngle, newEndAngle) {
				transition.attrTween("d", function(d) {
					var interpolate=d3.interpolate(d.startAngle, newStartAngle);
					var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
					return function(t) {
						d.startAngle=interpolate(t);
						d.endAngle=interpolate2(t);
						return mStartSliderArc(d);
					};
				});
			};



		// hour numbers
			var formHoursText = [12];

			for (var i=1; i<12; i++) {
				formHoursText.push(i);
			};

			var formHTextRadius = timeRadius * -0.58;

			var formHText = timeCircle.selectAll(".formHourNums")
				.data(formHoursText)
				.enter()
				.append("text")
				.attr("class", "formHourNums")
				.attr("x",0)
				.attr("y",7)
				.attr("transform", function(d,i) {return "rotate("+d*30+")translate(0,"+formHTextRadius+") rotate("+d*-30+")"})
				.text(function(d) {return d});
				// .on("click", function to make start angle = angle of that hour (ie., 1900 (7pm) = 210 degrees (~2 radians)));



		// minute numbers
			var formMinutesText = [0];

			for (var j=0; j<60; j++) {
				formMinutesText.push(j);
			};

			var formMTextRadius = timeRadius * -0.92;

			var formMText = timeCircle.selectAll(".formMinuteNums")
				.data(formMinutesText)
				.enter()
				.append("text")
				.attr("class", "formMinuteNums")
				.attr("x",0)
				.attr("y",3)
				.attr("transform", function(d,j) {return "rotate("+d*6+")translate(0,"+formMTextRadius+") rotate("+d*-6+")"})
				.text(function(d) {return d})
				.attr("text-anchor", "middle");




	// inner display


		// small middle circle
			var midCircle = timeCircle.append("g")
				.attr("transform", "scale(0,0)");

				var midCircleShape = midCircle.append("circle")
					.attr("cx", 0)
					.attr("cy", 0)
					.attr("r", timeRadius/2.5)
					.attr("id", "middy");


				// start, end, duration big numbers

					var innerTimes = midCircle.append("g")
					.attr("transform", "translate(0,-22)");

					var timeYPos = 0, timeYSpacing = 21;

					var dateDisplay = innerTimes.append("text")
						.attr("id", "dateDisplay")
						.attr("x", -2)
						.attr("y", timeYPos)
						.text(dateForDisplay);

					var startHour = innerTimes.append("text")
			
						.attr("id", "startHNums")
						.attr("x", 0)
						.attr("y", timeYPos+timeYSpacing)
						.style("text-anchor", "end")
						.text(startH()+":");

					var endHour = innerTimes.append("text")

						.attr("id", "endHNums")
						.attr("x", 0)
						.attr("y", timeYPos+timeYSpacing*2)
						.style("text-anchor", "end")
						.text(endH()+":");

					var durationHours = innerTimes.append("text")
			
						.attr("id", "durHNums")
						.attr("x", 0)
						.attr("y", timeYPos+timeYSpacing*3)
						.style("text-anchor", "end")
						.text(durH()+":");


					var startMinute = innerTimes.append("text")
				
						.attr("id", "startMNums")
						.attr("x", 0)
						.attr("y", timeYPos+timeYSpacing)
						.style("text-anchor", "start")
						.text(startM());

					var endMinute = innerTimes.append("text")
			
						.attr("id", "endMNums")
						.attr("x", 0)
						.attr("y", timeYPos+timeYSpacing*2)
						.style("text-anchor", "start")
						.text(endM());

					var durationMinutes = innerTimes.append("text")
					
						.attr("id", "durMNums")
						.attr("x", 0)
						.attr("y", timeYPos+timeYSpacing*3)
						.style("text-anchor", "start")
						.text(durM());

				midCircle.transition().delay(500).duration(1250).ease("bounce").attr("transform", "scale(1,1)");




	// eventype buttons

		var eventType;

		var buttons = [{eventypeName: "Daily Life", eventypeColor: "#0f2"}, {eventypeName: "Must Do", eventypeColor: "#d33"}, {eventypeName: "Would Like", eventypeColor: "#26f"}];

		var buttonsField = document.getElementById("event_eventype");

		var eventypeButtonsWidth = width/2, eventypeButtonsHeight = height*0.2;

		var eventypeButtonsGroup = rootGroup.append("g")
			.attr("width", width/2)
			.attr("height", height*0.2);

		var dailyLifeButton = eventypeButtonsGroup.append("g");

		var eventypeButtonShells = eventypeButtonsGroup.selectAll("rect")
			.data(buttons)
			.enter()
			.append("rect")
			.attr("class", function(d,i) {
				if (eventType==i)
					return "selectedType";
				else
					return "typeButtons";
			})
			.attr("width", eventypeButtonsWidth*0.2)
			.attr("height", height*0.04)
			.attr("x", function(d,i){return width/2+(i-1)*(width/9.1)-47})
			.attr("y", height*0.87)
			.attr("rx", 6)
			.attr("ry", 6)
			.attr("fill", function(d,i){return d.eventypeColor})
			.on("click", function(d,i){
				buttonsField.value=i;
				d3.select('.selectedType').classed({'selectedType': false, 'typeButtons': true});
				d3.select(this).classed({'selectedType': true, 'typeButtons': false});
			});

		var buttonLabels = eventypeButtonsGroup.selectAll("text")
			.data(buttons)
			.enter()
			.append("text")
			.attr("class", "buttonLabels")
			.attr("x", function(d,i){return width/2+(i-1)*100})
			.attr("y", height*0.892)
			.text(function(d) {return d.eventypeName});
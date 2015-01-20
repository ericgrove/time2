var height = window.innerHeight, width = window.innerWidth, baseRadius = height/2;

var radians = Math.PI*2, decimalHourDegrees = 1;

var now = new Date(), day = now, epoch = now.getTime() - (1000 * 60 * 60 * 5), epochDay = Math.floor(epoch/8.64e7); console.log(epochDay), dateForDisplay = now.getMonth()+1+"/"+now.getDate()+"/"+now.getYear().toString().substr(1,2);

var svg = d3.select("body")
	.append("svg")
	.attr("viewBox", "0,0,"+width+","+height+"")
	.attr("preserveAspectRatio", "xMidYMin meet");

	var monthCircleRadius = baseRadius/5, monthsGroupX = width / 2, 
	nowCircleGroupRadius = baseRadius * 3, nowCircleGroupX = width / 2, nowCircleGroupY = height * 1.72, 
	dayCircleGroupRadius = baseRadius * 0.55, dayCircleGroupX = width / 2, dayCircleGroupY = height * 0.7, dayToDisplay;

	var nowCircleGroup = svg.append("g")
		.attr("transform", "translate("+nowCircleGroupX+", "+nowCircleGroupY+")")
		.attr("id", "nowCircleGroup");

		var nowCircle = nowCircleGroup.append("circle")
			.attr("id", "nowCircle")
			.attr("r", nowCircleGroupRadius)  // assuming portrait
			.attr("cy", 0);

		var nowArcs = nowCircleGroup.append("g")
			.attr("id", "nowArcs");

			var nowArc = d3.svg.arc()
				.innerRadius(nowCircleGroupRadius*0.88)
				.outerRadius(nowCircleGroupRadius*0.98)
				.startAngle(function(d){return (d.start/24)*radians;})
				.endAngle(function(d){return (d.start/24)*radians + (d.duration/24)*radians;});

			var centroidScale = 2;

			var practiceData = [{"id":80,"name":"dishes","start":11.0833333333333,"duration":0.166666666666667,"eventype":1,"day":16455},
				{"id":81,"name":"time2","start":11.25,"duration":0.5,"eventype":2,"day":16439},
				{"id":82,"name":"sleep","start":0.0,"duration":7.0,"eventype":1,"day":16439},
				{"id":84,"name":"time2","start":21.3666666666667,"duration":2.63333333333333,"eventype":1,"day":16437},
				{"id":86,"name":"wed","start":23.7,"duration":1.0,"eventype":2,"day":16440},
				{"id":88,"name":"sierra","start":26.7333333333333,"duration":1.0,"eventype":0,"day":16440},
				{"id":89,"name":"dishes, sweeping","start":7.0,"duration":1.0,"eventype":0,"day":16441},
				{"id":90,"name":"time2","start":9.8666666666667,"duration":0.716666666666667,"eventype":0,"day":16437},
				{"id":91,"name":"erik's bday cards","start":17.0,"duration":1.55,"eventype":0,"day":16438},
				{"id":92,"name":"job search","start":9.0,"duration":1.0,"eventype":0,"day":16442}];

				nowArcs.selectAll("path")
					.data(practiceData.filter(function(d){return d.day == 16439;}))
					.enter()
					.append("path")
					.attr("class", "nowEventArcs")
					.attr("d", nowArc)
					.attr("fill", function(d) {
						var eventColors = ["#0f2", "#d33", "#26f"];
						return eventColors[d.eventype];
					})
					.attr("opacity", 0.6)
					.attr("stroke-width", 1)
					.attr("stroke", "black")
					.attr("stroke-opacity", 0.5)
					.on('click', function(d,i){ window.location += "/" + d.id + "/edit";});

				nowArcs.selectAll("text")
					.data(practiceData.filter(function(d){return d.day == 16439;}))
					.enter()
					.append("text")
					.attr("class", "schedCentroids")
			        .attr("transform", function(d) {return "translate(" + nowArc.centroid(d) +"), scale("+centroidScale+"), rotate("+decimalHourDegrees+")";})
			        .attr("dy", ".35em")
			        .text(function(d) {return d.name;});

	var monthsGroup = svg.append("g")
		.attr("id", "monthsGroup")
		.attr("transform", "translate("+monthsGroupX+","+(monthCircleRadius+5)+")");
 
		var months = [
			{name: "Jan", days: d3.range(31), day1epoch: 16436}, 
			{name: "Feb", days: d3.range(28), day1epoch: 16467}, 
			{name: "Mar", days: d3.range(31), day1epoch: 16495}, 
			{name: "Apr", days: d3.range(30), day1epoch: 16526},  
			{name: "May", days: d3.range(31), day1epoch: 16556}, 
			{name: "Jun", days: d3.range(30), day1epoch: 16587},
			{name: "Jul", days: d3.range(31), day1epoch: 16617}, 
			{name: "Aug", days: d3.range(31), day1epoch: 16648}, 
			{name: "Sep", days: d3.range(30), day1epoch: 16679}, 
			{name: "Oct", days: d3.range(31), day1epoch: 16709}, 
			{name: "Nov", days: d3.range(30), day1epoch: 16740}, 
			{name: "Dec", days: d3.range(31), day1epoch: 16770}, 
		];

		var monthCircleGroups = monthsGroup.selectAll("g")
			.data(months)
			.enter().append("g")
			.attr("class", "monthCircleGroups")
			.on("click", function(d,i){
				if (d3.event.defaultPrevented) return;
				var duration = 400, displayDay, dayNumAngle;
				d3.select(this)
					.classed({"blownUp": true, "monthCircleGroups": false});
				d3.selectAll(".monthCircleGroups")
					.transition().duration(duration).style("opacity", 0);
				d3.selectAll(".monthCircleGroups")
					.classed({"monthCircleGroups": false, "unselectedMonths": true})
				d3.select(".blownUp")
					.transition().duration(duration).attr("transform", "translate("+(monthsX*1.6)+", "+(monthCircleRadius*1.6)+"), scale(2.6)");
				dayNumAngle=360/d.days.length; 
				for (var k=0; k<d.days.length; k++){
					d3.select(".blownUp").select(".dayNumsGroup").append("text")
						.attr("class", "dayNums").text(k+1)
						.on("click", (function(x) {
							return function() {displayDay = d.day1epoch+x;
								d3.select(".selectedDay")
									.classed({"dayNums":true, "selectedDay":false}); 
								d3.select(this)
									.classed({"dayNums":false, "selectedDay":true});
								drawDay(displayDay); console.log(displayDay);
								return displayDay;}
						})(k))
						.attr("transform", function() {return "rotate("+(k*dayNumAngle)+"), translate(0,"+(monthCircleRadius*-0.9)+"), rotate("+(k*-dayNumAngle)+")"})
						.style("opacity", 0);
				};
				d3.selectAll(".dayNums").transition().duration(duration).style("opacity", 1);
				d3.select("#nowCircleGroup")
					.transition().duration(duration).attr("transform", "translate("+nowCircleGroupX+","+(nowCircleGroupY+300)+")");
				var smallNowArc = d3.svg.arc()
					.innerRadius(nowCircleGroupRadius*0.92)
					.outerRadius(nowCircleGroupRadius*0.99)
					.startAngle(function(d){return (d.start/24)*radians;})
					.endAngle(function(d){return (d.start/24)*radians + (d.duration/24)*radians});
				d3.selectAll(".nowEventArcs")
					.transition().duration(duration).attr("d", smallNowArc);
				d3.selectAll(".schedCentroids")
					.transition().duration(duration).attr("transform", function(d) {return "translate(" + smallNowArc.centroid(d) +"), scale("+(centroidScale*0.7)+")";});
				d3.select("#dayCircleGroup")
					.transition().duration(duration).attr("transform", "translate("+dayCircleGroupX+", "+(dayCircleGroupY+120)+"), scale(0.55)");
				d3.select(".blownUp").on("click", null);
				});
		
		var monthsX=0;
				
		var monthsDrag = d3.behavior.drag()
		    .on('drag', function () {
		        monthsX += d3.event.dx;
		        d3.selectAll("#monthsGroup")
		        	.transition()
		        	.duration(0)
		        	.attr("transform", "translate("+(monthsGroupX+monthsX)+","+(monthCircleRadius+5)+")");
		    });	

		monthsGroup.call(monthsDrag);
							
			var monthCircles = monthCircleGroups.append("circle")
				.attr("id", function(d){return d.name;})
				.attr("class", "monthCircles")
				.attr("r", monthCircleRadius)
				.attr("cx", function(d,i){return i*200;})
				.attr("cy", 0)
				.attr("transform", function(d,i){return "scale(1)"});
				
			var monthNames = monthCircleGroups.append("text")
				.attr("class", "monthNames")
				.attr("x", function(d,i){return i*200;})	
				.attr("y", 0)
				.text(function(d,i){return d.name;});

			var dayNumsGroup = monthCircleGroups.append("g")
				.attr("class", "dayNumsGroup")
				.attr("transform", function(d,i) {return "translate("+(i*200)+",0)"});

	var dayCircleGroup = svg.append("g")
		.attr("id", "dayCircleGroup")
		.attr("transform", "translate("+dayCircleGroupX+", "+dayCircleGroupY+"), scale(1)")
		.on("click", function() {
			duration=500;
			d3.select(this)
				.transition().duration(duration).attr("transform", "translate("+dayCircleGroupX+", "+dayCircleGroupY+"), scale(1)");
			d3.select("#nowCircleGroup")
				.transition().duration(duration).attr("transform", "translate("+nowCircleGroupX+","+nowCircleGroupY+")");
			d3.selectAll(".unselectedMonths")
				.classed({"unselectedMonths": false, "monthCircleGroups": true})
			d3.selectAll(".monthCircleGroups")
				.transition().duration(duration).style("opacity", 1);
			d3.select(".blownUp")
				.transition().duration(duration).attr("transform", "translate(0,0), scale(1)");
			d3.select(".blownUp").select(".dayNumsGroup").selectAll("text").transition().duration(duration).style("opacity", 0).remove();
			d3.select(".blownUp")
				.on("click", function(d,i){
				if (d3.event.defaultPrevented) return;
				var duration = 400, displayDay, dayNumAngle;
				d3.select(this)
					.classed({"blownUp": true, "monthCircleGroups": false});
				d3.selectAll(".monthCircleGroups")
					.transition().duration(duration).style("opacity", 0);
				d3.selectAll(".monthCircleGroups")
					.classed({"monthCircleGroups": false, "unselectedMonths": true})
				d3.select(".blownUp")
					.transition().duration(duration).attr("transform", "translate("+(monthsX*1.6)+", "+(monthCircleRadius*1.6)+"), scale(2.6)");
				dayNumAngle=360/d.days.length; 
				for (var k=0; k<d.days.length; k++){
					d3.select(".blownUp").select(".dayNumsGroup").append("text")
						.attr("class", "dayNums").text(k+1)
						.on("click", (function(x) {
							return function() {displayDay = d.day1epoch+x;
								d3.select(".selectedDay")
									.classed({"dayNums":true, "selectedDay":false}); 
								d3.select(this)
									.classed({"dayNums":false, "selectedDay":true});
								drawDay(displayDay); console.log(displayDay);
								return displayDay;}
						})(k))
						.attr("transform", function() {return "rotate("+(k*dayNumAngle)+"), translate(0,"+(monthCircleRadius*-0.9)+"), rotate("+(k*-dayNumAngle)+")"})
						.style("opacity", 0);
				};
				d3.selectAll(".dayNums").transition().duration(duration).style("opacity", 1);
				d3.select("#nowCircleGroup")
					.transition().duration(duration).attr("transform", "translate("+nowCircleGroupX+","+(nowCircleGroupY+300)+")");
				var smallNowArc = d3.svg.arc()
					.innerRadius(nowCircleGroupRadius*0.92)
					.outerRadius(nowCircleGroupRadius*0.99)
					.startAngle(function(d){return (d.start/24)*radians;})
					.endAngle(function(d){return (d.start/24)*radians + (d.duration/24)*radians});
				d3.selectAll(".nowEventArcs")
					.transition().duration(duration).attr("d", smallNowArc);
				d3.selectAll(".schedCentroids")
					.transition().duration(duration).attr("transform", function(d) {return "translate(" + smallNowArc.centroid(d) +"), scale("+(centroidScale*0.7)+")";});
				d3.select("#dayCircleGroup")
					.transition().duration(duration).attr("transform", "translate("+dayCircleGroupX+", "+(dayCircleGroupY+120)+"), scale(0.55)");
				d3.select(".blownUp").on("click", null);
				});
			d3.select(".blownUp")
				.classed({"blownUp": false, "monthCircleGroups": true});
			d3.selectAll(".nowEventArcs")
				.transition().duration(500).attr("d", nowArc);
			d3.selectAll(".schedCentroids")
				.transition().duration(500).attr("transform", function(d) {return "translate(" + nowArc.centroid(d) +"), scale("+centroidScale+")";});
		});

		var dayCircle = dayCircleGroup.append("circle")
		.attr("id", "dayCircle")
		.attr("transform", "scale(1)")
		.attr("r", dayCircleGroupRadius)
		.attr("cy", 0);

		var dayArcs = dayCircleGroup.append("g")
			.attr("id", "dayArcs");

			var dayArc = d3.svg.arc()
				.innerRadius(dayCircleGroupRadius*0.65)
				.outerRadius(dayCircleGroupRadius*0.8)
				.startAngle(function(d){return (d.start/24)*radians;})
				.endAngle(function(d){return (d.start/24)*radians + (d.duration/24)*radians;});

			var dayCentroidScale = 1;

		// 	d3.json(url, function(error, json) {
		// 	arcs.selectAll("path")
		// 		.data(json)
		// 		.enter()
		// 		.append("path")
		// 		.attr("class", "eventArcs")
		// 		.attr("d", arc)
		// 		.attr("fill", function(d) {
		// 			var eventColors = ["#0f2", "#d33", "#26f"];
		// 			return eventColors[d.eventype];
		// 		})
		// 		.attr("opacity", 0.6)
		// 		.attr("stroke-width", 1)
		// 		.attr("stroke", "black")
		// 		.attr("stroke-opacity", 0.5)
		// 		.on('click', function(d,i){ window.location += "/" + d.id + "/edit";});
				

		// // centroids

		// 	arcs.selectAll("text")
		// 		.data(json)
		// 		.enter()
		// 		.append("text")
		// 		.attr("class", "schedCentroids")
		//         .attr("transform", function(d) {return "translate(" + arc.centroid(d) +"), scale("+centroidScale+"), rotate("+decimalHourDegrees+")";})
		//         .attr("dy", ".35em")
		//         .text(function(d) {return d.name;});
		// 	});

		var drawDay = function(selectedDay) {
			d3.json(url, function(error, json) {
				var dayPaths = dayArcs.selectAll("path")
					.data(json.filter(function(d){return d.day == selectedDay;}), function(d) {return d.id;});
				dayPaths.exit().transition().duration(300).style("opacity", 0).remove();
				dayPaths.enter()
					.append("path")
					.attr("class", "dayEventArcs")
					.attr("d", dayArc)
					.attr("fill", function(d) {
						var eventColors = ["#0f2", "#d33", "#26f"];
						return eventColors[d.eventype];
					})
					.attr("opacity", 0)
					.on("mouseover", function() {d3.select(this).transition().duration(0).style("opacity", 1);})
					.on("mouseout", function() {d3.select(this).transition().duration(200).style("opacity", 0.6);})
					.on('click', function(d,i){ window.location += "/" + d.id + "/edit";})
					.transition().duration(600).attr("opacity", 0.6);
		    	var dayText = dayArcs.selectAll("text")
					.data(json.filter(function(d){return d.day == selectedDay;}), function(d) {return d.id;});
				dayText.exit().transition().duration(300).style("opacity", 0).remove();
				dayText.enter()
					.append("text")
					.attr("class", "daySchedCentroids")
			        .attr("transform", function(d) {return "translate(" + dayArc.centroid(d) +"), scale("+dayCentroidScale+")";})
			        .attr("dy", ".35em")
			        .text(function(d) {return d.name;})
			        .style("opacity", 1);
		    });
		};

	

		var logo = dayCircleGroup.append("text").attr("id", "logo").attr("y", 30).text("time2");

		var dateText = dayCircleGroup.append("text").attr("id", "dateText").attr("y", -75).text(function(d) {return dateForDisplay;});

		var createEventButtonGroup = dayCircleGroup.append("g").attr("transform", "translate(0, 70)");

			var createEventButton = createEventButtonGroup.append("rect")
				.attr("id", "createEventButton")
				.attr("width", 200)
				.attr("height", 50)
				.attr("x", -100).attr("y", 0)
				.attr("rx", 6)
				.on("click", function(d,i){ window.location += "/new";});

			var createEventType = createEventButtonGroup.append("text").attr("id", "createEventType").attr("y", 35).text("Create Event");

		drawDay(epochDay);

	// // timeCircle
	// 	var timeCircle = dayCircleGroup.append("g")
	// 		.attr("transform", "scale(0.5,0.5)")
	// 		.attr("opacity" ,0);

	// 		var timeRadius = dayCircleGroupRadius * 0.3;

	// 		var circleShape = timeCircle.append("circle")
	// 			.attr("cx",0)
	// 			.attr("cy",0)
	// 			.attr("r",timeRadius)
	// 			.attr("fill", function() {return "url(#formGrad)";})
	// 			.attr("id", "timeCircle");

	// 		var formGrads = timeCircle.append("radialGradient")
	// 			.attr("gradientUnits", "userSpaceOnUse")
	// 			.attr("cx", 0)
	// 			.attr("cy", 0)
	// 			.attr("r", "50%")
	// 			.attr("id", "formGrad");

	// 		formGrads.append("stop").attr("offset", "0%").style("stop-color", "rgba(150,150,150,1)");
	// 		formGrads.append("stop").attr("offset", "100%").style("stop-color", "rgba(200,200,200,1)");

			



	// 	// time arcs

	// 		var eventDay=16455, eventStart=12, eventDur=2;

	// 		// hour start, end, duration calculators
	// 		var startH = function() {return d3.round(hourStartAngle/radians*12);},
	// 		 endH = function() {return d3.round(hourEndAngle/radians*12);},
	// 		 durH = function() {return d3.round((hourEndAngle-hourStartAngle)/radians*12);};


	// 		var eventStartField = document.getElementById("event_start");
	// 		var eventDurationField = document.getElementById("event_duration");
			

	// 		var fillInForm = function () {
	// 			eventStartField.value = startH() + startM()/60;
	// 	        eventDurationField.value = endH() - startH() + endM()/60- startM()/60;
	// 		};

		

	// 	// hourArc
	// 		var hInRadius = timeRadius * 0.44, hOutRadius = timeRadius * 0.65;

	// 		var hourStartAngle = ((eventStart-eventStart%1)/12)*radians, 
	// 			hourEndAngle = ((eventDur-eventDur%1)/12)*radians + ((eventStart-eventStart%1)/12)*radians;

	// 		var hourArc = d3.svg.arc()
	// 			.outerRadius(hOutRadius)
	// 			.innerRadius(hInRadius);
				
	// 		var hPath = timeCircle.append("path")
	// 			.datum({endAngle: hourEndAngle})
	// 			.each(function(d) { d.endAngle = hourEndAngle; })
	// 			.each(function(d) { d.startAngle = hourStartAngle; })
	// 			.attr("d", hourArc)
	// 		    .attr("id", "hArcy");

			    
			
	// 		d3.select("#startHNums").text(startH()+":");
	//         d3.select("#endHNums").text(endH()+":");
	//         d3.select("#durHNums").text(durH()+":");


	// 	// hour startAngle drag function
	// 		var hDrag = d3.behavior.drag()
	// 		    .on("drag", function(d,i) {
	// 		        hourStartAngle += d3.event.dx*radians/748;
	// 		        hStartSliderStartAngle += d3.event.dx*radians/748;
	// 		        hStartSliderEndAngle += d3.event.dx*radians/748;
	// 		        hEndSliderStartAngle += d3.event.dx*radians/748;
	// 		        hEndSliderEndAngle += d3.event.dx*radians/748;
	// 		        hourEndAngle += d3.event.dx*radians/748;
	// 		        d3.select(this)
	// 		        .transition().duration(0).call(hStartArcTween, hourStartAngle)
	// 		        .transition().duration(0).call(hEndArcTween, hourEndAngle)
	// 		        d3.select("#hStartSliderArcy")
	// 		        .transition().duration(0).call(hStartSliderArcTween, hStartSliderStartAngle, hStartSliderEndAngle)
	// 		        d3.select("#hEndSliderArcy")
	// 		        .transition().duration(0).call(hEndSliderArcTween, hEndSliderStartAngle, hEndSliderEndAngle)
	// 		        d3.select("#startHNums").text(startH()+":")
	// 		        d3.select("#endHNums").text(endH()+":")
	// 		        d3.select("#durHNums").text(durH()+":")
	// 		        fillInForm();
	// 		    });	

	// 		hPath.call(hDrag);



	// 	// hStartArcTween
	// 		function hStartArcTween(transition, newAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.startAngle, newAngle);
	// 				return function(t) {
	// 					d.startAngle=interpolate(t);
	// 					return hourArc(d);
	// 				};
	// 			});
	// 		}



	// 	// hEndArcTween
	// 		function hEndArcTween(transition, newAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.endAngle, newAngle);
	// 				return function(t) {
	// 					d.endAngle=interpolate(t);
	// 					return hourArc(d);
	// 				};
	// 			});
	// 		}




	// 	// hourEndSlider
	// 		var hEndSliderInRadius = timeRadius * 0.42, hEndSliderOutRadius = timeRadius * 0.7;

	// 		var hEndSliderStartAngle = hourEndAngle - 1/8, hEndSliderEndAngle = hourEndAngle + 1/8

	// 		var hEndSliderArc = d3.svg.arc()
	// 			.outerRadius(hEndSliderOutRadius)
	// 			.innerRadius(hEndSliderInRadius);

	// 		var hEndSliderPath = timeCircle.append("path")
	// 			.datum({startAngle: hEndSliderStartAngle})
	// 			.each(function(d) { d.endAngle = hEndSliderEndAngle; })
	// 			.each(function(d) { d.startAngle = hEndSliderStartAngle; })
	// 		    .attr("d", hEndSliderArc)
	// 		    .attr("id", "hEndSliderArcy");



	// 	// hour End slider drag functionS
	// 		var hEndSliderDrag = d3.behavior.drag()
	// 		    .on("drag", function(d,i) {
	// 		        hEndSliderStartAngle += d3.event.dx*radians/748;
	// 		        hEndSliderEndAngle += d3.event.dx*radians/748;
	// 		        hourEndAngle += d3.event.dx*radians/748;
	// 		        d3.select(this)
	// 		        .transition().duration(0).call(hEndSliderArcTween, hEndSliderStartAngle, hEndSliderEndAngle)
	// 		        d3.select("#hArcy")
	// 		        .transition().duration(0).call(hEndArcTween, hourEndAngle)
	// 		        d3.select("#startHNums").text(startH()+":")
	// 		        d3.select("#endHNums").text(endH()+":")
	// 		        d3.select("#durHNums").text(durH()+":")
	// 		        fillInForm();
	// 		    });	

	// 		hEndSliderPath.call(hEndSliderDrag);



	// 	// hEndSliderArcTween
	// 		function hEndSliderArcTween(transition, newStartAngle, newEndAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.startAngle, newStartAngle);
	// 				var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
	// 				return function(t) {
	// 					d.startAngle=interpolate(t);
	// 					d.endAngle=interpolate2(t);
	// 					return hEndSliderArc(d);
	// 				};
	// 			});
	// 		};


	// 		// hourStartSlider
	// 				var hStartSliderInRadius = timeRadius * 0.42, hStartSliderOutRadius = timeRadius * 0.6;

	// 				var hStartSliderStartAngle = hourStartAngle - 1/8, hStartSliderEndAngle = hourStartAngle + 1/8;

	// 				var hStartSliderArc = d3.svg.arc()
	// 					.outerRadius(hStartSliderOutRadius)
	// 					.innerRadius(hStartSliderInRadius);

	// 				var hStartSliderPath = timeCircle.append("path")
	// 					.datum({startAngle: hStartSliderStartAngle})
	// 					.each(function(d) { d.endAngle = hStartSliderEndAngle; })
	// 					.each(function(d) { d.startAngle = hStartSliderStartAngle; })
	// 				    .attr("d", hStartSliderArc)
	// 				    .attr("id", "hStartSliderArcy");



	// 				// hour start slider drag function
	// 				var hStartSliderDrag = d3.behavior.drag()
	// 				    .on("drag", function(d,i) {
	// 				        hStartSliderStartAngle += d3.event.dx*radians/748;
	// 				        hStartSliderEndAngle += d3.event.dx*radians/748;
	// 				        hourStartAngle += d3.event.dx*radians/748;
	// 				        d3.select(this)
	// 				        .transition().duration(0).call(hStartSliderArcTween, hStartSliderStartAngle, hStartSliderEndAngle)
	// 				        d3.select("#hArcy")
	// 				        .transition().duration(0).call(hStartArcTween, hourStartAngle)
	// 				        d3.select("#startHNums").text(startH()+":")
	// 				        d3.select("#endHNums").text(endH()+":")
	// 				        d3.select("#durHNums").text(durH()+":")
	// 				        fillInForm();
	// 				    });	

	// 				hStartSliderPath.call(hStartSliderDrag);



	// 				// hStartSliderArcTween
	// 				function hStartSliderArcTween(transition, newStartAngle, newEndAngle) {
	// 					transition.attrTween("d", function(d) {
	// 						var interpolate=d3.interpolate(d.startAngle, newStartAngle);
	// 						var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
	// 						return function(t) {
	// 							d.startAngle=interpolate(t);
	// 							d.endAngle=interpolate2(t);
	// 							return hStartSliderArc(d);
	// 						};
	// 					});
	// 				};




	// 	// MinuteArc
	// 		var mInRadius = timeRadius * 0.78, mOutRadius = timeRadius * 1.05;

	// 		var zero = d3.format("02d");

	// 		var minuteArc = d3.svg.arc()
	// 			.outerRadius(mOutRadius)
	// 			.innerRadius(mInRadius);

	// 		var minuteStartAngle = (eventStart%1)*radians, minuteEndAngle = (eventDur%1)*radians+(eventStart%1)*radians; 

	// 		var mPath = timeCircle.append("path")
	// 			.datum({endAngle: minuteEndAngle})
	// 			.each(function(d) { d.endAngle = minuteEndAngle; })
	// 			.each(function(d) { d.startAngle = minuteStartAngle; })
	// 		    .attr("d", minuteArc)
	// 		    .attr("id", "mArcy");

	// 		d3.select("#startMNums").text(startM)
	//         d3.select("#endMNums").text(endM)


	// 		// minute start, end, duration calculators

	// 		var startM = function() {return zero(d3.round(minuteStartAngle/radians*60), 2)},
	// 		endM = function() {return zero(d3.round(minuteEndAngle/radians*60), 2);},
	// 		durM = function() {
	// 						var roundedMinuteStartAngle = d3.round(minuteStartAngle/radians*60),
	// 						roundedMinuteEndAngle = d3.round(minuteEndAngle/radians*60);
	// 						return zero((roundedMinuteEndAngle - roundedMinuteStartAngle), 2);
	// 		 				};


	// 		// minute drag function
	// 		var mDrag = d3.behavior.drag()
	// 		    .on("drag", function(d,i) {
	// 		        minuteStartAngle += d3.event.dx*radians/748;
	// 		        mStartSliderStartAngle += d3.event.dx*radians/748;
	// 		        mStartSliderEndAngle += d3.event.dx*radians/748;
	// 		        minuteEndAngle += d3.event.dx*radians/748;
	// 		        mEndSliderStartAngle += d3.event.dx*radians/748;
	// 		        mEndSliderEndAngle += d3.event.dx*radians/748;
	// 		        d3.select(this)
	// 		        .transition().duration(0).call(mStartArcTween, minuteStartAngle)
	// 		        .transition().duration(0).call(mEndArcTween, minuteEndAngle)
	// 		        d3.select("#mStartSliderArcy")
	// 		        .transition().duration(0).call(mStartSliderArcTween, mStartSliderStartAngle, mStartSliderEndAngle)
	// 		        d3.select("#mEndSliderArcy")
	// 		        .transition().duration(0).call(mEndSliderArcTween, mEndSliderStartAngle, mEndSliderEndAngle)
	// 		        d3.select("#startMNums").text(startM)
	// 		        d3.select("#endMNums").text(endM)
	// 		        d3.select("#durMNums").text(durM)
	// 		        fillInForm();
	// 		    });	

	// 		mPath.call(mDrag);

			

	// 		// mStartArcTween
	// 		function mStartArcTween(transition, newAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.startAngle, newAngle);
	// 				return function(t) {
	// 					d.startAngle=interpolate(t);
	// 					return minuteArc(d);
	// 				};
	// 			});
	// 		}



	// 		// mEndArcTween
	// 		function mEndArcTween(transition, newAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.endAngle, newAngle);
	// 				return function(t) {
	// 					d.endAngle=interpolate(t);
	// 					return minuteArc(d);
	// 				};
	// 			});
	// 		}






	// 		// minute end Slider
	// 		var mEndSliderInRadius = timeRadius * 0.75, mEndSliderOutRadius = timeRadius * 1.08;

	// 		var mEndSliderStartAngle = minuteEndAngle - 1/18, mEndSliderEndAngle = minuteEndAngle + 1/18;

	// 		var mEndSliderArc = d3.svg.arc()
	// 			.outerRadius(mEndSliderOutRadius)
	// 			.innerRadius(mEndSliderInRadius);

	// 		var mEndSliderPath = timeCircle.append("path")
	// 			.datum({startAngle: mEndSliderStartAngle})
	// 			.each(function(d) { d.endAngle = mEndSliderEndAngle; })
	// 			.each(function(d) { d.startAngle = mEndSliderStartAngle; })
	// 		    .attr("d", mEndSliderArc)
	// 		    .attr("id", "mEndSliderArcy");



	// 		// minute end slider drag function
	// 		var mEndSliderDrag = d3.behavior.drag()
	// 		    .on("drag", function(d,i) {
	// 		        mEndSliderStartAngle += d3.event.dx*radians/748;
	// 		        mEndSliderEndAngle += d3.event.dx*radians/748;
	// 		        minuteEndAngle += d3.event.dx*radians/748;
	// 		        d3.select(this)
	// 		        .transition().duration(0).call(mEndSliderArcTween, mEndSliderStartAngle, mEndSliderEndAngle)
	// 		        d3.select("#mArcy")
	// 		        .transition().duration(0).call(mEndArcTween, minuteEndAngle)
	// 		        d3.select("#startMNums").text(startM)
	// 		        d3.select("#endMNums").text(endM)
	// 		        d3.select("#durMNums").text(durM)
	// 		        fillInForm();
	// 		    });	

	// 		mEndSliderPath.call(mEndSliderDrag);



	// 		// mEndSliderArcTween
	// 		function mEndSliderArcTween(transition, newStartAngle, newEndAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.startAngle, newStartAngle);
	// 				var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
	// 				return function(t) {
	// 					d.startAngle=interpolate(t);
	// 					d.endAngle=interpolate2(t);
	// 					return mEndSliderArc(d);
	// 				};
	// 			});
	// 		};




	// 		// minute start slider

	// 		var mStartSliderInRadius = timeRadius * 0.76, mStartSliderOutRadius = timeRadius;

	// 		var mStartSliderStartAngle = minuteStartAngle - 1/18, mStartSliderEndAngle = minuteStartAngle + 1/18;

	// 		var mStartSliderArc = d3.svg.arc()
	// 			.outerRadius(mStartSliderOutRadius)
	// 			.innerRadius(mStartSliderInRadius);

	// 		var mStartSliderPath = timeCircle.append("path")
	// 			.datum({startAngle: mStartSliderStartAngle})
	// 			.each(function(d) { d.endAngle = mStartSliderEndAngle; })
	// 			.each(function(d) { d.startAngle = mStartSliderStartAngle; })
	// 		    .attr("d", mStartSliderArc)
	// 		    .attr("id", "mStartSliderArcy");

	// 		// minute start slider drag function
	// 		var mStartSliderDrag = d3.behavior.drag()
	// 		    .on("drag", function(d,i) {
	// 		        mStartSliderStartAngle += d3.event.dx*radians/748;
	// 		        mStartSliderEndAngle += d3.event.dx*radians/748;
	// 		        minuteStartAngle += d3.event.dx*radians/748;
	// 		        d3.select(this)
	// 		        .transition().duration(0).call(mStartSliderArcTween, mStartSliderStartAngle, mStartSliderEndAngle)
	// 		        d3.select("#mArcy")
	// 		        .transition().duration(0).call(mStartArcTween, minuteStartAngle)
	// 		        d3.select("#startMNums").text(startM)
	// 		        d3.select("#endMNums").text(endM)
	// 		        d3.select("#durMNums").text(durM)
	// 		        fillInForm();
	// 		    });	

	// 		mStartSliderPath.call(mStartSliderDrag);
	// 		// mStartSliderPath.call(link_to_edit/delete);

	// 		// mStartSliderArcTween
	// 		function mStartSliderArcTween(transition, newStartAngle, newEndAngle) {
	// 			transition.attrTween("d", function(d) {
	// 				var interpolate=d3.interpolate(d.startAngle, newStartAngle);
	// 				var interpolate2=d3.interpolate(d.endAngle, newEndAngle);
	// 				return function(t) {
	// 					d.startAngle=interpolate(t);
	// 					d.endAngle=interpolate2(t);
	// 					return mStartSliderArc(d);
	// 				};
	// 			});
	// 		};



	// 	// hour numbers
	// 		var formHoursText = [12];

	// 		for (var i=1; i<12; i++) {
	// 			formHoursText.push(i);
	// 		};

	// 		var formHTextRadius = timeRadius * -0.58;

	// 		var formHText = timeCircle.selectAll(".formHourNums")
	// 			.data(formHoursText)
	// 			.enter()
	// 			.append("text")
	// 			.attr("class", "formHourNums")
	// 			.attr("x",0)
	// 			.attr("y",7)
	// 			.attr("transform", function(d,i) {return "rotate("+d*30+")translate(0,"+formHTextRadius+") rotate("+d*-30+")"})
	// 			.text(function(d) {return d});
	// 			// .on("click", function to make start angle = angle of that hour (ie., 1900 (7pm) = 210 degrees (~2 radians)));



	// 	// minute numbers
	// 		var formMinutesText = [0];

	// 		for (var j=0; j<60; j++) {
	// 			formMinutesText.push(j);
	// 		};

	// 		var formMTextRadius = timeRadius * -0.92;

	// 		var formMText = timeCircle.selectAll(".formMinuteNums")
	// 			.data(formMinutesText)
	// 			.enter()
	// 			.append("text")
	// 			.attr("class", "formMinuteNums")
	// 			.attr("x",0)
	// 			.attr("y",3)
	// 			.attr("transform", function(d,j) {return "rotate("+d*6+")translate(0,"+formMTextRadius+") rotate("+d*-6+")"})
	// 			.text(function(d) {return d})
	// 			.attr("text-anchor", "middle");




	// 	// inner display


	// 		// small middle circle
	// 			var midCircle = timeCircle.append("g")
	// 				.attr("transform", "scale(0,0)");

	// 				var midCircleShape = midCircle.append("circle")
	// 					.attr("cx", 0)
	// 					.attr("cy", 0)
	// 					.attr("r", timeRadius/2.5)
	// 					.attr("id", "middy");


	// 				// start, end, duration big numbers

	// 					var innerTimes = midCircle.append("g")
	// 					.attr("transform", "translate(0,-22)");

	// 					var timeYPos = 10, timeYSpacing = 10;

	// 					var dateDisplay = innerTimes.append("text")
	// 						.attr("id", "dateDisplay")
	// 						.attr("x", -2)
	// 						.attr("y", timeYPos)
	// 						.text(dateForDisplay);

	// 					var startHour = innerTimes.append("text")
				
	// 						.attr("id", "startHNums")
	// 						.attr("x", 0)
	// 						.attr("y", timeYPos+timeYSpacing)
	// 						.style("text-anchor", "end")
	// 						.text(startH()+":");

	// 					var endHour = innerTimes.append("text")

	// 						.attr("id", "endHNums")
	// 						.attr("x", 0)
	// 						.attr("y", timeYPos+timeYSpacing*2)
	// 						.style("text-anchor", "end")
	// 						.text(endH()+":");

	// 					var durationHours = innerTimes.append("text")
				
	// 						.attr("id", "durHNums")
	// 						.attr("x", 0)
	// 						.attr("y", timeYPos+timeYSpacing*3)
	// 						.style("text-anchor", "end")
	// 						.text(durH()+":");


	// 					var startMinute = innerTimes.append("text")
					
	// 						.attr("id", "startMNums")
	// 						.attr("x", 0)
	// 						.attr("y", timeYPos+timeYSpacing)
	// 						.style("text-anchor", "start")
	// 						.text(startM());

	// 					var endMinute = innerTimes.append("text")
				
	// 						.attr("id", "endMNums")
	// 						.attr("x", 0)
	// 						.attr("y", timeYPos+timeYSpacing*2)
	// 						.style("text-anchor", "start")
	// 						.text(endM());

	// 					var durationMinutes = innerTimes.append("text")
						
	// 						.attr("id", "durMNums")
	// 						.attr("x", 0)
	// 						.attr("y", timeYPos+timeYSpacing*3)
	// 						.style("text-anchor", "start")
	// 						.text(durM());

	// 				midCircle.transition().delay(500).duration(1250).ease("bounce").attr("transform", "scale(1,1)");




	// 	// eventype buttons

	// 		var eventType;

	// 		var buttons = [{eventypeName: "Daily Life", eventypeColor: "#0f2"}, {eventypeName: "Must Do", eventypeColor: "#d33"}, {eventypeName: "Would Like", eventypeColor: "#26f"}];

	// 		var buttonsField = document.getElementById("event_eventype");

	// 		var eventypeButtonsGroup = dayCircleGroup.append("g")
	// 			.attr("width", width/2)
	// 			.attr("height", height*0.2);

	// 		var dailyLifeButton = eventypeButtonsGroup.append("g");

	// 		var eventypeButtonShells = eventypeButtonsGroup.selectAll("rect")
	// 			.data(buttons)
	// 			.enter()
	// 			.append("rect")
	// 			.attr("class", function(d,i) {
	// 				if (eventType==i)
	// 					return "selectedType";
	// 				else
	// 					return "typeButtons";
	// 			})
	// 			.attr("width", width*0.1)
	// 			.attr("height", height*0.04)
	// 			.attr("x", function(d,i){return width/2+(i-1)*(width/9.1)-47})
	// 			.attr("y", height*0.87)
	// 			.attr("rx", 6)
	// 			.attr("ry", 6)
	// 			.attr("fill", function(d,i){return d.eventypeColor})
	// 			.on("click", function(d,i){
	// 				buttonsField.value=i;
	// 				d3.select('.selectedType').classed({'selectedType': false, 'typeButtons': true});
	// 				d3.select(this).classed({'selectedType': true, 'typeButtons': false});
	// 			});

	// 		var buttonLabels = eventypeButtonsGroup.selectAll("text")
	// 			.data(buttons)
	// 			.enter()
	// 			.append("text")
	// 			.attr("class", "buttonLabels")
	// 			.attr("x", function(d,i){return width/2+(i-1)*100})
	// 			.attr("y", height*0.892)
	// 			.text(function(d) {return d.eventypeName});
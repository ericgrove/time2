
// schedule donut

var width = 1915, height = 1075, radius = 450;

var now = new Date();

var decimalHour = now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600;

var radians = Math.PI*2;

var decimalHourDegrees = ((decimalHour/24)*360);

var day = now;

var epoch = now.getTime() - (1000 * 60 * 60 * 5);	// adjust for GMT to EST, -5 hours

var epochDay = Math.floor(epoch/8.64e7);

var svg = d3.select("body")
	.append("svg")
	.attr("width",width)
	.attr("height",height);




	// schedule

		var decimalHourRadians = ((decimalHour)/24)*radians;

		var clockR = (decimalHourDegrees*-1);

		var schedule = svg.append("g")
			.attr("transform", "scale(0), translate(0,0), rotate(0)")
			.attr("opacity", 0)
			.attr("id", "circleG");

		var circleShape = schedule.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",radius)
			.attr("fill", function() {return "url(#grad)";})
			.attr("id", "circle");	

		var grads = schedule.append("radialGradient")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", "80%")
			.attr("id", "grad");

		grads.append("stop").attr("offset", "0%").style("stop-color", "rgba(50,50,50,1)");
		grads.append("stop").attr("offset", "70%").style("stop-color", "rgba(0,0,0,1)");


		// circle transition on

			schedule.transition().duration(999).attr("opacity", 1).attr("transform", "scale(1), translate(960,540), rotate("+clockR+")");


		// clock background svg image

			var imgs = schedule.selectAll("img").data([0]);
		    imgs.enter()
		        .append("image")
		        .attr("xlink:href", "/assets/drawing-1.svg")
		        .attr("opacity", 0.3)
		        .attr("x", -700)
		        .attr("y", -690)
		        .attr("width", "1400")
		        .attr("height", "1400");



	// rings

	 	
	 	var scheduleRings = [2,4,6,8];

	 	var rings = schedule.append("g");

	 	var ring = d3.svg.arc()
	 				.innerRadius(function(d,i) {return d*45})
	 				.outerRadius(function(d,i) {return d*50})
	 				.startAngle(0)
	 				.endAngle(radians);

	 	var ringPaths = rings.selectAll("path")
	 						.data(scheduleRings)
	 						.enter()
	 						.append("path")
	 						.attr("class", "scheduleRings")
	 						.attr("d", ring);
	 	


	// ARCS
		
		var arcs = schedule.append("g");
			
		var todayWkDay = now.getDay();

		var thisWkSundayEpoch = epochDay - todayWkDay;

		var dayOffset = 2;

		var arc = d3.svg.arc()
			.innerRadius(function(d, i) {if ((d.day-thisWkSundayEpoch+dayOffset)*45 < 0) {
				return 0;}
				else {
					return (d.day-thisWkSundayEpoch+dayOffset)*45;
				}
			})
			.outerRadius(function(d, i) {if ((d.day-thisWkSundayEpoch+dayOffset)*50 < 0) {
				return 0;}
				else {
					return (d.day-thisWkSundayEpoch+dayOffset)*50;
				}
			})
			.startAngle(function(d, i) {return (d.start/24)*radians;})
			.endAngle(function(d, i) {return (d.duration/24)*radians + (d.start/24)*radians;});


	// json bind

		var url = '/events.json';

		var centroidScale = 0.7;

		d3.json(url, function(error, json) {
			arcs.selectAll("path")
				.data(json)
				.enter()
				.append("path")
				.attr("class", "eventArcs")
				.attr("d", arc)
				.attr("fill", function(d) {return d.eventype;})
				.attr("opacity", 0.6)
				.attr("stroke-width", 1)
				.attr("stroke", "black")
				.attr("stroke-opacity", 0.5)
				.on('click', function(d,i){ window.location += "/" + d.id + "/edit";});
				

		// centroids

			arcs.selectAll("text")
				.data(json)
				.enter()
				.append("text")
				.attr("class", "schedCentroids")
		        .attr("transform", function(d) {return "translate(" + arc.centroid(d) +"), scale("+centroidScale+"), rotate("+decimalHourDegrees+")";})
		        .attr("dy", ".35em")
		        .text(function(d) {return d.name;});
			});

	 
	// hour numbers

		var hoursText = [24];

		for (var j=1; j<24; j++) {
			hoursText.push(j);
		};

		var hTextRadius = radius - 20;

		var hText = schedule.selectAll(".hourNums")
			.data(hoursText)
			.enter()
			.append("text")
			.attr("class", "hourNums")
			.attr("x",-0)
			.attr("y",8)
			.attr("fill", "orange")
			.attr("transform", function(d,i) {return "rotate("+(d*15+180)+"), translate(0,"+hTextRadius+"), rotate("+((d*-15)+decimalHourDegrees+180)+")"})
			.text(function(d) {return d});


	// now hand
			
		var nowArc = d3.svg.arc()
			.outerRadius(radius*0.96)
			.innerRadius(radius*0.69)
			.startAngle(function() {return decimalHourRadians-0.003;})
			.endAngle(function() {return decimalHourRadians+0.003;});

		var nowHand = schedule.append("path")
			.attr("fill", "yellow")
			.attr("opacity", 1)
			.attr("d", nowArc);


	// logo

		svg.append("text")
			.text("time2")
			.attr("id", "logo")
			.attr("x", 525)
			.attr("y", 112)
			.attr("fill", "orange")
			.attr("font-size", "36px");


	// new event link

		svg.append("text")
				.text("New Event")
				.attr("class", "linky")
				.attr("x", 535).attr("y", 135)
				.attr("font-size", "14px")
				.on("click", function(){ window.location += "/new"});


	// change day range drag

		var changeDayRangeDrag = svg.append("circle")
			.attr("cx", 960)
			.attr("cy", 540)
			.attr("r", 30)
			.attr("fill", "black")
			.attr("opacity", 0)
			.attr("id", "changeDayRangeDrag");

		changeDayRangeDrag.transition().delay(500).duration(500).attr("r", 30).attr("opacity", 0.4);

		var dayRangeDrag = d3.behavior.drag()
			    .on("drag", function(d,i) {
			        dayOffset += d3.event.dx/30;
			        d3.selectAll(".eventArcs")
			        	.transition()
			        	.duration(0)
			        	.attr("d", arc)
			        d3.selectAll(".schedCentroids")
			        	.attr("transform", function(d) {return "translate(" + arc.centroid(d) +"), scale("+centroidScale+"), rotate("+(centroidR)+")";});
			    });	

		changeDayRangeDrag.call(dayRangeDrag);


	// rotate clock drag

		var centroidR = decimalHourDegrees;

		var clockDrag = d3.behavior.drag()
			    .on("drag", function() {
			        clockR += d3.event.dx/10;
			        centroidR -= d3.event.dx/10;
			        schedule.transition().duration(0).attr("transform", "scale(1,1), translate(960,540), rotate("+(clockR)+")");
		        	d3.selectAll(".schedCentroids")
			        	.transition().duration(0).attr("transform", function(d,i) {return "translate(" + arc.centroid(d) +"), scale("+centroidScale+"), rotate("+(centroidR)+")"});
		        	d3.selectAll(".hourNums")
			        	.transition().duration(0).attr("transform", function(d,i) {return "rotate("+(d*15+180)+"), translate(0,"+hTextRadius+"), rotate("+((d*-15)+centroidR+180)+")"});
			    });	

		schedule.call(clockDrag);


	// time update

		// setInterval(function() {
			
		// 	now = new Date();

		// 	decimalHour = now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600;

		// 	decimalHourRadians = ((decimalHour)/24)*radians;

		// 	decimalHourDegrees = ((decimalHour/24)*360);

		// 	nowArc = d3.svg.arc()
		// 		.outerRadius(radius*0.96)
		// 		.innerRadius(radius*0.69)
		// 		.startAngle(function() {return decimalHourRadians-0.003;})
		// 		.endAngle(function() {return decimalHourRadians+0.003;});

		// 	nowHand.transition()
		// 		.duration(1000)
		// 		.attr("d", nowArc);

		// 	schedule.transition()
		// 		.duration(1000)
		// 		.attr("transform", "scale(1,1), translate(960,540), rotate("+decimalHourDegrees*-1+")");

		// 	hText.transition()
		// 		.duration(1000)
		// 		.attr("transform", function(d,i) {return "rotate("+(d*15+180)+"), translate(0,"+hTextRadius+"), rotate("+((d*-15)+decimalHourDegrees+180)+")"});

		// 	d3.selectAll(".schedCentroids").transition()
		// 		.duration(1000)
		// 		.attr("transform", function(d,i) {return "translate(" + arc.centroid(d) +"), scale("+centroidScale+"), rotate("+decimalHourDegrees+")"});

		// 	clockR = decimalHourDegrees*-1;

		// 	centroidR = decimalHourDegrees;

		// }, 10000);
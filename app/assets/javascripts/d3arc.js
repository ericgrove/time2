//create event tool

var width = 900, height = 540, radius = 110;

var now = new Date();

var decimalHour = now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600;

var radians = Math.PI*2;

var decimalHourDegrees = ((decimalHour/24)*360);

var svg = d3.select("#clock")
	.append("svg")
	.attr("width",width)
	.attr("height",height);


	// year circle
		
		var yearCircle = svg.append("g")
							.attr("transform", "translate(450,245), scale(1.7,1.7)")
							.attr("id", "yearCircle");

			var dayRadius = radius * 1.3;

			var yearCircleShape = yearCircle.append("circle")
									.attr("cx", 00)
									.attr("cy", 00)
									.attr("r", dayRadius)
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

		function assignWk(selectedWk) {
			currentWkSunday = (selectedWk * 7) + sunday2014wk1;
		};


		// jan circle
			var janCircle = yearCircle.append("g")
									.attr("id", "jan")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(15), translate(0," + (dayRadius * -0.78) + "), rotate(-15), scale(1,1)");

				var janCircleShape = janCircle.append("circle")
										.attr("class", "winterMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var janText = janCircle.append("text")
										.attr("x", -11)
										.attr("y", 4)
										.text("Jan");

					var janDaysText = [];

					for (var j=1; j<32; j++) {
						janDaysText.push(j);
					};

					var janDaysTextRadius = dayRadius * -0.156;
					var janDaysAngleOffset = 360 / janDaysText.length;

					var janDText = janCircle.selectAll(".janDaysText")
						.data(janDaysText)
						.enter()
						.append("text")
						.attr("class", "janDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*janDaysAngleOffset+")translate(0,"+janDaysTextRadius+") rotate("+(janDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);

					var janwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/janDaysText.length)*radians)
						.endAngle((4.8/janDaysText.length)*radians);

					var janwk1path = janCircle.append("path")
						.attr("d", janwk1arc)
						.attr("class", "weeks");

					var janwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((5/janDaysText.length)*radians)
						.endAngle((11.8/janDaysText.length)*radians);

					var janwk2path = janCircle.append("path")
						.attr("d", janwk2arc)
						.attr("class", "weeks");

					var janwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((12/janDaysText.length)*radians)
						.endAngle((18.8/janDaysText.length)*radians);

					var janwk3path = janCircle.append("path")
						.attr("d", janwk3arc)
						.attr("class", "weeks");

					var janwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((19/janDaysText.length)*radians)
						.endAngle((25.8/janDaysText.length)*radians);

					var janwk4path = janCircle.append("path")
						.attr("d", janwk4arc)
						.attr("class", "weeks");

					var janwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((26/janDaysText.length)*radians)
						.endAngle((31.8/janDaysText.length)*radians);

					var janwk5path = janCircle.append("path")
						.attr("d", janwk5arc)
						.attr("class", "weeks");
						

		// feb circle
			var febCircle = yearCircle.append("g")
									.attr("id", "feb")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(45), translate(0," + (dayRadius * -0.78) + "), rotate(-45)");

				var febCircleShape = febCircle.append("circle")
										.attr("class", "winterMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18)
										.attr("fill", "#3cf");

					var febText = febCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Feb");

					var febDaysText = [1];

					for (var j=2; j<29; j++) {
						febDaysText.push(j);
					};

					var febDaysTextRadius = dayRadius * -0.156;
					var febDaysAngleOffset = 360 / febDaysText.length;

					var febDText = febCircle.selectAll(".febDaysText")
						.data(febDaysText)
						.enter()
						.append("text")
						.attr("class", "febDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*febDaysAngleOffset+")translate(0,"+febDaysTextRadius+") rotate("+(febDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);

					var febwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/febDaysText.length)*radians)
						.endAngle((1.8/febDaysText.length)*radians);

					var febwk1path = febCircle.append("path")
						.attr("d", febwk1arc)
						.attr("class", "weeks");

					var febwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((2/febDaysText.length)*radians)
						.endAngle((8.8/febDaysText.length)*radians);

					var febwk2path = febCircle.append("path")
						.attr("d", febwk2arc)
						.attr("class", "weeks");

					var febwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((9/febDaysText.length)*radians)
						.endAngle((15.8/febDaysText.length)*radians);

					var febwk3path = febCircle.append("path")
						.attr("d", febwk3arc)
						.attr("class", "weeks");

					var febwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((16/febDaysText.length)*radians)
						.endAngle((22.8/febDaysText.length)*radians);

					var febwk4path = febCircle.append("path")
						.attr("d", febwk4arc)
						.attr("class", "weeks");

					var febwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((23/febDaysText.length)*radians)
						.endAngle((28.8/febDaysText.length)*radians);

					var febwk5path = febCircle.append("path")
						.attr("d", febwk5arc)
						.attr("class", "weeks");


		// mar circle
			var marCircle = yearCircle.append("g")
									.attr("id", "mar")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(75), translate(0," + (dayRadius * -0.78) + "), rotate(-75)");

				var marCircleShape = marCircle.append("circle")
										.attr("class", "springMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var marText = marCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Mar");

					var marDaysText = [1];

					for (var j=2; j<32; j++) {
						marDaysText.push(j);
					};

					var marDaysTextRadius = dayRadius * -0.156;
					var marDaysAngleOffset = 360 / marDaysText.length;

					var marDText = marCircle.selectAll(".marDaysText")
						.data(marDaysText)
						.enter()
						.append("text")
						.attr("class", "marDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*marDaysAngleOffset+")translate(0,"+marDaysTextRadius+") rotate("+(marDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var marwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/marDaysText.length)*radians)
						.endAngle((1.8/marDaysText.length)*radians);

					var marwk1path = marCircle.append("path")
						.attr("d", marwk1arc)
						.attr("class", "weeks")
						.on("click", function () {assignWk(11)});

					var marwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((2/marDaysText.length)*radians)
						.endAngle((8.8/marDaysText.length)*radians);

					var marwk2path = marCircle.append("path")
						.attr("d", marwk2arc)
						.attr("class", "weeks");

					var marwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((9/marDaysText.length)*radians)
						.endAngle((15.8/marDaysText.length)*radians);

					var marwk3path = marCircle.append("path")
						.attr("d", marwk3arc)
						.attr("class", "weeks");

					var marwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((16/marDaysText.length)*radians)
						.endAngle((22.8/marDaysText.length)*radians);

					var marwk4path = marCircle.append("path")
						.attr("d", marwk4arc)
						.attr("class", "weeks")
						.on("click", function () {assignWk(14)});

					var marwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((23/marDaysText.length)*radians)
						.endAngle((29.8/marDaysText.length)*radians);

					var marwk5path = marCircle.append("path")
						.attr("d", marwk5arc)
						.attr("class", "weeks");

					var marwk6arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((30/marDaysText.length)*radians)
						.endAngle((31.8/marDaysText.length)*radians);

					var marwk6path = marCircle.append("path")
						.attr("d", marwk6arc)
						.attr("class", "weeks");


		// apr circle
			var aprCircle = yearCircle.append("g")
									.attr("id", "apr")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(105), translate(0," + (dayRadius * -0.78) + "), rotate(-105)");

				var aprCircleShape = aprCircle.append("circle")
										.attr("class", "springMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var aprText = aprCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Apr");

					var aprDaysText = [1];

					for (var j=2; j<31; j++) {
						aprDaysText.push(j);
					};

					var aprDaysTextRadius = dayRadius * -0.156;
					var aprDaysAngleOffset = 360 / aprDaysText.length;

					var aprDText = aprCircle.selectAll(".aprDaysText")
						.data(aprDaysText)
						.enter()
						.append("text")
						.attr("class", "aprDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*aprDaysAngleOffset+")translate(0,"+aprDaysTextRadius+") rotate("+(aprDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var aprwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/aprDaysText.length)*radians)
						.endAngle((4.8/aprDaysText.length)*radians);

					var aprwk1path = aprCircle.append("path")
						.attr("d", aprwk1arc)
						.attr("class", "weeks");

					var aprwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((5/aprDaysText.length)*radians)
						.endAngle((11.8/aprDaysText.length)*radians);

					var aprwk2path = aprCircle.append("path")
						.attr("d", aprwk2arc)
						.attr("class", "weeks");

					var aprwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((12/aprDaysText.length)*radians)
						.endAngle((18.8/aprDaysText.length)*radians);

					var aprwk3path = aprCircle.append("path")
						.attr("d", aprwk3arc)
						.attr("class", "weeks");

					var aprwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((19/aprDaysText.length)*radians)
						.endAngle((25.8/aprDaysText.length)*radians);

					var aprwk4path = aprCircle.append("path")
						.attr("d", aprwk4arc)
						.attr("class", "weeks");

					var aprwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((26/aprDaysText.length)*radians)
						.endAngle((30.8/aprDaysText.length)*radians);

					var aprwk5path = aprCircle.append("path")
						.attr("d", aprwk5arc)
						.attr("class", "weeks");

					
		// may circle
			var mayCircle = yearCircle.append("g")
									.attr("id", "may")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(135), translate(0," + (dayRadius * -0.78) + "), rotate(-135)");

				var mayCircleShape = mayCircle.append("circle")
										.attr("class", "springMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var mayText = mayCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("May");

					var mayDaysText = [1];

					for (var j=2; j<32; j++) {
						mayDaysText.push(j);
					};

					var mayDaysTextRadius = dayRadius * -0.156;
					var mayDaysAngleOffset = 360 / mayDaysText.length;

					var mayDText = mayCircle.selectAll(".mayDaysText")
						.data(mayDaysText)
						.enter()
						.append("text")
						.attr("class", "mayDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*mayDaysAngleOffset+")translate(0,"+mayDaysTextRadius+") rotate("+(mayDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var maywk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/mayDaysText.length)*radians)
						.endAngle((3.8/mayDaysText.length)*radians);

					var maywk1path = mayCircle.append("path")
						.attr("d", maywk1arc)
						.attr("class", "weeks");

					var maywk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((4/mayDaysText.length)*radians)
						.endAngle((10.8/mayDaysText.length)*radians);

					var maywk2path = mayCircle.append("path")
						.attr("d", maywk2arc)
						.attr("class", "weeks");

					var maywk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((11/mayDaysText.length)*radians)
						.endAngle((17.8/mayDaysText.length)*radians);

					var maywk3path = mayCircle.append("path")
						.attr("d", maywk3arc)
						.attr("class", "weeks");

					var maywk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((18/mayDaysText.length)*radians)
						.endAngle((24.8/mayDaysText.length)*radians);

					var maywk4path = mayCircle.append("path")
						.attr("d", maywk4arc)
						.attr("class", "weeks");

					var maywk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((25/mayDaysText.length)*radians)
						.endAngle((31.8/mayDaysText.length)*radians);

					var maywk5path = mayCircle.append("path")
						.attr("d", maywk5arc)
						.attr("class", "weeks");


		// jun circle
			var junCircle = yearCircle.append("g")
									.attr("id", "jun")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(165), translate(0," + (dayRadius * -0.78) + "), rotate(-165)");

				var junCircleShape = junCircle.append("circle")
										.attr("class", "summerMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var junText = junCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Jun");

					var junDaysText = [1];

					for (var j=2; j<31; j++) {
						junDaysText.push(j);
					};

					var junDaysTextRadius = dayRadius * -0.156;
					var junDaysAngleOffset = 360 / junDaysText.length;

					var junDText = junCircle.selectAll(".junDaysText")
						.data(junDaysText)
						.enter()
						.append("text")
						.attr("class", "junDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*junDaysAngleOffset+")translate(0,"+junDaysTextRadius+") rotate("+(junDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var junwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/junDaysText.length)*radians)
						.endAngle((7.8/junDaysText.length)*radians);

					var junwk1path = junCircle.append("path")
						.attr("d", junwk1arc)
						.attr("class", "weeks");

					var junwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((8/junDaysText.length)*radians)
						.endAngle((14.8/junDaysText.length)*radians);

					var junwk2path = junCircle.append("path")
						.attr("d", junwk2arc)
						.attr("class", "weeks");

					var junwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((15/junDaysText.length)*radians)
						.endAngle((21.8/junDaysText.length)*radians);

					var junwk3path = junCircle.append("path")
						.attr("d", junwk3arc)
						.attr("class", "weeks");

					var junwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((22/junDaysText.length)*radians)
						.endAngle((28.8/junDaysText.length)*radians);

					var junwk4path = junCircle.append("path")
						.attr("d", junwk4arc)
						.attr("class", "weeks");

					var junwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((29/junDaysText.length)*radians)
						.endAngle((30.8/junDaysText.length)*radians);

					var junwk5path = junCircle.append("path")
						.attr("d", junwk5arc)
						.attr("class", "weeks");


		// jul circle
			var julCircle = yearCircle.append("g")
									.attr("id", "jul")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(195), translate(0," + (dayRadius * -0.78) + "), rotate(-195)");

				var julCircleShape = julCircle.append("circle")
										.attr("class", "summerMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var julText = julCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Jul");

					var julDaysText = [1];

					for (var j=2; j<32; j++) {
						julDaysText.push(j);
					};

					var julDaysTextRadius = dayRadius * -0.156;
					var julDaysAngleOffset = 360 / julDaysText.length;

					var julDText = julCircle.selectAll(".julDaysText")
						.data(julDaysText)
						.enter()
						.append("text")
						.attr("class", "julDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*julDaysAngleOffset+")translate(0,"+julDaysTextRadius+") rotate("+(julDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var julwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/julDaysText.length)*radians)
						.endAngle((5.8/julDaysText.length)*radians);

					var julwk1path = julCircle.append("path")
						.attr("d", julwk1arc)
						.attr("class", "weeks");

					var julwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((6/julDaysText.length)*radians)
						.endAngle((12.8/julDaysText.length)*radians);

					var julwk2path = julCircle.append("path")
						.attr("d", julwk2arc)
						.attr("class", "weeks");

					var julwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((13/julDaysText.length)*radians)
						.endAngle((19.8/julDaysText.length)*radians);

					var julwk3path = julCircle.append("path")
						.attr("d", julwk3arc)
						.attr("class", "weeks");

					var julwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((20/julDaysText.length)*radians)
						.endAngle((26.8/julDaysText.length)*radians);

					var julwk4path = julCircle.append("path")
						.attr("d", julwk4arc)
						.attr("class", "weeks");

					var julwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((27/julDaysText.length)*radians)
						.endAngle((31.8/julDaysText.length)*radians);

					var julwk5path = julCircle.append("path")
						.attr("d", julwk5arc)
						.attr("class", "weeks");


		// aug circle
			var augCircle = yearCircle.append("g")
									.attr("id", "aug")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(225), translate(0," + (dayRadius * -0.78) + "), rotate(-225)");

				var augCircleShape = augCircle.append("circle")
										.attr("class", "summerMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var augText = augCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Aug");

					var augDaysText = [1];

					for (var j=2; j<32; j++) {
						augDaysText.push(j);
					};

					var augDaysTextRadius = dayRadius * -0.156;
					var augDaysAngleOffset = 360 / augDaysText.length;

					var augDText = augCircle.selectAll(".augDaysText")
						.data(augDaysText)
						.enter()
						.append("text")
						.attr("class", "augDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*augDaysAngleOffset+")translate(0,"+augDaysTextRadius+") rotate("+(augDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var augwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/augDaysText.length)*radians)
						.endAngle((2.8/augDaysText.length)*radians);

					var augwk1path = augCircle.append("path")
						.attr("d", augwk1arc)
						.attr("class", "weeks");

					var augwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((3/augDaysText.length)*radians)
						.endAngle((9.8/augDaysText.length)*radians);

					var augwk2path = augCircle.append("path")
						.attr("d", augwk2arc)
						.attr("class", "weeks");

					var augwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((10/augDaysText.length)*radians)
						.endAngle((16.8/augDaysText.length)*radians);

					var augwk3path = augCircle.append("path")
						.attr("d", augwk3arc)
						.attr("class", "weeks");

					var augwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((17/augDaysText.length)*radians)
						.endAngle((23.8/augDaysText.length)*radians);

					var augwk4path = augCircle.append("path")
						.attr("d", augwk4arc)
						.attr("class", "weeks");

					var augwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((24/augDaysText.length)*radians)
						.endAngle((30.8/augDaysText.length)*radians);

					var augwk5path = augCircle.append("path")
						.attr("d", augwk5arc)
						.attr("class", "weeks");

					var augwk6arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((31/augDaysText.length)*radians)
						.endAngle((31.8/augDaysText.length)*radians);

					var augwk6path = augCircle.append("path")
						.attr("d", augwk6arc)
						.attr("class", "weeks");


		// sep circle
			var sepCircle = yearCircle.append("g")
									.attr("id", "sep")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(255), translate(0," + (dayRadius * -0.78) + "), rotate(-255)");

				var sepCircleShape = sepCircle.append("circle")
										.attr("class", "fallMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var sepText = sepCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Sep");

					var sepDaysText = [1];

					for (var j=2; j<31; j++) {
						sepDaysText.push(j);
					};

					var sepDaysTextRadius = dayRadius * -0.156;
					var sepDaysAngleOffset = 360 / sepDaysText.length;

					var sepDText = sepCircle.selectAll(".sepDaysText")
						.data(sepDaysText)
						.enter()
						.append("text")
						.attr("class", "sepDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*sepDaysAngleOffset+")translate(0,"+sepDaysTextRadius+") rotate("+(sepDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var sepwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/sepDaysText.length)*radians)
						.endAngle((6.8/sepDaysText.length)*radians);

					var sepwk1path = sepCircle.append("path")
						.attr("d", sepwk1arc)
						.attr("class", "weeks");

					var sepwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((7/sepDaysText.length)*radians)
						.endAngle((13.8/sepDaysText.length)*radians);

					var sepwk2path = sepCircle.append("path")
						.attr("d", sepwk2arc)
						.attr("class", "weeks");

					var sepwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((14/sepDaysText.length)*radians)
						.endAngle((20.8/sepDaysText.length)*radians);

					var sepwk3path = sepCircle.append("path")
						.attr("d", sepwk3arc)
						.attr("class", "weeks");

					var sepwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((21/sepDaysText.length)*radians)
						.endAngle((27.8/sepDaysText.length)*radians);

					var sepwk4path = sepCircle.append("path")
						.attr("d", sepwk4arc)
						.attr("class", "weeks");

					var sepwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((28/sepDaysText.length)*radians)
						.endAngle((30.8/sepDaysText.length)*radians);

					var sepwk5path = sepCircle.append("path")
						.attr("d", sepwk5arc)
						.attr("class", "weeks");

					
		// oct circle
			var octCircle = yearCircle.append("g")
									.attr("id", "oct")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(285), translate(0," + (dayRadius * -0.78) + "), rotate(-285)");

				var octCircleShape = octCircle.append("circle")
										.attr("class", "fallMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var octText = octCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Oct");

					var octDaysText = [1];

					for (var j=2; j<32; j++) {
						octDaysText.push(j);
					};

					var octDaysTextRadius = dayRadius * -0.156;
					var octDaysAngleOffset = 360 / octDaysText.length;

					var octDText = octCircle.selectAll(".octDaysText")
						.data(octDaysText)
						.enter()
						.append("text")
						.attr("class", "octDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*octDaysAngleOffset+")translate(0,"+octDaysTextRadius+") rotate("+(octDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var octwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/octDaysText.length)*radians)
						.endAngle((4.8/octDaysText.length)*radians);

					var octwk1path = octCircle.append("path")
						.attr("d", octwk1arc)
						.attr("class", "weeks");

					var octwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((5/octDaysText.length)*radians)
						.endAngle((11.8/octDaysText.length)*radians);

					var octwk2path = octCircle.append("path")
						.attr("d", octwk2arc)
						.attr("class", "weeks")

					var octwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((12/octDaysText.length)*radians)
						.endAngle((18.8/octDaysText.length)*radians);

					var octwk3path = octCircle.append("path")
						.attr("d", octwk3arc)
						.attr("class", "weeks")

					var octwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((19/octDaysText.length)*radians)
						.endAngle((25.8/octDaysText.length)*radians);

					var octwk4path = octCircle.append("path")
						.attr("d", octwk4arc)
						.attr("class", "weeks")

					var octwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((26/octDaysText.length)*radians)
						.endAngle((31.8/octDaysText.length)*radians);

					var octwk5path = octCircle.append("path")
						.attr("d", octwk5arc)
						.attr("class", "weeks")

					
		// nov circle
			var novCircle = yearCircle.append("g")
									.attr("id", "nov")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(315), translate(0," + (dayRadius * -0.78) + "), rotate(-315)");

				var novCircleShape = novCircle.append("circle")
										.attr("class", "fallMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18);

					var novText = novCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Nov");

					var novDaysText = [1];

					for (var j=2; j<31; j++) {
						novDaysText.push(j);
					};

					var novDaysTextRadius = dayRadius * -0.156;
					var novDaysAngleOffset = 360 / novDaysText.length;

					var novDText = novCircle.selectAll(".novDaysText")
						.data(novDaysText)
						.enter()
						.append("text")
						.attr("class", "novDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*novDaysAngleOffset+")translate(0,"+novDaysTextRadius+") rotate("+(novDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var novwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/novDaysText.length)*radians)
						.endAngle((1.8/novDaysText.length)*radians);

					var novwk1path = novCircle.append("path")
						.attr("d", novwk1arc)
						.attr("class", "weeks")
						.on("click", function () {assignWk(44)});

					var novwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((2/novDaysText.length)*radians)
						.endAngle((8.8/novDaysText.length)*radians);

					var novwk2path = novCircle.append("path")
						.attr("d", novwk2arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(45);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((9/novDaysText.length)*radians)
						.endAngle((15.8/novDaysText.length)*radians);

					var novwk3path = novCircle.append("path")
						.attr("d", novwk3arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(46);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((16/novDaysText.length)*radians)
						.endAngle((22.8/novDaysText.length)*radians);

					var novwk4path = novCircle.append("path")
						.attr("d", novwk4arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(47);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((23/novDaysText.length)*radians)
						.endAngle((29.8/novDaysText.length)*radians);

					var novwk5path = novCircle.append("path")
						.attr("d", novwk5arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(48);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var novwk6arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((30/novDaysText.length)*radians)
						.endAngle((30.8/novDaysText.length)*radians);

					var novwk6path = novCircle.append("path")
						.attr("d", novwk6arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(49);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});


		// dec circle
			var decCircle = yearCircle.append("g")
									.attr("id", "dec")
									.attr("class", "monthCircle")
									.attr("transform", "rotate(345), translate(0," + (dayRadius * -0.78) + "), rotate(-345)");

				var decCircleShape = decCircle.append("circle")
										.attr("class", "winterMonths")
										.attr("cx", 0)
										.attr("cy", 0)
										.attr("r", dayRadius * 0.18)
										.attr("fill", "#3cf");
					var decText = decCircle.append("text")
										.attr("x", -12)
										.attr("y", 5)
										.text("Dec");

					var decDaysText = [1];

					for (var j=2; j<32; j++) {
						decDaysText.push(j);
					};

					var decDaysTextRadius = dayRadius * -0.156;
					var decDaysAngleOffset = 360 / decDaysText.length;

					var decDText = decCircle.selectAll(".decDaysText")
						.data(decDaysText)
						.enter()
						.append("text")
						.attr("class", "decDaysText")
						.attr("x",0)
						.attr("y",2)
						.attr("transform", function(d,j) {return "rotate("+d*decDaysAngleOffset+")translate(0,"+decDaysTextRadius+") rotate("+(decDaysAngleOffset*-d)+")"})
						.text(function(d) {return d})
						.attr("text-anchor", "middle")
						.attr("font-size", 3);


					var decwk1arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((1/decDaysText.length)*radians)
						.endAngle((6.8/decDaysText.length)*radians);

					var decwk1path = decCircle.append("path")
						.attr("d", decwk1arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(49);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk2arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((7/decDaysText.length)*radians)
						.endAngle((13.8/decDaysText.length)*radians);

					var decwk2path = decCircle.append("path")
						.attr("d", decwk2arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(50);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk3arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((14/decDaysText.length)*radians)
						.endAngle((20.8/decDaysText.length)*radians);

					var decwk3path = decCircle.append("path")
						.attr("d", decwk3arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(51);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk4arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((21/decDaysText.length)*radians)
						.endAngle((27.8/decDaysText.length)*radians);

					var decwk4path = decCircle.append("path")
						.attr("d", decwk4arc)
						.attr("class", "thisWeek")
						.on("click", function () {
							assignWk(52);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});

					var decwk5arc = d3.svg.arc()
						.outerRadius(19)
						.innerRadius(16)
						.startAngle((28/decDaysText.length)*radians)
						.endAngle((31.8/decDaysText.length)*radians);

					var decwk5path = decCircle.append("path")
						.attr("d", decwk5arc)
						.attr("class", "weeks")
						.on("click", function () {
							assignWk(53);
							d3.select(".thisWeek").classed({'thisWeek': false, 'weeks': true});
							d3.select(this).classed({'thisWeek': true, 'weeks': false});
						});
					



	// week circle
		var weekCircle = svg.append("g")
							.attr("transform", "translate(450,245)");
							
			var weekCircleShape = weekCircle.append("circle")
									.attr("cx", 0)
									.attr("cy", 0)
									.attr("r", 120)
									.attr("fill", "none");

			var weekDayArcInnerR = radius * 1;

			var weekDayArcOuterR = radius * 1.25;

			var todayWkDay = now.getDay();

			var epoch = now.getTime();

			var epochDay = Math.floor(epoch/8.64e7);

			var eventDay;

			var eventDate;

			var dateForDisplay;

			var currentWkSunday;

			var eventDayWkDay = (eventDay - sunday2014wk1) % 7;

			var dayField = document.getElementById("event_day");

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
										.attr("y", 7)
										.attr("transform", "rotate("+(i*(360/7)+2+(360/14))+"), translate(-4,"+ (radius * -1.125) +"), rotate("+(i*(-360/7)-2-(360/14))+")")
				};



		var yearText = yearCircle.append("text")
								.text("2014")
								.attr("class", "yearText")
								.attr("x", 0)
								.attr("y", 15);




	// timeCircle
		var timeCircle = svg.append("g")
			.attr("transform", "translate(450,245), scale(0.5,0.5), rotate(20)")
			.attr("opacity" ,0);

			var circleShape = timeCircle.append("circle")
				.attr("cx",0)
				.attr("cy",0)
				.attr("r",radius)
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

			timeCircle.transition().delay(500).duration(800).attr("transform", "translate(450,245), scale(0.9,0.9)").attr("opacity" ,1);



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
			var hInRadius = radius * 0.44, hOutRadius = radius * 0.72;

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
			var hEndSliderInRadius = radius * 0.42, hEndSliderOutRadius = radius * 0.74;

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
					var hStartSliderInRadius = radius * 0.42, hStartSliderOutRadius = radius * 0.67;

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
			var mInRadius = radius * 0.78, mOutRadius = radius * 1.05;

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
			var mEndSliderInRadius = radius * 0.75, mEndSliderOutRadius = radius * 1.08;

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

			var mStartSliderInRadius = radius * 0.76, mStartSliderOutRadius = radius;

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

			var formHTextRadius = radius * -0.58;

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

			var formMTextRadius = radius * -0.92;

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
					.attr("r", radius/2.5)
					.attr("id", "middy");


				// start, end, duration big numbers

					var innerTimes = midCircle.append("g")
					.attr("transform", "translate(0,-22)");

					var timeYPos = 5, timeYSpacing = 17;

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

		var buttons = [{eventypeName: "Daily Life", eventypeColor: "#0f2"}, {eventypeName: "Must Do", eventypeColor: "#d33"}, {eventypeName: "Would Like", eventypeColor: "#26f"}];

		var buttonsField = document.getElementById("event_eventype");

		var eventypeButtonsGroup = svg.append("g")
			.attr("width", 600)
			.attr("height", 41);

		var eventypebuttons = eventypeButtonsGroup.selectAll("rect")
			.data(buttons)
			.enter()
			.append("rect")
			.attr("class", "typeButtons")
			.attr("width", 70)
			.attr("height", 32)
			.attr("x", function(d,i){return 415+(i-1)*100})
			.attr("y", 505)
			.attr("rx", 6)
			.attr("ry", 6)
			.attr("fill", function(d,i){return d.eventypeColor})
			.on("click", function(d,i){
				buttonsField.value=d.eventypeColor;
				d3.select('.selectedType').classed({'selectedType': false, 'typeButtons': true});
				d3.select(this).classed({'selectedType': true, 'typeButtons': false});
			});

		var defs = svg.append("defs");

		var filter = defs.append("filter")
			.attr("id", "dropShadow")
			.attr("height", "130%");

		filter.append("feGaussianBlur")
		    .attr("in", "SourceAlpha")
		    .attr("stdDeviation", 5)
		    .attr("result", "blur");

		filter.append("feOffset")
		    .attr("in", "blur")
		    .attr("dx", 5)
		    .attr("dy", 5)
		    .attr("result", "offsetBlur");

		var feMerge = filter.append("feMerge");

		feMerge.append("feMergeNode")
		    .attr("in", "offsetBlur")
		feMerge.append("feMergeNode")
		    .attr("in", "SourceGraphic");

		var buttonLabels = eventypeButtonsGroup.selectAll("text")
			.data(buttons)
			.enter()
			.append("text")
			.attr("class", "buttonLabels")
			.attr("x", function(d,i){return 450+(i-1)*100})
			.attr("y", 526)
			.text(function(d) {return d.eventypeName})
			.style("filter", "url(#dropShadow");
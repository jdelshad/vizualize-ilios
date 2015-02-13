require([
    'data/schools',
    'data/competencies',
    'data/objectives',
    'domready'
], function(schools, competencies, objectives, domReady) {
    var draw = function(){
        var format = d3.format();
        var width = 240;
        var height = 90;
        var data = [];
        var school = schools[3];
        school.competencies.forEach(function(competencyId){
            var competency = competencies[competencyId];
            var programYearCount = 0;
            competency.objectives.forEach(function(objectiveId){
                programYearCount += objectives[objectiveId].programYears.length;
            });
            if(programYearCount){
                data.push({
                    x: competency.title,
                    y: programYearCount
                });
            }

        });
        var svg = d3.select('#target');
        var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
        var y = d3.scale.linear().range([height, 0]);
        var xAxis = d3.svg.axis().scale(x).orient("bottom");
        var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat(format);

        x.domain(data.map(function(d) { return d.x; }));
        y.domain([0, d3.max(data, function(d) { return d.y; })]);

        svg.select(".axis.x").call(xAxis);
        svg.select(".axis.y").call(yAxis);

        svg.select(".rects").selectAll("rect")
            .data(data)
            .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.x); })
                  .attr("width", x.rangeBand())
                  .attr("y", function(d) { return y(d.y); })
                  .attr("height", function(d) {
                    return height - y(d.y);
                  });
  };
  domReady(function () {
      console.log('ready');
     draw();
 });
});

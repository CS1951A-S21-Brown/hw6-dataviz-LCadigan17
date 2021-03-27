let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", margin.left+ margin.right+ graph_1_width)     // HINT: width
    .attr("height", margin.top+margin.bottom+graph_1_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);             

// Set up reference to count SVG group
let countRef = svg.append("g");

function setYear(filter_bool) {
    svg.selectAll("rect").remove(); 
    svg.selectAll("text").remove(); 
    year = document.getElementById("text_input").value;
    year_is_valid = year>1950; 
    // TODO: Load the CSV file into D3 by using the d3.csv() method
    d3.csv("data/video_games.csv").then(function(data) {
        // TODO: Clean and strip desired amount of data for barplot
        if(filter_bool){
            if(year_is_valid){
                data = data.filter(  function(d) { return d["Year"]===year } );
            }
            else{
                console.log("invalid year");
            }
        }
        data = cleanData(data, compare_total_sales,GRAPH1_NUM_EXAMPLES);
        
        x_max = d3.max(data, d => get_total_sales(d) );
        let x = d3.scaleLinear()
            .domain( [0,x_max] )
            .range(  [0, graph_1_width]   );
        // TODO: Create a scale band for the y axis (name)
        let y = d3.scaleBand()
            .domain( data.map(function(d) {return d["Name"];  }))
            .range([0, graph_1_height])
            .padding(0.1);  // Improves readability
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
        let bars = svg.selectAll("rect").data(data);
        let color = d3.scaleOrdinal()
            .domain(data.map(function(d) { return d["Name"]; }))
            .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), GRAPH1_NUM_EXAMPLES));
        bars.enter()
            .append("rect")
            .merge(bars)
            .attr("fill", function(d) {  return color(d['Name']); })         
            .attr("y", function(d) {return y(d["Name"])} )        
            .attr("width",function(d) {return x(get_total_sales(d)) }  )
            .attr("height",  y.bandwidth);
        let counts = countRef.selectAll("text").data(data);
        counts.enter()
            .append("text")
            .merge(counts)
            .attr("x", function(d) { return 15+x(get_total_sales(d)); })          
            .attr("y", function(d) { return 20+y(d["Name"]);})
            .style("text-anchor", "start")
            .text(function(d) {return get_total_sales(d)  });
        a = 20-(margin.left);
        b = graph_1_height/2
        // TODO: Add y-axis label
        svg.append("text")
            .attr("transform",`translate(${a},${b})`) 
            .style("text-anchor", "middle")
            .text("Name");
        a = margin.left+graph_1_width/2;
        b = graph_1_height+margin.bottom/2;
        // TODO: Add x-axis label
        svg.append("text")
            .attr("transform", `translate(${a},${b})`)        
            .style("text-anchor", "middle")
            .text("Count");
        // TODO: Add chart title
        title_str = "Top Video Games All Time";
        if(year_is_valid){
           title_str ="Top Video Games in "+year;  
        }
        a = margin.left+graph_1_width/2;
        b = -margin.top/2;
        svg.append("text")
            .attr("transform",`translate(${a},${b})` )       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 15)
            .text(title_str);
    });
}
setYear(0);

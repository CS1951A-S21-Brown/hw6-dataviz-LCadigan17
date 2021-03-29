let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", margin.left+ margin.right+ graph_1_width)     // HINT: width
    .attr("height", margin.top+margin.bottom+graph_1_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);             

// Set up reference to count SVG group
let countRef = svg.append("g");
function get_y_name(d){
    return d["Name"];
}

function cleanData(data, comparator, numExamples) {
    // TODO: sort and return the given data with the comparator (extracting the desired number of examples)
    data = data.sort(compareFunction = comparator).slice(0,numExamples)
    for(i = 0; i< data.length;i++){
        data[i]["Name"]= (1+i).toString()+". "+data[i]["Name"]
    }
    return data;
}
function setYear(filter_bool) {
    svg.selectAll("rect").remove(); 
    svg.selectAll("text").remove();
    //svg.selectAll("g").remove(); 
    year = document.getElementById("text_input").value;
    year_is_valid = (filter_bool && year>1950); 
    // TODO: Load the CSV file into D3 by using the d3.csv() method
    d3.csv("data/no_dupe_video_games_genre.csv").then(function(data) {
        // TODO: Clean and strip desired amount of data for barplot
        if(filter_bool){

            filter_data = data.filter(  function(d) { return parseInt(d["Year"])===parseInt(year) } );
            if(filter_data.length==0){
                return;
            }
        }
        data = cleanData(data, compare_total_sales,GRAPH1_NUM_EXAMPLES);
        x_max = d3.max(data, d => get_total_sales(d) );
        let x = d3.scaleLinear()
            .domain( [0,x_max] )
            .range(  [0, graph_1_width]   );
        // TODO: Create a scale band for the y axis (name)
        let y = d3.scaleBand()
            .domain( data.map(function(d) {return get_y_name(d);  }))
            .range([0, graph_1_height])
            .padding(0.1);  // Improves readability
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
        let bars = svg.selectAll("rect").data(data);
        let color = d3.scaleOrdinal()
            .domain(data.map(function(d) { return d["Name"]; }))
            
            .range(d3.schemeSet1)
            //.range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), GRAPH1_NUM_EXAMPLES));
        bars.enter()
            .append("rect")
            .merge(bars)
            .attr("fill", function(d) {  return color(d['Name']); })         
            .attr("y", function(d) {return y(  get_y_name(d) )} )        
            .attr("width",function(d) {return x(get_total_sales(d)) }  )
            .attr("height",  y.bandwidth);
        let counts = countRef.selectAll("text").data(data);
        counts.enter()
            .append("text")
            .merge(counts)
            .attr("x", function(d) { return 15+x(get_total_sales(d)); })
            .attr("y", function(d) {return 15+y(  get_y_name(d) )} )        
            .style("text-anchor", "start")
            .style("font-size",15)
            .text(function(d) {return parseInt(get_total_sales(d) ) });
        a = -(margin.left)/4;
        b = -20
        // TODO: Add y-axis label
        svg.append("text")
            .attr("transform",`translate(${a},${b})`) 
            .style("text-anchor", "middle")
            .text("Game Title")
            .style("font-size",18);
        a = margin.left+graph_1_width/2;
        b = graph_1_height+margin.bottom/2;
        // TODO: Add x-axis label
        svg.append("text")
            .attr("transform", `translate(${a},${b})`)        
            .style("text-anchor", "middle")
            .text("Count")
            .style("font-size",18);
        // TODO: Add chart title
        title_str = "Top Video Games All Time";
        if(year_is_valid){
           title_str ="Top Video Games in "+year;  
        }
        a = margin.left+graph_1_width/2;
        b = -margin.top/4;
        svg.append("text")
            .attr("transform",`translate(${a},${b})` )       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 30)
            .text(title_str);
    });
}
setYear(1);

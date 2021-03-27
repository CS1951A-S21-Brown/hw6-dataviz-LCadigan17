 let svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", block_2_width)     // HINT: width
    .attr("height", block_2_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);             

// Set up reference to count svg2 group
let countRef = svg2.append("g");

function compare_total_sales(a,b){
    return get_total_sales(b)-get_total_sales(a);
}


function cleanData(data, comparator, numExamples) {
    // TODO: sort and return the given data with the comparator (extracting the desired number of examples)
    return data.sort(compareFunction = comparator).slice(0,numExamples)
}


function searchGenre(filter_bool) {
    svg2.selectAll("rect").remove(); 
    svg2.selectAll("text").remove(); 
    // TODO: Load the CSV file into D3 by using the d3.csv() method
    d3.csv("data/video_games.csv").then(function(data) {
        // TODO: Clean and strip desired amount of data for barplot
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
        svg2.append("g")
            .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
        let bars = svg2.selectAll("rect").data(data);
        let color = d3.scaleOrdinal()
            .domain(data.map(function(d) { return d["Name"] }))
            .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), GRAPH1_NUM_EXAMPLES));
        bars.enter()
            .append("rect")
            .merge(bars)
            .attr("fill", function(d) { return color(d['name']); })         
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
        svg2.append("text")
            .attr("transform",`translate(${a},${b})`) 
            .style("text-anchor", "middle")
            .text("Name");
        a = margin.left+graph_1_width/2;
        b = graph_1_height+margin.bottom/2;
        // TODO: Add x-axis label
        svg2.append("text")
            .attr("transform", `translate(${a},${b})`)        
            .style("text-anchor", "middle")
            .text("Count");
        // TODO: Add chart title
        a = margin.left+graph_1_width/2;
        b = -margin.top/2;
        svg2.append("text")
            .attr("transform",`translate(${a},${b})` )       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 15)
            .text("title");
    });
}
searchGenre(0);

 let svg3 = d3.select("#graph2")
    .append("svg")
    .attr("width", block_2_width)     // HINT: width
    .attr("height", block_2_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);             

// Set up reference to count svg3 group
let countRef3 = svg3.append("g");

function searchRegion(region_name) {

    actual_region_dict = {};
    actual_region_dict["NA_Sales"]="North America";
    actual_region_dict["Global_Sales"]="the World";
    actual_region_dict["EU_Sales"]="Europe";
    actual_region_dict["JP_Sales"]="Japan";
    actual_region_dict["Other_Sales"]="Other Regions";
    svg3.selectAll("rect").remove(); 
    svg3.selectAll("text").remove(); 
    // TODO: Load the CSV file into D3 by using the d3.csv() method
    d3.csv("data/video_games_region_genre.csv").then(function(data) {
        
        // TODO: Clean and strip desired amount of data for barplot
        data = data.sort( function(a,b){return parseFloat(b[region_name])-parseFloat(a[region_name])}); 
        x_max = d3.max(data, d => parseFloat(d[region_name]) );
        let x = d3.scaleLinear()
            .domain( [0,x_max] )
            .range(  [0, graph_1_width]   );
        // TODO: Create a scale band for the y axis (name)
        let y = d3.scaleBand()
            .domain( data.map(function(d) {return d["Genre"];  }))
            .range([0, graph_1_height])
            .padding(0.1);  // Improves readability
        svg3.append("g")
            .call(d3.axisLeft(y).tickSize(0).tickPadding(10));
        
        let bars = svg3.selectAll("rect").data(data);
        let color = d3.scaleOrdinal()
            .domain(  ["Action","Adventure","Fighting","Misc","Platform","Puzzle","Racing","Role-Playing","Shooter","Simulation","Sports","Strategy"]  )
            
            .range(d3.schemeSet1)
            //.range(["#1b70fc", "59c3fa", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a"])
        bars.enter()

            .append("rect")
            .merge(bars)
            .attr("fill", function(d) {  return color(d["Genre"]); })         
            .attr("y", function(d) {return y(d["Genre"])} )        
            .attr("width",function(d) {return x(parseFloat(d[region_name])) }  )
            .attr("height",  y.bandwidth);
        let counts = countRef3.selectAll("text").data(data);
        counts.enter()
            .append("text")
            .merge(counts)
            .attr("x", function(d) { return 15+x( parseFloat(d[region_name])  ); })          
            .attr("y", function(d) { return 15+y(d["Genre"]);})
            .style("text-anchor", "start")
            .style("font-size",15)
            .text(function(d) {return parseFloat(     parseInt(d[region_name])     )  });
        a = 20-(margin.left);
        b = graph_1_height/2
        // TODO: Add y-axis label
        a = -(margin.left)*4/5;
        b = graph_1_height/2
        // TODO: Add y-axis label



        svg3.append("text")
            .attr("transform",`translate(${a},${b})`) 
            .style("text-anchor", "middle")
            .text("Genre")
            .style("font-size",15);
        a = margin.left+graph_1_width/2;
        b = graph_1_height+margin.bottom/2;
        // TODO: Add x-axis label
        svg3.append("text")
            .attr("transform", `translate(${a},${b})`)        
            .style("text-anchor", "middle")
            .text("Count")
            .style("font-size",18);
        // TODO: Add chart title
        a = margin.left+graph_1_width/2;
        b = -margin.top/2;
        svg3.append("text")
            .attr("transform",`translate(${a},${b})` )       // HINT: Place this at the top middle edge of the graph - use translate(x, y) that we discussed earlier
            .style("text-anchor", "middle")
            .style("font-size", 18)
            .text("Sales of Video Games by Genre for "+actual_region_dict[region_name]);
    });
}
searchRegion("Global_Sales");

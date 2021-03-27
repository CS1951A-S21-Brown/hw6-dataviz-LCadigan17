 let svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", block_2_width)     // HINT: width
    .attr("height", block_2_height)     // HINT: height
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);             



function special_centroid(arcGenerator,d,a,b){
    x = arcGenerator.centroid(d);
    a2 = a+parseFloat(x[0]);
    b2 = b+parseFloat(x[1]);
    return [a2,b2];
}
function getPublisher(search_genre) {
    svg2.selectAll("rect").remove(); 
    svg2.selectAll("text").remove();
    // TODO: Load the CSV file into D3 by using the d3.csv() method
    d3.csv("data/video_games_genre.csv").then(function(data) {
        // TODO: Clean and strip desired amount of data for barplot
        data = data.filter(  function(d){return d["Genre"]===search_genre}  );
        
        var dict = {};
        for(i = 0; i<data.length; i++){
            key = data[i]["Publisher"];
            value = get_total_sales(data[i]);
            dict[key] = value;
        }
        //This code mostly comes from https://www.d3-graph-gallery.com/graph/pie_annotation.html
        let radius = (block_2_height-margin.top-margin.bottom)/2
        
        var color = d3.scaleOrdinal()
            .domain(dict)
            .range(d3.schemeSet2)
        var pie = d3.pie()
            .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(dict))
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        
        a = margin.left;
        b = block_2_height/2;       

        svg2
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function(d){ return(  color(d.data.key) ) })
            .attr("transform",`translate(${a},${b})` )          
        /*svg2
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function(d){ return d.data.key;  })
            .attr("transform", function(d) { return "translate(" + special_centroid(arcGenerator,d,a,b)+ ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 20)
       */
        circle_x = margin.left+block_2_width/4;
        text_x = circle_x+20;
        var place_function = function(d,i){
            return 100+i*25;
        }
        svg2.selectAll("mydots")
          .data(data_ready)
          .enter()
          .append("circle")
            .attr("cx", circle_x)
            .attr("cy", place_function) 
            .attr("r", 7)
            .style("fill", function(d){ return color(d.data.key) })

        // Add one dot in the legend for each name.
        svg2.selectAll("mylabels")
          .data(data_ready)
          .enter()
          .append("text")
            .attr("x", text_x)
            .attr("y", place_function)             
            .style("font-size", 20)
            .text(function(d){ return d.data.key})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        a = margin.left+graph_1_width/2;
        b = -margin.top/2;       
        svg2.append("text")
            .attr("transform",`translate(${a},${b})` )                
            .style("text-anchor", "middle")
            .style("font-size", 20)
            .text("title");
    
    });
}

getPublisher("Action")

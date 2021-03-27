// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};
const GRAPH1_NUM_EXAMPLES = 7;

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

let block_1_width = margin.left+ margin.right+ graph_1_width;
let block_1_height = margin.top+margin.bottom+graph_1_height;

let block_2_width = margin.left+ margin.right+ graph_2_width;
let block_2_height = margin.top+margin.bottom+graph_2_height;

let block_3_width = margin.left+ margin.right+ graph_3_width;
let block_3_height = margin.top+margin.bottom+graph_3_height;

let block_1_start_height = 0;
let block_2_start_height = block_1_start_height+block_1_height;
let block_3_start_height = block_2_start_height+block_2_height; 

function get_total_sales(data){
    return parseFloat(data["Global_Sales"]);
}

function compare_total_sales(a,b){
    return get_total_sales(b)-get_total_sales(a);
}


function cleanData(data, comparator, numExamples) {
    // TODO: sort and return the given data with the comparator (extracting the desired number of examples)
    return data.sort(compareFunction = comparator).slice(0,numExamples)
}



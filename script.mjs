const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

// fetch json
d3.json(dataUrl)
    .then(data => {

        const cleanedData = data.data

        const svg = d3.select("#graph-wrapper")
            .append('svg')
            .attr("width", 800)
            .attr("height", 400);

        const xScale = d3.scaleBand()
            .domain(cleanedData.map(d => d[0]))
            .range([10, 790]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(cleanedData, d => d[1])])
            .range([400, 0]);

        svg.selectAll('rect')
            .data(cleanedData)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d[0]))
            .attr('y', d => yScale(d[1]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => 400 - yScale(d[1]))
            .attr('fill', 'green')
    })    
    .catch(error => {
        console.error('Error fetching the data: ', error);
    });


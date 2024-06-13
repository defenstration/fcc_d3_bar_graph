const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

// fetch json
d3.json(dataUrl)
    .then(data => {

        const cleanedData = data.data
        const margins = {top: 20, right: 20, bottom: 20, left: 20}
        const width = document.querySelector("body").clientWidth
        const height = 150

        const svg = d3.select("#graph-wrapper")
            .append('svg')
            .attr("viewbox", 0, 0, width, height)
;

        const xScale = d3.scaleBand()
            .domain(cleanedData.map(d => d[0]))
            .range([margins.left, width - margins.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(cleanedData, d => d[1])])
            .range([height - margins.bottom, margins.top]);

        let xAxis = d3.axisBottom(xScale)
        let yAxis = d3.axisLeft(yScale)

        svg.selectAll('rect')
            .data(cleanedData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d[0]))
            .attr('y', d => yScale(d[1]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d[1]))
            .attr('fill', 'green')

        svg.append("g")
            .call(xAxis)

        svg.append("g")
            .call(yAxis)

    })    
    .catch(error => {
        console.error('Error fetching the data: ', error);
    });


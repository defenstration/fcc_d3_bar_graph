const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

// fetch json
d3.json(dataUrl)
    .then(data => {

        const cleanedData = data.data
        const margins = {top: 20, right: 20, bottom: 20, left: 20}
        const width = document.querySelector("#graph-wrapper").clientWidth
        const height = 400

        const svg = d3.select("#graph-wrapper")
            .append('svg')
            .attr("viewBox", [0, 0, width-margins.left - margins.right, height + margins.top + margins.bottom])
;

        const xScale = d3.scaleBand()
            .domain(cleanedData.map(d => d[0]))
            .range([0, width - margins.left -  margins.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(cleanedData, d => d[1])])
            .range([height, 0]);

        let xAxis = d3.axisBottom(xScale)
        let yAxis = d3.axisLeft(yScale)

        xAxis.ticks(20)

        yAxis.ticks(10)

        svg.selectAll('rect')
            .data(cleanedData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d[0]))
            .attr('y', d => yScale(d[1]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d[1]))

        svg.append("g")
            .attr
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)

        svg.append("g")
            .call(yAxis)

        svg.append('text')
            .attr("class", "axis-label")
            .attr('x', width / 2)
            .attr('y', height + 40)
            .text("X Axis Label")

        svg.append('text')
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr('x', -height / 2)
            .attr('y', 10)
            .text("Y Axis Label")

    })    
    .catch(error => {
        console.error('Error fetching the data: ', error);
    });


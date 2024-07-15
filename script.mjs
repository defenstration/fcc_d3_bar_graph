const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

d3.select('body')
  .append('h1')
  .text('D3 Bar Chart Project')
  .attr('id', 'title')


d3.json(url)
  .then(data => {
  
  let h = 500
  let w = 1000
  
  const svg = d3.select('body')
              .append('svg')
              .attr('height', h + 40)
              .attr('width', w + 40)
  
  let graphValues = data['data']
  
  let parseDate = d3.timeParse(`%Y-%m-%d`)
  let formatDate = d3.timeFormat(`%Y-%m-%d`)
  
  let parsedValues = graphValues.map(d => [parseDate(d[0]), d[1]])
      
  const barWidth = w / parsedValues.length
  
  let x = d3.scaleTime()
            .domain(d3.extent(parsedValues, d => d[0]))
            .range([0, w])
  
  let y = d3.scaleLinear()
            .domain([0, d3.max(parsedValues, d => d[1])])
            .range([h, 0])
  
  svg.append('g')
     .attr('id', 'x-axis')
     .call(d3.axisBottom(x)
             .ticks(d3.timeYear.every(5))
             .tickFormat(d3.timeFormat('%Y')))
     .attr('transform', `translate(0, ${h})`)
     .selectAll('text')
     .attr('transform', 'rotate(-45)')
     .selectAll('ticks')
     .attr('class', 'tick')
  
  svg.append('g')
     .attr('id', 'y-axis')
     .call(d3.axisLeft(y))
  
  const tooltip = d3.select('#tooltip')
  
  svg.selectAll('rect')
     .data(parsedValues)
     .enter()
     .append('rect')
     .attr('class', 'bar')
     .attr('x', d => x(d[0]))
     .attr('y', d => y(d[1]))
     .attr("height", d => h - y(d[1]))
     .attr('width', barWidth)
     .attr('data-date', d => formatDate(d[0]))
     .attr('data-gdp', d => d[1])
     .on('mouseover', (event, d) => {
        tooltip.transition().style('opacity', .9)
        tooltip.style('left', (event.pageX + 10) + 'px')
               .style('top', (event.pageY + 10) + 'px')
               .attr('data-date', `${formatDate(d[0])}`)
               .html(`Year: ${d3.timeFormat('%Y-%m-%d')(d[0])}. GDP: ${d[1]}`);             
               })
      .on('mouseout', (event) => {
        tooltip.style('opacity', 0);
        })
     .append('title')
     .text(d =>`${d[0]}, ${d[1]}`);
})
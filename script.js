d3.csv("presidents.csv")
  .then(function(data) {

    data.forEach(function(d) {
      d.Year_start = +d.Year_start;
    });

    // chronologically
    data.sort(function(a, b) {
      return a.Year_start - b.Year_start;
    });

    const timeline = d3.select("#timeline");

    const items = timeline
      .selectAll(".timeline-item")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "timeline-item");

    // Year
    items
      .append("div")
      .attr("class", "year")
      .text(function(d) {
        return d.Year_start;
      });

    // Timeline marker
    const marker = items
      .append("div")
      .attr("class", "timeline-marker");

    marker
      .append("div")
      .attr("class", "timeline-dot");

    // President information
    const info = items
      .append("div")
      .attr("class", "president-info");

    info
      .append("div")
      .attr("class", "president-name")
      .html(function(d) {

        const name = d.Name ? d.Name.trim() : "";
        const credential = d.Credential
          ? d.Credential.trim()
          : "";

        if (credential !== "") {
          return `${name}, <span class="credential">${credential}</span>`;
        } else {
          return name;
        }

      });

  })
  .catch(function(error) {

    console.error("Error loading presidents.csv:", error);

    d3.select("#timeline")
      .append("p")
      .text("Unable to load the presidents data.");

  });

---
title: Forest After Rain
pubDate: 2024-04-12
description: A short nature post about density, moisture, and the way a forest changes tone after rainfall.
---

After rain, a forest feels less like a scene and more like a volume. Sound is dampened. Bark darkens. Leaves stop reading as separate objects and start behaving like one surface with depth. Moisture reduces contrast in some places and increases it in others.

## Texture becomes the story

The easiest mistake is to describe only color. Rain changes texture first. Paths soften, trunks absorb light differently, and air seems thicker because everything reflects less harshly. Even a short post can carry that shift if the details stay specific.

<div id="rain-forest-chart"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>
  const data = [
    { label: "Bark", before: 45, after: 82 },
    { label: "Leaves", before: 55, after: 90 },
    { label: "Path", before: 35, after: 70 },
    { label: "Air", before: 25, after: 65 },
    { label: "Sound", before: 70, after: 38 }
  ];

  const width = 680;
  const height = 320;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };

  const svg = d3
    .select("#rain-forest-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("max-width", "720px")
    .style("height", "auto");

  const x = d3
    .scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.35);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  svg.append("text")
    .attr("x", margin.left)
    .attr("y", 20)
    .attr("font-size", 16)
    .attr("font-weight", 700)
    .text("Forest tone shift after rain");

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));

  svg.selectAll(".line")
    .data(data)
    .join("line")
    .attr("x1", d => x(d.label) + x.bandwidth() / 2)
    .attr("x2", d => x(d.label) + x.bandwidth() / 2)
    .attr("y1", d => y(d.before))
    .attr("y2", d => y(d.after))
    .attr("stroke", "#8a8a8a")
    .attr("stroke-width", 2);

  svg.selectAll(".before")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.label) + x.bandwidth() / 2)
    .attr("cy", d => y(d.before))
    .attr("r", 7)
    .attr("fill", "#c7b98b");

  svg.selectAll(".after")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.label) + x.bandwidth() / 2)
    .attr("cy", d => y(d.after))
    .attr("r", 7)
    .attr("fill", "#2f6f4e");

  svg.append("text")
    .attr("x", width - 190)
    .attr("y", 35)
    .attr("font-size", 13)
    .text("tan = before rain");

  svg.append("text")
    .attr("x", width - 190)
    .attr("y", 55)
    .attr("font-size", 13)
    .text("green = after rain");
</script>

## Why it belongs here

Nature posts work well when they stay observant. They do not need a large thesis every time. Sometimes a changed surface is enough.
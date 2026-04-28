---
title: Reading the Moon in Motion
pubDate: 2024-04-21
description: A longer observational post on how the moon changes across position, light, and time — with motion to match.
---

The moon looks stable until you watch it carefully. Not glance, not notice — watch. Give it ten minutes and it will move. Give it an hour and it will reposition itself against everything you thought was fixed. Give it a night and it will rewrite the sky.

The object is consistent. The experience is not.

## The moon is a moving reference point

We often treat the moon as something that sits in the sky. It doesn’t sit. It travels. The simplest way to see this is not through explanation, but through motion.

<div id="orbit-demo"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>
  const w = 600, h = 300;
  const cx = w / 2, cy = h / 2;

  const svg = d3.select("#orbit-demo")
    .append("svg")
    .attr("viewBox", `0 0 ${w} ${h}`)
    .style("width", "100%")
    .style("margin", "2rem 0");

  svg.append("rect")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "#0e1420");

  const earth = svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 30)
    .attr("fill", "#3a6ea5");

  const moon = svg.append("circle")
    .attr("r", 10)
    .attr("fill", "#d9dde5");

  const radius = 90;

  d3.timer((t) => {
    const angle = t / 1500;
    moon
      .attr("cx", cx + Math.cos(angle) * radius)
      .attr("cy", cy + Math.sin(angle) * radius);
  });
</script>

The motion is subtle in real life. In code, we exaggerate it so the behavior becomes obvious. Once you see it here, you start noticing it outside.

## Light defines the moon more than shape

The moon is not interesting because of its surface alone. It is interesting because of how light touches that surface. The phases are not changes in the moon — they are changes in our angle.

<div id="phase-demo"></div>

<script>
  const w2 = 600, h2 = 220;
  const svg2 = d3.select("#phase-demo")
    .append("svg")
    .attr("viewBox", `0 0 ${w2} ${h2}`)
    .style("width", "100%")
    .style("margin", "2rem 0");

  svg2.append("rect")
    .attr("width", w2)
    .attr("height", h2)
    .attr("fill", "#0e1420");

  const moon = svg2.append("circle")
    .attr("cx", w2/2)
    .attr("cy", h2/2)
    .attr("r", 50)
    .attr("fill", "#d9dde5");

  const shadow = svg2.append("circle")
    .attr("cy", h2/2)
    .attr("r", 50)
    .attr("fill", "#0e1420");

  d3.timer((t) => {
    const offset = Math.sin(t / 1500) * 60;
    shadow.attr("cx", w2/2 + offset);
  });
</script>

The phase is not an object. It is a relationship. This is why describing the moon without describing light always feels incomplete.

## The horizon changes everything

When the moon is low, it feels larger. Warmer. More physical. Higher up, it becomes colder and more abstract. The shift is not in the moon — it is in the air, the distance, and the context around it.

<div id="horizon-demo"></div>

<script>
  const w3 = 600, h3 = 260;
  const svg3 = d3.select("#horizon-demo")
    .append("svg")
    .attr("viewBox", `0 0 ${w3} ${h3}`)
    .style("width", "100%")
    .style("margin", "2rem 0");

  svg3.append("rect")
    .attr("width", w3)
    .attr("height", h3)
    .attr("fill", "#0e1420");

  svg3.append("line")
    .attr("x1", 0)
    .attr("x2", w3)
    .attr("y1", h3 - 40)
    .attr("y2", h3 - 40)
    .attr("stroke", "#555");

  const moon3 = svg3.append("circle")
    .attr("r", 16)
    .attr("fill", "#f2d6a2");

  d3.timer((t) => {
    const x = (t / 10) % w3;
    const y = (h3 - 40) - Math.sin(x / w3 * Math.PI) * 120;

    moon3.attr("cx", x).attr("cy", y);
  });
</script>

When it rises, it feels close. When it climbs, it becomes distant. Same object. Different reading.

## Observation is the point

A short note about the moon can still be complete. You do not need to catalog everything. You need to notice one thing clearly.

- How bright it was relative to the sky  
- How sharp the edge appeared  
- Whether it flattened or gained depth  
- Whether it felt near or unreachable  

That is enough.

## Why this format works

Motion helps reveal what static text hides. A blog post can carry both:

- words to frame the idea  
- movement to make it visible  

The combination makes even a simple observation feel grounded.

The moon rewards attention. Not because it is complex, but because it is consistent. The more consistently you look, the more variation you begin to see.
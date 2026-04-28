---
title: Solar System
pubDate: 2026-04-24
description: An interactive reading of the sun and the system that moves around it.
---

<div id="solar-system"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>
const width = 980;
const height = 800;
const cx = width / 2;
const cy = height / 2 + 20;

let pausedUntil = 0;

const planets = [
  { name: "Mercury", r: 70,  size: 6,  speed: 0.00020, start: 0.4, color: "#a7a7a7", info: "Closest to the sun. Extreme temperature swings." },
  { name: "Venus",   r: 110, size: 9,  speed: 0.00016, start: 2.2, color: "#e6c27a", info: "Hottest planet. Thick atmosphere traps heat." },
  { name: "Earth",   r: 155, size: 9,  speed: 0.00012, start: 4.1, color: "#4aa3ff", info: "Liquid water and life." },
  { name: "Mars",    r: 200, size: 7,  speed: 0.000095,start: 1.3, color: "#c1440e", info: "Cold desert with past water evidence." },
  { name: "Jupiter", r: 260, size: 15, speed: 0.00006, start: 3.4, color: "#d9a066", info: "Largest planet. Massive storms." },
  { name: "Saturn",  r: 325, size: 14, speed: 0.000045,start: 5.2, color: "#e8d3a9", info: "Famous for its rings." }
];

const container = d3.select("#solar-system")
  .style("max-width", "1120px")
  .style("margin", "2rem auto");

const svg = container.append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("width", "100%");

svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .attr("rx", 28)
  .attr("fill", "#0b0f17");

// title
svg.append("text")
  .attr("x", 36)
  .attr("y", 52)
  .attr("fill", "#f8fafc")
  .attr("font-size", 30)
  .attr("font-weight", 900)
  .text("Click a planet to learn");

// stars
svg.selectAll(".star")
  .data(d3.range(150))
  .join("circle")
  .attr("cx", () => Math.random() * width)
  .attr("cy", () => Math.random() * height)
  .attr("r", () => Math.random() * 1.2)
  .attr("fill", "white")
  .attr("opacity", () => Math.random() * 0.5);

// sun
svg.append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", 38)
  .attr("fill", "#f6c453");

// orbits
planets.forEach(p => {
  svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", p.r)
    .attr("fill", "none")
    .attr("stroke", "rgba(255,255,255,0.1)");
});

// 🔥 FACT CARD (hidden initially)
const card = svg.append("g")
  .attr("transform", `translate(${width - 360}, ${height - 160})`)
  .style("opacity", 0);

card.append("rect")
  .attr("width", 320)
  .attr("height", 130)
  .attr("rx", 16)
  .attr("fill", "rgba(17,24,39,0.95)")
  .attr("stroke", "rgba(255,255,255,0.15)");

const title = card.append("text")
  .attr("x", 18)
  .attr("y", 36)
  .attr("fill", "#f8fafc")
  .attr("font-size", 22)
  .attr("font-weight", 800);

const body = card.append("text")
  .attr("x", 18)
  .attr("y", 66)
  .attr("fill", "#dbeafe")
  .attr("font-size", 16);

const pause = card.append("text")
  .attr("x", 18)
  .attr("y", 110)
  .attr("fill", "#94a3b8")
  .attr("font-size", 13);

// wrap helper
function wrap(textEl, text, maxChars=32) {
  const words = text.split(" ");
  let line = "", lines = [];

  words.forEach(w => {
    const test = line ? line + " " + w : w;
    if (test.length > maxChars) {
      lines.push(line);
      line = w;
    } else line = test;
  });
  if (line) lines.push(line);

  textEl.selectAll("*").remove();
  lines.slice(0,3).forEach((l,i)=>{
    textEl.append("tspan")
      .attr("x", 18)
      .attr("y", 66 + i*20)
      .text(l);
  });
}

// planets
const group = svg.selectAll(".planet")
  .data(planets)
  .join("g")
  .style("cursor", "pointer")
  .on("click", function(e,d){

    pausedUntil = performance.now() + 30000;

    // show card
    card.transition().duration(200).style("opacity", 1);

    title.text(d.name);
    wrap(body, d.info);
    pause.text("Paused for 30 seconds");

    d3.select(this).select(".glow")
      .transition().duration(150)
      .attr("r", d.size+18)
      .attr("opacity", 0.4)
      .transition().duration(250)
      .attr("r", d.size+8)
      .attr("opacity", 0.2);
  });

group.append("circle")
  .attr("class","glow")
  .attr("r", d=>d.size+8)
  .attr("fill", d=>d.color)
  .attr("opacity",0.2);

group.append("circle")
  .attr("r", d=>d.size)
  .attr("fill", d=>d.color);

// initial positions (not aligned)
group.attr("transform", d=>{
  return `translate(${cx + Math.cos(d.start)*d.r}, ${cy + Math.sin(d.start)*d.r})`;
});

// animation
d3.timer((t)=>{
  if (performance.now() < pausedUntil) return;

  group.attr("transform", d=>{
    const angle = d.start + t*d.speed;
    return `translate(${cx + Math.cos(angle)*d.r}, ${cy + Math.sin(angle)*d.r})`;
  });
});
</script>

The sun is so familiar that it often disappears into the background of explanation. We use it to talk about weather, warmth, daylight, seasons, photography, crop cycles, timekeeping, and color.

## The center that everything negotiates with

Nothing in this system is independent. Every planet is in conversation with the sun through distance and motion. Closer means faster. Farther means slower. The pattern repeats with quiet consistency.

## Motion reveals structure

Static diagrams explain the solar system. Motion makes it obvious.

- speed varies with distance  
- position is always changing  
- balance is continuous, not fixed  

## Interaction changes understanding

Clicking a planet does something subtle. It forces attention. It isolates one relationship out of many.

That is how most understanding works:
not by seeing everything at once,  
but by focusing on one thing long enough.

## Why this page works

Text describes. Motion demonstrates. Interaction anchors.

The goal is not precision. The goal is clarity you can feel.

## Solar System Touch Game

Now test yourself. Tap the planet named in the prompt. Each correct answer gives you 10 points.

<div id="planet-game"></div>

<script>
{
  const width = 760;
  const height = 440;
  const cx = width / 2;
  const cy = height / 2;

  const planets = [
    { name: "Mercury", r: 60, size: 5, speed: 0.00045, color: "#a7a7a7" },
    { name: "Venus", r: 85, size: 7, speed: 0.00038, color: "#e6c27a" },
    { name: "Earth", r: 115, size: 7, speed: 0.00031, color: "#4aa3ff" },
    { name: "Mars", r: 145, size: 6, speed: 0.00025, color: "#c1440e" },
    { name: "Jupiter", r: 195, size: 12, speed: 0.00016, color: "#d9a066" },
    { name: "Saturn", r: 240, size: 11, speed: 0.00012, color: "#e8d3a9" }
  ];

  let remaining = [...planets];
  let target = remaining[Math.floor(Math.random() * remaining.length)];
  let score = 0;

  const wrapper = d3.select("#planet-game")
    .style("max-width", "900px")
    .style("margin", "2rem auto");

  const prompt = wrapper.append("div")
    .style("text-align", "center")
    .style("font-size", "1.1rem")
    .style("font-weight", "700")
    .style("margin-bottom", "0.75rem")
    .text(`Tap ${target.name}`);

  const scoreBox = wrapper.append("div")
    .style("text-align", "center")
    .style("margin-bottom", "1rem")
    .style("color", "#94a3b8")
    .text(`Score: ${score}`);

  const svg = wrapper.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("display", "block")
    .style("border-radius", "24px");

  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("rx", 24)
    .attr("fill", "#0b0f17");

  svg.selectAll(".game-star")
    .data(d3.range(100))
    .join("circle")
    .attr("cx", () => Math.random() * width)
    .attr("cy", () => Math.random() * height)
    .attr("r", () => Math.random() * 1.2)
    .attr("fill", "white")
    .attr("opacity", () => Math.random() * 0.6);

  svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 30)
    .attr("fill", "#f6c453");

  svg.append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 64)
    .attr("fill", "none")
    .attr("stroke", "rgba(246,196,83,0.18)")
    .attr("stroke-width", 22);

  planets.forEach(p => {
    svg.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", p.r)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.09)");
  });

  const planetGroup = svg.selectAll(".game-planet")
    .data(planets)
    .join("g")
    .style("cursor", "pointer")
    .on("click", function(event, d) {
      if (!target) return;

      if (d.name === target.name) {
        score += 10;
        remaining = remaining.filter(p => p.name !== d.name);

        d3.select(this)
          .select("circle")
          .transition()
          .duration(180)
          .attr("r", d.size * 2.4)
          .attr("opacity", 0.35)
          .transition()
          .duration(180)
          .attr("r", d.size)
          .attr("opacity", 1);

        scoreBox.text(`Score: ${score}`);

        if (remaining.length === 0) {
          target = null;
          prompt.text(`You got them all. Final score: ${score}`);
          scoreBox.text("Complete");
        } else {
          target = remaining[Math.floor(Math.random() * remaining.length)];
          prompt.text(`Correct. Now tap ${target.name}`);
        }
      } else {
        prompt.text(`Not ${d.name}. Try again: tap ${target.name}`);
      }
    });

  planetGroup.append("circle")
    .attr("r", d => d.size + 10)
    .attr("fill", d => d.color)
    .attr("opacity", 0.13);

  planetGroup.append("circle")
    .attr("r", d => d.size)
    .attr("fill", d => d.color)
    .attr("stroke", "rgba(255,255,255,0.35)");

  planetGroup.append("title")
    .text(d => d.name);

  d3.timer((t) => {
    planetGroup.attr("transform", d => {
      const angle = t * d.speed;
      const x = cx + Math.cos(angle) * d.r;
      const y = cy + Math.sin(angle) * d.r;
      return `translate(${x}, ${y})`;
    });
  });
}
</script>
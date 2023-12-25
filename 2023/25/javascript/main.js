const fs = require("fs");

const input = fs.readFileSync("../input.txt").toString().trim();

// takes a while :)
// or if you are lucky, not too much :)
console.log(`Part 1: ${part1()}`);

function part1() {
  let graph = new Map();
  input.split("\n").map((l) => {
    let v = l.split(": ")[0];
    let vs = l.split(": ")[1].split(" ");
    if (!graph.has(v)) graph.set(v, []);
    for (let vi of vs) {
      if (!graph.has(vi)) graph.set(vi, []);
      if (!graph.get(v).includes(vi)) graph.get(v).push(vi);
      if (!graph.get(vi).includes(v)) graph.get(vi).push(v);
    }
  });

  while (true) {
    let [cut, size] = contract(graph);
    console.log(size);
    if (size > 3) continue;
    return cut[0].split(" ").length * cut[1].split(" ").length;
  }
}

function genEdges(graph) {
  let edges = [];
  graph.forEach((vs, v) => vs.forEach((vi) => edges.push([v, vi])));
  return edges;
}

function genSize(edges) {
  let s = new Set();
  for (let e of edges) {
    s.add(e[0]);
    s.add(e[1]);
  }
  return s.size;
}

function contract(graph = new Map()) {
  let edges = genEdges(graph);
  let size = graph.size;
  while (size > 2) {
    let edgeI = ~~(Math.random() * edges.length);
    let edge = edges[edgeI];
    let newV = edge[0] + " " + edge[1];

    let newEdges = [];
    for (let i = 0; i < edges.length; i++) {
      if (i == edgeI) continue;
      let e = edges[i];
      if (e[0] == edge[0] && e[1] == edge[1]) continue;
      if (e[1] == edge[0] && e[0] == edge[1]) continue;

      if (e[0] == edge[0] || e[0] == edge[1]) {
        newEdges.push([newV, e[1]]);
      } else if (e[1] == edge[0] || e[1] == edge[1]) {
        newEdges.push([newV, e[0]]);
      } else {
        newEdges.push(e);
      }
    }
    edges = newEdges;
    size = genSize(edges);
  }
  return [edges[0], edges.length / 2];
}

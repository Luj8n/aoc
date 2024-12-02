use std::collections::{HashMap, HashSet, VecDeque};

fn main() {
  let input = std::fs::read_to_string("../input.txt").unwrap();
  let p1 = part1(&input);
  println!("Part 1: {p1}");
}

fn part1(input: &str) -> String {
  let mut graph: HashMap<String, HashSet<String>> = HashMap::new();

  for line in input.lines() {
    let v = line.split(": ").next().unwrap();
    for vi in line.split(": ").nth(1).unwrap().split(' ') {
      graph
        .entry(v.to_string())
        .or_default()
        .insert(vi.to_string());
      graph
        .entry(vi.to_string())
        .or_default()
        .insert(v.to_string());
    }
  }

  loop {
    let ((v1, v2), size) = contract(&graph);
    println!("Cut size = {size}");
    if size > 3 {
      continue;
    }

    return (v1.split(' ').count() * v2.split(' ').count()).to_string();
  }
}

fn contract(graph: &HashMap<String, HashSet<String>>) -> ((String, String), usize) {
  let mut edges = gen_edges(graph);
  let mut size = graph.len();

  while size > 2 {
    let edge_i = fastrand::usize(..edges.len());
    let (edge_a, edge_b) = edges[edge_i].clone();
    let new_v = format!("{edge_a} {edge_b}");

    let mut new_edges = Vec::with_capacity(edges.len());
    for (a, b) in edges {
      if (a == edge_a && b == edge_b) || (a == edge_b && b == edge_a) {
        continue;
      } else if a == edge_a || a == edge_b {
        new_edges.push((new_v.clone(), b));
      } else if b == edge_a || b == edge_b {
        new_edges.push((new_v.clone(), a));
      } else {
        new_edges.push((a, b));
      }
    }

    edges = new_edges;
    size = gen_size(&edges);
  }

  (edges[0].clone(), edges.len() / 2)
}

fn gen_edges(graph: &HashMap<String, HashSet<String>>) -> Vec<(String, String)> {
  let mut edges = Vec::new();

  for (v, vs) in graph {
    for vi in vs {
      edges.push((v.to_string(), vi.to_string()));
    }
  }

  edges
}

fn gen_size(edges: &Vec<(String, String)>) -> usize {
  let mut vs: HashSet<&str> = HashSet::new();
  for (v1, v2) in edges {
    vs.insert(v1);
    vs.insert(v2);
  }
  vs.len()
}

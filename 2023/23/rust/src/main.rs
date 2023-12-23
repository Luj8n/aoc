use std::collections::{HashMap, HashSet, VecDeque};

fn main() {
  let input = std::fs::read_to_string("../input.txt").unwrap();
  let p2 = part2(&input);
  println!("Part 2: {p2}");
}

fn part2(input: &str) -> String {
  let map: Vec<&str> = input.lines().collect();
  let h = map.len() as i32;
  let w = map[0].len() as i32;

  let start_x = 1;
  let start_y = 0;
  let end_x = w - 2;
  let end_y = h - 1;

  let start_i = start_y * w + start_x;
  let end_i = end_y * w + end_x;

  let map: Vec<bool> = map.join("").chars().map(|c| c != '#').collect();

  let mut nodes: HashMap<i32, Vec<(i32, i32)>> = HashMap::new();

  nodes.insert(start_i, Vec::new());
  nodes.insert(end_i, Vec::new());

  for y in 1..h - 1 {
    for x in 1..w - 1 {
      let i = (y * w + x) as usize;
      let mut c = 0;
      if !map[i] {
        continue;
      }
      if map[i - w as usize] {
        c += 1;
      }
      if map[i + w as usize] {
        c += 1;
      }
      if map[i + 1] {
        c += 1;
      }
      if map[i - 1] {
        c += 1;
      }

      if c >= 3 {
        nodes.insert(i as i32, Vec::new());
      }
    }
  }

  let keys: Vec<i32> = nodes.keys().copied().collect();

  for n in keys {
    let sx = n % w;
    let sy = n / w;
    let mut q: VecDeque<(i32, i32, i32)> = VecDeque::new();
    q.push_back((sx, sy, 0));
    let mut v: HashSet<i32> = HashSet::new();
    while !q.is_empty() {
      let (x, y, d) = q.pop_back().unwrap(); // or pop_front. didn't test which is faster
      if x < 0 || y < 0 || x >= w || y >= h {
        continue;
      }
      let i = y * w + x;
      if !map[i as usize] {
        continue;
      }
      if i != n && nodes.contains_key(&i) {
        nodes.get_mut(&i).unwrap().push((n, d));
        continue;
      }
      if v.contains(&i) {
        continue;
      }
      v.insert(i);
      q.push_back((x, y - 1, d + 1));
      q.push_back((x + 1, y, d + 1));
      q.push_back((x, y + 1, d + 1));
      q.push_back((x - 1, y, d + 1));
    }
  }

  let mut q: VecDeque<(i32, i32, HashSet<i32>)> = VecDeque::new();
  q.push_back((start_i, 0, HashSet::new()));

  let mut highest = 0;

  while !q.is_empty() {
    let (i, d, mut v) = q.pop_front().unwrap();

    if v.contains(&i) {
      continue;
    }

    if i == end_i {
      if d > highest {
        let s = q.len();
        println!("d = {d}, size = {s}");
        highest = d;
      }
      continue;
    }

    v.insert(i);

    for (neigh, dd) in nodes.get(&i).unwrap() {
      q.push_back((*neigh, d + dd, v.clone()));
    }
  }
  highest.to_string()
}

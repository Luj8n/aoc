use ahash::AHashSet;
use hashbrown::hash_map::DefaultHashBuilder;
use priority_queue::PriorityQueue;
use std::fs::read_to_string;
use std::time::Instant;

const FILE_NAME: &str = "input.txt";

fn main() {
  let current_time = Instant::now();

  let raw = read_to_string(FILE_NAME).unwrap_or_else(|_| panic!("File {} not found", FILE_NAME));

  let initial: Vec<Vec<i32>> = raw
    .lines()
    .map(|row| row.chars().map(|c| c.to_digit(10).unwrap() as i32).collect())
    .collect();

  let matrix1: Vec<Vec<i32>> = initial
    .iter()
    .map(|row| {
      let mut cp = row.clone();
      for i in 1..=4 {
        cp.splice(cp.len().., row.iter().map(|v| (v + i - 1) % 9 + 1));
      }
      cp
    })
    .collect();

  let mut matrix: Vec<Vec<i32>> = vec![];

  for i in 0..=4 {
    matrix.splice(
      matrix.len()..,
      matrix1
        .iter()
        .map(|row| row.iter().map(|v| (v + i - 1) % 9 + 1).collect()),
    );
  }

  let height = matrix[0].len() as i32;
  let width = matrix.len() as i32;

  //                          X    Y  distance
  let mut pq: PriorityQueue<(i32, i32), i32, DefaultHashBuilder> = PriorityQueue::with_default_hasher();

  //                    x + y * width
  let mut visited: AHashSet<i32> = AHashSet::new();

  visited.insert(0);

  //               X    Y  distance
  let mut prev: ((i32, i32), i32) = ((0, 0), 0);

  // stop it if we found the end goal
  while prev.0 != (width - 1, height - 1) {
    let neighbours = [(1, 0), (-1, 0), (0, 1), (0, -1)];
    for (dx, dy) in neighbours {
      let (x, y) = ((prev.0).0 + dx, (prev.0).1 + dy);

      if x >= 0 && x < width && y >= 0 && y < height && !visited.contains(&(x + y * width)) {
        pq.push_increase((x, y), prev.1 - (matrix[y as usize][x as usize] as i32));
      }
    }

    let best = pq.pop().unwrap();
    visited.insert((best.0).0 + (best.0).1 * width);

    prev = best;
  }

  println!("Answer: {}", -prev.1);

  println!("{:?}", current_time.elapsed());
}

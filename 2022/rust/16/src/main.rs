use std::fs;

mod part2;

fn main() {
  let file = fs::read_to_string("./input.txt").unwrap();

  println!("Part 2 = '{}'", part2::solve(&file));
}

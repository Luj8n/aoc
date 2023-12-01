fn main() {
  let input = std::fs::read_to_string("../input.txt").unwrap();
  let p1 = part1(&input);
  let p2 = part2(&input);
  println!("Part 1: {p1}");
  println!("Part 2: {p2}");
}

fn part1(input: &str) -> String {
  input
    .lines()
    .map(|line| {
      line
        .chars()
        .filter_map(|c| c.to_digit(10))
        .collect::<Vec<u32>>()
    })
    .map(|x| match x[..] {
      [] => 0,
      [o] => o * 10 + o,
      [f, .., l] => f * 10 + l,
    })
    .sum::<u32>()
    .to_string()
}

fn part2(input: &str) -> String {
  let nums = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4",
    "5", "6", "7", "8", "9",
  ]
  .iter()
  .enumerate();

  input
    .lines()
    .map(|line| {
      let first: usize = nums
        .clone()
        .filter_map(|(i, s)| line.match_indices(s).next().map(|(a, _)| (a, i)))
        .min_by_key(|(a, _)| *a)
        .unwrap()
        .1;

      let last = nums
        .clone()
        .filter_map(|(i, s)| line.rmatch_indices(s).next().map(|(a, _)| (a, i)))
        .max_by_key(|(a, _)| *a)
        .unwrap()
        .1;

      let f = first % 9 + 1;
      let l = last % 9 + 1;

      f * 10 + l
    })
    .sum::<usize>()
    .to_string()
}

use rayon::prelude::*;
use std::fs::read_to_string;
use std::time::Instant;

#[derive(Clone)]
enum Direction {
  East,
  South,
}

impl Direction {
  fn is_east(&self) -> bool {
    match self {
      Self::East => true,
      Self::South => false,
    }
  }
  fn is_south(&self) -> bool {
    match self {
      Self::East => false,
      Self::South => true,
    }
  }
}

#[derive(Clone)]
struct Cucumber {
  direction: Direction,
  x: i64,
  y: i64,
}

impl Cucumber {
  fn new(direction_str: char, x: i64, y: i64) -> Self {
    let direction;
    if direction_str == '>' {
      direction = Direction::East;
    } else if direction_str == 'v' {
      direction = Direction::South;
    } else {
      panic!("Direction can only be '>' or 'v'");
    }
    Cucumber { direction, x, y }
  }

  fn next_position(&self, height: &i64, width: &i64) -> (i64, i64) {
    if self.direction.is_east() {
      ((self.x + 1) % width, self.y)
    } else {
      (self.x, (self.y + 1) % height)
    }
  }

  // TODO: look into why `&Vec<Cucumber>` is faster then `&[Cucumber]`, even though clippy wants it changed
  fn can_move(&self, others: &[Cucumber], height: &i64, width: &i64) -> bool {
    let (next_x, next_y) = self.next_position(height, width);

    for other in others {
      if self.x == other.x && self.y == other.y {
        // ignore yourself
        continue;
      }

      if other.x == next_x && other.y == next_y {
        return false;
      }
    }
    true
  }

  fn step(&mut self, height: &i64, width: &i64) {
    let (next_x, next_y) = self.next_position(height, width);

    self.x = next_x;
    self.y = next_y;
  }
}

struct Game {
  cucumbers: Vec<Cucumber>,
  height: i64,
  width: i64,
}

impl Game {
  fn next_step(&mut self) -> bool {
    if self
      .cucumbers
      .par_iter()
      .all(|c| !c.can_move(&self.cucumbers, &self.height, &self.width))
    {
      return false;
    }

    let mut old_cucumbers = self.cucumbers.clone();

    self.cucumbers.iter_mut().par_bridge().for_each(|cucumber| {
      if cucumber.direction.is_east() && cucumber.can_move(&old_cucumbers, &self.height, &self.width) {
        cucumber.step(&self.height, &self.width);
      }
    });

    old_cucumbers = self.cucumbers.clone();

    self.cucumbers.iter_mut().par_bridge().for_each(|cucumber| {
      if cucumber.direction.is_south() && cucumber.can_move(&old_cucumbers, &self.height, &self.width) {
        cucumber.step(&self.height, &self.width);
      }
    });

    true
  }
}

fn main() {
  let current_time = Instant::now();

  const FILE_NAME: &str = "input.txt";

  let raw = read_to_string(FILE_NAME).unwrap_or_else(|_| panic!("File {} not found", FILE_NAME));

  let height = raw.lines().count() as i64;
  let width = raw.lines().collect::<Vec<&str>>().first().expect("???").len() as i64;

  let mut cucumbers: Vec<Cucumber> = vec![];

  for (y, line) in raw.lines().enumerate() {
    for (x, char) in line.chars().enumerate() {
      if char == '.' {
        continue;
      }

      cucumbers.push(Cucumber::new(char, x as i64, y as i64));
    }
  }

  let mut game = Game {
    cucumbers,
    height,
    width,
  };

  let mut step_count: i64 = 0;

  loop {
    let moved = game.next_step();
    step_count += 1;
    if !moved {
      break;
    }
  }

  println!("Count: {}", step_count);
  println!("Time taken: {:?}", current_time.elapsed());
}

use std::collections::{HashMap, HashSet, VecDeque};

// takes under a minute
// still slow

pub fn solve(input: &str) -> String {
  let mut flow_rates = HashMap::<&str, i32>::new();
  let mut neighbours = HashMap::<&str, Vec<&str>>::new();

  let valves = input
    .trim()
    .split('\n')
    .map(|v| {
      let v: Vec<&str> = v.split(' ').collect();

      let name = v[1];
      let flow_rate = v[4][5..v[4].len() - 1].parse::<i32>().unwrap();
      let neighs = v[9..]
        .iter()
        .map(|n| {
          if n.ends_with(',') {
            &n[0..n.len() - 1]
          } else {
            n
          }
        })
        .collect::<Vec<&str>>();

      flow_rates.insert(name, flow_rate);
      neighbours.insert(name, neighs);

      name.to_string()
    })
    .collect::<Vec<String>>();

  let mut distances = HashMap::<&str, HashMap<&str, i32>>::new();

  for v in &valves {
    let mut dists = HashMap::<&str, i32>::new();

    let mut q = VecDeque::<(&str, i32)>::new();
    q.push_back((v, 0));

    while !q.is_empty() {
      let (valve, distance) = q.pop_front().unwrap();

      if dists.contains_key(valve) {
        continue;
      }
      dists.insert(valve, distance);

      for n in &neighbours[valve] {
        q.push_back((n, distance + 1));
      }
    }

    distances.insert(v, dists);
  }

  let mut q = VecDeque::<(&str, &str, i32, i32, HashSet<&str>, i32)>::new();
  q.push_back(("AA", "AA", 26, 26, HashSet::new(), 0));

  let mut max = 0;

  while !q.is_empty() {
    let (me, elephant, my_time, elephants_time, opened, pressure) = q.pop_back().unwrap();

    if my_time <= 0 || elephants_time <= 0 {
      continue;
    }

    if pressure > max {
      println!("{pressure} {my_time} {elephants_time}");
      max = pressure;
    }

    for other in &valves {
      let other = other.as_str();

      if my_time > elephants_time {
        if opened.contains(other)
          || flow_rates[other] == 0
          || distances[me][other] > distances[elephant][other]
        {
          continue;
        }

        let my_new_time = my_time - distances[me][other] - 1;
        let mut new_opened = opened.clone();
        new_opened.insert(other);

        q.push_back((
          other,
          elephant,
          my_new_time,
          elephants_time,
          new_opened,
          pressure + my_new_time * flow_rates[other],
        ));
      } else {
        if opened.contains(other)
          || flow_rates[other] == 0
          || distances[elephant][other] > distances[me][other]
        {
          continue;
        }

        let elephants_new_time = elephants_time - distances[elephant][other] - 1;
        let mut new_opened = opened.clone();
        new_opened.insert(other);

        q.push_back((
          me,
          other,
          my_time,
          elephants_new_time,
          new_opened,
          pressure + elephants_new_time * flow_rates[other],
        ));
      }
    }
  }

  max.to_string()
}

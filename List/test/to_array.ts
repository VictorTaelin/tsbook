import { List } from "../_";
import { to_array } from "../to_array";
import { from_array } from "../from_array";

// Test cases
const test_cases: [string, number[], number[]][] = [
  ["Empty list", [], []],
  ["Single element", [1], [1]],
  ["Multiple elements", [1, 2, 3], [1, 2, 3]],
  ["Large list", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
];

// Test to_array
console.log("Testing to_array:");
test_cases.forEach(([description, input, expected]) => {
  console.log(`Test: ${description}`);
  const list = from_array(input);
  const result = to_array(list);
  const passed = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`Result: ${passed ? "PASSED" : "FAILED"}`);
  if (!passed) {
    console.log(`Expected: ${JSON.stringify(expected)}`);
    console.log(`Got: ${JSON.stringify(result)}`);
  }
  console.log();
});

// Test from_array
console.log("Testing from_array:");
test_cases.forEach(([description, input, expected]) => {
  console.log(`Test: ${description}`);
  const list = from_array(input);
  const result = to_array(list);
  const passed = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`Result: ${passed ? "PASSED" : "FAILED"}`);
  if (!passed) {
    console.log(`Expected: ${JSON.stringify(expected)}`);
    console.log(`Got: ${JSON.stringify(result)}`);
  }
  console.log();
});

// Test roundtrip: array -> List -> array
console.log("Testing roundtrip (array -> List -> array):");
test_cases.forEach(([description, input, expected]) => {
  console.log(`Test: ${description}`);
  const result = to_array(from_array(input));
  const passed = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`Result: ${passed ? "PASSED" : "FAILED"}`);
  if (!passed) {
    console.log(`Expected: ${JSON.stringify(expected)}`);
    console.log(`Got: ${JSON.stringify(result)}`);
  }
  console.log();
});

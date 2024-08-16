import { List } from "../_";
import { map } from "../map";

// Helper function to create a list from an array
function from_array<A>(arr: A[]): List<A> {
  return arr.reduceRight((acc, val) => ({ $: "Cons", head: val, tail: acc }), { $: "Nil" } as List<A>);
}

// Helper function to convert a list to an array
function to_array<A>(list: List<A>): A[] {
  let result: A[] = [];
  let current = list;
  while (current.$ === "Cons") {
    result.push(current.head);
    current = current.tail;
  }
  return result;
}

// Test cases
const test_cases: [string, List<number>, (x: number) => number, number[]][] = [
  ["Empty list", { $: "Nil" }, x => x * 2, []],
  ["Single element", from_array([1]), x => x * 2, [2]],
  ["Multiple elements", from_array([1, 2, 3]), x => x * 2, [2, 4, 6]],
  ["Identity function", from_array([1, 2, 3]), x => x, [1, 2, 3]],
  ["Square function", from_array([1, 2, 3, 4]), x => x * x, [1, 4, 9, 16]],
];

// Run tests
test_cases.forEach(([description, input, fn, expected]) => {
  console.log(`Test: ${description}`);
  const result = to_array(map(input, fn));
  const passed = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`Result: ${passed ? "PASSED" : "FAILED"}`);
  if (!passed) {
    console.log(`Expected: ${JSON.stringify(expected)}`);
    console.log(`Got: ${JSON.stringify(result)}`);
  }
  console.log();
});

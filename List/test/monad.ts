import { List } from "../_";
import { bind } from "../bind";
import { pure } from "../pure";
import { from_array } from "../from_array";
import { to_array } from "../to_array";

// Equivalent to: do { xs <- [1,2,3]; ys <- [4,5,6]; return (xs,ys) }
const result =
  bind(from_array([1, 2, 3]), (xs: number) =>
  bind(from_array([4, 5, 6]), (ys: number) =>
  bind(from_array([7, 8, 9]), (ys: number) =>
  pure([xs, ys] as [number, number]))));

// Convert the result to a JavaScript array for easy printing
const result_array = to_array(result);

// Print the result
console.log("Result:");
console.log(JSON.stringify(result_array));

// Expected output:
// [[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6]]

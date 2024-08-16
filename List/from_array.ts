import { List } from "./_";

// Converts a JavaScript array to a List
// - arr: the input array
// = a new List containing all elements from the array in order
export function from_array<A>(arr: A[]): List<A> {
  var result: List<A> = { $: "Nil" };
  for (var i = arr.length - 1; i >= 0; i--) {
    result = { $: "Cons", head: arr[i], tail: result };
  }
  return result;
}

import { List } from "./_";

// Converts a List to a JavaScript array
// - xs: the input List
// = an array containing all elements from the List in order
export function to_array<A>(xs: List<A>): A[] {
  var result: A[] = [];

  function go(current: List<A>): void {
    while (current.$ === "Cons") {
      result.push(current.head);
      current = current.tail;
    }
  }

  go(xs);
  return result;
}

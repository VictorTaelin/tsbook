import { List } from "./_";

// Reverses the order of elements in a list
// - xs: the input list
// = a new list with elements in reverse order
export function reverse<A>(xs: List<A>): List<A> {
  function go(xs: List<A>, acc: List<A>): List<A> {
    switch (xs.$) {
      case "Cons": {
        return go(xs.tail, { $: "Cons", head: xs.head, tail: acc });
      }
      case "Nil": {
        return acc;
      }
    }
  }
  return go(xs, { $: "Nil" });
}

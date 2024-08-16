import { List } from "./_";

// Applies a function to each element of a list
// - xs: the input list
// - fn: the function to apply to each element
// = a new list with f applied to all elements
export function map<A, B>(xs: List<A>, fn: (a: A) => B): List<B> {
  switch (xs.$) {
    case "Cons": {
      var head = fn(xs.head);
      var tail = map(xs.tail, fn);
      return { $: "Cons", head, tail };
    }
    case "Nil": {
      return { $: "Nil" };
    }
  }
}

import { List } from "./_";

// Appends two lists
// - xs: the first input list
// - ys: the second input list
// = a new list containing all elements from xs followed by all elements from ys
export function append<A>(xs: List<A>, ys: List<A>): List<A> {
  switch (xs.$) {
    case "Cons": {
      var head = xs.head;
      var tail = append(xs.tail, ys);
      return { $: "Cons", head, tail };
    }
    case "Nil": {
      return ys;
    }
  }
}

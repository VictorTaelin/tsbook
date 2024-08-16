import { List } from "./_";

// Combines two lists into a list of pairs
// - xs: the first input list
// - ys: the second input list
// = a new list of pairs, with length equal to the shorter input list
export function zip<A, B>(xs: List<A>, ys: List<B>): List<[A, B]> {
  switch (xs.$) {
    case "Cons": {
      switch (ys.$) {
        case "Cons": {
          var head: [A, B] = [xs.head, ys.head];
          var tail = zip(xs.tail, ys.tail);
          return { $: "Cons", head, tail };
        }
        case "Nil": {
          return { $: "Nil" };
        }
      }
    }
    case "Nil": {
      return { $: "Nil" };
    }
  }
}
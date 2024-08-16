import { List } from "./_";

// Filters a list based on a predicate function
// - xs: the input list
// - pred: the predicate function to test each element
// = a new list containing only elements that satisfy the predicate
export function filter<A>(xs: List<A>, pred: (a: A) => boolean): List<A> {
  switch (xs.$) {
    case "Cons": {
      var head = xs.head;
      var tail = filter(xs.tail, pred);
      return pred(xs.head) ? { $: "Cons", head, tail } : tail;
    }
    case "Nil": {
      return { $: "Nil" };
    }
  }
}

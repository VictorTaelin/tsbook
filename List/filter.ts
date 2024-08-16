import { List } from "./_";

// Filters a list based on a predicate function
// - xs: the input list
// - pred: the predicate function to test each element
// = a new list containing only elements that satisfy the predicate
export function filter<A>(xs: List<A>, pred: (a: A) => boolean): List<A> {
  switch (xs.$) {
    case "Cons": {
      var tail = filter(xs.tail, pred);
      if (pred(xs.head)) {
        return { $: "Cons", head: xs.head, tail };
      } else {
        return tail;
      }
    }
    case "Nil": {
      return { $: "Nil" };
    }
  }
}

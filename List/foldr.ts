import { List } from "./_";

// Folds a list from right to left
// - xs: the input list
// - cons: the folding function
// - nil: the initial accumulator value
// = the result of folding the list
export function foldr<A, B>(xs: List<A>, cons: (a: A, b: B) => B, nil: B): B {
  switch (xs.$) {
    case "Cons": {
      var head = xs.head;
      var tail = foldr(xs.tail, cons, nil);
      return cons(head, tail);
    }
    case "Nil": {
      return nil;
    }
  }
}

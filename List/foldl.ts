import { List } from "./_";

// Folds a list from left to right
// - xs: the input list
// - f: the folding function
// - init: the initial accumulator value
// = the result of folding the list
export function foldl<A, B>(xs: List<A>, f: (b: B, a: A) => B, init: B): B {
  switch (xs.$) {
    case "Cons": {
      var new_init = f(init, xs.head);
      return foldl(xs.tail, f, new_init);
    }
    case "Nil": {
      return init;
    }
  }
}

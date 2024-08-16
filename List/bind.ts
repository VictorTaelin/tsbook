import { List } from "./_";
import { append } from "./append";

// Applies a function that returns a list to each element of the input list
// and concatenates the results
// - xs: the input list
// - fn: the function to apply to each element, which returns a list
// = a new flattened list containing all elements from the lists returned by f
export function bind<A, B>(xs: List<A>, fn: (a: A) => List<B>): List<B> {
  switch (xs.$) {
    case "Cons": {
      var head_list = fn(xs.head);
      var tail_list = bind(xs.tail, fn);
      return append(head_list, tail_list);
    }
    case "Nil": {
      return { $: "Nil" };
    }
  }
}

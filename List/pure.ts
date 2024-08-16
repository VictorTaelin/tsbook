import { List } from "./_";

// Creates a singleton list containing a single element
// - x: the element to be wrapped in a list
// = a new list containing only the given element
export function pure<A>(x: A): List<A> {
  return { $: "Cons", head: x, tail: { $: "Nil" } };
}

// Represents a polymorphic List
// - Cons: appends an element to a list
// - Nil: the empty list
export type List<A>
  = { $: "Cons", head: A, tail: List<A> }
  | { $: "Nil" };

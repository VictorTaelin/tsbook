import { BaseParser, create_parser } from "./_";

// Represents a lambda term
type Term
  = { $: "Lam", nam: string, bod: Term }
  | { $: "App", fun: Term, arg: Term }
  | { $: "Var", nam: string };

// Custom parser for lambda terms
class TermParser extends BaseParser {
  parse(): Term {
    this.skip_trivia();
    switch (this.peek_one()) {
      case "λ": {
        this.consume("λ");
        var nam = this.parse_name();
        var bod = this.parse();
        return { $: "Lam", nam, bod };
      }
      case "(": {
        this.consume("(");
        var fun = this.parse();
        var arg = this.parse();
        this.consume(")");
        return { $: "App", fun, arg };
      }
      default: {
        var nam = this.parse_name();
        return { $: "Var", nam };
      }
    }
  }
}

// Creates a new TermParser instance
const new_term_parser = create_parser(TermParser);

// Helper function to convert Term to string for debugging
function term_to_string(term: Term): string {
  switch (term.$) {
    case "Lam": return `λ${term.nam} ${term_to_string(term.bod)}`;
    case "App": return `(${term_to_string(term.fun)} ${term_to_string(term.arg)})`;
    case "Var": return term.nam;
  }
}

// Example usage
function main() {
  var parser = new_term_parser("λfλx(f (f x))");
  try {
    var term = parser.parse();
    console.log("Parsed:", term_to_string(term));
  } catch (err) {
    console.error(err.message);
  }
}

main();

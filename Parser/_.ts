import { highlight } from "./highlight";

// Represents a parser that stores a string and a current index
export interface Parser {
  input: string;
  index: number;
}

// Base Parser class that implements the Parser interface
export class BaseParser implements Parser {
  input: string;
  index: number;

  constructor(input: string) {
    this.input = input;
    this.index = 0;
  }

  // Inspects the next character in the text without consuming it
  peek_one(): string | undefined {
    return this.input[this.index];
  }

  // Inspects the next `count` characters in the text without consuming them
  peek_many(count: number): string | undefined {
    return this.input.slice(this.index, this.index + count);
  }

  // Consumes the next character in the text
  advance_one(): string | undefined {
    return this.input[this.index++];
  }

  // Advances the parser by `count` characters, consuming them
  advance_many(count: number): string | undefined {
    const result = this.peek_many(count);
    this.index += count;
    return result;
  }

  // Skips spaces in the text
  skip_spaces(): void {
    while (this.peek_one()?.match(/\s/)) {
      this.advance_one();
    }
  }

  // Skips whitespace & comments in the text
  skip_trivia(): void {
    while (true) {
      this.skip_spaces();
      if (this.peek_many(2) === "//") {
        while (this.peek_one() && this.peek_one() !== "\n") {
          this.advance_one();
        }
        this.advance_one(); // Skip the newline character
      } else {
        break;
      }
    }
  }

  // Checks if the parser has reached the end of the input
  is_eof(): boolean {
    return this.index >= this.input.length;
  }

  // Consumes an instance of the given string, throwing an error if it is not found
  consume(text: string): void {
    this.skip_trivia();
    if (this.input.startsWith(text, this.index)) {
      this.index += text.length;
    } else {
      throw this.expected(text);
    }
  }

  // Checks if the next characters in the input start with the given string
  starts_with(text: string): boolean {
    return this.input.startsWith(text, this.index);
  }

  // Consumes all contiguous characters matching a given predicate
  take_while(predicate: (char: string) => boolean): string {
    const start = this.index;
    while (this.peek_one() && predicate(this.peek_one()!)) {
      this.advance_one();
    }
    return this.input.slice(start, this.index);
  }

  // Parses a name from the input, supporting alphanumeric characters, underscores, periods, and hyphens
  parse_name(): string {
    this.skip_trivia();
    const name = this.take_while(c => /[a-zA-Z0-9_\.\-\/$]/.test(c));
    if (name.length === 0) {
      throw this.expected("name");
    }
    return name;
  }

  // Parses a u64 from the input, supporting dec, hex (0xNUM), and bin (0bNUM)
  parse_u64(): number {
    this.skip_trivia();
    let radix = 10;
    if (this.peek_many(2) === "0x") {
      this.advance_many(2);
      radix = 16;
    } else if (this.peek_many(2) === "0b") {
      this.advance_many(2);
      radix = 2;
    }
    const num_str = this.take_while(c => /[0-9a-fA-F_]/.test(c)).replace(/_/g, '');
    if (num_str.length === 0) {
      throw this.expected("numeric digit");
    }
    const result = parseInt(num_str, radix);
    if (isNaN(result)) {
      throw this.expected_and("integer", "Invalid number format");
    }
    return result;
  }

  // Parses a single unicode character, supporting escape sequences
  parse_char(): string {
    const char = this.advance_one();
    if (char === "\\") {
      const escaped = this.advance_one();
      switch (escaped) {
        case "u":
          this.consume("{");
          const codepoint = this.take_while(c => /[0-9a-fA-F]/.test(c));
          this.consume("}");
          return String.fromCodePoint(parseInt(codepoint, 16));
        case "0": return "\0";
        case "n": return "\n";
        case "r": return "\r";
        case "t": return "\t";
        case "'": return "'";
        case '"': return '"';
        case "\\": return "\\";
        default: throw this.expected(`\\${escaped}`);
      }
    } else if (char === undefined) {
      throw this.expected("char");
    }
    return char;
  }

  // Parses a quoted character, like 'x'
  parse_quoted_char(): string {
    this.skip_trivia();
    this.consume("'");
    const char = this.parse_char();
    this.consume("'");
    return char;
  }

  // Parses a quoted string, like "foobar"
  parse_quoted_string(): string {
    this.skip_trivia();
    this.consume('"');
    let result = "";
    while (this.peek_one() !== '"') {
      result += this.parse_char();
    }
    this.consume('"');
    return result;
  }

  // Generates an error message for parsing failures, including the highlighted context
  expected(exp: string): Error {
    const ctx = highlight(this.index, this.index + 1, this.input);
    const msg = `PARSE_ERROR\n- expected: ${exp}\n- detected:\n${ctx}`;
    return new Error(msg);
  }

  // Generates an error message with an additional custom message
  expected_and(exp: string, msg: string): Error {
    const ctx = highlight(this.index, this.index + 1, this.input);
    const error_msg = `PARSE_ERROR\n- information: ${msg}\n- expected: ${exp}\n- detected:\n${ctx}\n`;
    return new Error(error_msg);
  }
}

// Creates a new Parser instance
export function new_parser(input: string): Parser {
  return new BaseParser(input);
}

// Helper function to create custom parsers
export function create_parser<T extends BaseParser>(
  constructor: new (input: string) => T
): (input: string) => T {
  return (input: string) => new constructor(input);
}

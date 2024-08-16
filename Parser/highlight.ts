// Given a complete source file, highlights an error between two indexes (in bytes).
export function highlight(ini_idx: number, end_idx: number, file: string): string {
  // Appends empty spaces to the left of a text
  function pad(len: number, txt: string): string {
    return " ".repeat(Math.max(len - txt.length, 0)) + txt;
  }

  // Makes sure the end index is lower than the end index
  console.assert(ini_idx <= end_idx);

  // Appends empty spaces until end_idx <= file.length
  // This is done this way to avoid allocating a new string
  let text: string;
  if (end_idx <= file.length) {
    text = file;
  } else {
    text = file + " ".repeat(end_idx - file.length);
  }

  // Terminal colors
  const color = "\x1b[4m\x1b[31m";
  const reset = "\x1b[0m";

  // Calculates indices and line numbers
  let cur_lin_idx = 0; // current line index
  let cur_lin_num = 0; // current line number
  let slc_lin_idx = 0; // slice line index
  let slc_lin_num = 0; // slice line number
  let slc_end_idx = 0; // slice end index
  let idx = 0;
  while (idx <= text.length) {
    const chr = text[idx] || '\n';
    if (idx === ini_idx) {
      slc_lin_idx = cur_lin_idx;
      slc_lin_num = cur_lin_num;
    }
    if (chr === '\n') {
      cur_lin_idx = idx + 1;
      cur_lin_num = cur_lin_num + 1;
      if (idx >= end_idx) {
        slc_end_idx = idx;
        break;
      }
    }
    idx += 1;
  }
  const num_len = (cur_lin_idx + 1).toString().length;
  const slice = text.slice(slc_lin_idx, slc_end_idx);
  ini_idx = ini_idx - slc_lin_idx;
  end_idx = end_idx - slc_lin_idx;

  // Builds the display text
  let result = "";
  let newl = true;
  let high = false;
  let line = slc_lin_num;
  idx = 0;
  while (idx < slice.length) {
    const chr = slice[idx] || ' ';
    if (newl) {
      result += reset;
      result += ` ${pad(num_len, (line + 1).toString())} | `;
      if (high) {
        result += color;
      }
      newl = false;
    }
    if (chr === '\n') {
      newl = true;
      line = line + 1;
    }
    if (idx === ini_idx) {
      high = true;
      result += color;
    }
    if (chr === '\n' && high && end_idx - ini_idx === 1) {
      result += ' '; // single "\n" highlight
    }
    if (idx === end_idx) {
      high = false;
      result += reset;
    }
    result += chr;
    idx += 1;
  }
  result += reset;

  // Returns it
  return result;
}

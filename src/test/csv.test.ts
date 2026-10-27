import { describe, expect, it } from "vitest";
import { toCsv } from "@/lib/csv";

describe("toCsv", () => {
  it("quotes fields and escapes embedded quotes", () => {
    expect(
      toCsv([
        ["name", "note"],
        ["Applicant", 'Said "hello"'],
      ]),
    ).toBe('"name","note"\r\n"Applicant","Said ""hello"""');
  });

  it("neutralizes spreadsheet formula prefixes", () => {
    expect(toCsv([['=HYPERLINK("https://example.test")']])).toBe(
      '"\'=HYPERLINK(""https://example.test"")"',
    );
  });
});

import { it, expect } from "vitest";
import { evaluate } from "..";

it("should handle <= comparisons", async () => {
  expect(await evaluate("5 <= 3")).toBeFalsy();
  expect(await evaluate("5 <= 5")).toBeTruthy();
  expect(await evaluate("3 <= 5")).toBeTruthy();

  // expect(await evaluate("3 <= true")).toThrowError();
});

it.skip("should handle < comparisons", async () => {
  expect(await evaluate("5 < 3")).toBeFalsy();
  expect(await evaluate("5 < 5")).toBeFalsy();
  expect(await evaluate("3 < 5")).toBeTruthy();
});

it.skip("should handle >= comparisons", async () => {
  expect(await evaluate("5 >= 3")).toBeTruthy();
  expect(await evaluate("5 >= 5")).toBeTruthy();
  expect(await evaluate("3 >= 5")).toBeFalsy();
});

it.skip("should handle > comparisons", async () => {
  expect(await evaluate("5 > 3")).toBeTruthy();
  expect(await evaluate("5 > 5")).toBeFalsy();
  expect(await evaluate("3 > 5")).toBeFalsy();
});

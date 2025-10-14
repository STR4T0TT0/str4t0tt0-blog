// test unitaire pour src/router/routes.ts
import { describe, it, expect } from "vitest";
import { toCategorySeo, toCategoryInternal, ROUTES } from "@/router/routes";

describe("routes helpers", () => {
  it("maps internal→SEO", () => {
    expect(toCategorySeo("ai")).toBe("artificial-intelligence");
    expect(toCategorySeo("cybersecurity")).toBe("cybersecurity");
    expect(toCategorySeo("crypto")).toBe("cryptocurrency");
  });

  it("maps SEO→internal", () => {
    expect(toCategoryInternal("artificial-intelligence")).toBe("ai");
    expect(toCategoryInternal("cybersecurity")).toBe("cybersecurity");
    expect(toCategoryInternal("cryptocurrency")).toBe("crypto");
  });

  it("builds category URL with lang normalization", () => {
    expect(ROUTES.category("en-US", "ai")).toBe("/en/artificial-intelligence");
    expect(ROUTES.category("fr", "cryptocurrency")).toBe("/fr/cryptocurrency");
  });

  it("builds post URL and encodes slug", () => {
    expect(ROUTES.post("en", "ai", "Intro to PQC: basics & pitfalls")).toBe(
      "/en/artificial-intelligence/Intro%20to%20PQC%3A%20basics%20%26%20pitfalls"
    );
  });
});

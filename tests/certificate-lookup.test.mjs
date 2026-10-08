import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { findCertificate } from "../src/lib/certificate-lookup.ts";

// Test fixtures only; these records are never added to the certificate registry.
const certificate = {
  id: "TEST-001",
  name: "Test Participant",
  team: "Test Team",
  achievement: "Participation in the EYCC '26 Online Qualifications Round",
};

test("a valid ID returns the participant, team, and achievement", () => {
  assert.deepEqual(findCertificate([certificate], "TEST-001"), certificate);
});

test("unknown and partial IDs do not verify", () => {
  for (const id of ["UNKNOWN", "TEST", "TEST-001-extra", "test-001"]) {
    assert.equal(findCertificate([certificate], id), null);
  }
});

test("surrounding whitespace from a pasted ID is ignored", () => {
  assert.deepEqual(findCertificate([certificate], "  TEST-001\n"), certificate);
});

test("an empty registry and blank inputs do not verify", () => {
  assert.equal(findCertificate([], "TEST-001"), null);
  for (const id of ["", " ", "\n\t"]) {
    assert.equal(findCertificate([certificate], id), null);
  }
});

test("numeric-looking IDs retain leading zeroes", () => {
  const record = { ...certificate, id: "000123" };
  assert.deepEqual(findCertificate([record], "000123"), record);
  assert.equal(findCertificate([record], "123"), null);
});

test("participation, qualification, and placement achievements are preserved", () => {
  for (const achievement of [
    "Participation in the EYCC '26 Online Qualifications Round",
    "Qualification for the EYCC ’26 On-Site Final Round",
    "Achieving 1st Place — EYCC ’26 On-Site Final Round",
  ]) {
    const record = { ...certificate, achievement };
    assert.deepEqual(findCertificate([record], record.id), record);
  }
});

test("issued certificates have unique string IDs and complete achievement details", () => {
  const records = JSON.parse(readFileSync(new URL("../src/data/certificates.json", import.meta.url), "utf8"));
  const ids = new Set();
  for (const record of records) {
    for (const field of ["id", "name", "team", "achievement"]) {
      assert.equal(typeof record[field], "string");
      assert.ok(record[field].trim(), `Missing ${field} for ${record.id}`);
    }
    assert.equal(record.id, record.id.trim());
    assert.ok(!ids.has(record.id), `Duplicate ID: ${record.id}`);
    ids.add(record.id);
    assert.deepEqual(findCertificate(records, record.id), record);
    assert.equal("individualRank" in record, false);
    assert.equal("teamRank" in record, false);
  }
});

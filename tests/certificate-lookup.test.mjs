import assert from "node:assert/strict";
import test from "node:test";
import { findCertificate } from "../src/lib/certificate-lookup.ts";

// Test fixtures only; these records are never added to the certificate registry.
const certificate = {
  id: "TEST-001",
  name: "Test Participant",
  team: "Test Team",
  individualRank: 2,
  teamRank: 1,
};

test("a valid ID returns the participant, team, and both ranks", () => {
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

test("text rankings are preserved", () => {
  const record = { ...certificate, individualRank: "Joint 2nd", teamRank: "N/A" };
  assert.deepEqual(findCertificate([record], record.id), record);
});

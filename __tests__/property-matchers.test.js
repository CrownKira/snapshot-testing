Date.now = jest.fn(() => 1482363367071);

it("will fail every time", () => {
  const user = {
    /// test should be deterministic
    createdAt: Date.now,
    id: Math.floor(Math.random() * 20),
    name: "LeBron James",
  };

  /// For these cases, Jest allows providing an asymmetric matcher for any property. These matchers are checked before the snapshot is written or tested, and then saved to the snapshot file instead of the received value:
  /// use expect.any()
  /// so it takes in any date or any number
  expect(user).toMatchInlineSnapshot(
    {
      id: expect.any(Number),
    },
    `
    Object {
      "createdAt": [MockFunction],
      "id": Any<Number>,
      "name": "LeBron James",
    }
  `
  );
});

// Snapshot
exports[`will fail every time 1`] = `
Object {
  "createdAt": 2018-05-19T23:36:09.816Z,
  "id": 3,
  "name": "LeBron James",
}
`;

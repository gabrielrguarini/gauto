describe("Status API", () => {
  it("should return 200 and status ok", async () => {
    const response = await fetch("http://localhost:3000/api/status");
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.connection_status).toEqual("ok");
  });
});

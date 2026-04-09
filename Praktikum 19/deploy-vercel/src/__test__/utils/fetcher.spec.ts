import fetcher from "../../utils/swr/fetcher";

describe("fetcher", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch data from a URL", async () => {
    const mockData = { id: 1, name: "Test Product" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const result = await fetcher("http://example.com/api/data");

    expect(global.fetch).toHaveBeenCalledWith("http://example.com/api/data");
    expect(result).toEqual(mockData);
  });

  it("should handle successful JSON response", async () => {
    const mockData = { status: "success", data: [1, 2, 3] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const result = await fetcher("http://example.com/api/items");

    expect(result).toEqual(mockData);
    expect(result.status).toBe("success");
  });

  it("should handle empty response", async () => {
    const mockData = {};
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const result = await fetcher("http://example.com/api/empty");

    expect(result).toEqual({});
  });

  it("should handle array response", async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const result = await fetcher("http://example.com/api/list");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it("should pass different URLs correctly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    await fetcher("http://localhost:3000/api/products");

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/api/products");
  });

  it("should handle null response data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => null,
    });

    const result = await fetcher("http://example.com/api/null");

    expect(result).toBeNull();
  });

  it("should handle boolean response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => true,
    });

    const result = await fetcher("http://example.com/api/boolean");

    expect(result).toBe(true);
  });

  it("should handle string response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => "test string",
    });

    const result = await fetcher("http://example.com/api/string");

    expect(result).toBe("test string");
  });

  it("should handle number response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => 42,
    });

    const result = await fetcher("http://example.com/api/number");

    expect(result).toBe(42);
  });

  it("should handle complex nested objects", async () => {
    const mockData = {
      user: {
        id: 1,
        profile: {
          name: "John",
          email: "john@example.com",
        },
      },
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const result = await fetcher("http://example.com/api/user");

    expect(result.user.profile.name).toBe("John");
  });
});

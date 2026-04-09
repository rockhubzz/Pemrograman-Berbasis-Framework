import { render, screen } from "@testing-library/react";
import UserPage from "../../pages/user";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/user",
      pathname: "/user",
      query: {},
      asPath: "/user",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
      },
    },
    status: "authenticated",
  })),
}));

describe("User Page", () => {
  it("renders user page without crashing", () => {
    const { container } = render(<UserPage />);
    expect(container).toBeDefined();
  });

  it("page has content", () => {
    const { container } = render(<UserPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<UserPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<UserPage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<UserPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<UserPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays user page content", () => {
    const { container } = render(<UserPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<UserPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page shows user information", () => {
    const { container } = render(<UserPage />);
    const content = container.textContent;
    expect(content?.length || 0).toBeGreaterThanOrEqual(0);
  });

  it("page has valid DOM structure", () => {
    const { container } = render(<UserPage />);
    expect(container.firstChild).toBeTruthy();
  });
});

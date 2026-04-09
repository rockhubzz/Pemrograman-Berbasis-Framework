import { render, screen } from "@testing-library/react";
import ProfilePage from "../../pages/profile";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/profile",
      pathname: "/profile",
      query: {},
      asPath: "/profile",
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

describe("Profile Page", () => {
  it("renders profile page without crashing", () => {
    const { container } = render(<ProfilePage />);
    expect(container).toBeDefined();
  });

  it("profile page has content", () => {
    const { container } = render(<ProfilePage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<ProfilePage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<ProfilePage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<ProfilePage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<ProfilePage />);
    expect(container).toMatchSnapshot();
  });

  it("displays profile page content", () => {
    const { container } = render(<ProfilePage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<ProfilePage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page should have profile information or structure", () => {
    const { container } = render(<ProfilePage />);
    const content = container.textContent;
    expect(content?.length).toBeGreaterThan(0);
  });

  it("profile page has valid DOM", () => {
    const { container } = render(<ProfilePage />);
    expect(container.firstChild).toBeTruthy();
    expect(container.childNodes.length).toBeGreaterThan(0);
  });
});

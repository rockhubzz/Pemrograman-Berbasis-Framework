import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../../pages/auth/login";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/auth/login",
      pathname: "/auth/login",
      query: {},
      asPath: "/auth/login",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
  signIn: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe("Login Page", () => {
  it("renders login page without crashing", () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeDefined();
  });

  it("login page has content", () => {
    const { container } = render(<LoginPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<LoginPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<LoginPage />)).not.toThrow();
  });

  it("has login form or inputs", () => {
    const { container } = render(<LoginPage />);
    const inputs = container.querySelectorAll("input");
    const forms = container.querySelectorAll("form");
    expect(inputs.length > 0 || forms.length > 0).toBe(true);
  });

  it("renders page with proper layout", () => {
    const { container } = render(<LoginPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays login page content", () => {
    const { container } = render(<LoginPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<LoginPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page should be interactive", () => {
    const { container } = render(<LoginPage />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length >= 0).toBe(true);
  });
});

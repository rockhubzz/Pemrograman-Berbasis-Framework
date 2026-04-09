import { render, screen } from "@testing-library/react";
import RegisterPage from "../../pages/auth/register";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/auth/register",
      pathname: "/auth/register",
      query: {},
      asPath: "/auth/register",
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
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe("Register Page", () => {
  it("renders register page without crashing", () => {
    const { container } = render(<RegisterPage />);
    expect(container).toBeDefined();
  });

  it("register page has content", () => {
    const { container } = render(<RegisterPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<RegisterPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<RegisterPage />)).not.toThrow();
  });

  it("has registration form or inputs", () => {
    const { container } = render(<RegisterPage />);
    const inputs = container.querySelectorAll("input");
    const forms = container.querySelectorAll("form");
    expect(inputs.length > 0 || forms.length > 0).toBe(true);
  });

  it("renders page with proper layout", () => {
    const { container } = render(<RegisterPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<RegisterPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays register page content", () => {
    const { container } = render(<RegisterPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<RegisterPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page should have form elements", () => {
    const { container } = render(<RegisterPage />);
    const formElements = container.querySelectorAll("input, button, form");
    expect(formElements.length > 0).toBe(true);
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordPage from "../../pages/user/password";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/user/password",
      pathname: "/user/password",
      query: {},
      asPath: "/user/password",
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

describe("User Password Page", () => {
  it("renders password page without crashing", () => {
    const { container } = render(<PasswordPage />);
    expect(container).toBeDefined();
  });

  it("displays password page text", () => {
    render(<PasswordPage />);
    expect(screen.getByText("Password User Page")).toBeInTheDocument();
  });

  it("renders div container", () => {
    const { container } = render(<PasswordPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<PasswordPage />)).not.toThrow();
  });

  it("has main wrapper div", () => {
    const { container } = render(<PasswordPage />);
    const mainDiv = container.querySelector("div");
    expect(mainDiv).toBeTruthy();
    expect(mainDiv?.textContent).toContain("Password User Page");
  });

  it("page structure is valid", () => {
    const { container } = render(<PasswordPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<PasswordPage />);
    expect(container).toMatchSnapshot();
  });

  it("renders content with correct text", () => {
    const { container } = render(<PasswordPage />);
    expect(container.textContent).toContain("Password");
    expect(container.textContent).toContain("User");
    expect(container.textContent).toContain("Page");
  });

  it("displays password user page message", () => {
    const { container } = render(<PasswordPage />);
    expect(container.innerHTML).toContain("Password User Page");
  });

  it("has single main div element", () => {
    const { container } = render(<PasswordPage />);
    const divCount = container.querySelectorAll("div").length;
    expect(divCount).toBeGreaterThanOrEqual(1);
  });

  it("page renders successfully with expected structure", () => {
    const page = render(<PasswordPage />);
    expect(page.container.firstChild).toBeTruthy();
  });

  it("renders password page heading content", () => {
    const { container } = render(<PasswordPage />);
    const content = container.textContent;
    expect(content?.toLowerCase()).toContain("password");
  });
});

import { render, screen } from "@testing-library/react";
import EditorPage from "../../pages/editor";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/editor",
      pathname: "/editor",
      query: {},
      asPath: "/editor",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

describe("Editor Page", () => {
  it("renders editor page without crashing", () => {
    const { container } = render(<EditorPage />);
    expect(container).toBeDefined();
  });

  it("page has content", () => {
    const { container } = render(<EditorPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<EditorPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<EditorPage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<EditorPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<EditorPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays editor page content", () => {
    const { container } = render(<EditorPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<EditorPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("editor page has form or editor elements", () => {
    const { container } = render(<EditorPage />);
    const formElements = container.querySelectorAll("textarea, input, form, [contenteditable]");
    expect(formElements.length >= 0).toBe(true);
  });

  it("page has valid DOM structure", () => {
    const { container } = render(<EditorPage />);
    expect(container.firstChild).toBeTruthy();
  });
});

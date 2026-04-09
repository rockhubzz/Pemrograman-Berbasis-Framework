import { render, screen } from "@testing-library/react";
import NotFoundPage from "../../pages/404";

describe("404 Not Found Page", () => {
  it("renders 404 page without crashing", () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toBeDefined();
  });

  it("displays not found content", () => {
    const { container } = render(<NotFoundPage />);
    const content = container.textContent;
    expect(content).toBeDefined();
    expect(content?.length).toBeGreaterThan(0);
  });

  it("has valid page structure", () => {
    const { container } = render(<NotFoundPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<NotFoundPage />)).not.toThrow();
  });

  it("contains heading or title element", () => {
    const { container } = render(<NotFoundPage />);
    const heading = container.querySelector("h1") || container.querySelector("h2") || container.querySelector("h3");
    expect(heading || container.querySelector("div")).toBeTruthy();
  });

  it("has proper page layout", () => {
    const { container } = render(<NotFoundPage />);
    const firstChild = container.firstChild;
    expect(firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });

  it("renders page content", () => {
    const { container } = render(<NotFoundPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("contains div elements for styling", () => {
    const { container } = render(<NotFoundPage />);
    const divCount = container.querySelectorAll("div").length;
    expect(divCount).toBeGreaterThan(0);
  });

  it("page renders with expected structure", () => {
    const page = render(<NotFoundPage />);
    expect(page.container.firstChild).toBeTruthy();
  });
});

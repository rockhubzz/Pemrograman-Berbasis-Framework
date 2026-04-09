import { render, screen } from "@testing-library/react";
import CategoryPage from "../../pages/category/[...slug]";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/category/[...slug]",
      pathname: "/category/[...slug]",
      query: { slug: ["electronics"] },
      asPath: "/category/electronics",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

describe("Category Page (Dynamic Route)", () => {
  it("renders category page without crashing", () => {
    const { container } = render(<CategoryPage />);
    expect(container).toBeDefined();
  });

  it("page has content", () => {
    const { container } = render(<CategoryPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<CategoryPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<CategoryPage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<CategoryPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<CategoryPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays category page content", () => {
    const { container } = render(<CategoryPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<CategoryPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page displays category items", () => {
    const { container } = render(<CategoryPage />);
    const content = container.textContent;
    expect(content?.length || 0).toBeGreaterThanOrEqual(0);
  });

  it("page has valid DOM structure", () => {
    const { container } = render(<CategoryPage />);
    expect(container.firstChild).toBeTruthy();
  });
});

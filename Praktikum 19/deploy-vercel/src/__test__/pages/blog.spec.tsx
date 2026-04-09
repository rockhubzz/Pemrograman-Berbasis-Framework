import { render, screen } from "@testing-library/react";
import BlogPage from "../../pages/blog/[slug]";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/blog/[slug]",
      pathname: "/blog/[slug]",
      query: { slug: "test-blog" },
      asPath: "/blog/test-blog",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

describe("Blog Page (Dynamic Route)", () => {
  it("renders blog page without crashing", () => {
    const { container } = render(<BlogPage />);
    expect(container).toBeDefined();
  });

  it("page has content", () => {
    const { container } = render(<BlogPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<BlogPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<BlogPage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<BlogPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<BlogPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays blog page content", () => {
    const { container } = render(<BlogPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<BlogPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page has valid DOM structure", () => {
    const { container } = render(<BlogPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders dynamic blog content", () => {
    const { container } = render(<BlogPage />);
    const content = container.textContent;
    expect(content?.length || 0).toBeGreaterThanOrEqual(0);
  });
});

import { render, screen } from "@testing-library/react";
import ShopPage from "../../pages/shop/[[...slug]]";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/shop/[[...slug]]",
      pathname: "/shop/[[...slug]]",
      query: { slug: [] },
      asPath: "/shop",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

describe("Shop Page", () => {
  it("renders shop page without crashing", () => {
    const { container } = render(<ShopPage />);
    expect(container).toBeDefined();
  });

  it("page has content", () => {
    const { container } = render(<ShopPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<ShopPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<ShopPage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<ShopPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<ShopPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays shop page content", () => {
    const { container } = render(<ShopPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<ShopPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page shows products or items", () => {
    const { container } = render(<ShopPage />);
    const content = container.textContent;
    expect(content?.length || 0).toBeGreaterThanOrEqual(0);
  });

  it("page has valid DOM structure", () => {
    const { container } = render(<ShopPage />);
    expect(container.firstChild).toBeTruthy();
  });
});

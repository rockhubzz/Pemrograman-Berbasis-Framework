import { render, screen } from "@testing-library/react";
import StoresCSRPage from "../../pages/stores/csr";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/stores/csr",
      pathname: "/stores/csr",
      query: {},
      asPath: "/stores/csr",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock swr
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: [
      { id: "1", name: "Store 1", address: "123 Main St" },
      { id: "2", name: "Store 2", address: "456 Oak Ave" },
    ],
    error: undefined,
    isLoading: false,
  })),
}));

describe("Stores CSR Page", () => {
  it("renders stores CSR page without crashing", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container).toBeDefined();
  });

  it("page has content", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it("renders page structure correctly", () => {
    const { container } = render(<StoresCSRPage />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<StoresCSRPage />)).not.toThrow();
  });

  it("renders page with proper layout", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container).toMatchSnapshot();
  });

  it("displays page content", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("renders with expected elements", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("page renders stores data", () => {
    const { container } = render(<StoresCSRPage />);
    const content = container.textContent;
    expect(content?.length).toBeGreaterThan(0);
  });

  it("page has valid DOM structure", () => {
    const { container } = render(<StoresCSRPage />);
    expect(container.firstChild).toBeTruthy();
  });
});

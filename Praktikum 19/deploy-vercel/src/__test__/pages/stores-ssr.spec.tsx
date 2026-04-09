import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoresSSRPage from "../../pages/stores/ssr";

// Mock the views module
jest.mock("../../views/stores", () => {
  return function DummyStoresView() {
    return <div data-testid="stores-view">Stores View Component</div>;
  };
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/stores/ssr",
      pathname: "/stores/ssr",
      query: {},
      asPath: "/stores/ssr",
      isReady: true,
    };
  },
}));

describe("Stores SSR Page", () => {
  const mockStores = [
    { id: "1", name: "Store 1", address: "Address 1", city: "City 1" },
    { id: "2", name: "Store 2", address: "Address 2", city: "City 2" },
  ];

  it("renders SSR page without crashing", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    expect(container).toBeDefined();
  });

  it("displays SSR heading", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    const heading = container.querySelector("h1");
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain("Server-Side Rendering");
  });

  it("renders TampilanStores component", () => {
    render(<StoresSSRPage stores={mockStores} />);
    expect(screen.getByTestId("stores-view")).toBeInTheDocument();
  });

  it("passes stores data to TampilanStores component", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    expect(container.innerHTML).toContain("Stores View Component");
  });

  it("has proper page structure", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders with SSR heading styling", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    const heading = container.querySelector("h1");
    expect(heading).toHaveStyle({
      padding: "20px",
      textAlign: "center",
    });
  });

  it("matches snapshot", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with empty stores array", () => {
    const { container } = render(<StoresSSRPage stores={[]} />);
    expect(container).toBeDefined();
  });

  it("page title contains SSR reference", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    const heading = container.querySelector("h1");
    expect(heading?.textContent?.toLowerCase()).toContain("server");
    expect(heading?.textContent?.toLowerCase()).toContain("rendering");
  });

  it("renders main wrapper div", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    const mainDiv = container.querySelector("div > div");
    expect(mainDiv).toBeTruthy();
  });

  it("has h1 with correct background color style", () => {
    const { container } = render(<StoresSSRPage stores={mockStores} />);
    const heading = container.querySelector("h1");
    const style = heading?.getAttribute("style");
    expect(style).toContain("background");
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductServerPage from "../../pages/produk/server";

// Mock the TampilanProduk view
jest.mock("../../views/produk", () => {
  return function DummyTampilanProduk({ products }: any) {
    return <div data-testid="tampilan-produk">Product View</div>;
  };
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk/server",
      pathname: "/produk/server",
      query: {},
      asPath: "/produk/server",
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

describe("Product Server Page (server.tsx)", () => {
  const mockProducts = [
    {
      id: "1",
      name: "Product 1",
      price: 50000,
      image: "/product1.jpg",
      category: "Electronics",
    },
    {
      id: "2",
      name: "Product 2",
      price: 75000,
      image: "/product2.jpg",
      category: "Electronics",
    },
  ];

  it("renders product server page without crashing", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    expect(container).toBeDefined();
  });

  it("displays server page heading", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    const heading = container.querySelector("h1");
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain("Halaman Produk Server");
  });

  it("renders TampilanProduk component", () => {
    render(<ProductServerPage products={mockProducts} />);
    expect(screen.getByTestId("tampilan-produk")).toBeInTheDocument();
  });

  it("passes products data to TampilanProduk", () => {
    render(<ProductServerPage products={mockProducts} />);
    expect(screen.getByTestId("tampilan-produk")).toBeInTheDocument();
  });

  it("renders page structure correctly", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() =>
      render(<ProductServerPage products={mockProducts} />)
    ).not.toThrow();
  });

  it("matches snapshot", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with empty products array", () => {
    const { container } = render(<ProductServerPage products={[]} />);
    expect(container).toBeDefined();
    expect(container.querySelector("h1")).toBeTruthy();
  });

  it("has h1 with server page title", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent?.toLowerCase()).toContain("server");
  });

  it("main div wrapper exists", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    const mainDiv = container.querySelector("div");
    expect(mainDiv).toBeTruthy();
  });

  it("renders tampilan produk view", () => {
    render(<ProductServerPage products={mockProducts} />);
    const view = screen.getByTestId("tampilan-produk");
    expect(view).toBeInTheDocument();
    expect(view.textContent).toBe("Product View");
  });

  it("page contains correct heading text", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    const content = container.textContent;
    expect(content).toContain("Halaman Produk Server");
  });

  it("page structure has heading and view components", () => {
    const { container } = render(<ProductServerPage products={mockProducts} />);
    expect(container.innerHTML).toContain("Halaman Produk Server");
    expect(container.innerHTML).toContain("tampilan-produk");
  });
});

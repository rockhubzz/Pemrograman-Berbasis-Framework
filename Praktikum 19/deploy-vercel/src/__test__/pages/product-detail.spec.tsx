import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetailPage from "../../pages/produk/[produk]";

// Mock the DetailProduct view
jest.mock("../../views/DetailProduct", () => {
  return function DummyDetailProduct({ products }: any) {
    return (
      <div data-testid="detail-product-view">
        {products && (
          <div>
            <h2>{products.name}</h2>
            <p>Price: {products.price}</p>
          </div>
        )}
      </div>
    );
  };
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk/[produk]",
      pathname: "/produk/[produk]",
      query: { produk: "1" },
      asPath: "/produk/1",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

describe("Product Detail Page ([produk].tsx)", () => {
  const mockProduct = {
    id: "1",
    name: "Sample Product",
    price: 99999,
    image: "/sample.jpg",
    category: "Electronics",
    description: "A sample product description",
  };

  it("renders product detail page without crashing", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    expect(container).toBeDefined();
  });

  it("renders DetailProduk component", () => {
    render(<ProductDetailPage product={mockProduct} />);
    expect(screen.getByTestId("detail-product-view")).toBeInTheDocument();
  });

  it("passes product data to DetailProduk component", () => {
    render(<ProductDetailPage product={mockProduct} />);
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText(/Price/)).toBeInTheDocument();
  });

  it("renders page structure correctly", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() =>
      render(<ProductDetailPage product={mockProduct} />)
    ).not.toThrow();
  });

  it("displays product information", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    expect(container.textContent).toContain("Sample Product");
    expect(container.textContent).toContain("99999");
  });

  it("matches snapshot", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with empty product data", () => {
    const emptyProduct = {
      id: "",
      name: "",
      price: 0,
      image: "",
      category: "",
      description: "",
    };
    const { container } = render(<ProductDetailPage product={emptyProduct} />);
    expect(container).toBeDefined();
  });

  it("main wrapper div exists", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    const mainDiv = container.querySelector("div > div");
    expect(mainDiv).toBeTruthy();
  });

  it("renders product detail view section", () => {
    render(<ProductDetailPage product={mockProduct} />);
    const view = screen.getByTestId("detail-product-view");
    expect(view).toBeInTheDocument();
    expect(view.textContent).toContain("Sample Product");
  });

  it("page contains product details", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    const content = container.textContent;
    expect(content).toContain("Sample Product");
    expect(content).toContain("99999");
  });

  it("renders component with provided product props", () => {
    const { container } = render(<ProductDetailPage product={mockProduct} />);
    expect(container.innerHTML).toContain("detail-product-view");
  });
});

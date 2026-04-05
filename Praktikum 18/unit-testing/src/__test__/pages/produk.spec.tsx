import { render, screen } from "@testing-library/react";
import KategoriPage from "@/pages/produk";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk",
      pathname: "/produk",
      query: {},
      asPath: "/produk",
      push: jest.fn(),
      event: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    };
  },
}));

// Mock next/image (WAJIB di Next.js test)
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

// Mock next/link
jest.mock("next/link", () => {
  return ({ children }: any) => children;
});

// Default mock for useSWR
let swrReturnValue: any = {
  data: {
    data: [
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
    ],
  },
  error: undefined,
  isLoading: false,
};

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(() => swrReturnValue),
}));

describe("Product Page", () => {
  afterEach(() => {
    // Reset to default mock return value
    swrReturnValue = {
      data: {
        data: [
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
        ],
      },
      error: undefined,
      isLoading: false,
    };
  });

  it("renders product page with products correctly", () => {
    const page = render(<KategoriPage />);
    expect(page).toMatchSnapshot();
  });

  it("displays product list title", () => {
    render(<KategoriPage />);
    const titleElement = screen.getByText("Daftar Produk");
    expect(titleElement).toBeTruthy();
  });

  it("should have correct title text using toBe", () => {
    const { container } = render(<KategoriPage />);
    const title = container.querySelector("h1");
    expect(title?.textContent).toBe("Daftar Produk");
  });

  it("should render product title with getByTestId", () => {
    render(<KategoriPage />);
    const productTitle = screen.getByTestId("product-title");
    expect(productTitle.textContent).toBe("Daftar Produk");
  });

  it("should display skeleton loading state when isLoading is true", () => {
    swrReturnValue = {
      data: undefined,
      error: undefined,
      isLoading: true,
    };

    const { container } = render(<KategoriPage />);
    const skeletonElements = container.querySelectorAll(
      ".produk__content__skeleton"
    );
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should render empty skeleton when data is empty", () => {
    swrReturnValue = {
      data: {
        data: [],
      },
      error: undefined,
      isLoading: false,
    };

    const { container } = render(<KategoriPage />);
    const skeletonElements = container.querySelectorAll(
      ".produk__content__skeleton"
    );
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("should render multiple products in the list", () => {
    swrReturnValue = {
      data: {
        data: [
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
          {
            id: "3",
            name: "Product 3",
            price: 100000,
            image: "/product3.jpg",
            category: "Furniture",
          },
        ],
      },
      error: undefined,
      isLoading: false,
    };

    render(<KategoriPage />);
    expect(screen.getByText("Product 1")).toBeTruthy();
    expect(screen.getByText("Product 2")).toBeTruthy();
    expect(screen.getByText("Product 3")).toBeTruthy();
  });

  it("should render product details correctly", () => {
  render(<KategoriPage />);

  expect(screen.getByText("Product 1")).toBeTruthy();
  expect(screen.getByText("Electronics")).toBeTruthy();
  expect(screen.getByText(/Rp/)).toBeTruthy();
});

it("should render correct number of products", () => {
  render(<KategoriPage />);

  const products = screen.getAllByText(/Product/);
  expect(products.length).toBeGreaterThanOrEqual(2);
});

it("should handle error state gracefully", () => {
  swrReturnValue = {
    data: undefined,
    error: true,
    isLoading: false,
  };

  const { container } = render(<KategoriPage />);
  expect(container).toBeTruthy(); // minimal tidak crash
});

it("should show skeleton when no products", () => {
  swrReturnValue = {
    data: { data: [] },
    error: undefined,
    isLoading: false,
  };

  const { container } = render(<KategoriPage />);
  expect(
    container.querySelector(".produk__content__skeleton")
  ).toBeTruthy();
});
});
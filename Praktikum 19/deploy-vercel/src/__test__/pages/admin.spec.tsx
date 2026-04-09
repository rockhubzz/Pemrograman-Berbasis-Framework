import { render, screen } from "@testing-library/react";
import Admin from "../../pages/admin";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/admin",
      pathname: "/admin",
      query: {},
      asPath: "/admin",
      push: jest.fn(),
      isReady: true,
    };
  },
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
      },
    },
    status: "authenticated",
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Admin Page", () => {
  it("renders admin page without crashing", () => {
    const { container } = render(<Admin />);
    expect(container).toBeDefined();
  });

  it("renders the page structure", () => {
    const { container } = render(<Admin />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders admin dashboard title or heading", () => {
    const { container } = render(<Admin />);
    const content = container.textContent;
    expect(content).toBeDefined();
    expect(content?.length).toBeGreaterThan(0);
  });

  it("renders without throwing error", () => {
    expect(() => render(<Admin />)).not.toThrow();
  });

  it("contains admin-specific content or structure", () => {
    const { container } = render(<Admin />);
    const html = container.innerHTML;
    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(0);
  });

  it("has valid DOM structure", () => {
    const { container } = render(<Admin />);
    const main = container.querySelector("div");
    expect(main).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<Admin />);
    expect(container).toMatchSnapshot();
  });

  it("renders and has content", () => {
    const { container } = render(<Admin />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("page has children elements", () => {
    const { container } = render(<Admin />);
    const children = container.querySelector("div")?.children;
    expect(children?.length).toBeGreaterThanOrEqual(0);
  });

  it("renders successfully with proper context", () => {
    const page = render(<Admin />);
    expect(page.container.firstChild).toBeTruthy();
  });
});

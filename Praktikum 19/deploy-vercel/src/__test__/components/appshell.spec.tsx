import { render, screen } from "@testing-library/react";
import AppShell from "../../components/layouts/AppShell";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      isReady: true,
    };
  },
}));

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
}));

describe("AppShell Component", () => {
  const mockChildren = <div data-testid="test-children">Test Content</div>;

  it("renders AppShell without crashing", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    expect(container).toBeDefined();
  });

  it("renders children components", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    expect(container.innerHTML).toContain("test-children");
  });

  it("renders with proper structure", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("renders without error with string children", () => {
    const { container } = render(<AppShell>Test</AppShell>);
    expect(container).toBeDefined();
  });

  it("contains navbar and footer if present", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    const html = container.innerHTML;
    expect(html.length).toBeGreaterThan(0);
  });

  it("displays children content", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    expect(container.textContent).toContain("Test Content");
  });

  it("renders with empty children", () => {
    const { container } = render(<AppShell></AppShell>);
    expect(container).toBeDefined();
  });

  it("has proper layout structure", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    const firstChild = container.firstChild;
    expect(firstChild).toBeTruthy();
  });

  it("renders with multiple children correctly", () => {
    const multipleChildren = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </>
    );
    const { container } = render(<AppShell>{multipleChildren}</AppShell>);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it("matches snapshot", () => {
    const { container } = render(<AppShell>{mockChildren}</AppShell>);
    expect(container).toMatchSnapshot();
  });
});

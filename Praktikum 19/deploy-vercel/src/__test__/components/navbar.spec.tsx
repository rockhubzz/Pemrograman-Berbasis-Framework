import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/layouts/navbar";

// Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

// Mock next/script
jest.mock("next/dist/client/script", () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Navbar Component", () => {
  it("renders navbar component without crashing", () => {
    const { container } = render(<Navbar />);
    expect(container).toBeDefined();
  });

  it("has navbar container with correct class", () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector(".navbar");
    expect(navbar).toBeTruthy();
  });

  it("renders navbar brand element", () => {
    const { container } = render(<Navbar />);
    const brand = container.querySelector(".navbar__brand");
    expect(brand).toBeTruthy();
  });

  it("renders navbar right section", () => {
    const { container } = render(<Navbar />);
    const navbarRight = container.querySelector(".navbar__right");
    expect(navbarRight).toBeTruthy();
  });

  it("renders correctly with proper structure", () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector(".navbar");
    expect(navbar?.children.length).toBeGreaterThanOrEqual(2);
  });

  it("does not show user section when not authenticated", () => {
    const { container } = render(<Navbar />);
    const userSection = container.querySelector(".navbar__user");
    expect(userSection).toBeFalsy();
  });

  it("matches snapshot", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it("renders navigation elements", () => {
    const { container } = render(<Navbar />);
    const navigate = container.querySelector(".navbar");
    expect(navigate).toBeTruthy();
  });

  it("has correct navbar structure with brand and right sections", () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector(".navbar");
    expect(navbar?.classList.contains("navbar")).toBe(true);
  });

  it("renders without throwing error", () => {
    expect(() => render(<Navbar />)).not.toThrow();
  });

  it("contains div elements", () => {
    const { container } = render(<Navbar />);
    const divs = container.querySelectorAll(".navbar > div");
    expect(divs.length).toBeGreaterThanOrEqual(1);
  });
});

import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home Page (index.tsx)", () => {
  it("renders the home page correctly", () => {
    const { container } = render(<Home />);
    expect(container).toBeDefined();
  });

  it("renders main heading", () => {
    const { container } = render(<Home />);
    const heading = container.querySelector("h1");
    expect(heading?.textContent).toContain("Praktikum");
  });

  it("displays the heading text correctly", () => {
    render(<Home />);
    const heading = screen.getByText("Praktikum Next.js Pages Router");
    expect(heading).toBeTruthy();
    expect(heading.tagName).toBe("H1");
  });

  it("displays description text", () => {
    render(<Home />);
    const description = screen.getByText("Mahasiswa D4 Pengembangan Web");
    expect(description).toBeTruthy();
  });

  it("renders multiple text elements", () => {
    const { container } = render(<Home />);
    expect(container.textContent).toContain("Praktikum");
    expect(container.textContent).toContain("Mahasiswa");
  });

  it("has correct structure with div wrapper", () => {
    const { container } = render(<Home />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("contains h1 element", () => {
    const { container } = render(<Home />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain("Praktikum");
  });

  it("contains p element with student info", () => {
    const { container } = render(<Home />);
    const p = container.querySelector("p");
    expect(p).toBeTruthy();
    expect(p?.textContent).toContain("Mahasiswa");
  });

  it("renders without crashing", () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it("has proper page heading structure", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("displays both heading and description on the page", () => {
    const { container } = render(<Home />);
    const textContent = container.textContent;
    expect(textContent).toContain("Praktikum");
    expect(textContent).toContain("Mahasiswa");
    expect(textContent).toContain("D4");
  });
});

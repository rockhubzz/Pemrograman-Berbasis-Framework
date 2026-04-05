import { render, screen } from "@testing-library/react";
import Footer from "@/components/layouts/footer";

describe("Footer Component", () => {
  it("renders footer component correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("displays footer component text", () => {
    render(<Footer />);
    const footerText = screen.getByText("Footer Component");
    expect(footerText.textContent?.trim()).toBe("Footer Component");
  });

  it("footer div should have correct test id", () => {
    render(<Footer />);
    const footerDiv = screen.getByTestId("footer-container");
    expect(footerDiv.className).toBe("footer");
  });
});

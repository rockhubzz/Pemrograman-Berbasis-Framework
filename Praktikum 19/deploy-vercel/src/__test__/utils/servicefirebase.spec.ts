import "@testing-library/jest-dom";
import bcrypt from "bcrypt";
import {
  retrieveProducts,
  retrieveProductById,
  signUp,
  signIn,
  signInWithGoogle,
  signInWithGithub,
} from "../../utils/db/servicefirebase";

// Mock Firebase Firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

// Mock bcrypt
jest.mock("bcrypt");

// Mock Firebase app
jest.mock("../../utils/db/firebase", () => ({
  __esModule: true,
  default: { name: "[DEFAULT]" },
}));

import {
  collection as mockCollection,
  getDocs as mockGetDocs,
  getDoc as mockGetDoc,
  doc as mockDoc,
  query as mockQuery,
  where as mockWhere,
  addDoc as mockAddDoc,
  updateDoc as mockUpdateDoc,
} from "firebase/firestore";

describe("Firebase Service Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("retrieveProducts", () => {
    it("should retrieve all products from a collection", async () => {
      const mockProducts = [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 2", price: 200 },
      ];

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockProducts.map((p) => ({
          id: p.id,
          data: () => ({ name: p.name, price: p.price }),
        })),
      });

      const result = await retrieveProducts("products");

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Product 1");
    });

    it("should handle empty product collection", async () => {
      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [],
      });

      const result = await retrieveProducts("products");

      expect(result).toEqual([]);
    });

    it("should map product documents correctly with ID", async () => {
      const mockDoc = {
        id: "prod-1",
        data: () => ({ name: "Electronics", price: 999 }),
      };

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [mockDoc],
      });

      const result = await retrieveProducts("products");

      expect(result[0]).toHaveProperty("id", "prod-1");
      expect(result[0]).toHaveProperty("name", "Electronics");
      expect(result[0]).toHaveProperty("price", 999);
    });

    it("should call collection with correct parameters", async () => {
      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });

      await retrieveProducts("items");

      expect(mockCollection).toHaveBeenCalled();
    });

    it("should handle multiple products", async () => {
      const mockDocs = Array.from({ length: 5 }, (_, i) => ({
        id: `prod-${i}`,
        data: () => ({ name: `Product ${i}`, price: 100 * (i + 1) }),
      }));

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockDocs,
      });

      const result = await retrieveProducts("products");

      expect(result).toHaveLength(5);
    });
  });

  describe("retrieveProductById", () => {
    it("should retrieve a product by ID", async () => {
      const mockProduct = {
        id: "1",
        name: "Product 1",
        price: 100,
      };

      (mockGetDoc as jest.Mock).mockResolvedValueOnce({
        data: () => mockProduct,
      });

      const result = await retrieveProductById("products", "1");

      expect(result).toEqual(mockProduct);
    });

    it("should return undefined for non-existent product", async () => {
      (mockGetDoc as jest.Mock).mockResolvedValueOnce({
        data: () => undefined,
      });

      const result = await retrieveProductById("products", "non-existent");

      expect(result).toBeUndefined();
    });

    it("should call doc with collection and ID", async () => {
      (mockGetDoc as jest.Mock).mockResolvedValueOnce({
        data: () => ({}),
      });

      await retrieveProductById("products", "prod-123");

      expect(mockDoc).toHaveBeenCalled();
    });

    it("should handle product with all properties", async () => {
      const mockProduct = {
        id: "prod-1",
        name: "Laptop",
        price: 5000,
        description: "High-end laptop",
        category: "Electronics",
      };

      (mockGetDoc as jest.Mock).mockResolvedValueOnce({
        data: () => mockProduct,
      });

      const result = await retrieveProductById("products", "prod-1");

      expect(result.description).toBe("High-end laptop");
      expect(result.category).toBe("Electronics");
    });
  });

  describe("signUp", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        email: "newuser@example.com",
        fullname: "New User",
        password: "password123",
      };

      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signUp(userData, callback);

      expect(callback).toHaveBeenCalledWith({
        status: "success",
        message: "User registered successfully",
      });
    });

    it("should reject duplicate email registration", async () => {
      const userData = {
        email: "existing@example.com",
        fullname: "Test User",
        password: "password123",
      };

      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: "user-existing",
            data: () => userData,
          },
        ],
      });

      await signUp(userData, callback);

      expect(callback).toHaveBeenCalledWith({
        status: "error",
        message: "User already exists",
      });
    });

    it("should hash password before storing", async () => {
      const userData = {
        email: "user@example.com",
        fullname: "User",
        password: "plaintext",
      };

      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashed");
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signUp(userData, callback);

      expect(bcrypt.hash).toHaveBeenCalledWith("plaintext", 10);
    });

    it("should set role to member for new users", async () => {
      const userData = {
        email: "user@example.com",
        fullname: "User",
        password: "password",
      };

      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashed");
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signUp(userData, callback);

      expect(userData.role).toBe("member");
    });

    it("should handle registration errors", async () => {
      const userData = {
        email: "user@example.com",
        fullname: "User",
        password: "password",
      };

      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashed");
      (mockAddDoc as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      await signUp(userData, callback);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "error",
          message: expect.stringContaining("Failed to register user"),
        })
      );
    });

    it("should handle missing optional role field", async () => {
      const userData = {
        email: "newuser@example.com",
        fullname: "Test User",
        password: "password123",
      };

      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashed");
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signUp(userData, callback);

      expect(userData).toHaveProperty("role", "member");
    });
  });

  describe("signIn", () => {
    it("should sign in existing user", async () => {
      const mockUser = {
        id: "user-1",
        email: "user@example.com",
        fullname: "User",
      };

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: mockUser.id,
            data: () => ({ email: mockUser.email, fullname: mockUser.fullname }),
          },
        ],
      });

      const result = await signIn("user@example.com");

      expect(result).toHaveProperty("id", "user-1");
      expect(result).toHaveProperty("email", "user@example.com");
    });

    it("should return undefined for non-existent user", async () => {
      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });

      const result = await signIn("nonexistent@example.com");

      // signIn returns data[0] which is undefined for empty array
      expect(result).toBeUndefined();
    });

    it("should query by email", async () => {
      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });

      await signIn("test@example.com");

      expect(mockQuery).toHaveBeenCalled();
    });

    it("should handle user with additional properties", async () => {
      const mockUser = {
        id: "user-1",
        email: "user@example.com",
        fullname: "User",
        role: "admin",
      };

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: mockUser.id,
            data: () => mockUser,
          },
        ],
      });

      const result = await signIn("user@example.com");

      expect(result).toBeDefined();
      expect(result?.role).toBe("admin");
    });
  });

  describe("signInWithGoogle", () => {
    it("should call signInWithOAuth with Google provider", async () => {
      const userData = { email: "user@gmail.com", name: "User" };
      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signInWithGoogle(userData, callback);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          status: true,
          message: expect.stringContaining("Google"),
        })
      );
    });

    it("should set role to member for new Google user", async () => {
      const userData = { email: "user@gmail.com", name: "User" };
      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signInWithGoogle(userData, callback);

      expect(userData.role).toBe("member");
    });
  });

  describe("signInWithGithub", () => {
    it("should call signInWithOAuth with GitHub provider", async () => {
      const userData = { email: "user@github.com", name: "User" };
      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signInWithGithub(userData, callback);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          status: true,
          message: expect.stringContaining("GitHub"),
        })
      );
    });

    it("should set role to member for new GitHub user", async () => {
      const userData = { email: "user@github.com", name: "User" };
      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
      (mockAddDoc as jest.Mock).mockResolvedValueOnce({ id: "user-1" });

      await signInWithGithub(userData, callback);

      expect(userData.role).toBe("member");
    });
  });

  describe("OAuth User Updates", () => {
    it("should update existing OAuth user data", async () => {
      const userData = { email: "oauth@example.com", name: "User" };
      const callback = jest.fn();
      const existingUser = { id: "user-1", role: "admin" };

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: existingUser.id,
            data: () => existingUser,
          },
        ],
      });
      (mockUpdateDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await signInWithGoogle(userData, callback);

      expect(mockUpdateDoc).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it("should preserve existing user role when updating", async () => {
      const userData = { email: "oauth@example.com", name: "User" };
      const callback = jest.fn();
      const existingUser = { id: "user-1", role: "moderator" };

      (mockGetDocs as jest.Mock).mockResolvedValueOnce({
        docs: [
          {
            id: existingUser.id,
            data: () => existingUser,
          },
        ],
      });
      (mockUpdateDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await signInWithGoogle(userData, callback);

      expect(userData.role).toBe("moderator");
    });

    it("should handle OAuth errors", async () => {
      const userData = { email: "oauth@example.com", name: "User" };
      const callback = jest.fn();

      (mockGetDocs as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      await signInWithGoogle(userData, callback);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          status: false,
          message: expect.stringContaining("Google"),
        })
      );
    });
  });
});

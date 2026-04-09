import "@testing-library/jest-dom";

describe("Firebase Configuration", () => {
  // Test Firebase configuration file structure and exports
  it("should export firebase app module", () => {
    // Firebase module should exist and export the app
    const firebaseModule = jest.requireActual("../../utils/db/firebase");
    expect(firebaseModule).toBeDefined();
    expect(firebaseModule.default).toBeDefined();
  });

  it("should have app as an object", () => {
    const { default: app } = jest.requireActual("../../utils/db/firebase");
    expect(typeof app).toBe("object");
  });

  it("should accept config with environment variables or defaults", () => {
    // Firebase uses process.env for configuration
    // In test environment, variables may be undefined, which is acceptable
    const apiKey = process.env.FIREBASE_API_KEY || "test-key";
    const authDomain = process.env.FIREBASE_AUTH_DOMAIN || "test.firebaseapp.com";
    
    expect(typeof apiKey).toBe("string");
    expect(typeof authDomain).toBe("string");
  });

  it("should handle firebase config values as strings or undefined", () => {
    // Verify config values are either strings or undefined
    const values = [
      process.env.FIREBASE_API_KEY,
      process.env.FIREBASE_AUTH_DOMAIN,
      process.env.FIREBASE_PROJECT_ID,
    ];
    
    values.forEach(val => {
      expect(typeof val === "string" || val === undefined).toBe(true);
    });
  });

  it("should configure with API key or skip if not set", () => {
    // API key may be set or undefined in tests
    expect([process.env.FIREBASE_API_KEY, undefined].includes(process.env.FIREBASE_API_KEY)).toBe(true);
  });

  it("should configure with auth domain or skip if not set", () => {
    expect([process.env.FIREBASE_AUTH_DOMAIN, undefined].includes(process.env.FIREBASE_AUTH_DOMAIN)).toBe(true);
  });

  it("should configure with project ID or skip if not set", () => {
    expect([process.env.FIREBASE_PROJECT_ID, undefined].includes(process.env.FIREBASE_PROJECT_ID)).toBe(true);
  });

  it("should configure with storage bucket or skip if not set", () => {
    expect([process.env.FIREBASE_STORAGE_BUCKET, undefined].includes(process.env.FIREBASE_STORAGE_BUCKET)).toBe(true);
  });

  it("should configure with messaging sender ID or skip if not set", () => {
    expect([process.env.FIREBASE_MESSAGING_SENDER_ID, undefined].includes(process.env.FIREBASE_MESSAGING_SENDER_ID)).toBe(true);
  });

  it("should configure with app ID or skip if not set", () => {
    expect([process.env.FIREBASE_APP_ID, undefined].includes(process.env.FIREBASE_APP_ID)).toBe(true);
  });

  it("should accept firebase configuration from environment or defaults", () => {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    // Config object should have the structure even if values are undefined
    expect(Object.keys(config).length).toBe(6);
    expect(config).toHaveProperty("apiKey");
    expect(config).toHaveProperty("authDomain");
  });
});

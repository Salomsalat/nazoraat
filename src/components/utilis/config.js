import axios from "axios";
import CryptoJS from "crypto-js";

// Get key/secret from localStorage or empty string
let key = localStorage.getItem("key") || "";
let secret = localStorage.getItem("secret") || "";

// Function to update key/secret
export function setAuthData(userKey, userSecret) {
  key = userKey;
  secret = userSecret;
  localStorage.setItem("key", key);
  localStorage.setItem("secret", secret);
}

// Generate MD5 signature
function generateSign(method, path, body, secret) {
  let bodyStr = "";
  if (body && ["POST", "PATCH", "PUT"].includes(method)) {
    bodyStr = typeof body === "string" ? body : JSON.stringify(body);
  }

  const signStr = method + path + bodyStr + secret;
  return CryptoJS.MD5(signStr).toString();
}

// Create Axios instance
export const API = axios.create({
  baseURL: "https://lavina.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add key + sign to all requests
API.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() || "GET";

  const urlObj = new URL(config.url || "", API.defaults.baseURL);
  const path = urlObj.pathname + urlObj.search;

  const sign = generateSign(method, path, config.data, secret);

  config.headers["Key"] = key;
  config.headers["Sign"] = sign;

  return config;
});

export const API_URL = "https://lavina.onrender.com/";

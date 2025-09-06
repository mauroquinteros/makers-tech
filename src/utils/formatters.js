// Format currency values
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    return `$${amount.toFixed(2)}`;
  }
};

// Format numbers with proper separators
export const formatNumber = (number, locale = "en-US") => {
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    console.error("Number formatting error:", error);
    return number.toString();
  }
};

// Format timestamps
export const formatTime = (timestamp, options = {}) => {
  const defaultOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  try {
    return new Intl.DateTimeFormat("en-US", {
      ...defaultOptions,
      ...options,
    }).format(new Date(timestamp));
  } catch (error) {
    console.error("Time formatting error:", error);
    return "Invalid time";
  }
};

// Format product specifications for display
export const formatSpecifications = (specs) => {
  if (!specs || typeof specs !== "object") return [];

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

  return Object.entries(specs).map(([key, value]) => ({
    key: formatKey(key),
    value: String(value),
  }));
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// Parse and format bot responses that might contain structured data
export const parseMessageContent = (content) => {
  if (!content || typeof content !== "string")
    return { text: content, hasStructuredData: false };

  // Check for common structured patterns
  const patterns = {
    currency: /\$[\d,]+\.?\d*/g,
    percentage: /\d+\.?\d*%/g,
    quantities: /\d+\s+(unit|units|piece|pieces|item|items)/gi,
  };

  let formattedContent = content;
  let hasStructuredData = false;

  // Highlight currency values
  if (patterns.currency.test(content)) {
    formattedContent = formattedContent.replace(patterns.currency, (match) => {
      hasStructuredData = true;
      return `<span class="highlight-currency">${match}</span>`;
    });
  }

  // Highlight percentages
  if (patterns.percentage.test(content)) {
    formattedContent = formattedContent.replace(
      patterns.percentage,
      (match) => {
        hasStructuredData = true;
        return `<span class="highlight-percentage">${match}</span>`;
      }
    );
  }

  return {
    text: formattedContent,
    hasStructuredData,
  };
};

// Generate session ID
export const generateSessionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${random}`;
};

// Validate message content
export const validateMessage = (message, maxLength = 500) => {
  if (!message || typeof message !== "string") {
    return { isValid: false, error: "Message cannot be empty" };
  }

  const trimmed = message.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: "Message cannot be empty" };
  }

  if (trimmed.length > maxLength) {
    return {
      isValid: false,
      error: `Message too long (${trimmed.length}/${maxLength} characters)`,
    };
  }

  return { isValid: true, message: trimmed };
};

// Format product data for consistent display
export const formatProductData = (product) => {
  if (!product || typeof product !== "object") return null;

  return {
    id: product.id || Math.random().toString(36).substr(2, 9),
    name: product.name || "Unknown Product",
    brand: product.brand || "Unknown Brand",
    price: typeof product.price === "number" ? product.price : 0,
    quantity: typeof product.quantity === "number" ? product.quantity : 0,
    specifications: product.specifications || {},
    ...product, // Preserve any additional fields
  };
};

// Stock status helpers
export const getStockStatus = (quantity) => {
  if (typeof quantity !== "number")
    return { text: "Unknown", class: "unknown", color: "#6b7280" };

  if (quantity === 0) {
    return { text: "Out of Stock", class: "out-of-stock", color: "#dc2626" };
  } else if (quantity <= 3) {
    return { text: "Low Stock", class: "low-stock", color: "#f59e0b" };
  } else {
    return { text: "In Stock", class: "in-stock", color: "#10b981" };
  }
};

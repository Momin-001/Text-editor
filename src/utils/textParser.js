/**
 * Parse text content to extract mentions and formatting
 * @param {string} html - HTML content from editor
 * @returns {Object} Parsed content with mentions and formatting info
 */
export const parseTextContent = (html) => {
  if (!html) return { text: "", mentions: [], formattedHtml: "" };

  // Create a temporary element to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const mentions = [];
  const walker = document.createTreeWalker(
    tempDiv,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    null
  );

  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Check for mention spans
      if (node.classList && node.classList.contains("mention")) {
        const dataType = node.getAttribute("data-type");
        const dataId = node.getAttribute("data-id");
        const dataName = node.textContent.trim();
        
        if (dataId) {
          mentions.push({
            type: dataType || "user",
            id: parseInt(dataId),
            name: dataName,
          });
        }
      }
    }
  }

  return {
    text: tempDiv.textContent || "",
    mentions,
    formattedHtml: html,
  };
};

/**
 * Extract plain text from HTML
 * @param {string} html - HTML content
 * @returns {string} Plain text
 */
export const extractPlainText = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || "";
};

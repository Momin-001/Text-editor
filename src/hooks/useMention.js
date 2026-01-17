import { useState, useEffect, useRef, useCallback } from "react";
import { users } from "../data/users";
import { items } from "../data/items";

/**
 * Hook to handle @ mention functionality in contentEditable
 */
export const useMention = (editorRef) => {
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [mentionQuery, setMentionQuery] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mentionMenuRef = useRef(null);

  // Filter users and items based on query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const currentList = activeTab === "users" ? filteredUsers : filteredItems;

  // Handle editor input for @ mentions
  const handleInput = useCallback((e) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let textNode = range.startContainer;
    
    // Walk up to find text node if we're in an element
    if (textNode.nodeType !== Node.TEXT_NODE) {
      // Try to find a text node in the current container
      const walker = document.createTreeWalker(
        textNode,
        NodeFilter.SHOW_TEXT,
        null
      );
      textNode = walker.nextNode() || textNode;
      
      if (textNode.nodeType !== Node.TEXT_NODE) return;
    }

    // Get all text before cursor (including parent elements)
    const rangeClone = range.cloneRange();
    rangeClone.selectNodeContents(editorRef.current);
    rangeClone.setEnd(range.startContainer, range.startOffset);
    const textBeforeCursor = rangeClone.toString();
    
    const match = textBeforeCursor.match(/@(\w*)$/);

    if (match) {
      const query = match[1];
      setMentionQuery(query);
      
      // Get cursor position
      const rect = range.getBoundingClientRect();
      setMentionPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });

      setShowMentionMenu(true);
      setSelectedIndex(0);
    } else {
      setShowMentionMenu(false);
    }
  }, [editorRef]);

  // Insert mention into editor
  const insertMention = useCallback((item, type) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    // Get all text before cursor to find @ mention
    const rangeClone = range.cloneRange();
    rangeClone.selectNodeContents(editorRef.current);
    rangeClone.setEnd(range.startContainer, range.startOffset);
    const textBeforeCursor = rangeClone.toString();
    const match = textBeforeCursor.match(/@(\w*)$/);

    if (!match) return;

    // Find the start position of @ mention
    const startRange = range.cloneRange();
    startRange.selectNodeContents(editorRef.current);
    startRange.setEnd(range.startContainer, range.startOffset - match[0].length);
    
    // Delete the @ and query text
    const deleteRange = range.cloneRange();
    deleteRange.setStart(startRange.endContainer, startRange.endOffset);
    deleteRange.setEnd(range.endContainer, range.endOffset);
    deleteRange.deleteContents();
    
    // Create mention element
    const mentionSpan = document.createElement("span");
    mentionSpan.className = "mention bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-medium";
    mentionSpan.setAttribute("contenteditable", "false");
    mentionSpan.setAttribute("data-type", type);
    mentionSpan.setAttribute("data-id", item.id.toString());
    mentionSpan.textContent = type === "user" ? item.username : item.name;

    // Insert mention
    deleteRange.insertNode(mentionSpan);
    
    // Add space after mention
    const spaceNode = document.createTextNode(" ");
    mentionSpan.parentNode.insertBefore(spaceNode, mentionSpan.nextSibling);
    
    // Place cursor after space
    const newRange = document.createRange();
    newRange.setStartAfter(spaceNode);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    setShowMentionMenu(false);
    setMentionQuery("");
    
    // Trigger input event to update state
    const inputEvent = new Event("input", { bubbles: true });
    editorRef.current.dispatchEvent(inputEvent);
    
    // Focus editor
    editorRef.current.focus();
  }, [editorRef]);

  // Handle keyboard navigation in mention menu
  const handleMentionKeyDown = useCallback((e) => {
    if (!showMentionMenu || currentList.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % currentList.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
        break;
      case "Enter":
      case "Tab":
        e.preventDefault();
        const selectedItem = currentList[selectedIndex];
        if (selectedItem) {
          insertMention(selectedItem, activeTab === "users" ? "user" : "item");
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowMentionMenu(false);
        editorRef.current?.focus();
        break;
    }
  }, [showMentionMenu, currentList, selectedIndex, activeTab, insertMention, editorRef]);

  useEffect(() => {
    if (showMentionMenu && currentList.length > 0) {
      setSelectedIndex(0);
    }
  }, [activeTab, mentionQuery, showMentionMenu, currentList.length]);

  return {
    showMentionMenu,
    mentionPosition,
    mentionQuery,
    activeTab,
    setActiveTab,
    selectedIndex,
    filteredUsers,
    filteredItems,
    currentList,
    insertMention,
    handleInput,
    handleMentionKeyDown,
    mentionMenuRef,
  };
};

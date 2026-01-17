import { forwardRef, useEffect, useMemo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { users } from "../../data/users";
import { items } from "../../data/items";

export const MentionMenu = forwardRef(
  (
    { position, activeTab, setActiveTab, selectedIndex, mentionQuery = "", onSelect },
    ref
  ) => {
    // Filter users and items based on query
    const filteredUsers = useMemo(() => 
      users.filter((user) =>
        user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(mentionQuery.toLowerCase())
      ), [mentionQuery]
    );

    const filteredItems = useMemo(() =>
      items.filter((item) =>
        item.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(mentionQuery.toLowerCase())
      ), [mentionQuery]
    );

    const currentList = activeTab === "users" ? filteredUsers : filteredItems;
    useEffect(() => {
      if (ref?.current && position) {
        ref.current.style.top = `${position.top}px`;
        ref.current.style.left = `${position.left}px`;
      }
    }, [position, ref]);

    return (
      <div
        ref={ref}
        className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-80 max-h-96 flex flex-col backdrop-blur-sm"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col h-full"
        >
          <Tabs.List className="flex border-b border-gray-200">
            <Tabs.Trigger
              value="users"
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors"
            >
              Users ({currentList.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="items"
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors"
            >
              Items ({currentList.length})
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            value="users"
            className="flex-1 overflow-y-auto p-2 outline-none"
          >
            {currentList.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No users found
              </div>
            ) : (
              <div className="space-y-1">
                {currentList.map((user, index) => (
                  <div
                    key={user.id}
                    onClick={() => onSelect(user, "user")}
                    className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user.username}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Tabs.Content>

          <Tabs.Content
            value="items"
            className="flex-1 overflow-y-auto p-2 outline-none"
          >
            {currentList.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No items found
              </div>
            ) : (
              <div className="space-y-1">
                {currentList.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => onSelect(item, "item")}
                    className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  }
);

MentionMenu.displayName = "MentionMenu";

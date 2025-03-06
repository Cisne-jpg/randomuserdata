"use client";

interface SidebarProps {
  users: any[];
  onSelect: (index: number) => void;
}

export default function Sidebar({ users, onSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-200 h-screen p-4 overflow-auto text-gray-800">
      <h2 className="text-lg font-bold mb-2">Historial</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">Sin usuarios en el historial</p>
      ) : (
        users.map((user, index) => {
          const fullName = `${user.name.first} ${user.name.last}`;
          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className="block w-full text-left py-2 px-2 hover:bg-gray-300 rounded mb-1 text-gray-900"
            >
              {fullName}
            </button>
          );
        })
      )}
    </div>
  );
}

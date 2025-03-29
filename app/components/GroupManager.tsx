'use client';

import React, { useState, useEffect } from 'react';

type Group = {
  id: string;
  name: string;
  items: string[];
};

type GroupManagerProps = {
  onSelectGroup: (items: string[]) => void;
};

const GroupManager: React.FC<GroupManagerProps> = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showGroups, setShowGroups] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [currentItems, setCurrentItems] = useState<string>('');
  const [editingGroup, setEditingGroup] = useState<string | null>(null);

  // ローカルストレージからグループを読み込む
  useEffect(() => {
    const savedGroups = localStorage.getItem('rouletteGroups');
    if (savedGroups) {
      try {
        setGroups(JSON.parse(savedGroups));
      } catch (e) {
        console.error('グループの読み込みに失敗しました', e);
      }
    }
  }, []);

  // グループが更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('rouletteGroups', JSON.stringify(groups));
  }, [groups]);

  const handleSaveGroup = () => {
    if (!newGroupName.trim()) {
      alert('グループ名を入力してください');
      return;
    }

    const items = currentItems.split('\n').filter((item) => item.trim() !== '');

    if (items.length === 0) {
      alert('少なくとも1つの項目を入力してください');
      return;
    }

    if (editingGroup) {
      // 既存グループの更新
      setGroups(
        groups.map((group) =>
          group.id === editingGroup
            ? { ...group, name: newGroupName, items }
            : group
        )
      );
      setEditingGroup(null);
    } else {
      // 新規グループの追加
      const newGroup: Group = {
        id: Date.now().toString(),
        name: newGroupName,
        items,
      };
      setGroups([...groups, newGroup]);
    }

    setNewGroupName('');
    setCurrentItems('');
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group.id);
    setNewGroupName(group.name);
    setCurrentItems(group.items.join('\n'));
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('このグループを削除してもよろしいですか？')) {
      setGroups(groups.filter((group) => group.id !== groupId));
      if (editingGroup === groupId) {
        setEditingGroup(null);
        setNewGroupName('');
        setCurrentItems('');
      }
    }
  };

  const handleUseGroup = (group: Group) => {
    onSelectGroup(group.items);
  };

  return (
    <div className="w-full max-w-md mt-6">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowGroups(!showGroups)}
          className="text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
        >
          {showGroups ? 'グループ管理を閉じる' : 'グループ管理を開く'}
        </button>
      </div>

      {showGroups && (
        <div className="border border-gray-300 dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-3">
            {editingGroup ? 'グループを編集' : '新しいグループを作成'}
          </h3>

          <div className="mb-3">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="グループ名"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <textarea
              rows={5}
              value={currentItems}
              onChange={(e) => setCurrentItems(e.target.value)}
              placeholder="改行区切りで項目を入力"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={handleSaveGroup}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
            >
              {editingGroup ? '更新' : '保存'}
            </button>
            {editingGroup && (
              <button
                onClick={() => {
                  setEditingGroup(null);
                  setNewGroupName('');
                  setCurrentItems('');
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
              >
                キャンセル
              </button>
            )}
          </div>

          {groups.length > 0 && (
            <>
              <h3 className="text-lg font-bold mb-2">保存済みグループ</h3>
              <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                {groups.map((group) => (
                  <li key={group.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{group.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {group.items.length}項目
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUseGroup(group)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                        >
                          使用
                        </button>
                        <button
                          onClick={() => handleEditGroup(group)}
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded transition-colors"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupManager;

-- 创建食谱材料表
CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity TEXT,
    unit TEXT,
    category TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入一条初始测试测试数据（可选）
-- INSERT INTO ingredients (name, quantity, unit, category) VALUES ('鸡蛋', '2', '个', '蛋奶');

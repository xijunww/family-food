// 预置菜数据
export const CATEGORIES = [
  { key: 'home', name: '家常菜', emoji: '🍚' },
  { key: 'soup', name: '汤', emoji: '🍲' },
  { key: 'breakfast', name: '早餐', emoji: '🥞' },
  { key: 'fruit', name: '水果', emoji: '🍎' },
  { key: 'drink', name: '饮品', emoji: '🥤' },
];

export const PRESET_DISHES = [
  // 家常菜
  { name: '番茄炒蛋', category: 'home', emoji: '🍅', description: '国民家常菜，酸甜开胃', tags: ['清淡', '小孩爱吃'], isPreset: true },
  { name: '宫保鸡丁', category: 'home', emoji: '🌶️', description: '微辣下饭的经典川菜', tags: ['微辣', '下饭'], isPreset: true },
  { name: '麻婆豆腐', category: 'home', emoji: '🧈', description: '麻辣鲜香，川菜代表', tags: ['辣', '川菜'], isPreset: true },
  { name: '红烧肉', category: 'home', emoji: '🥩', description: '肥而不腻，入口即化', tags: ['浓郁', '经典'], isPreset: true },
  { name: '鱼香肉丝', category: 'home', emoji: '🥢', description: '酸甜咸辣俱全', tags: ['微辣', '川菜'], isPreset: true },
  { name: '青椒土豆丝', category: 'home', emoji: '🥔', description: '清爽素菜', tags: ['清淡', '素菜'], isPreset: true },
  { name: '糖醋里脊', category: 'home', emoji: '🍖', description: '酸甜酥脆', tags: ['酸甜', '小孩爱吃'], isPreset: true },
  { name: '可乐鸡翅', category: 'home', emoji: '🍗', description: '甜咸入味', tags: ['甜咸', '小孩爱吃'], isPreset: true },

  // 汤
  { name: '番茄鸡蛋汤', category: 'soup', emoji: '🍅', description: '简单快手的家常汤', tags: ['清淡', '简单'], isPreset: true },
  { name: '紫菜蛋花汤', category: 'soup', emoji: '🥚', description: '清爽鲜美', tags: ['清淡'], isPreset: true },
  { name: '排骨玉米汤', category: 'soup', emoji: '🌽', description: '滋补暖胃', tags: ['滋补', '炖汤'], isPreset: true },
  { name: '冬瓜排骨汤', category: 'soup', emoji: '🍲', description: '清淡不油腻', tags: ['清淡'], isPreset: true },
  { name: '银耳莲子羹', category: 'soup', emoji: '🥣', description: '甜汤养颜', tags: ['甜汤', '养颜'], isPreset: true },
  { name: '酸辣汤', category: 'soup', emoji: '🌶️', description: '开胃醒神', tags: ['辣', '开胃'], isPreset: true },
  { name: '土鸡汤', category: 'soup', emoji: '🐔', description: '营养滋补', tags: ['滋补'], isPreset: true },

  // 早餐
  { name: '小米粥', category: 'breakfast', emoji: '🥣', description: '养胃易消化', tags: ['养胃', '清淡'], isPreset: true },
  { name: '豆浆油条', category: 'breakfast', emoji: '🥛', description: '经典中式早餐', tags: ['经典', '中式'], isPreset: true },
  { name: '煎蛋三明治', category: 'breakfast', emoji: '🥪', description: '西式简单快手', tags: ['西式', '简单'], isPreset: true },
  { name: '燕麦牛奶', category: 'breakfast', emoji: '🥛', description: '健康高纤', tags: ['健康', '西式'], isPreset: true },
  { name: '鲜肉包', category: 'breakfast', emoji: '🥟', description: '皮薄馅大', tags: ['中式'], isPreset: true },
  { name: '鸡蛋灌饼', category: 'breakfast', emoji: '🌯', description: '酥脆香浓', tags: ['中式'], isPreset: true },

  // 水果
  { name: '苹果', category: 'fruit', emoji: '🍎', description: '每日一苹果', tags: ['健康'], isPreset: true },
  { name: '香蕉', category: 'fruit', emoji: '🍌', description: '能量补给', tags: ['能量', '运动'], isPreset: true },
  { name: '草莓', category: 'fruit', emoji: '🍓', description: '酸甜多汁', tags: ['甜', '季节'], isPreset: true },
  { name: '葡萄', category: 'fruit', emoji: '🍇', description: '酸甜可口', tags: ['甜'], isPreset: true },
  { name: '橙子', category: 'fruit', emoji: '🍊', description: '维C丰富', tags: ['维C'], isPreset: true },
  { name: '蓝莓', category: 'fruit', emoji: '🫐', description: '抗氧化小能手', tags: ['健康', '抗氧化'], isPreset: true },
  { name: '芒果', category: 'fruit', emoji: '🥭', description: '热带甜蜜', tags: ['热带', '甜'], isPreset: true },

  // 饮品
  { name: '柠檬水', category: 'drink', emoji: '🍋', description: '清爽解腻', tags: ['清爽', '健康'], isPreset: true },
  { name: '奶茶', category: 'drink', emoji: '🧋', description: '香浓丝滑', tags: ['甜', '经典'], isPreset: true },
  { name: '鲜榨橙汁', category: 'drink', emoji: '🍹', description: '现榨维C', tags: ['维C', '鲜榨'], isPreset: true },
  { name: '酸奶', category: 'drink', emoji: '🥛', description: '助消化', tags: ['健康'], isPreset: true },
  { name: '咖啡', category: 'drink', emoji: '☕', description: '提神醒脑', tags: ['提神'], isPreset: true },
  { name: '绿茶', category: 'drink', emoji: '🍵', description: '清香怡人', tags: ['健康', '清香'], isPreset: true },
  { name: '西瓜汁', category: 'drink', emoji: '🍉', description: '夏日解暑', tags: ['夏日', '解暑'], isPreset: true },
  { name: '可乐', category: 'drink', emoji: '🥤', description: '快乐肥宅水', tags: ['碳酸', '小孩爱吃'], isPreset: true },
];

// 头像 emoji 选项
export const AVATAR_OPTIONS = [
  '🐱', '🐶', '🐰', '🐻', '🐼', '🐨', '🦊', '🐯',
  '🐸', '🐵', '🐔', '🐧', '🐦', '🦄', '🐮', '🐷',
  '🍓', '🍑', '🍒', '🥑', '🌽', '🍕', '🍔', '🍰',
  '🌸', '🌺', '🌻', '🌷', '⭐', '🌙', '☀️', '🌈',
];

// 用餐时间
export const MEAL_TYPES = [
  { key: 'breakfast', name: '早餐', emoji: '🌅' },
  { key: 'lunch', name: '午餐', emoji: '☀️' },
  { key: 'dinner', name: '晚餐', emoji: '🌙' },
];

// 订单状态
export const ORDER_STATUS = {
  pending: { name: '待定', class: 'status-pending' },
  confirmed: { name: '已确认', class: 'status-confirmed' },
  served: { name: '已上桌', class: 'status-served' },
  cancelled: { name: '已取消', class: 'status-cancelled' },
};

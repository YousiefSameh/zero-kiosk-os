export const kpis = {
  revenueToday: 48210,
  revenueYesterday: 41530,
  transactionsToday: 342,
  avgBasket: 141.0,
  activeBranches: 4,
  stockAlerts: 12,
  cashVariance: -84,
  openPOs: 7,
};

export const salesTrend = [
  { day: "Mon", sales: 32400, transactions: 240 },
  { day: "Tue", sales: 38900, transactions: 282 },
  { day: "Wed", sales: 41200, transactions: 301 },
  { day: "Thu", sales: 37500, transactions: 271 },
  { day: "Fri", sales: 52300, transactions: 388 },
  { day: "Sat", sales: 61800, transactions: 445 },
  { day: "Sun", sales: 48210, transactions: 342 },
];

export const categoryMix = [
  { name: "Beverages", value: 34 },
  { name: "Snacks", value: 22 },
  { name: "Dairy", value: 18 },
  { name: "Household", value: 14 },
  { name: "Personal Care", value: 12 },
];

export const branches = [
  { id: "BR-01", name: "Zamalek Flagship", city: "Cairo", staff: 12, revenue: 214300, status: "Active" },
  { id: "BR-02", name: "Maadi Corniche", city: "Cairo", staff: 8, revenue: 168400, status: "Active" },
  { id: "BR-03", name: "Sheraton Heliopolis", city: "Cairo", staff: 9, revenue: 142800, status: "Active" },
  { id: "BR-04", name: "Smouha", city: "Alexandria", staff: 7, revenue: 121500, status: "Onboarding" },
];

export const products = [
  { id: "SKU-1001", name: "Coca-Cola 330ml", category: "Beverages", supplier: "Coca-Cola HBC", price: 12, cost: 8.4, stock: 480, reorder: 120, status: "In Stock" },
  { id: "SKU-1002", name: "Pepsi 2L", category: "Beverages", supplier: "PepsiCo Egypt", price: 34, cost: 24, stock: 96, reorder: 60, status: "In Stock" },
  { id: "SKU-1003", name: "Lay's Chips Classic", category: "Snacks", supplier: "PepsiCo Egypt", price: 15, cost: 9.6, stock: 42, reorder: 80, status: "Low Stock" },
  { id: "SKU-1004", name: "Oreo Original", category: "Snacks", supplier: "Mondelez", price: 18, cost: 12, stock: 210, reorder: 60, status: "In Stock" },
  { id: "SKU-1005", name: "Nescafe Gold 100g", category: "Beverages", supplier: "Nestlé Egypt", price: 210, cost: 168, stock: 22, reorder: 30, status: "Low Stock" },
  { id: "SKU-1006", name: "Juhayna Full Cream 1L", category: "Dairy", supplier: "Juhayna", price: 42, cost: 32, stock: 158, reorder: 100, status: "In Stock" },
  { id: "SKU-1007", name: "Domty Feta 500g", category: "Dairy", supplier: "Domty", price: 78, cost: 58, stock: 8, reorder: 40, status: "Critical" },
  { id: "SKU-1008", name: "Molto Croissant", category: "Snacks", supplier: "Edita", price: 8, cost: 5.2, stock: 340, reorder: 100, status: "In Stock" },
  { id: "SKU-1009", name: "Fine Tissues 200s", category: "Household", supplier: "Fine Foods", price: 28, cost: 19, stock: 74, reorder: 60, status: "In Stock" },
  { id: "SKU-1010", name: "Persil Detergent 3kg", category: "Household", supplier: "Henkel Egypt", price: 245, cost: 190, stock: 18, reorder: 25, status: "Low Stock" },
  { id: "SKU-1011", name: "Colgate Total 100ml", category: "Personal Care", supplier: "Colgate-Palmolive", price: 62, cost: 42, stock: 130, reorder: 60, status: "In Stock" },
  { id: "SKU-1012", name: "Head & Shoulders 400ml", category: "Personal Care", supplier: "P&G Egypt", price: 168, cost: 128, stock: 0, reorder: 30, status: "Out of Stock" },
];

export const suppliers = [
  { id: "SUP-01", name: "Nestlé Egypt", contact: "Karim Yousri", phone: "+20 100 111 2233", terms: "Net 30", rating: 4.8, openPOs: 2 },
  { id: "SUP-02", name: "Coca-Cola HBC", contact: "Sara Fahmy", phone: "+20 122 445 8899", terms: "Net 15", rating: 4.7, openPOs: 1 },
  { id: "SUP-03", name: "PepsiCo Egypt", contact: "Omar Salem", phone: "+20 111 887 5566", terms: "Net 30", rating: 4.5, openPOs: 3 },
  { id: "SUP-04", name: "Juhayna", contact: "Mona Gharib", phone: "+20 128 665 3311", terms: "Net 7", rating: 4.6, openPOs: 1 },
  { id: "SUP-05", name: "Edita", contact: "Hesham Nabil", phone: "+20 106 224 7788", terms: "Net 30", rating: 4.4, openPOs: 0 },
  { id: "SUP-06", name: "Fine Foods", contact: "Rania Adel", phone: "+20 100 998 3322", terms: "Net 15", rating: 4.3, openPOs: 0 },
  { id: "SUP-07", name: "Domty", contact: "Yasmin Hosny", phone: "+20 109 774 6621", terms: "Net 21", rating: 4.5, openPOs: 1 },
];

export const purchaseOrders = [
  { id: "PO-2041", supplier: "Nestlé Egypt", branch: "Zamalek Flagship", items: 14, total: 48200, status: "Approved", date: "2026-06-28", eta: "2026-07-04" },
  { id: "PO-2042", supplier: "Coca-Cola HBC", branch: "Maadi Corniche", items: 6, total: 22400, status: "Pending", date: "2026-06-30", eta: "2026-07-06" },
  { id: "PO-2043", supplier: "Juhayna", branch: "Sheraton Heliopolis", items: 9, total: 18650, status: "Delivered", date: "2026-06-24", eta: "2026-06-29" },
  { id: "PO-2044", supplier: "PepsiCo Egypt", branch: "Zamalek Flagship", items: 22, total: 61240, status: "Delivered", date: "2026-06-20", eta: "2026-06-26" },
  { id: "PO-2045", supplier: "Edita", branch: "Smouha", items: 11, total: 14200, status: "Pending", date: "2026-07-01", eta: "2026-07-08" },
  { id: "PO-2046", supplier: "Domty", branch: "Maadi Corniche", items: 5, total: 9860, status: "Cancelled", date: "2026-06-18", eta: "—" },
  { id: "PO-2047", supplier: "Fine Foods", branch: "Zamalek Flagship", items: 8, total: 17200, status: "Approved", date: "2026-07-02", eta: "2026-07-09" },
];

export const customers = [
  { id: "CUS-1001", name: "Ahmed Hassan", phone: "+20 100 223 4411", visits: 42, spend: 18420, loyalty: "Gold", lastVisit: "2026-07-04" },
  { id: "CUS-1002", name: "Mohamed Ali", phone: "+20 122 664 7788", visits: 28, spend: 9680, loyalty: "Silver", lastVisit: "2026-07-03" },
  { id: "CUS-1003", name: "Fatma Adel", phone: "+20 111 335 8822", visits: 61, spend: 24310, loyalty: "Platinum", lastVisit: "2026-07-05" },
  { id: "CUS-1004", name: "Nour El-Din", phone: "+20 128 447 6611", visits: 15, spend: 4820, loyalty: "Silver", lastVisit: "2026-07-01" },
  { id: "CUS-1005", name: "Salma Ibrahim", phone: "+20 106 778 2244", visits: 9, spend: 2210, loyalty: "Bronze", lastVisit: "2026-06-29" },
  { id: "CUS-1006", name: "Youssef Kamal", phone: "+20 100 555 1122", visits: 34, spend: 12480, loyalty: "Gold", lastVisit: "2026-07-02" },
];

export const sales = [
  { id: "TXN-88421", cashier: "Menna Tarek", branch: "Zamalek Flagship", items: 8, total: 342, method: "Card", time: "12:42", status: "Completed" },
  { id: "TXN-88422", cashier: "Karim Fouad", branch: "Zamalek Flagship", items: 3, total: 96, method: "Cash", time: "12:44", status: "Completed" },
  { id: "TXN-88423", cashier: "Menna Tarek", branch: "Zamalek Flagship", items: 12, total: 812, method: "Card", time: "12:47", status: "Completed" },
  { id: "TXN-88424", cashier: "Hana Sami", branch: "Maadi Corniche", items: 2, total: 58, method: "Cash", time: "12:51", status: "Refunded" },
  { id: "TXN-88425", cashier: "Ahmed Nabil", branch: "Sheraton Heliopolis", items: 5, total: 218, method: "Card", time: "12:53", status: "Completed" },
  { id: "TXN-88426", cashier: "Menna Tarek", branch: "Zamalek Flagship", items: 1, total: 12, method: "Cash", time: "12:55", status: "Completed" },
  { id: "TXN-88427", cashier: "Karim Fouad", branch: "Zamalek Flagship", items: 7, total: 421, method: "Wallet", time: "12:58", status: "Completed" },
];

export const employees = [
  { id: "EMP-01", name: "Menna Tarek", role: "Cashier", branch: "Zamalek Flagship", shift: "Morning", status: "Active" },
  { id: "EMP-02", name: "Karim Fouad", role: "Cashier", branch: "Zamalek Flagship", shift: "Evening", status: "Active" },
  { id: "EMP-03", name: "Hana Sami", role: "Shift Manager", branch: "Maadi Corniche", shift: "Morning", status: "Active" },
  { id: "EMP-04", name: "Ahmed Nabil", role: "Cashier", branch: "Sheraton Heliopolis", shift: "Morning", status: "Active" },
  { id: "EMP-05", name: "Laila Mostafa", role: "Branch Manager", branch: "Zamalek Flagship", shift: "Full", status: "Active" },
  { id: "EMP-06", name: "Tarek Sobhy", role: "Inventory Clerk", branch: "Maadi Corniche", shift: "Morning", status: "On Leave" },
  { id: "EMP-07", name: "Nada Wahby", role: "Branch Manager", branch: "Smouha", shift: "Full", status: "Active" },
];

export const expenses = [
  { id: "EXP-2201", category: "Utilities", vendor: "Cairo Electricity", amount: 8420, date: "2026-07-01", branch: "Zamalek Flagship", status: "Paid" },
  { id: "EXP-2202", category: "Rent", vendor: "Nile Properties", amount: 42000, date: "2026-07-01", branch: "Maadi Corniche", status: "Paid" },
  { id: "EXP-2203", category: "Maintenance", vendor: "CoolAir Services", amount: 3200, date: "2026-06-28", branch: "Sheraton Heliopolis", status: "Pending" },
  { id: "EXP-2204", category: "Marketing", vendor: "Meta Ads", amount: 6800, date: "2026-06-25", branch: "All", status: "Paid" },
  { id: "EXP-2205", category: "Supplies", vendor: "OfficeMax Egypt", amount: 1420, date: "2026-06-22", branch: "Zamalek Flagship", status: "Paid" },
];

export const activity = [
  { id: 1, user: "Laila Mostafa", action: "Approved PO-2041 for Nestlé Egypt", time: "2 min ago", type: "purchase" },
  { id: 2, user: "Menna Tarek", action: "Processed refund on TXN-88424", time: "8 min ago", type: "sale" },
  { id: 3, user: "System", action: "Low-stock alert: Lay's Chips Classic (42 units)", time: "22 min ago", type: "alert" },
  { id: 4, user: "Karim Fouad", action: "Closed cash drawer with EGP 12,420", time: "1 hr ago", type: "cash" },
  { id: 5, user: "Hana Sami", action: "Received delivery for PO-2043 (Juhayna)", time: "2 hr ago", type: "purchase" },
  { id: 6, user: "Tarek Sobhy", action: "Adjusted inventory: +18 Oreo Original", time: "3 hr ago", type: "inventory" },
  { id: 7, user: "Nada Wahby", action: "Onboarded new cashier at Smouha", time: "5 hr ago", type: "user" },
];

export const notifications = [
  { id: 1, title: "Domty Feta 500g at critical level", desc: "Only 8 units left across all branches. Suggested reorder: 60.", time: "12 min ago", unread: true, kind: "warning" },
  { id: 2, title: "PO-2043 delivered", desc: "Juhayna delivery received at Sheraton Heliopolis by Hana Sami.", time: "1 hr ago", unread: true, kind: "success" },
  { id: 3, title: "Cash variance detected", desc: "Zamalek Flagship evening close variance of −EGP 84.", time: "3 hr ago", unread: true, kind: "warning" },
  { id: 4, title: "Weekly report ready", desc: "Your operations summary for Jun 28 – Jul 4 is ready.", time: "Yesterday", unread: false, kind: "info" },
  { id: 5, title: "New device paired", desc: "POS-Terminal-04 was registered at Maadi Corniche.", time: "2 days ago", unread: false, kind: "info" },
];

export const roles = [
  { id: "RL-01", name: "Owner", members: 1, description: "Full access to all branches, finance, and settings." },
  { id: "RL-02", name: "Branch Manager", members: 4, description: "Manage branch operations, staff, inventory, and reports." },
  { id: "RL-03", name: "Shift Manager", members: 6, description: "Supervise cashiers, approve refunds, close drawers." },
  { id: "RL-04", name: "Cashier", members: 18, description: "Operate POS, process sales, handle returns with approval." },
  { id: "RL-05", name: "Inventory Clerk", members: 5, description: "Receive stock, count inventory, adjust with approval." },
  { id: "RL-06", name: "Accountant", members: 2, description: "View finance, reconcile cash, export tax documents." },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

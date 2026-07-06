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
  { day: "الإثنين", sales: 32400, transactions: 240 },
  { day: "الثلاثاء", sales: 38900, transactions: 282 },
  { day: "الأربعاء", sales: 41200, transactions: 301 },
  { day: "الخميس", sales: 37500, transactions: 271 },
  { day: "الجمعة", sales: 52300, transactions: 388 },
  { day: "السبت", sales: 61800, transactions: 445 },
  { day: "الأحد", sales: 48210, transactions: 342 },
];

export const categoryMix = [
  { name: "المشروبات", value: 34 },
  { name: "الوجبات الخفيفة", value: 22 },
  { name: "الألبان", value: 18 },
  { name: "المنزل", value: 14 },
  { name: "العناية الشخصية", value: 12 },
];

export const branches = [
  { id: "BR-01", name: "الزمالك — الفرع الرئيسي", city: "القاهرة", staff: 12, revenue: 214300, status: "نشط" },
  { id: "BR-02", name: "المعادي كورنيش", city: "القاهرة", staff: 8, revenue: 168400, status: "نشط" },
  { id: "BR-03", name: "شيراتون هليوبوليس", city: "القاهرة", staff: 9, revenue: 142800, status: "نشط" },
  { id: "BR-04", name: "سموحة", city: "الإسكندرية", staff: 7, revenue: 121500, status: "قيد التهيئة" },
];

export const products = [
  { id: "SKU-1001", name: "كوكاكولا ٣٣٠ مل", category: "المشروبات", supplier: "كوكاكولا HBC", price: 12, cost: 8.4, stock: 480, reorder: 120, status: "متوفر" },
  { id: "SKU-1002", name: "بيبسي ٢ لتر", category: "المشروبات", supplier: "بيبسيكو مصر", price: 34, cost: 24, stock: 96, reorder: 60, status: "متوفر" },
  { id: "SKU-1003", name: "شيبس ليز كلاسيك", category: "الوجبات الخفيفة", supplier: "بيبسيكو مصر", price: 15, cost: 9.6, stock: 42, reorder: 80, status: "مخزون منخفض" },
  { id: "SKU-1004", name: "أوريو أوريجينال", category: "الوجبات الخفيفة", supplier: "موندليز", price: 18, cost: 12, stock: 210, reorder: 60, status: "متوفر" },
  { id: "SKU-1005", name: "نسكافيه جولد ١٠٠ جم", category: "المشروبات", supplier: "نستله مصر", price: 210, cost: 168, stock: 22, reorder: 30, status: "مخزون منخفض" },
  { id: "SKU-1006", name: "جهينة كامل الدسم ١ لتر", category: "الألبان", supplier: "جهينة", price: 42, cost: 32, stock: 158, reorder: 100, status: "متوفر" },
  { id: "SKU-1007", name: "دومتي فيتا ٥٠٠ جم", category: "الألبان", supplier: "دومتي", price: 78, cost: 58, stock: 8, reorder: 40, status: "حرج" },
  { id: "SKU-1008", name: "مولتو كرواسون", category: "الوجبات الخفيفة", supplier: "إديتا", price: 8, cost: 5.2, stock: 340, reorder: 100, status: "متوفر" },
  { id: "SKU-1009", name: "مناديل فاين ٢٠٠", category: "المنزل", supplier: "فاين فودز", price: 28, cost: 19, stock: 74, reorder: 60, status: "متوفر" },
  { id: "SKU-1010", name: "بيرسيل مسحوق ٣ كجم", category: "المنزل", supplier: "هنكل مصر", price: 245, cost: 190, stock: 18, reorder: 25, status: "مخزون منخفض" },
  { id: "SKU-1011", name: "كولجيت توتال ١٠٠ مل", category: "العناية الشخصية", supplier: "كولجيت-بالموليڤ", price: 62, cost: 42, stock: 130, reorder: 60, status: "متوفر" },
  { id: "SKU-1012", name: "هيد آند شولدرز ٤٠٠ مل", category: "العناية الشخصية", supplier: "P&G مصر", price: 168, cost: 128, stock: 0, reorder: 30, status: "نفد المخزون" },
];

export const suppliers = [
  { id: "SUP-01", name: "نستله مصر", contact: "كريم يسري", phone: "+20 100 111 2233", terms: "أجل ٣٠ يوم", rating: 4.8, openPOs: 2 },
  { id: "SUP-02", name: "كوكاكولا HBC", contact: "سارة فهمي", phone: "+20 122 445 8899", terms: "أجل ١٥ يوم", rating: 4.7, openPOs: 1 },
  { id: "SUP-03", name: "بيبسيكو مصر", contact: "عمر سالم", phone: "+20 111 887 5566", terms: "أجل ٣٠ يوم", rating: 4.5, openPOs: 3 },
  { id: "SUP-04", name: "جهينة", contact: "منى غريب", phone: "+20 128 665 3311", terms: "أجل ٧ أيام", rating: 4.6, openPOs: 1 },
  { id: "SUP-05", name: "إديتا", contact: "هشام نبيل", phone: "+20 106 224 7788", terms: "أجل ٣٠ يوم", rating: 4.4, openPOs: 0 },
  { id: "SUP-06", name: "فاين فودز", contact: "رانيا عادل", phone: "+20 100 998 3322", terms: "أجل ١٥ يوم", rating: 4.3, openPOs: 0 },
  { id: "SUP-07", name: "دومتي", contact: "ياسمين حسني", phone: "+20 109 774 6621", terms: "أجل ٢١ يوم", rating: 4.5, openPOs: 1 },
];

export const purchaseOrders = [
  { id: "PO-2041", supplier: "نستله مصر", branch: "الزمالك — الفرع الرئيسي", items: 14, total: 48200, status: "معتمد", date: "٢٠٢٦-٠٦-٢٨", eta: "٢٠٢٦-٠٧-٠٤" },
  { id: "PO-2042", supplier: "كوكاكولا HBC", branch: "المعادي كورنيش", items: 6, total: 22400, status: "قيد الانتظار", date: "٢٠٢٦-٠٦-٣٠", eta: "٢٠٢٦-٠٧-٠٦" },
  { id: "PO-2043", supplier: "جهينة", branch: "شيراتون هليوبوليس", items: 9, total: 18650, status: "تم التسليم", date: "٢٠٢٦-٠٦-٢٤", eta: "٢٠٢٦-٠٦-٢٩" },
  { id: "PO-2044", supplier: "بيبسيكو مصر", branch: "الزمالك — الفرع الرئيسي", items: 22, total: 61240, status: "تم التسليم", date: "٢٠٢٦-٠٦-٢٠", eta: "٢٠٢٦-٠٦-٢٦" },
  { id: "PO-2045", supplier: "إديتا", branch: "سموحة", items: 11, total: 14200, status: "قيد الانتظار", date: "٢٠٢٦-٠٧-٠١", eta: "٢٠٢٦-٠٧-٠٨" },
  { id: "PO-2046", supplier: "دومتي", branch: "المعادي كورنيش", items: 5, total: 9860, status: "ملغى", date: "٢٠٢٦-٠٦-١٨", eta: "—" },
  { id: "PO-2047", supplier: "فاين فودز", branch: "الزمالك — الفرع الرئيسي", items: 8, total: 17200, status: "معتمد", date: "٢٠٢٦-٠٧-٠٢", eta: "٢٠٢٦-٠٧-٠٩" },
];

export const customers = [
  { id: "CUS-1001", name: "أحمد حسن", phone: "+20 100 223 4411", visits: 42, spend: 18420, loyalty: "ذهبي", lastVisit: "٢٠٢٦-٠٧-٠٤" },
  { id: "CUS-1002", name: "محمد علي", phone: "+20 122 664 7788", visits: 28, spend: 9680, loyalty: "فضي", lastVisit: "٢٠٢٦-٠٧-٠٣" },
  { id: "CUS-1003", name: "فاطمة عادل", phone: "+20 111 335 8822", visits: 61, spend: 24310, loyalty: "بلاتيني", lastVisit: "٢٠٢٦-٠٧-٠٥" },
  { id: "CUS-1004", name: "نور الدين", phone: "+20 128 447 6611", visits: 15, spend: 4820, loyalty: "فضي", lastVisit: "٢٠٢٦-٠٧-٠١" },
  { id: "CUS-1005", name: "سلمى إبراهيم", phone: "+20 106 778 2244", visits: 9, spend: 2210, loyalty: "برونزي", lastVisit: "٢٠٢٦-٠٦-٢٩" },
  { id: "CUS-1006", name: "يوسف كمال", phone: "+20 100 555 1122", visits: 34, spend: 12480, loyalty: "ذهبي", lastVisit: "٢٠٢٦-٠٧-٠٢" },
];

export const sales = [
  { id: "TXN-88421", cashier: "منة طارق", branch: "الزمالك — الفرع الرئيسي", items: 8, total: 342, method: "بطاقة", time: "١٢:٤٢", status: "مكتمل" },
  { id: "TXN-88422", cashier: "كريم فؤاد", branch: "الزمالك — الفرع الرئيسي", items: 3, total: 96, method: "نقدي", time: "١٢:٤٤", status: "مكتمل" },
  { id: "TXN-88423", cashier: "منة طارق", branch: "الزمالك — الفرع الرئيسي", items: 12, total: 812, method: "بطاقة", time: "١٢:٤٧", status: "مكتمل" },
  { id: "TXN-88424", cashier: "هناء سامي", branch: "المعادي كورنيش", items: 2, total: 58, method: "نقدي", time: "١٢:٥١", status: "مسترد" },
  { id: "TXN-88425", cashier: "أحمد نبيل", branch: "شيراتون هليوبوليس", items: 5, total: 218, method: "بطاقة", time: "١٢:٥٣", status: "مكتمل" },
  { id: "TXN-88426", cashier: "منة طارق", branch: "الزمالك — الفرع الرئيسي", items: 1, total: 12, method: "نقدي", time: "١٢:٥٥", status: "مكتمل" },
  { id: "TXN-88427", cashier: "كريم فؤاد", branch: "الزمالك — الفرع الرئيسي", items: 7, total: 421, method: "محفظة", time: "١٢:٥٨", status: "مكتمل" },
];

export const employees = [
  { id: "EMP-01", name: "منة طارق", role: "كاشير", branch: "الزمالك — الفرع الرئيسي", shift: "صباحية", status: "نشط" },
  { id: "EMP-02", name: "كريم فؤاد", role: "كاشير", branch: "الزمالك — الفرع الرئيسي", shift: "مسائية", status: "نشط" },
  { id: "EMP-03", name: "هناء سامي", role: "مدير وردية", branch: "المعادي كورنيش", shift: "صباحية", status: "نشط" },
  { id: "EMP-04", name: "أحمد نبيل", role: "كاشير", branch: "شيراتون هليوبوليس", shift: "صباحية", status: "نشط" },
  { id: "EMP-05", name: "ليلى مصطفى", role: "مدير فرع", branch: "الزمالك — الفرع الرئيسي", shift: "كامل", status: "نشط" },
  { id: "EMP-06", name: "طارق صبحي", role: "أمين مخزن", branch: "المعادي كورنيش", shift: "صباحية", status: "في إجازة" },
  { id: "EMP-07", name: "ندى وهبي", role: "مدير فرع", branch: "سموحة", shift: "كامل", status: "نشط" },
];

export const expenses = [
  { id: "EXP-2201", category: "المرافق", vendor: "كهرباء القاهرة", amount: 8420, date: "٢٠٢٦-٠٧-٠١", branch: "الزمالك — الفرع الرئيسي", status: "مدفوع" },
  { id: "EXP-2202", category: "الإيجار", vendor: "النيل العقارية", amount: 42000, date: "٢٠٢٦-٠٧-٠١", branch: "المعادي كورنيش", status: "مدفوع" },
  { id: "EXP-2203", category: "الصيانة", vendor: "كول إير للخدمات", amount: 3200, date: "٢٠٢٦-٠٦-٢٨", branch: "شيراتون هليوبوليس", status: "قيد الانتظار" },
  { id: "EXP-2204", category: "التسويق", vendor: "إعلانات ميتا", amount: 6800, date: "٢٠٢٦-٠٦-٢٥", branch: "الكل", status: "مدفوع" },
  { id: "EXP-2205", category: "المستلزمات", vendor: "أوفيس ماكس مصر", amount: 1420, date: "٢٠٢٦-٠٦-٢٢", branch: "الزمالك — الفرع الرئيسي", status: "مدفوع" },
];

export const activity = [
  { id: 1, user: "ليلى مصطفى", action: "اعتمدت أمر الشراء PO-2041 من نستله مصر", time: "قبل ٢ دقيقة", type: "purchase" },
  { id: 2, user: "منة طارق", action: "معالجة استرداد على المعاملة TXN-88424", time: "قبل ٨ دقائق", type: "sale" },
  { id: 3, user: "النظام", action: "تنبيه مخزون منخفض: شيبس ليز كلاسيك (٤٢ وحدة)", time: "قبل ٢٢ دقيقة", type: "alert" },
  { id: 4, user: "كريم فؤاد", action: "أغلق درج النقدية بمبلغ ١٢٬٤٢٠ ج.م", time: "قبل ساعة", type: "cash" },
  { id: 5, user: "هناء سامي", action: "استلمت شحنة PO-2043 من جهينة", time: "قبل ساعتين", type: "purchase" },
  { id: 6, user: "طارق صبحي", action: "تعديل مخزون: +١٨ أوريو أوريجينال", time: "قبل ٣ ساعات", type: "inventory" },
  { id: 7, user: "ندى وهبي", action: "أضافت كاشير جديد في سموحة", time: "قبل ٥ ساعات", type: "user" },
];

export const notifications = [
  { id: 1, title: "دومتي فيتا ٥٠٠ جم عند مستوى حرج", desc: "تبقى ٨ وحدات فقط في كل الفروع. الكمية المقترحة: ٦٠.", time: "قبل ١٢ دقيقة", unread: true, kind: "warning" },
  { id: 2, title: "تم تسليم أمر الشراء PO-2043", desc: "تم استلام شحنة جهينة في شيراتون هليوبوليس بواسطة هناء سامي.", time: "قبل ساعة", unread: true, kind: "success" },
  { id: 3, title: "اكتشاف فرق نقدي", desc: "الزمالك — الفرع الرئيسي، فرق إغلاق مسائي −٨٤ ج.م.", time: "قبل ٣ ساعات", unread: true, kind: "warning" },
  { id: 4, title: "التقرير الأسبوعي جاهز", desc: "ملخص العمليات للفترة ٢٨ يونيو – ٤ يوليو أصبح جاهزًا.", time: "أمس", unread: false, kind: "info" },
  { id: 5, title: "جهاز جديد متصل", desc: "تم تسجيل الطرفية POS-Terminal-04 في المعادي كورنيش.", time: "قبل يومين", unread: false, kind: "info" },
];

export const roles = [
  { id: "RL-01", name: "المالك", members: 1, description: "صلاحيات كاملة على جميع الفروع والمالية والإعدادات." },
  { id: "RL-02", name: "مدير فرع", members: 4, description: "إدارة عمليات الفرع والموظفين والمخزون والتقارير." },
  { id: "RL-03", name: "مدير وردية", members: 6, description: "الإشراف على الكاشيرات، اعتماد المرتجعات، إغلاق الأدراج." },
  { id: "RL-04", name: "كاشير", members: 18, description: "تشغيل نقطة البيع ومعالجة المبيعات والمرتجعات بموافقة." },
  { id: "RL-05", name: "أمين مخزن", members: 5, description: "استلام المخزون، الجرد، والتعديل بموافقة." },
  { id: "RL-06", name: "محاسب", members: 2, description: "عرض المالية، تسوية النقدية، تصدير المستندات الضريبية." },
];

export const currency = (n: number) => {
  const abs = Math.abs(Math.round(n)).toLocaleString("en-US");
  return `${n < 0 ? "−" : ""}${abs} ج.م`;
};

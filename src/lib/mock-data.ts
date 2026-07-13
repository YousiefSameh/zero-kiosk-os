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
  { name: "مشروبات", value: 34 },
  { name: "وجبات خفيفة", value: 22 },
  { name: "ألبان", value: 18 },
  { name: "مستلزمات منزلية", value: 14 },
  { name: "عناية شخصية", value: 12 },
];

export const branches = [
  { id: "BR-01", name: "فرع الزمالك الرئيسي", city: "القاهرة", staff: 12, revenue: 214300, status: "نشط" },
  { id: "BR-02", name: "فرع كورنيش المعادي", city: "القاهرة", staff: 8, revenue: 168400, status: "نشط" },
  { id: "BR-03", name: "فرع شيراتون هليوبوليس", city: "القاهرة", staff: 9, revenue: 142800, status: "نشط" },
  { id: "BR-04", name: "فرع سموحة", city: "الإسكندرية", staff: 7, revenue: 121500, status: "قيد التأهيل" },
];

export const products = [
  { id: "SKU-1001", name: "كوكاكولا ٣٣٠ مل", category: "مشروبات", supplier: "كوكاكولا مصر", price: 12, cost: 8.4, stock: 480, reorder: 120, status: "متوفر" },
  { id: "SKU-1002", name: "بيبسي ٢ لتر", category: "مشروبات", supplier: "بيبسيكو مصر", price: 34, cost: 24, stock: 96, reorder: 60, status: "متوفر" },
  { id: "SKU-1003", name: "شيبسي كلاسيك", category: "وجبات خفيفة", supplier: "بيبسيكو مصر", price: 15, cost: 9.6, stock: 42, reorder: 80, status: "مخزون منخفض" },
  { id: "SKU-1004", name: "بسكويت أوريو", category: "وجبات خفيفة", supplier: "موندليز", price: 18, cost: 12, stock: 210, reorder: 60, status: "متوفر" },
  { id: "SKU-1005", name: "نسكافيه جولد ١٠٠ جم", category: "مشروبات", supplier: "نستله مصر", price: 210, cost: 168, stock: 22, reorder: 30, status: "مخزون منخفض" },
  { id: "SKU-1006", name: "جهينة لبن كامل الدسم ١ لتر", category: "ألبان", supplier: "جهينة", price: 42, cost: 32, stock: 158, reorder: 100, status: "متوفر" },
  { id: "SKU-1007", name: "دومتي جبنة فيتا ٥٠٠ جم", category: "ألبان", supplier: "دومتي", price: 78, cost: 58, stock: 8, reorder: 40, status: "حرج" },
  { id: "SKU-1008", name: "كرواسون مولتو", category: "وجبات خفيفة", supplier: "إيديتا", price: 8, cost: 5.2, stock: 340, reorder: 100, status: "متوفر" },
  { id: "SKU-1009", name: "مناديل فاين ٢٠٠ مناديل", category: "مستلزمات منزلية", supplier: "فاين", price: 28, cost: 19, stock: 74, reorder: 60, status: "متوفر" },
  { id: "SKU-1010", name: "برسيل مسحوق غسيل ٣ كجم", category: "مستلزمات منزلية", supplier: "هنكل مصر", price: 245, cost: 190, stock: 18, reorder: 25, status: "مخزون منخفض" },
  { id: "SKU-1011", name: "كولجيت توتال ١٠٠ مل", category: "عناية شخصية", supplier: "كولجيت-بالموليڤ", price: 62, cost: 42, stock: 130, reorder: 60, status: "متوفر" },
  { id: "SKU-1012", name: "هيد آند شولدرز ٤٠٠ مل", category: "عناية شخصية", supplier: "بروكتر آند جامبل مصر", price: 168, cost: 128, stock: 0, reorder: 30, status: "نفد المخزون" },
];

export const suppliers = [
  { id: "SUP-01", name: "نستله مصر", contact: "كريم يسري", phone: "٠١٠٠ ١١١ ٢٢٣٣", terms: "صافي ٣٠ يوم", rating: 4.8, openPOs: 2 },
  { id: "SUP-02", name: "كوكاكولا مصر", contact: "سارة فهمي", phone: "٠١٢٢ ٤٤٥ ٨٨٩٩", terms: "صافي ١٥ يوم", rating: 4.7, openPOs: 1 },
  { id: "SUP-03", name: "بيبسيكو مصر", contact: "عمر سالم", phone: "٠١١١ ٨٨٧ ٥٥٦٦", terms: "صافي ٣٠ يوم", rating: 4.5, openPOs: 3 },
  { id: "SUP-04", name: "جهينة للصناعات الغذائية", contact: "منى غريب", phone: "٠١٢٨ ٦٦٥ ٣٣١١", terms: "صافي ٧ أيام", rating: 4.6, openPOs: 1 },
  { id: "SUP-05", name: "إيديتا للصناعات الغذائية", contact: "هشام نبيل", phone: "٠١٠٦ ٢٢٤ ٧٧٨٨", terms: "صافي ٣٠ يوم", rating: 4.4, openPOs: 0 },
  { id: "SUP-06", name: "فاين هايجينك", contact: "رانيا عادل", phone: "٠١٠٠ ٩٩٨ ٣٣٢٢", terms: "صافي ١٥ يوم", rating: 4.3, openPOs: 0 },
  { id: "SUP-07", name: "دومتي للأغذية", contact: "ياسمين حسني", phone: "٠١٠٩ ٧٧٤ ٦٦٢١", terms: "صافي ٢١ يوم", rating: 4.5, openPOs: 1 },
];

export const purchaseOrders = [
  { id: "PO-2041", supplier: "نستله مصر", branch: "فرع الزمالك الرئيسي", items: 14, total: 48200, status: "معتمد", date: "٢٠٢٦-٠٦-٢٨", eta: "٢٠٢٦-٠٧-٠٤" },
  { id: "PO-2042", supplier: "كوكاكولا مصر", branch: "فرع كورنيش المعادي", items: 6, total: 22400, status: "قيد الانتظار", date: "٢٠٢٦-٠٦-٣٠", eta: "٢٠٢٦-٠٧-٠٦" },
  { id: "PO-2043", supplier: "جهينة للصناعات الغذائية", branch: "فرع شيراتون هليوبوليس", items: 9, total: 18650, status: "تم التسليم", date: "٢٠٢٦-٠٦-٢٤", eta: "٢٠٢٦-٠٦-٢٩" },
  { id: "PO-2044", supplier: "بيبسيكو مصر", branch: "فرع الزمالك الرئيسي", items: 22, total: 61240, status: "تم التسليم", date: "٢٠٢٦-٠٦-٢٠", eta: "٢٠٢٦-٠٦-٢٦" },
  { id: "PO-2045", supplier: "إيديتا للصناعات الغذائية", branch: "فرع سموحة", items: 11, total: 14200, status: "قيد الانتظار", date: "٢٠٢٦-٠٧-٠١", eta: "٢٠٢٦-٠٧-٠٨" },
  { id: "PO-2046", supplier: "دومتي للأغذية", branch: "فرع كورنيش المعادي", items: 5, total: 9860, status: "مُلغى", date: "٢٠٢٦-٠٦-١٨", eta: "—" },
  { id: "PO-2047", supplier: "فاين هايجينك", branch: "فرع الزمالك الرئيسي", items: 8, total: 17200, status: "معتمد", date: "٢٠٢٦-٠٧-٠٢", eta: "٢٠٢٦-٠٧-٠٩" },
];

export const customers = [
  { id: "CUS-1001", name: "أحمد حسن", phone: "٠١٠٠ ٢٢٣ ٤٤١١", visits: 42, spend: 18420, loyalty: "ذهبي", lastVisit: "٢٠٢٦-٠٧-٠٤" },
  { id: "CUS-1002", name: "محمد علي", phone: "٠١٢٢ ٦٦٤ ٧٧٨٨", visits: 28, spend: 9680, loyalty: "فضي", lastVisit: "٢٠٢٦-٠٧-٠٣" },
  { id: "CUS-1003", name: "فاطمة عادل", phone: "٠١١١ ٣٣٥ ٨٨٢٢", visits: 61, spend: 24310, loyalty: "بلاتيني", lastVisit: "٢٠٢٦-٠٧-٠٥" },
  { id: "CUS-1004", name: "نور الدين محمود", phone: "٠١٢٨ ٤٤٧ ٦٦١١", visits: 15, spend: 4820, loyalty: "فضي", lastVisit: "٢٠٢٦-٠٧-٠١" },
  { id: "CUS-1005", name: "سلمى إبراهيم", phone: "٠١٠٦ ٧٧٨ ٢٢٤٤", visits: 9, spend: 2210, loyalty: "برونزي", lastVisit: "٢٠٢٦-٠٦-٢٩" },
  { id: "CUS-1006", name: "يوسف كمال", phone: "٠١٠٠ ٥٥٥ ١١٢٢", visits: 34, spend: 12480, loyalty: "ذهبي", lastVisit: "٢٠٢٦-٠٧-٠٢" },
];

export const sales = [
  { id: "TXN-88421", cashier: "منة طارق", branch: "فرع الزمالك الرئيسي", items: 8, total: 342, method: "بطاقة", time: "١٢:٤٢", status: "مكتمل" },
  { id: "TXN-88422", cashier: "كريم فؤاد", branch: "فرع الزمالك الرئيسي", items: 3, total: 96, method: "نقدي", time: "١٢:٤٤", status: "مكتمل" },
  { id: "TXN-88423", cashier: "منة طارق", branch: "فرع الزمالك الرئيسي", items: 12, total: 812, method: "بطاقة", time: "١٢:٤٧", status: "مكتمل" },
  { id: "TXN-88424", cashier: "هناء سامي", branch: "فرع كورنيش المعادي", items: 2, total: 58, method: "نقدي", time: "١٢:٥١", status: "مُسترد" },
  { id: "TXN-88425", cashier: "أحمد نبيل", branch: "فرع شيراتون هليوبوليس", items: 5, total: 218, method: "بطاقة", time: "١٢:٥٣", status: "مكتمل" },
  { id: "TXN-88426", cashier: "منة طارق", branch: "فرع الزمالك الرئيسي", items: 1, total: 12, method: "نقدي", time: "١٢:٥٥", status: "مكتمل" },
  { id: "TXN-88427", cashier: "كريم فؤاد", branch: "فرع الزمالك الرئيسي", items: 7, total: 421, method: "محفظة", time: "١٢:٥٨", status: "مكتمل" },
];

export const employees = [
  { id: "EMP-01", name: "منة طارق", role: "كاشير", branch: "فرع الزمالك الرئيسي", shift: "صباحية", status: "نشط" },
  { id: "EMP-02", name: "كريم فؤاد", role: "كاشير", branch: "فرع الزمالك الرئيسي", shift: "مسائية", status: "نشط" },
  { id: "EMP-03", name: "هناء سامي", role: "مدير وردية", branch: "فرع كورنيش المعادي", shift: "صباحية", status: "نشط" },
  { id: "EMP-04", name: "أحمد نبيل", role: "كاشير", branch: "فرع شيراتون هليوبوليس", shift: "صباحية", status: "نشط" },
  { id: "EMP-05", name: "ليلى مصطفى", role: "مدير فرع", branch: "فرع الزمالك الرئيسي", shift: "كامل", status: "نشط" },
  { id: "EMP-06", name: "طارق صبحي", role: "أمين مخزون", branch: "فرع كورنيش المعادي", shift: "صباحية", status: "في إجازة" },
  { id: "EMP-07", name: "ندى وهبي", role: "مدير فرع", branch: "فرع سموحة", shift: "كامل", status: "نشط" },
];

export const expenses = [
  { id: "EXP-2201", category: "مرافق", vendor: "شركة كهرباء القاهرة", amount: 8420, date: "٢٠٢٦-٠٧-٠١", branch: "فرع الزمالك الرئيسي", status: "مدفوع" },
  { id: "EXP-2202", category: "إيجار", vendor: "النيل العقارية", amount: 42000, date: "٢٠٢٦-٠٧-٠١", branch: "فرع كورنيش المعادي", status: "مدفوع" },
  { id: "EXP-2203", category: "صيانة", vendor: "كول إير للخدمات", amount: 3200, date: "٢٠٢٦-٠٦-٢٨", branch: "فرع شيراتون هليوبوليس", status: "قيد الانتظار" },
  { id: "EXP-2204", category: "تسويق", vendor: "إعلانات ميتا", amount: 6800, date: "٢٠٢٦-٠٦-٢٥", branch: "جميع الفروع", status: "مدفوع" },
  { id: "EXP-2205", category: "مستلزمات", vendor: "أوفيس ماكس مصر", amount: 1420, date: "٢٠٢٦-٠٦-٢٢", branch: "فرع الزمالك الرئيسي", status: "مدفوع" },
];

export const activity = [
  { id: 1, user: "ليلى مصطفى", action: "اعتمدت أمر الشراء PO-2041 من نستله مصر", time: "منذ ٢ دقيقة", type: "purchase" },
  { id: 2, user: "منة طارق", action: "أنجزت استرداد على المعاملة TXN-88424", time: "منذ ٨ دقائق", type: "sale" },
  { id: 3, user: "النظام", action: "تنبيه مخزون منخفض: شيبسي كلاسيك (٤٢ وحدة)", time: "منذ ٢٢ دقيقة", type: "alert" },
  { id: 4, user: "كريم فؤاد", action: "أغلق درج النقد بمبلغ ١٢٬٤٢٠ ج.م.", time: "منذ ساعة", type: "cash" },
  { id: 5, user: "هناء سامي", action: "استلمت شحنة أمر الشراء PO-2043 (جهينة)", time: "منذ ساعتين", type: "purchase" },
  { id: 6, user: "طارق صبحي", action: "عدّل المخزون: +١٨ بسكويت أوريو", time: "منذ ٣ ساعات", type: "inventory" },
  { id: 7, user: "ندى وهبي", action: "أضافت كاشير جديد إلى فرع سموحة", time: "منذ ٥ ساعات", type: "user" },
];

export const notifications = [
  { id: 1, title: "دومتي فيتا ٥٠٠ جم عند مستوى حرج", desc: "لم يتبقَ سوى ٨ وحدات في جميع الفروع. إعادة طلب مقترحة: ٦٠.", time: "منذ ١٢ دقيقة", unread: true, kind: "warning" },
  { id: 2, title: "تم تسليم أمر الشراء PO-2043", desc: "تم استلام شحنة جهينة في فرع شيراتون هليوبوليس بواسطة هناء سامي.", time: "منذ ساعة", unread: true, kind: "success" },
  { id: 3, title: "اكتُشف فرق في النقدية", desc: "فرق إغلاق مسائي في فرع الزمالك الرئيسي بقيمة ‎−٨٤ ج.م.", time: "منذ ٣ ساعات", unread: true, kind: "warning" },
  { id: 4, title: "التقرير الأسبوعي جاهز", desc: "ملخص العمليات للفترة ٢٨ يونيو – ٤ يوليو أصبح جاهزًا.", time: "أمس", unread: false, kind: "info" },
  { id: 5, title: "تم إقران جهاز جديد", desc: "تم تسجيل نقطة البيع POS-Terminal-04 في فرع كورنيش المعادي.", time: "منذ يومين", unread: false, kind: "info" },
];

export type NotificationCategory = "sales" | "inventory" | "suppliers" | "customers" | "system" | "backups";

export const notificationFeed: Array<{
  id: string;
  category: NotificationCategory;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
  actionHref?: string;
  meta?: string;
}> = [
  { id: "n-101", category: "sales", title: "تجاوزت مبيعات اليوم ٥٠ ألف ج.م", desc: "فرع الزمالك الرئيسي حقّق ٥٢٬٣٠٠ ج.م بزيادة ١٦٪ عن أمس.", time: "منذ ٤ دقائق", unread: true, actionLabel: "عرض التقرير", actionHref: "/reports" },
  { id: "n-102", category: "inventory", title: "دومتي فيتا ٥٠٠ جم عند المستوى الحرج", desc: "لم يتبقَ سوى ٨ وحدات في جميع الفروع. إعادة طلب مقترحة: ٦٠.", time: "منذ ١٢ دقيقة", unread: true, actionLabel: "إنشاء أمر شراء", actionHref: "/purchase-orders", meta: "SKU-1007" },
  { id: "n-103", category: "suppliers", title: "تم تسليم أمر الشراء PO-2043", desc: "تم استلام شحنة جهينة في فرع شيراتون هليوبوليس بواسطة هناء سامي.", time: "منذ ساعة", unread: true, actionLabel: "فتح الأمر", actionHref: "/purchase-orders", meta: "PO-2043" },
  { id: "n-104", category: "system", title: "اكتُشف فرق في النقدية بقيمة ‎−٨٤ ج.م", desc: "فرق إغلاق وردية مسائية في فرع الزمالك الرئيسي — مراجعة مطلوبة.", time: "منذ ٣ ساعات", unread: true, actionLabel: "مراجعة الوردية", actionHref: "/finance" },
  { id: "n-105", category: "customers", title: "فاطمة عادل ترقّت إلى المستوى البلاتيني", desc: "بلغ إجمالي إنفاقها ٢٤٬٣١٠ ج.م خلال آخر ٩٠ يومًا.", time: "منذ ٥ ساعات", unread: true, actionLabel: "عرض الملف", actionHref: "/customers", meta: "CUS-1003" },
  { id: "n-106", category: "backups", title: "اكتمل النسخ الاحتياطي اليومي بنجاح", desc: "تم رفع ٢٫٤ جيجابايت إلى التخزين السحابي المشفّر — نقطة استعادة جديدة متاحة.", time: "منذ ٦ ساعات", unread: false, meta: "٠٤:٠٠ ص" },
  { id: "n-107", category: "sales", title: "استرداد فاتورة TXN-88424", desc: "طُلب استرداد بقيمة ٥٨ ج.م بواسطة هناء سامي — تم الاعتماد.", time: "أمس", unread: false, actionLabel: "عرض الفاتورة", actionHref: "/sales", meta: "TXN-88424" },
  { id: "n-108", category: "inventory", title: "هيد آند شولدرز ٤٠٠ مل — نفد المخزون", desc: "لا يوجد رصيد في أي فرع. آخر بيع كان منذ يومين.", time: "أمس", unread: false, actionLabel: "طلب توريد عاجل", actionHref: "/purchase-orders", meta: "SKU-1012" },
  { id: "n-109", category: "suppliers", title: "تحديث شروط الدفع — نستله مصر", desc: "الشروط الجديدة: صافي ٤٥ يومًا بدلًا من ٣٠ يومًا اعتبارًا من الشهر القادم.", time: "أمس", unread: false, actionLabel: "مراجعة المورد", actionHref: "/suppliers", meta: "SUP-01" },
  { id: "n-110", category: "system", title: "تم إقران جهاز جديد POS-Terminal-04", desc: "تم تسجيل الجهاز في فرع كورنيش المعادي وربطه بحساب كريم فؤاد.", time: "منذ يومين", unread: false },
  { id: "n-111", category: "customers", title: "٣ عملاء جدد انضموا لبرنامج الولاء", desc: "تم تسجيل: منى شاكر، طارق حسن، وسلمى مجدي.", time: "منذ يومين", unread: false, actionHref: "/customers" },
  { id: "n-112", category: "backups", title: "تحذير: مساحة الأرشيف اقتربت من الحد الأقصى", desc: "استُخدم ٨٦٪ من مساحة الأرشيف السحابي — يُنصح بترقية الخطة.", time: "منذ ٣ أيام", unread: false, actionLabel: "ترقية الخطة", actionHref: "/settings" },
];

export const roles = [
  { id: "RL-01", name: "المالك", members: 1, description: "صلاحيات كاملة على جميع الفروع والمالية والإعدادات." },
  { id: "RL-02", name: "مدير الفرع", members: 4, description: "إدارة عمليات الفرع والفريق والمخزون والتقارير." },
  { id: "RL-03", name: "مدير الوردية", members: 6, description: "الإشراف على الكاشير واعتماد الاسترجاعات وإغلاق أدراج النقد." },
  { id: "RL-04", name: "كاشير", members: 18, description: "تشغيل نقطة البيع ومعالجة المبيعات وتنفيذ المرتجعات باعتماد." },
  { id: "RL-05", name: "أمين مخزون", members: 5, description: "استلام البضائع وجرد المخزون والتعديل عليه باعتماد." },
  { id: "RL-06", name: "محاسب", members: 2, description: "عرض المالية وتسوية النقدية وتصدير المستندات الضريبية." },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

export const num = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

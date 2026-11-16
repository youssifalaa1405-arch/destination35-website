/* Destination 35 — menus for every branch, the signature-products wheel and the menu browser.
   Source: the brand's own menu PDFs linked from linktr.ee/destination.35
     quds     "Destination 35 Menu Street"   (Al Quds Street)
     seafront "Destination 35 Takya Menu"    (Sea Front)
     drive    "Destination 35 Menu Branches" (Al Shati, Al Hadla) and "Menu Hospital" (identical)
   Prices are in Saudi riyals. Item: [English, Arabic, price, note EN, note AR]. */
(function () {
  const C = {
    coldCoffee: ['Cold coffee', 'القهوة الباردة'], hotCoffee: ['Hot coffee', 'القهوة الساخنة'],
    coldDrinks: ['Cold drinks', 'المشروبات الباردة'], hotDrinks: ['Hot drinks', 'المشروبات الساخنة'],
    breakfast: ['Breakfast', 'الفطور'], sandwiches: ['Sandwiches', 'الساندويشات'],
    croissants: ['Croissants and croffins', 'الكروسان والكروفن'], pudding: ['Pudding', 'البودنق'],
    sweets: ['Sweets', 'الحلويات'], cookies: ['Cookies', 'الكوكيز'], boxes: ['Destination boxes', 'بوكسات الوجهة'],
    addons: ['Add-ons', 'الإضافات'], toast: ['Mini French toast', 'ميني فرنش توست'], chockies: ['Cookies and chockies', 'الكوكيز والشوكيز']
  };
  const SL = ['Small / large', 'صغير / كبير'];

  const MENUS = {
    quds: [
      { c: 'coldCoffee', items: [
        ['V60', 'V60', 20], ['Cold Brew', 'كولد برو', 20], ['Iced Matcha', 'ايس ماتشا', 22], ['Pink Matcha', 'بينك ماتشا', 25],
        ['Cloudy Matcha', 'كلاودي ماتشا', 25], ['Matcha Cotton Candy', 'ماتشا كوتن كاندي', 28], ['Iced Freddo', 'ايس فريدو', 12],
        ['Iced Americano', 'ايس امريكانو', 15], ['Iced Latte', 'ايس لاتيه', 19], ['Iced Spanish Latte', 'ايس سبانش لاتيه', 22],
        ['Iced Pistachio Latte', 'ايس بيستاشيو لاتيه', 23], ['Iced Vanilla Latte', 'ايس فانيلا لاتيه', 20],
        ['Shaken White Mocha', 'شيكن وايت موكا', 21], ['Iced Hazelnut Latte', 'ايس لاتيه البندق', 18],
        ['Iced White Mocha', 'ايس وايت موكا', 20], ['Iced Dark Mocha', 'ايس دارك موكا', 20], ['Iced Kinder Latte', 'ايس كندر لاتيه', 22],
        ['Iced Salted Caramel Latte', 'لاتيه الكراميل المملح البارد', 20] ] },
      { c: 'hotCoffee', items: [
        ['V60', 'V60', 20], ['Coffee of the Day', 'قهوة اليوم', 7], ['Espresso', 'اسبريسو', 10], ['Americano', 'امريكانو', 12],
        ['Cappuccino', 'كابتشينو', 18], ['Matcha', 'ماتشا', 22], ['Cortado', 'كورتادو', 17], ['Flat White', 'فلات وايت', 18],
        ['Latte', 'لاتيه', 19], ['Spanish Latte', 'سبانش لاتيه', 22], ['Vanilla Latte', 'فانيلا لاتيه', 20],
        ['White Mocha', 'وايت موكا', 23], ['Dark Mocha', 'دارك موكا', 20], ['Pistachio Latte', 'بيستاشيو لاتيه', 23] ] },
      { c: 'coldDrinks', items: [
        ['Lemon Iced Tea', 'شاي مثلج بالليمون', 22], ['Peach Iced Tea', 'شاي مثلج بالخوخ', 22], ['Muhabak', 'محبك', 21],
        ['Qatifi Lemon', 'ليمون قطيفي', 12], ['Orange Juice', 'عصير برتقال', 12], ['Orange Passion Fruit', 'برتقال بالباشن فروت', 20],
        ['Iced Hibiscus', 'كركديه بارد', 20], ['Berry Hibiscus', 'كركديه توت', 20], ['Passion Fruit Hibiscus', 'كركديه بالباشن فروت', 20],
        ['Pink Lemonade', 'بينك ليمونادا', 20], ['Ocean Mojito', 'موهيتو اوشن', 17], ['Strawberry Mojito', 'موهيتو فراولة', 17],
        ['Passion Mojito', 'موهيتو باشن', 22], ['Bella Ciao Mojito', 'موهيتو بيلا تشاو', 21], ['+966 Mojito', 'موهيتو +966', 21] ] },
      { c: 'hotDrinks', items: [
        ['Custard', 'كاسترد', 15], ['Sahlab', 'سحلب', 14], ['Hot Chocolate', 'هوت شوكلت', 15], ['Special Hot Chocolate', 'سبيشل هوت شوكلت', 19],
        ['Black Tea', 'شاي أسود', 5], ['Green Tea', 'شاي أخضر', 7], ['Karak Tea', 'شاي كرك', 8] ] },
      { c: 'breakfast', items: [
        ['Cheese Omelette Plate', 'طبق أومليت بالجبن', 26], ['White Beans with Cheese', 'مكس فاصوليا بالجبن', 21], ['Special Egg', 'البيض الخاص', 21],
        ['Halloumi Labneh', 'حلومي لبنة', 28], ['Scrambled Egg Quesadilla', 'كاسديا سكرامبل', 28], ['Hash Brown Quesadilla', 'كاسديا هاش براون', 24],
        ['Guacamole Halloumi', 'غواكمولي حلوم', 28], ['Mushroom Scramble', 'سكرامبل مشروم', 25], ['Guacamole Scramble', 'غواكمولي سكرامبل', 26],
        ['Falafel Plate', 'فلافل بليت', 22], ['Falafel Hash Brown', 'فلافل هاش براون', 22], ['Hash Brown with Egg Balls', 'هاش براون بكرات البيض', 22],
        ['Avocado Scramble', 'أفوكادو سكرامبل', 25], ['Ramsi Shakshuka', 'شكشوكة رامسية', 25] ] },
      { c: 'sandwiches', items: [
        ['Turkey Sandwich', 'تركي ساندويش', 27], ['Halloumi Sandwich', 'حلومي ساندويش', 23], ['Truffle Ciabatta', 'ترافل شيباتا', 22],
        ['Tuna Ciabatta', 'تونة شيباتا', 21], ['Shakshuka Ciabatta', 'شكشوكة شيباتا', 20], ['Omelette Ciabatta', 'أومليت شيباتا', 18],
        ['Turkey Club Sandwich', 'تركي كلوب ساندويش', 28] ] },
      { c: 'croissants', items: [
        ['Butter Croissant', 'كروسان زبدة', 12], ['Chocolate Croissant', 'كروسان شوكولاتة', 17], ['Cheese Croissant', 'كروسان جبن', 15],
        ['Zaatar Croissant', 'كروسان زعتر', 15], ['Pecan Croissant', 'كروسان بيكان', 18], ['Pecan Croffin', 'كروفن بيكان', 20],
        ['Raspberry Croffin', 'كروفن رازبيري', 20] ] },
      { c: 'pudding', items: [
        ['Kinder Pudding', 'بودنق كيندر', 24], ['Honey Pudding', 'بودنق عسل', 24], ['Scoop Cookies', 'سكوب كوكيز', 25],
        ['Belgian Chocolate Pudding', 'بودنق شوكولاتة بلجيكي', 21], ['Crispy Pudding', 'بودنق خشخش', 25] ] },
      { c: 'sweets', items: [
        ['Belgian Chocolate Molten', 'مولتن شوكولاتة بلجيكي', 29], ['Dubai Molten', 'مولتن دبي', 32], ['Kinder Oreo Molten', 'مولتن كيندر أوريو', 29],
        ['French Toast', 'فرنش توست', 27], ['Chockies, Kinder or Belgian', 'شوكيز كيندر / بلجيكي', 27], ['Waffle Fries', 'وافل فرايز', 18],
        ['Um Ali', 'أم علي', 20] ] },
      { c: 'cookies', items: [
        ['Double Chocolate Cookies', 'كوكيز دبل شوكلت', 29], ['Belgian Cookies', 'كوكيز بلجيكي', 16], ['Kinder Cookies', 'كوكيز كيندر', 16] ] },
      { c: 'boxes', items: [
        ['Breakfast Box', 'بوكس الفطور', 105, 'Six sandwiches of your choice', '6 ساندويشات مختلفة من اختيارك'],
        ['Coffee Box, one crop', 'بوكس القهوة، محصول واحد', 67, '250 g coffee, 5 cups and 5 filters', '250 جرام قهوة + 5 أكواب + 5 فلاتر'],
        ['Coffee Box, two crops', 'بوكس القهوة، محصولين', 95, '500 g coffee, 5 cups and 5 filters', '500 جرام قهوة + 5 أكواب + 5 فلاتر'],
        ['French Toast Box', 'بوكس الفرنش توست', 115, 'Six pieces of French toast of your choice', '6 حبات فرنش توست من اختيارك'],
        ['Family Pudding Box', 'بوكس فاميلي بودنق', 119, 'Classic pudding or crispy pudding', 'كلاسيك بودنق أو خشخش بودنق'],
        ['Drinks Box, 10 drinks', 'بوكس المشروبات، 10 مشروبات', 200], ['Drinks Box, 15 drinks', 'بوكس المشروبات، 15 مشروب', 250] ] }
    ],
    seafront: [
      { c: 'coldCoffee', items: [
        ['V60', 'V60', 23], ['Cold Brew', 'كولد برو', 23], ['Iced Matcha', 'ايس ماتشا', 26], ['Pink Matcha', 'بينك ماتشا', 29],
        ['Cloudy Matcha', 'كلاودي ماتشا', 29], ['Candy Matcha', 'كاندي ماتشا', 32], ['Iced Freddo', 'ايس فريدو', 14],
        ['Iced Americano', 'ايس امريكانو', 18], ['Iced Latte', 'ايس لاتيه', 22], ['Iced Spanish Latte', 'ايس سبانش لاتيه', 25],
        ['Iced Pistachio Latte', 'ايس بيستاشيو لاتيه', 27], ['Iced Vanilla Latte', 'ايس فانيلا لاتيه', 23],
        ['Shaken White Mocha', 'شيكن وايت موكا', 24], ['Iced Hazelnut Latte', 'ايس لاتيه البندق', 21],
        ['Iced White Mocha', 'ايس وايت موكا', 23], ['Iced Dark Mocha', 'ايس دارك موكا', 23], ['Iced Kinder Latte', 'ايس كندر لاتيه', 26],
        ['Iced Salted Caramel Latte', 'لاتيه الكراميل', 23] ] },
      { c: 'hotCoffee', items: [
        ['V60', 'V60', 23], ['Yemeni V60', 'V60 يمني', 25], ['Coffee of the Day', 'قهوة اليوم', 10], ['Espresso', 'اسبريسو', 12],
        ['Americano', 'امريكانو', 14], ['Cappuccino', 'كابتشينو', 21], ['Matcha', 'ماتشا', 26], ['Cortado', 'كورتادو', 20],
        ['Flat White', 'فلات وايت', 21], ['Latte', 'لاتيه', 22], ['Spanish Latte', 'سبانش لاتيه', 25], ['Vanilla Latte', 'فانيلا لاتيه', 23],
        ['White Mocha', 'وايت موكا', 27], ['Dark Mocha', 'دارك موكا', 23], ['Pistachio Latte', 'بيستاشيو لاتيه', 27] ] },
      { c: 'coldDrinks', items: [
        ['Lemon Iced Tea', 'شاي مثلج بالليمون', 26], ['Peach Iced Tea', 'شاي مثلج بالخوخ', 26], ['Muhabak', 'محبك', 24],
        ['Qatifi Lemon', 'ليمون قطيفي', 14], ['Orange Juice', 'عصير برتقال', 14], ['Orange Passion Fruit', 'برتقال بالباشن فروت', 23],
        ['Iced Hibiscus', 'كركديه بارد', 23], ['Berry Hibiscus', 'كركديه توت', 23], ['Passion Fruit Hibiscus', 'كركديه بالباشن فروت', 23],
        ['Pink Lemonade', 'بينك ليمونادا', 23], ['Ocean Mojito', 'موهيتو اوشن', 23], ['Strawberry Mojito', 'موهيتو فراولة', 23],
        ['Passion Mojito', 'موهيتو باشن', 25], ['Bella Ciao Mojito', 'موهيتو بيلا تشاو', 24], ['+966 Mojito', 'موهيتو +966', 24] ] },
      { c: 'hotDrinks', items: [
        ['Custard', 'كاسترد', 17], ['Sahlab', 'سحلب', 16], ['Hot Chocolate', 'هوت شوكولاتة', 18], ['Special Hot Chocolate', 'سبيشل هوت شوكولاتة', 22],
        ['Black Tea', 'شاي أسود', 6], ['Green Tea', 'شاي أخضر', 8], ['Karak Tea', 'شاي كرك', 10] ] },
      { c: 'croissants', items: [
        ['Butter Croissant', 'كرواسان زبدة', 14], ['Chocolate Croissant', 'كرواسان شوكولاتة', 20], ['Cheese Croissant', 'كرواسان جبن', 18],
        ['Zaatar Croissant', 'كرواسان زعتر', 18], ['Pecan Croissant', 'كرواسان بيكان', 21], ['Pecan Croffin', 'كروفن بيكان', 23],
        ['Raspberry Croffin', 'كروفن راسبيري', 23] ] },
      { c: 'pudding', items: [
        ['Kinder Pudding', 'بودنق كيندر', 28], ['Honey Pudding', 'بودنق عسل', 28], ['Scoop Cookies', 'سكوب كوكيز', 29],
        ['Belgian Chocolate Pudding', 'بودنق شوكولاتة بلجيكي', 25], ['Crispy Pudding', 'بودنق خشخاش', 29] ] },
      { c: 'sweets', items: [
        ['Belgian Chocolate Molten', 'مولتن شوكولاتة بلجيكي', 34], ['Dubai Molten', 'مولتن دبي', 35], ['Kinder Oreo Molten', 'مولتن كيندر أوريو', 34],
        ['French Toast', 'فرنش توست', 31], ['Kinder Chockies', 'شوكيز كيندر', 31], ['Belgian Chockies', 'شوكيز بلجيكي', 31], ['Um Ali', 'أم علي', 23] ] },
      { c: 'cookies', items: [
        ['Double Chocolate Cookies', 'دبل شوكلت كوكيز', 32], ['Kinder Cookies', 'كوكيز كيندر', 19], ['Belgian Cookies', 'كوكيز بلجيكي', 19] ] },
      { c: 'addons', items: [
        ['Sauce', 'صوص', 5], ['Syrup', 'سيرب', 5], ['Coconut milk', 'حليب جوز هند', 4], ['Almond milk', 'حليب لوز', 4],
        ['Lactose-free milk', 'حليب فري لاكتوز', 4], ['Low-fat milk', 'حليب قليل الدسم', 4], ['Glass cup', 'كوب زجاج', 4],
        ['Vanilla ice cream', 'ايس كريم فانيلا', 4], ['Candy ice cream', 'ايس كريم كاندي', 6], ['Large cup, 16 oz', 'كوب كبير 16 أونز', 5],
        ['Espresso shot', 'شوت اسبريسو', 5] ] }
    ],
    drive: [
      { c: 'coldCoffee', items: [
        ['V60', 'V60', 17], ['Cold Brew', 'كولد برو', 20], ['Iced Americano', 'امريكانو', 13], ['Iced Freddo', 'فريدو', 12],
        ['Iced Matcha', 'ماتشا', 22], ['Iced Pink Matcha', 'بينك ماتشا', 25], ['Iced Cloudy Matcha', 'كلاودي ماتشا', 25],
        ['Date Matcha', 'ماتشا الرطب', 23], ['Date Latte', 'لاتيه الرطب', 18], ['Iced Latte', 'لاتيه', 18],
        ['Iced Spanish Latte', 'سبانش لاتيه', 20], ['Iced Vanilla Latte', 'فانيلا لاتيه', 20], ['Iced Kinder Latte', 'كيندر لاتيه', 22],
        ['Iced Pistachio Latte', 'بيستاشيو لاتيه', 22], ['Iced White or Dark Mocha', 'دارك / وايت موكا', 20],
        ['Iced Salted Caramel Latte', 'سولتد كراميل', 20], ['Coffee of the Day', 'قهوة اليوم', 7] ] },
      { c: 'hotCoffee', items: [
        ['V60', 'V60', 17], ['Espresso', 'اسبريسو', 8], ['Americano', 'امريكانو', 12], ['Matcha', 'ماتشا', 22], ['Latte', 'لاتيه', 17],
        ['Spanish Latte', 'سبانش لاتيه', 20], ['Vanilla Latte', 'فانيلا لاتيه', 20], ['Kinder Latte', 'كيندر لاتيه', 22],
        ['Pistachio Latte', 'بيستاشيو لاتيه', 22], ['White or Dark Mocha', 'دارك / وايت موكا', 20], ['Cappuccino', 'كابتشينو', 16],
        ['Cortado', 'كورتادو', 15], ['Flat White', 'فلات وايت', 16], ['Coffee of the Day', 'قهوة اليوم', 7] ] },
      { c: 'coldDrinks', items: [
        ['Lemon Iced Tea', 'ايس تي ليمون', 17], ['Peach Iced Tea', 'ايس تي خوخ', 17], ['Ocean Mojito', 'بلو أوشن', 17],
        ['Strawberry Mojito', 'فراولة موهيتو', 17], ['Passion Mojito', 'باشن موهيتو', 19], ['Bella Ciao Mojito', 'بيلا تشاو موهيتو', 21],
        ['+966 Mojito', 'موهيتو +966', 21], ['Hibiscus', 'كركديه', 17], ['Berry Hibiscus', 'كركديه توت', 19],
        ['Passion Fruit Hibiscus', 'كركديه باشن فروت', 19], ['Orange Passion Fruit', 'برتقال باشن فروت', 20],
        ['Fresh Orange', 'برتقال فريش', 12], ['Qatifi Lemon', 'ليمون قطيفي', 12] ] },
      { c: 'hotDrinks', items: [
        ['Tea', 'شاي', 5], ['Karak Tea', 'كرك', 5], ['Sahlab', 'سحلب', 14], ['Hot Chocolate', 'هوت شوكلت', 15], ['Custard', 'كاسترد', 15] ] },
      { c: 'sandwiches', items: [
        ['Truffle Tortilla', 'ترافل تورتيلا', '7 / 10', SL[0], SL[1]], ['Potato Tortilla', 'بطاطس تورتيلا', '7 / 10', SL[0], SL[1]],
        ['Shakshuka Tortilla', 'شكشوكة تورتيلا', '6 / 9', SL[0], SL[1]], ['Omelette Tortilla', 'أومليت تورتيلا', '5 / 8', SL[0], SL[1]],
        ['Falafel Tortilla', 'فلافل تورتيلا', '5 / 8', SL[0], SL[1]], ['Mixed Cheese Tortilla', 'مكس تشيز تورتيلا', '7 / 10', SL[0], SL[1]],
        ['Halloumi Ciabatta', 'حلوم شيباتا', 18] ] },
      { c: 'croissants', items: [
        ['Plain Croissant', 'كرواسان سادة', 12], ['Chocolate Croissant', 'كرواسان شوكولاتة', 17], ['Cheese Croissant', 'كرواسان جبن', 15],
        ['Zaatar Croissant', 'كرواسان زعتر', 15], ['Pecan Croissant', 'كرواسان بيكان', 18], ['Almond Croissant', 'كرواسان لوز', 18],
        ['Pecan Croffin', 'كروفن بيكان', 20], ['Raspberry Croffin', 'كروفن ريسبري', 20] ] },
      { c: 'toast', items: [
        ['Kinder', 'كيندر', 15], ['Belgian', 'بلجيكي', 15], ['Pistachio', 'بستاشيو', 15], ['Caramel', 'كراميل', 15],
        ['Cinnamon', 'سينامون', 15], ['Nutella', 'نوتيلا', 15], ['White Chocolate', 'وايت شوكلت', 15] ] },
      { c: 'pudding', items: [
        ['Date Pudding', 'بودنق الرطب', 20], ['M&M’s Pudding', 'بودنق ام ام اس', 20], ['Kinder Pudding', 'بودنق كيندر', 24],
        ['Mango Pudding', 'بودنق مانجو', 24], ['Honey Pudding', 'بودنق عسل', 24], ['Belgian Pudding', 'بودنق بلجيكي', 21],
        ['Crispy Pudding', 'بودنق كريسبي', 25] ] },
      { c: 'sweets', items: [
        ['Kinder Oreo Molten', 'مولتن أوريو كيندر', 29], ['Belgian Molten', 'مولتن بلجيكي', 29], ['Dubai Chocolate Molten', 'مولتن شوكولاتة دبي', 32] ] },
      { c: 'chockies', items: [
        ['Belgian Cookies', 'كوكيز بلجيكي', 16], ['Kinder Cookies', 'كوكيز كيندر', 16], ['Belgian Chockies', 'شوكيز بلجيكي', 27],
        ['Kinder Chockies', 'شوكيز كيندر', 27] ] }
    ]
  };

  const BRANCHES = [
    { id: 'quds', en: 'Al Quds Street', ar: 'شارع القدس', pdf: 'https://drive.google.com/file/d/1mX4WiVLnsdugH8JgIE4f4u9F7Ih4kpI7/view' },
    { id: 'seafront', en: 'Sea Front', ar: 'السي فرونت', pdf: 'https://drive.google.com/file/d/1q2YiZ7YISx_HVzeymWhat8s3vsu5DBG5/view' },
    { id: 'drive', en: 'Drive-thru and hospital', ar: 'الدرايف ثرو والمستشفى', pdf: 'https://drive.google.com/file/d/1jxlu-Da5Pu5atr--MphRLE71E1SqGlqq/view' }
  ];

  /* the products we have real cut-out photographs of; prices are read from the Al Quds Street menu */
  const SIGNATURES = [
    { name: 'Iced Pistachio Latte', img: 'm-latte', cat: 'coldCoffee' },
    { name: 'Butter Croissant', img: 'm-croissant', cat: 'croissants' },
    { name: 'Dubai Molten', img: 'm-kunafa', cat: 'sweets' },
    { name: 'Iced Hibiscus', img: 'm-hibiscus', cat: 'coldDrinks' },
    { name: 'Scoop Cookies', img: 'm-cookies', cat: 'pudding' },
    { name: 'Halloumi Labneh', img: 'm-toast', cat: 'breakfast' },
    { name: 'Belgian Chocolate Molten', img: 'm-choco', cat: 'sweets' }
  ].map(s => {
    const it = MENUS.quds.find(c => c.c === s.cat).items.find(i => i[0] === s.name);
    return Object.assign(s, { en: it[0], ar: it[1], price: it[2] });
  });
  const THUMB = {}; SIGNATURES.forEach(s => { THUMB[s.en] = s.img; });

  const UI = {
    en: { sar: 'SAR', search: 'Search the menu', none: 'Nothing on this menu matches', results: 'Results', items: 'items', pdf: 'Open this menu as a PDF', see: 'See it on the menu', of: '/' },
    ar: { sar: 'ر.س', search: 'ابحث في المنيو', none: 'لا يوجد في هذا المنيو ما يطابق', results: 'النتائج', items: 'صنف', pdf: 'افتح هذا المنيو PDF', see: 'شاهده في المنيو', of: '/' }
  };
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isAr = () => (window.D35_LANG || 'en') === 'ar';
  const L = () => (isAr() ? 1 : 0);
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* =====================================================================
     Menu browser: branch switch, category list, search
     ===================================================================== */
  const el = { branches: $('#fmBranches'), cats: $('#fmCats'), panel: $('#fmPanel'), search: $('#fmSearch'), pdf: $('#fmPdf'), count: $('#fmCount') };
  const state = { branch: 'quds', cat: 'coldCoffee', q: '' };

  function rowHTML(it) {
    const t = THUMB[it[0]];
    return `<li class="fm__row${t ? ' has-thumb' : ''}">
      ${t ? `<img class="fm__thumb" src="assets/img/${t}.webp" alt="" loading="lazy">` : ''}
      <span class="fm__name">${esc(it[L()])}${it[3] ? `<small>${esc(it[3 + L()])}</small>` : ''}</span>
      <span class="fm__dots" aria-hidden="true"></span>
      <span class="fm__price">${esc(it[2])}</span>
    </li>`;
  }
  function signHTML(i, name, n) {
    return `<header class="sign"><span class="sign__km"><small>KM</small>${String(i).padStart(2, '0')}</span>
      <h3 class="sign__name">${esc(name)}</h3><span class="sign__n">${n} ${n === 1 && !isAr() ? 'item' : UI[isAr() ? 'ar' : 'en'].items}</span></header>`;
  }

  function renderBranches() {
    el.branches.innerHTML = BRANCHES.map(b => `<button type="button" role="tab" data-b="${b.id}" aria-selected="${b.id === state.branch}">${isAr() ? b.ar : b.en}</button>`).join('');
    $$('button', el.branches).forEach(b => b.addEventListener('click', () => {
      if (state.branch === b.dataset.b) return;
      state.branch = b.dataset.b;
      const menu = MENUS[state.branch];
      if (!menu.some(c => c.c === state.cat)) state.cat = menu[0].c;
      renderBranches(); renderCats(); renderPanel(true);
    }));
    const br = BRANCHES.find(b => b.id === state.branch);
    el.pdf.href = br.pdf;
    el.pdf.textContent = UI[isAr() ? 'ar' : 'en'].pdf;
    el.search.placeholder = UI[isAr() ? 'ar' : 'en'].search;
    el.search.setAttribute('aria-label', UI[isAr() ? 'ar' : 'en'].search);
  }
  function renderCats() {
    const menu = MENUS[state.branch];
    el.cats.innerHTML = menu.map((c, i) => `<li><button type="button" data-c="${c.c}" aria-pressed="${!state.q && c.c === state.cat}">
      <i>${String(i + 1).padStart(2, '0')}</i><span>${C[c.c][L()]}</span><small>${c.items.length}</small></button></li>`).join('');
    $$('button', el.cats).forEach(b => b.addEventListener('click', () => {
      state.cat = b.dataset.c; state.q = ''; el.search.value = '';
      renderCats(); renderPanel(true);
      b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    }));
    const total = menu.reduce((n, c) => n + c.items.length, 0);
    el.count.textContent = `${total} ${UI[isAr() ? 'ar' : 'en'].items}`;
  }
  function renderPanel(animate) {
    const menu = MENUS[state.branch];
    const ui = UI[isAr() ? 'ar' : 'en'];
    let html = '';
    if (state.q) {
      const q = state.q.toLowerCase();
      const groups = menu.map((c, i) => ({ c, i, items: c.items.filter(it => it[0].toLowerCase().includes(q) || it[1].includes(state.q)) })).filter(g => g.items.length);
      html = groups.length
        ? groups.map(g => `${signHTML(g.i + 1, C[g.c.c][L()], g.items.length)}<ul class="fm__list">${g.items.map(rowHTML).join('')}</ul>`).join('')
        : `<p class="fm__none">${ui.none} “${esc(state.q)}”.</p>`;
    } else {
      const i = menu.findIndex(c => c.c === state.cat);
      const c = menu[i];
      html = `${signHTML(i + 1, C[c.c][L()], c.items.length)}<ul class="fm__list">${c.items.map(rowHTML).join('')}</ul>`;
    }
    el.panel.innerHTML = html;
    if (animate && !reduce && window.gsap) {
      gsap.fromTo($$('.sign', el.panel), { rotation: -5, y: -14, opacity: 0, transformOrigin: '20% 0%' }, { rotation: 0, y: 0, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.6)' });
      gsap.fromTo($$('.fm__row', el.panel), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.022, delay: 0.05, clearProps: 'transform,opacity' });
      gsap.fromTo($$('.fm__thumb', el.panel), { scale: 0.4, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)', delay: 0.15, clearProps: 'transform' });
    }
  }
  function showInMenu(catKey) {
    state.branch = 'quds'; state.cat = catKey; state.q = ''; el.search.value = '';
    renderBranches(); renderCats(); renderPanel(true);
    const y = $('#full-menu').getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y + 4, behavior: reduce ? 'auto' : 'smooth' });
  }
  if (el.panel) {
    let t;
    el.search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { state.q = el.search.value.trim(); renderCats(); renderPanel(true); }, 140); });
    renderBranches(); renderCats(); renderPanel(false);
  }

  /* =====================================================================
     Signature products: a turntable that the scroll rotates
     ===================================================================== */
  const sig = $('#menu'), wheel = $('#sigWheel');
  const STEP = 44; // degrees between products on the wheel
  let sigIdx = -1, lastPrice = 0, items = [];

  function buildSig() {
    if (!sig) return;
    const ar = isAr();
    wheel.innerHTML = SIGNATURES.map((s, i) => `<figure class="sig__item" data-i="${i}" style="--a:${i * STEP}deg"><img src="assets/img/${s.img}.webp" alt="${esc(ar ? s.ar : s.en)}" decoding="sync" draggable="false"></figure>`).join('');
    items = $$('.sig__item', wheel);
    // decode every photo up front, so none pops in late when it first reaches the top of the wheel
    items.forEach(it => { const im = it.querySelector('img'); if (im.decode) im.decode().catch(() => {}); });
    $('#sigTicks').innerHTML = SIGNATURES.map((s, i) => `<li><button type="button" data-i="${i}" aria-label="${esc(ar ? s.ar : s.en)}"></button></li>`).join('');
    $$('#sigTicks button').forEach(b => b.addEventListener('click', () => {
      const top = sig.getBoundingClientRect().top + window.scrollY;
      const y = top + (+b.dataset.i / (SIGNATURES.length - 1)) * (sig.offsetHeight - window.innerHeight);
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }));
    $('#sigSee').onclick = () => showInMenu(SIGNATURES[Math.max(0, sigIdx)].cat);
    sigIdx = -1;
    if (reduce) { sig.classList.add('sig--static'); renderStatic(); return; }
    setSig(0, true);
    turn(lastP);
  }
  function renderStatic() {
    const ar = isAr(), ui = UI[ar ? 'ar' : 'en'];
    $('#sigStatic').innerHTML = SIGNATURES.map(s => `<li><img src="assets/img/${s.img}.webp" alt="" loading="lazy"><b>${esc(ar ? s.ar : s.en)}</b><span>${s.price} ${ui.sar}</span></li>`).join('');
  }
  function setSig(i, instant) {
    if (i === sigIdx) return;
    const dir = i > sigIdx ? 1 : -1;
    sigIdx = i;
    const s = SIGNATURES[i], ar = isAr(), ui = UI[ar ? 'ar' : 'en'];
    const name = $('#sigName'), cat = $('#sigCat'), num = $('#sigNum'), price = $('#sigPrice'), ghost = $('#sigGhost'), see = $('#sigSee');
    const apply = () => {
      name.textContent = ar ? s.ar : s.en;
      cat.textContent = C[s.cat][L()];
      num.textContent = `${String(i + 1).padStart(2, '0')} ${ui.of} ${String(SIGNATURES.length).padStart(2, '0')}`;
      ghost.textContent = ar ? s.ar : s.en;
      see.textContent = ui.see;
      $('#sigSar').textContent = ui.sar;
    };
    $$('#sigTicks button').forEach((b, k) => b.classList.toggle('is-on', k === i));
    items.forEach((it, k) => it.classList.toggle('is-on', k === i));
    if (instant || !window.gsap) { apply(); price.textContent = s.price; lastPrice = s.price; return; }
    gsap.killTweensOf([name, cat, ghost]);
    gsap.to([name, cat], { y: -18 * dir, opacity: 0, duration: 0.16, ease: 'power2.in', onComplete: () => {
      apply();
      gsap.fromTo([name, cat], { y: 26 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05 });
    } });
    gsap.fromTo(ghost, { opacity: 0, xPercent: 6 * dir }, { opacity: 1, xPercent: 0, duration: 0.8, ease: 'power3.out', delay: 0.16 });
    const o = { v: lastPrice };
    gsap.to(o, { v: s.price, duration: 0.6, ease: 'power2.out', onUpdate: () => { price.textContent = Math.round(o.v); } });
    lastPrice = s.price;
  }
  let lastP = 0;
  function turn(p) {
    lastP = p;
    if (!items.length || reduce) return;
    const pos = p * (SIGNATURES.length - 1);          // 0 .. n-1, fractional
    wheel.style.transform = `rotate(${-pos * STEP}deg)`;
    items.forEach((it, i) => {
      const d = i - pos;                               // distance from the top of the wheel, in steps
      const a = Math.min(1, Math.abs(d));
      const scale = 1 - a * 0.5;
      it.style.setProperty('--s', scale.toFixed(3));
      it.style.setProperty('--spin', (d * -26).toFixed(2) + 'deg');
      it.style.opacity = Math.max(0, 1 - Math.max(0, Math.abs(d) - 0.35) * 0.9).toFixed(3);
      it.style.zIndex = String(10 - Math.round(Math.abs(d) * 2));
    });
    setSig(Math.round(pos));
  }

  buildSig();
  window.D35_Sig = { turn, section: sig };
  window.addEventListener('d35:lang', () => { if (el.panel) { renderBranches(); renderCats(); renderPanel(false); } buildSig(); });
})();

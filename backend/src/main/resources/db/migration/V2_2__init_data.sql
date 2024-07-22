INSERT INTO restaurant(name, restaurant_owner_id)
VALUES
('Italiano',1);
INSERT INTO waiter(email, restaurant_id)
VALUES
('waiterAdam@gmail.com',1);

INSERT INTO meal (name, description, category, status, price, restaurant_id, image, meal_of_the_day)
VALUES
    -- Desserts
    ('Tiramisu', 'Classic Italian dessert with mascarpone cheese and coffee', 'DESSERT', 'ACTIVE', 6, 1, 'https://t3.ftcdn.net/jpg/03/72/15/96/240_F_372159632_yaZpaUO1oBmncH7RsWxV8Y174q8KFeH3.jpg', FALSE),
    ('Panna Cotta', 'Creamy dessert topped with berries', 'DESSERT', 'ACTIVE', 5, 1, 'https://t4.ftcdn.net/jpg/03/56/70/51/240_F_356705186_90qALWPgjdAbClEDsT1kamgacjO7HCCH.jpg', FALSE),
    ('Cannoli', 'Fried pastry dough filled with sweet ricotta cream', 'DESSERT', 'ACTIVE', 4, 1, 'https://t3.ftcdn.net/jpg/01/97/77/38/240_F_197773851_6EulgfZRJ1barI73Bwh4tysLnk1j4oB0.jpg', FALSE),
    ('Gelato', 'Italian-style ice cream', 'DESSERT', 'ACTIVE', 3, 1, 'https://as2.ftcdn.net/v2/jpg/01/88/69/77/1000_F_188697717_ep5ZNh0dbo34603YQCa9AqjgRBsCoBcJ.jpg', FALSE),
    ('Zabaglione', 'Custard made with egg yolks, sugar, and Marsala wine', 'DESSERT', 'ACTIVE', 7, 1, 'https://t4.ftcdn.net/jpg/04/87/54/17/240_F_487541785_TGrmBG1L9R12Fndicyx9dWlalN4MQhkl.jpg', FALSE),
    ('Sfogliatella', 'Crispy pastry filled with sweet ricotta', 'DESSERT', 'ACTIVE', 4, 1, 'https://bottegadelgusto.pl/wp-content/uploads/2020/11/specialites-culinaires-italie-sfogliatella.jpg', FALSE),
    ('Baba au Rhum', 'Small yeast cake saturated in rum', 'DESSERT', 'ACTIVE', 5, 1, 'https://i6.chefiso.com/srv/images/baba-600x600.jpg', FALSE),
    ('Cassata', 'Traditional Sicilian cake with ricotta, marzipan, and candied fruit', 'DESSERT', 'ACTIVE', 6, 1, 'https://t3.ftcdn.net/jpg/02/60/14/46/240_F_260144661_RA5NquEkixuDFrQYfeoaAnln4pC8VvXn.jpg', FALSE),
    ('Amaretti', 'Crunchy almond cookies', 'DESSERT', 'ACTIVE', 3, 1, 'https://t4.ftcdn.net/jpg/03/95/50/81/240_F_395508151_otwOjMGscL4IsigABSYDq7cxMS5pRNi5.jpg', FALSE),
    ('Tartufo', 'Ice cream dessert with chocolate and fruit', 'DESSERT', 'ACTIVE', 5, 1, 'https://t4.ftcdn.net/jpg/04/90/98/49/240_F_490984914_eK9YzxLH4YM8HSruHv0YpNDc6B1uqzIT.jpg', FALSE),
    ('Biscotti', 'Twice-baked cookies perfect for dipping in coffee', 'DESSERT', 'ACTIVE', 3, 1, 'https://t3.ftcdn.net/jpg/01/80/28/14/240_F_180281400_BtJEZbq5UxKyRIzJ1YYBE070lhsboLVq.jpg', FALSE),
    ('Pastiera', 'Neapolitan cake made with ricotta and candied fruit', 'DESSERT', 'ACTIVE', 7, 1, 'https://t4.ftcdn.net/jpg/05/91/07/69/240_F_591076949_xyu2yxNaWrajkivEjnRKhqQXm5Ie4Xzc.jpg', FALSE),
    ('Ricotta Pie', 'Sweet ricotta cheese pie with a hint of citrus', 'DESSERT', 'ACTIVE', 5, 1, 'https://t3.ftcdn.net/jpg/02/10/03/90/240_F_210039024_lx8ju38pLgcqbd0WU1P4SgAQ9sApVUd7.jpg', FALSE),
    ('Semifreddo', 'Half-frozen dessert with a mousse-like texture', 'DESSERT', 'ACTIVE', 6, 1, 'https://t4.ftcdn.net/jpg/01/92/28/81/240_F_192288100_P5sqIkTRmpjNzqYlUYGI49aKC9BS8JlO.jpg', FALSE),
    ('Affogato', 'Vanilla gelato drowned in a shot of hot espresso', 'DESSERT', 'ACTIVE', 4, 1, 'https://t3.ftcdn.net/jpg/02/28/61/02/240_F_228610232_e3oUpYkjJeiikmOCO3bdXfnV7ytHUMlz.jpg', FALSE),

    -- Drinks
    ('Espresso', 'Strong black coffee', 'DRINK', 'ACTIVE', 2, 1, 'https://t4.ftcdn.net/jpg/00/96/91/53/240_F_96915330_G0QUHlVeLV05bYyC2uyqS7pjlBvNCaQJ.jpg', FALSE),
    ('Cappuccino', 'Coffee with steamed milk foam', 'DRINK', 'ACTIVE', 3, 1, 'https://t4.ftcdn.net/jpg/01/37/37/41/240_F_137374152_LPWMjvGT804ZhyoOszE64dzWG9xfzc7B.jpg', FALSE),
    ('Latte Macchiato', 'Espresso with milk and foam', 'DRINK', 'ACTIVE', 4, 1, 'https://t4.ftcdn.net/jpg/04/20/95/27/240_F_420952785_f96s25LUhzvYfTWFXuwLgm4nqO4ZzVoV.jpg', FALSE),
    ('Limonata', 'Lemonade', 'DRINK', 'ACTIVE', 2, 1, 'https://t3.ftcdn.net/jpg/00/84/93/68/240_F_84936862_IpExT5m2IF69m0qyNUARWmudrUywlBiu.jpg', FALSE),
    ('Aranciata', 'Orange soda', 'DRINK', 'ACTIVE', 2, 1, 'https://t3.ftcdn.net/jpg/01/82/20/36/240_F_182203640_oytJRpT3BCZSRWPlaSI73pWZAoFkvVKZ.jpg', FALSE),
    ('Americano', 'Espresso with hot water', 'DRINK', 'ACTIVE', 2, 1, 'https://t3.ftcdn.net/jpg/03/97/47/02/240_F_397470260_kl0UTCbyLgBfIiXl3SUe2SSvTzqFFaZq.jpg', FALSE),
    ('Macchiato', 'Espresso with a small amount of milk', 'DRINK', 'ACTIVE', 3, 1, 'https://t3.ftcdn.net/jpg/02/41/68/28/240_F_241682866_dasDdx98exPBKAaiCSg0rmRl99XZ7rLb.jpg', FALSE),
    ('Flat White', 'Espresso with steamed milk', 'DRINK', 'ACTIVE', 3, 1, 'https://t4.ftcdn.net/jpg/03/29/83/17/240_F_329831778_cG3n2bldkreWHBJ21YH2ox7jA2zI75La.jpg', FALSE),
    ('Mocha', 'Espresso with chocolate syrup and steamed milk', 'DRINK', 'ACTIVE', 4, 1, 'https://t4.ftcdn.net/jpg/05/20/28/77/240_F_520287768_B9IPtWt38iu2lAQwHIMUKK3wHeN8I7xv.jpg', FALSE),
    ('Hot Chocolate', 'Rich Italian hot chocolate', 'DRINK', 'ACTIVE', 3, 1, 'https://t4.ftcdn.net/jpg/01/25/57/43/240_F_125574399_RrO9ThniI872ytRvTEGBb3WFPLJmF2iW.jpg', FALSE),
    ('Frappé', 'Blended iced coffee', 'DRINK', 'ACTIVE', 4, 1, 'https://t3.ftcdn.net/jpg/02/74/43/86/240_F_274438609_Azq3bSdKhMinmHHSIwId2BgfyvEVv8Zw.jpg', FALSE),
    ('Cold Brew', 'Slow-steeped coffee served cold', 'DRINK', 'ACTIVE', 3, 1, 'https://t3.ftcdn.net/jpg/03/86/50/06/240_F_386500678_tYNwHZrVsAQVXmk6PMDcjO5R5L7H2B6l.jpg', FALSE),
    ('Italian Soda', 'Soda water with flavored syrup', 'DRINK', 'ACTIVE', 2, 1, 'https://t3.ftcdn.net/jpg/02/73/86/24/240_F_273862429_hmKoKDvXDRvxa5wSVwk3GErl878g2m8a.jpg', FALSE),
    ('San Pellegrino', 'Sparkling mineral water', 'DRINK', 'ACTIVE', 2, 1, 'https://cdn.prod.website-files.com/5b0fe2f89e0734b12f0d7f7e/5ecfe8afb8bcb76e0dc6e45f_cans.jpg', FALSE),
    ('Acqua Panna', 'Still mineral water', 'DRINK', 'ACTIVE', 2, 1, 'https://t3.ftcdn.net/jpg/02/84/17/16/240_F_284171603_BfxMSblKWwIPRifUcIchsJVVPGWEejUf.jpg', FALSE),

    -- Alcoholic Drinks
    ('Chianti', 'Italian red wine', 'ALCOHOLIC_DRINK', 'ACTIVE', 12, 1, 'https://t4.ftcdn.net/jpg/04/98/46/53/240_F_498465337_nMhoP1E8sIm9Oa9ieeiJEYgSEhl8vCD4.jpg', FALSE),
    ('Prosecco', 'Italian sparkling wine', 'ALCOHOLIC_DRINK', 'ACTIVE', 14, 1, 'https://t3.ftcdn.net/jpg/01/85/68/48/240_F_185684872_b5cabiOQTUUCS5LSDWQ98SdtSOQ3bNT3.jpg', FALSE),
    ('Limoncello', 'Lemon liqueur', 'ALCOHOLIC_DRINK', 'ACTIVE', 7, 1, 'https://t3.ftcdn.net/jpg/02/00/53/00/240_F_200530040_UsMcUZnLLl24iWObkIwGVd7znePYJHNd.jpg', FALSE),
    ('Negroni', 'Cocktail made with gin, vermouth, and Campari', 'ALCOHOLIC_DRINK', 'ACTIVE', 8, 1, 'https://t4.ftcdn.net/jpg/02/69/24/01/240_F_269240102_Fbdjc2vGp8wCSj9EbRtR6jLU9j0qSrxX.jpg', FALSE),
    ('Aperol Spritz', 'Cocktail made with Aperol, prosecco, and soda water', 'ALCOHOLIC_DRINK', 'ACTIVE', 9, 1, 'https://t3.ftcdn.net/jpg/02/73/86/24/240_F_273862429_hmKoKDvXDRvxa5wSVwk3GErl878g2m8a.jpg', FALSE),
    ('Barolo', 'Full-bodied red wine from Piedmont', 'ALCOHOLIC_DRINK', 'ACTIVE', 15, 1, 'https://t4.ftcdn.net/jpg/02/32/40/21/360_F_232402143_NV9H0LXttQCZnkKJw4yV2LmztJA35koJ.jpg', FALSE),
    ('Amaretto Sour', 'Cocktail made with amaretto, lemon juice, and sugar syrup', 'ALCOHOLIC_DRINK', 'ACTIVE', 7, 1, 'https://t4.ftcdn.net/jpg/03/98/55/05/240_F_398550540_t5H2rXdmSTuIhzX5IpySU3V8sEnKjc0T.jpg', FALSE),
    ('Campari Soda', 'Campari with soda water', 'ALCOHOLIC_DRINK', 'ACTIVE', 6, 1, 'https://t4.ftcdn.net/jpg/02/53/84/37/240_F_253843792_c77BOeeuqCQfcTMiBigBaszIE3iR0W0S.jpg', FALSE),
    ('Bellini', 'Cocktail made with Prosecco and peach purée', 'ALCOHOLIC_DRINK', 'ACTIVE', 8, 1, 'https://t3.ftcdn.net/jpg/01/63/49/22/240_F_163492259_exYyiAGB6xFX7VTnEyCWOWOwlOnUbFI5.jpg', FALSE),
    ('Grappa', 'Italian grape-based brandy', 'ALCOHOLIC_DRINK', 'ACTIVE', 7, 1, 'https://t4.ftcdn.net/jpg/04/49/86/99/240_F_449869939_4E5GVI6Ap4SWYgtnUqQNqp55gAsXEu6o.jpg', FALSE),
    ('Frangelico', 'Hazelnut liqueur', 'ALCOHOLIC_DRINK', 'ACTIVE', 7, 1, 'https://t3.ftcdn.net/jpg/05/56/03/94/360_F_556039448_nBaZhd6Ck9scXW6nP48epIzzwcyYyEbt.jpg', FALSE),
    ('Vin Santo', 'Sweet dessert wine from Tuscany', 'ALCOHOLIC_DRINK', 'ACTIVE', 10, 1, 'https://winotoskanii.pl/pol_pl_Azienda-Pucciarella-Vin-Santo-Trasimeno-DOC-wino-slodkie-4083_1.jpg', FALSE),
    ('Sambuca', 'Anise-flavored liqueur', 'ALCOHOLIC_DRINK', 'ACTIVE', 6, 1, 'https://t3.ftcdn.net/jpg/04/33/51/84/240_F_433518439_y1jKPLsrJpwuBbKx4Zcd4oZSOnLH5Rmt.jpg', FALSE),
    ('Lambrusco', 'Slightly sparkling red wine', 'ALCOHOLIC_DRINK', 'ACTIVE', 8, 1, 'https://t4.ftcdn.net/jpg/04/54/40/57/240_F_454405767_BCbcVQn7AESZbrKIwdKGNjXKuVePhJFI.jpg', FALSE),
    ('Marsala', 'Fortified wine from Sicily', 'ALCOHOLIC_DRINK', 'ACTIVE', 9, 1, 'https://t4.ftcdn.net/jpg/00/80/41/33/240_F_80413333_DeRkh8wKAAieL6WFLRmP9NMnWJm88mJB.jpg', FALSE),

    -- Appetizers
    ('Bruschetta', 'Grilled bread with tomatoes and basil', 'APPETIZER', 'ACTIVE', 5, 1, 'https://t3.ftcdn.net/jpg/00/77/96/92/240_F_77969286_ouLSSS8e80oE4yWbqSj92i1xopTbUul9.jpg', FALSE),
    ('Caprese Salad', 'Tomatoes, mozzarella, and basil', 'APPETIZER', 'ACTIVE', 7, 1, 'https://t3.ftcdn.net/jpg/02/20/62/12/240_F_220621209_agzFYBVTHMvFWMgRUblOy9chWr4lsf5I.jpg', FALSE),
    ('Arancini', 'Fried rice balls stuffed with cheese', 'APPETIZER', 'ACTIVE', 6, 1, 'https://t3.ftcdn.net/jpg/02/60/35/66/240_F_260356601_P2mIJzGThxWtrtYuT4Pg9MRKAcYsCQCS.jpg', FALSE),
    ('Carpaccio', 'Thinly sliced raw meat with olive oil and lemon', 'APPETIZER', 'ACTIVE', 9, 1, 'https://t3.ftcdn.net/jpg/03/34/02/80/240_F_334028063_Ptzq9640RGp60CX5rVliw0L1DPjW0zNG.jpg', FALSE),
    ('Stuffed Mushrooms', 'Mushrooms stuffed with cheese and herbs', 'APPETIZER', 'ACTIVE', 8, 1, 'https://t4.ftcdn.net/jpg/00/97/76/71/240_F_97767102_iEbjxiuldpeY4yl6nq9QYJVO9fE5NDAv.jpg', FALSE),
    ('Calamari', 'Fried squid rings served with marinara sauce', 'APPETIZER', 'ACTIVE', 9, 1, 'https://t4.ftcdn.net/jpg/03/35/85/65/240_F_335856573_DzkewtqjlUhLxzfY6krH6nACr93Bmzlq.jpg', FALSE),
    ('Garlic Bread', 'Toasted bread with garlic and butter', 'APPETIZER', 'ACTIVE', 4, 1, 'https://t3.ftcdn.net/jpg/02/50/60/98/240_F_250609830_41nGbQCiD5p9CkVli8Ik3tsAr9VenE9h.jpg', FALSE),
    ('Olives', 'Assorted marinated olives', 'APPETIZER', 'ACTIVE', 4, 1, 'https://t3.ftcdn.net/jpg/05/47/89/94/240_F_547899404_vXm66camlrYx0507bZi6UKu9VOdy195f.jpg', FALSE),
    ('Prosciutto e Melone', 'Cured ham with fresh melon', 'APPETIZER', 'ACTIVE', 8, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOecG79bckAODOX4mmewNq54j1W1tIMZdz5w&s', FALSE),
    ('Focaccia', 'Italian flatbread topped with herbs and olive oil', 'APPETIZER', 'ACTIVE', 5, 1, 'https://t4.ftcdn.net/jpg/04/21/74/41/240_F_421744163_OwPDCsJgsByWB6mkgbuMIIAaVWdBZcqn.jpg', FALSE),
    ('Crostini', 'Small toasts with various toppings', 'APPETIZER', 'ACTIVE', 6, 1, 'https://t3.ftcdn.net/jpg/02/90/91/80/240_F_290918015_cP0Rbf4xinUfgnfZlte8TjGqgOHBHSFk.jpg', FALSE),
    ('Polpette', 'Italian meatballs in tomato sauce', 'APPETIZER', 'ACTIVE', 7, 1, 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-08-Polpette%2Fpolpette_v.2_1_01', FALSE),
    ('Burrata', 'Fresh Italian cheese made from mozzarella and cream', 'APPETIZER', 'ACTIVE', 9, 1, 'https://t3.ftcdn.net/jpg/02/99/77/86/240_F_299778614_WPpcNVqDyb5Mb19uFKHCD6d0HVKGPBim.jpg', FALSE),
    ('Capponata', 'Sicilian eggplant salad', 'APPETIZER', 'ACTIVE', 7, 1, 'https://t3.ftcdn.net/jpg/03/78/18/10/240_F_378181072_MrJloBI5U1S0wtOpHR7Ht5uFqzLE9FYM.jpg', FALSE),
    ('Peperonata', 'Stewed peppers with tomatoes and onions', 'APPETIZER', 'ACTIVE', 6, 1, 'https://t4.ftcdn.net/jpg/02/20/99/81/240_F_220998172_bEklo04v5EJpkvM2mXyQwHvyXJdh8Tna.jpg', FALSE),

    -- Soups
    ('Minestrone', 'Vegetable soup', 'SOUP', 'ACTIVE', 6, 1, 'https://t3.ftcdn.net/jpg/01/65/63/90/240_F_165639072_FdG45ZOrQtqcoYtSdaLOFa2eVouoX1Kc.jpg', FALSE),
    ('Zuppa Toscana', 'Tuscan soup with potatoes, kale, and sausage', 'SOUP', 'ACTIVE', 7, 1, 'https://t3.ftcdn.net/jpg/02/91/78/62/240_F_291786211_gTuBknlgTycvkpOv9mojX3szU1OCURk0.jpg', FALSE),
    ('Pasta e Fagioli', 'Bean and pasta soup', 'SOUP', 'ACTIVE', 7, 1, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/850D11C3-7F17-45F0-9B96-C97785333A4B/Derivates/620B5BA3-C2DB-4F4B-B9B0-A1806FCEE04E.jpg', FALSE),
    ('Stracciatella', 'Egg drop soup', 'SOUP', 'ACTIVE', 6, 1, 'https://frederikkewaerens.dk/wp-content/uploads/2023/07/Frederikke-Waerens-Luksus-mozzarella-stracciatella-ost-13-scaled-1.jpg', FALSE),
    ('Ribollita', 'Tuscan bread soup with vegetables', 'SOUP', 'ACTIVE', 8, 1, 'https://static01.nyt.com/images/2014/02/19/dining/19JPFLEX1/19JPFLEX1-superJumbo.jpg', FALSE),
    ('Brodetto', 'Italian fish soup', 'SOUP', 'ACTIVE', 9, 1, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/FE8B33B5-00F2-4CFC-A29D-2C6BB74B5C3B/Derivates/b9c031ba-4e6f-4c0f-bb91-9d1b84d72b6b.jpg', FALSE),
    ('Zuppa di Pesce', 'Seafood soup', 'SOUP', 'ACTIVE', 10, 1, 'https://t3.ftcdn.net/jpg/07/38/71/62/360_F_738716258_P4FViACKUgVEyGQ7eKG7FHHoGn0OxHVj.jpg', FALSE),
    ('Garmugia', 'Tuscan spring soup with vegetables and meat', 'SOUP', 'ACTIVE', 8, 1, 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F4532b496-6d6e-44c2-9a5c-e7a5569159cb_1476x2214.jpeg', FALSE),
    ('Pappa al Pomodoro', 'Tomato and bread soup', 'SOUP', 'ACTIVE', 7, 1, 'https://t3.ftcdn.net/jpg/02/24/50/02/240_F_224500254_RsNEtQgN83FB7fHSp8YrxDX8SjOEb8qt.jpg', FALSE),
    ('Acquacotta', 'Tuscan vegetable soup with poached egg', 'SOUP', 'ACTIVE', 8, 1, 'https://www.giallozafferano.com/images/227-22783/acquacotta-vegetable-egg-soup_650x433_wm.jpg', FALSE),
    ('Lentil Soup', 'Hearty lentil soup with vegetables', 'SOUP', 'ACTIVE', 6, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNcgEKcPdIAmrXjbUY5X-GF-NsKdsIwfwPUA&s', FALSE),
    ('Cacciucco', 'Tuscan fish stew with tomatoes', 'SOUP', 'ACTIVE', 11, 1, 'https://media-cdn2.greatbritishchefs.com/media/g5eh2s3e/img81219.whqc_768x512q80.jpg', FALSE),
    ('Borlotti Bean Soup', 'Borlotti beans with pancetta and vegetables', 'SOUP', 'ACTIVE', 7, 1, 'https://t4.ftcdn.net/jpg/03/96/34/87/240_F_396348796_S5f5Imzf7k9BYsoBxrIEsn5brxIOVb7o.jpg', FALSE),
    ('Zuppa di Ceci', 'Chickpea soup with rosemary and garlic', 'SOUP', 'ACTIVE', 7, 1, 'https://t4.ftcdn.net/jpg/02/28/12/21/240_F_228122198_18DQEy07mlxbpSat5m9JeKQUBAGQGmX7.jpg', FALSE),
    ('Ciceri e Tria', 'Chickpea and pasta soup', 'SOUP', 'ACTIVE', 8, 1, 'https://t3.ftcdn.net/jpg/02/48/72/08/360_F_248720848_oHjjrkERZgT6c5I2AIJGYSowMT5AzYUd.jpg', FALSE),

    -- Main Dishes
    ('Margherita Pizza', 'Classic pizza with tomatoes, mozzarella cheese, and fresh basil', 'MAIN_DISH', 'ACTIVE', 8, 1, 'https://t3.ftcdn.net/jpg/02/76/32/70/240_F_276327012_xB3g3Xvqiiy2xh5kOM21mEYFOTccT8tH.jpg', FALSE),
    ('Spaghetti Carbonara', 'Spaghetti with eggs, cheese, pancetta, and pepper', 'MAIN_DISH', 'ACTIVE', 10, 1, 'https://t3.ftcdn.net/jpg/01/98/16/06/240_F_198160695_2PR1ARhGrGYIz7TZPKNzlZZKhPsxcXPU.jpg', FALSE),
    ('Lasagna', 'Layers of pasta, cheese, and meat sauce', 'MAIN_DISH', 'ACTIVE', 12, 1, 'https://t3.ftcdn.net/jpg/04/35/57/44/240_F_435574414_BfvkPfViQML534FGZufUqEbCPnsYx3zz.jpg', FALSE),
    ('Risotto alla Milanese', 'Risotto with saffron and Parmesan cheese', 'MAIN_DISH', 'ACTIVE', 11, 1, 'https://t3.ftcdn.net/jpg/04/76/37/76/240_F_476377626_WqvJa4A7Ik5JF2xpFOxGD5EaNmJfQ1Gv.jpg', FALSE),
    ('Chicken Parmesan', 'Breaded chicken with tomato sauce and cheese', 'MAIN_DISH', 'ACTIVE', 13, 1, 'https://t3.ftcdn.net/jpg/02/43/42/66/240_F_243426694_ajBq2wDqFWnJMLhwEud9okpIZTEJ33aT.jpg', FALSE),
    ('Osso Buco', 'Braised veal shanks with vegetables and broth', 'MAIN_DISH', 'ACTIVE', 18, 1, 'https://t4.ftcdn.net/jpg/03/64/51/27/240_F_364512721_OfacaJBldxmT7jRyJPbFV2CzBL7HkxMy.jpg', FALSE),
    ('Bistecca alla Fiorentina', 'Grilled T-bone steak', 'MAIN_DISH', 'ACTIVE', 22, 1, 'https://t4.ftcdn.net/jpg/02/17/85/47/240_F_217854789_osIHKj7E0iXmMcM4I4XyJ2f9NAzQs10X.jpg', FALSE),
    ('Polenta', 'Cornmeal porridge served with various toppings', 'MAIN_DISH', 'ACTIVE', 9, 1, 'https://t4.ftcdn.net/jpg/00/96/68/23/240_F_96682334_tmFR2dYraYgEqDxZPigN7pr8vbeSHDl1.jpg', FALSE),
    ('Gnocchi', 'Potato dumplings with a variety of sauces', 'MAIN_DISH', 'ACTIVE', 11, 1, 'https://t4.ftcdn.net/jpg/02/16/68/61/240_F_216686192_kNxc2vnAHvUSj04sztw5n2U5rho2THz4.jpg', FALSE),
    ('Fettuccine Alfredo', 'Pasta with butter and Parmesan cheese', 'MAIN_DISH', 'ACTIVE', 12, 1, 'https://t3.ftcdn.net/jpg/05/34/14/00/240_F_534140043_O6BE7YRoSFzSz6lW04Kzs73P94wfgK2E.jpg', FALSE),
    ('Saltimbocca', 'Veal with prosciutto and sage', 'MAIN_DISH', 'ACTIVE', 16, 1, 'https://t3.ftcdn.net/jpg/03/14/68/76/240_F_314687697_zyHWb6viTzfjOrPtnAUk1LOFgoEOMl7C.jpg', FALSE),
    ('Veal Marsala', 'Veal cutlets with Marsala wine sauce', 'MAIN_DISH', 'ACTIVE', 17, 1, 'https://t3.ftcdn.net/jpg/02/69/43/96/240_F_269439684_k9WC23ovMfHoz5iufkj7PgpBVgbAUeg5.jpg', FALSE),
    ('Eggplant Parmesan', 'Breaded eggplant with tomato sauce and cheese', 'MAIN_DISH', 'ACTIVE', 13, 1, 'https://t4.ftcdn.net/jpg/01/88/91/59/240_F_188915942_7imsdpiJTSvbN2JGtrfNkOrQsOb8hOie.jpg', FALSE),
    ('Linguine alle Vongole', 'Linguine with clams', 'MAIN_DISH', 'ACTIVE', 15, 1, 'https://t4.ftcdn.net/jpg/05/34/30/49/240_F_534304978_YHfU0fRQkhLrq8eFcq0IljaVzVakLVnw.jpg', FALSE),
    ('Pappardelle al Cinghiale', 'Pasta with wild boar ragu', 'MAIN_DISH', 'ACTIVE', 16, 1, 'https://t4.ftcdn.net/jpg/06/86/06/73/360_F_686067390_C0qRc1KKsHtUW3996zFNAiWG7M34fUr5.jpg', FALSE);

INSERT INTO _table(name, status, restaurant_id)
VALUES
('table 1','READY',1),
('table 2','BUSY',1),
('table 3','READY',1),
('table 4','READY',1),
('table 5','BUSY',1),
('table 6','BUSY',1),
('table 7','BUSY',1),
('table 8','DIRTY',1),
('table 9','DIRTY',1),
('table 10','BUSY',1);

insert into _order (order_number, received_date_time,completed_date_time, price, status, table_id, waiter_id, restaurant_id)
values
('ORD62023162424321', '2020-12-10 19:00:00',null, '32', 'PLACED', 2, 1,1),
('ORD62023162424322', '2020-12-13 19:12:00',null, '36', 'PLACED', 5, 1,1),
('ORD62023162424323', '2020-12-13 19:14:00',null, '36', 'PLACED', 6, 1,1),
('ORD62023162424324', '2020-12-13 19:20:00',null, '36', 'PLACED', 7, 1,1),
('ORD62023162424325', '2023-06-25 20:38:30','2023-06-25 20:58:30', '40', 'PAID', 3, 1,1),
('ORD62023162424326', '2023-06-25 20:38:30','2023-06-25 20:53:30', '60', 'RELEASED', 4, 1,1);

insert into order_meal (quantity,received_date_time,completed_date_time,status, order_id,price, meal_id)
values
(2,'2020-12-10 19:00:00',null,'PREPARING', 1,'12', 1),(1,'2020-12-10 19:00:00',null,'PREPARING', 1,'2', 2),(1,'2020-12-10 19:00:00',null,'PREPARING', 1,'2', 2),
(1,'2020-12-10 19:00:00',null,'PREPARING', 2,'8', 76),(1,'2020-12-10 19:00:00',null,'READY', 2,'9', 35),(1,'2020-12-10 19:00:00',null,'RELEASED', 2,'6', 8);






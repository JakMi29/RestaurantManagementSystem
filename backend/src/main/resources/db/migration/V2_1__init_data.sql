INSERT INTO restaurant(name, restaurant_owner_id)
VALUES
('Italiano',1);

INSERT INTO meal (name, description, category, status, price, restaurant_id, image, meal_of_the_day)
VALUES
    -- Desserts
    ('Tiramisu', 'Classic Italian dessert with mascarpone cheese and coffee', 'DESSERT', 'ACTIVE', 6.99, 1, 'tiramisu.jpg', FALSE),
    ('Panna Cotta', 'Creamy dessert topped with berries', 'DESSERT', 'ACTIVE', 5.99, 1, 'panna_cotta.jpg', FALSE),
    ('Cannoli', 'Fried pastry dough filled with sweet ricotta cream', 'DESSERT', 'ACTIVE', 4.99, 1, 'cannoli.jpg', FALSE),
    ('Gelato', 'Italian-style ice cream', 'DESSERT', 'ACTIVE', 3.99, 1, 'gelato.jpg', FALSE),
    ('Zabaglione', 'Custard made with egg yolks, sugar, and Marsala wine', 'DESSERT', 'ACTIVE', 7.99, 1, 'zabaglione.jpg', FALSE),

    -- Drinks
    ('Espresso', 'Strong black coffee', 'DRINK', 'ACTIVE', 2.99, 1, 'espresso.jpg', FALSE),
    ('Cappuccino', 'Coffee with steamed milk foam', 'DRINK', 'ACTIVE', 3.99, 1, 'cappuccino.jpg', FALSE),
    ('Latte Macchiato', 'Espresso with milk and foam', 'DRINK', 'ACTIVE', 4.99, 1, 'latte_macchiato.jpg', FALSE),
    ('Limonata', 'Lemonade', 'DRINK', 'ACTIVE', 2.49, 1, 'limonata.jpg', FALSE),
    ('Aranciata', 'Orange soda', 'DRINK', 'ACTIVE', 2.49, 1, 'aranciata.jpg', FALSE),

    ('Chianti', 'Italian red wine', 'ALCOHOLIC_DRINK', 'ACTIVE', 12.99, 1, 'chianti.jpg', FALSE),
    ('Prosecco', 'Italian sparkling wine', 'ALCOHOLIC_DRINK', 'ACTIVE', 14.99, 1, 'prosecco.jpg', FALSE),
    ('Limoncello', 'Lemon liqueur', 'ALCOHOLIC_DRINK', 'ACTIVE', 7.99, 1, 'limoncello.jpg', FALSE),
    ('Negroni', 'Cocktail made with gin, vermouth, and Campari', 'ALCOHOLIC_DRINK', 'ACTIVE', 8.99, 1, 'negroni.jpg', FALSE),
    ('Aperol Spritz', 'Cocktail made with Aperol, prosecco, and soda water', 'ALCOHOLIC_DRINK', 'ACTIVE', 9.99, 1, 'aperol_spritz.jpg', FALSE),

    -- Appetizers
    ('Bruschetta', 'Grilled bread with tomatoes and basil', 'APPETIZER', 'ACTIVE', 5.99, 1, 'bruschetta.jpg', FALSE),
    ('Caprese Salad', 'Tomatoes, mozzarella, and basil', 'APPETIZER', 'ACTIVE', 7.99, 1, 'caprese_salad.jpg', FALSE),
    ('Arancini', 'Fried rice balls stuffed with cheese', 'APPETIZER', 'ACTIVE', 6.99, 1, 'arancini.jpg', FALSE),
    ('Carpaccio', 'Thinly sliced raw meat with olive oil and lemon', 'APPETIZER', 'ACTIVE', 9.99, 1, 'carpaccio.jpg', FALSE),
    ('Stuffed Mushrooms', 'Mushrooms stuffed with cheese and herbs', 'APPETIZER', 'ACTIVE', 8.99, 1, 'stuffed_mushrooms.jpg', FALSE),

    -- Soups
    ('Minestrone', 'Vegetable soup', 'SOUP', 'ACTIVE', 6.99, 1, 'minestrone.jpg', FALSE),
    ('Zuppa Toscana', 'Tuscan soup with potatoes, kale, and sausage', 'SOUP', 'ACTIVE', 7.99, 1, 'zuppa_toscana.jpg', FALSE),
    ('Pasta e Fagioli', 'Bean and pasta soup', 'SOUP', 'ACTIVE', 7.49, 1, 'pasta_e_fagioli.jpg', FALSE),
    ('Stracciatella', 'Egg drop soup', 'SOUP', 'ACTIVE', 6.49, 1, 'stracciatella.jpg', FALSE),
    ('Ribollita', 'Tuscan bread soup with vegetables', 'SOUP', 'ACTIVE', 8.99, 1, 'ribollita.jpg', FALSE),

    -- Main Dishes
    ('Margherita Pizza', 'Classic pizza with tomatoes, mozzarella cheese, and fresh basil', 'MAIN_DISH', 'ACTIVE', 8.99, 1, 'margherita_pizza.jpg', FALSE),
    ('Spaghetti Carbonara', 'Spaghetti with eggs, cheese, pancetta, and pepper', 'MAIN_DISH', 'ACTIVE', 10.99, 1, 'spaghetti_carbonara.jpg', FALSE),
    ('Lasagna', 'Layers of pasta, cheese, and meat sauce', 'MAIN_DISH', 'ACTIVE', 12.99, 1, 'lasagna.jpg', FALSE),
    ('Risotto alla Milanese', 'Risotto with saffron and Parmesan cheese', 'MAIN_DISH', 'ACTIVE', 11.99, 1, 'risotto_alla_milanese.jpg', FALSE),
    ('Chicken Parmesan', 'Breaded chicken with tomato sauce and cheese', 'MAIN_DISH', 'ACTIVE', 13.99, 1, 'chicken_parmesan.jpg', FALSE);
import connectDB from "../config/db.js";

export const createTables = async () => {
    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS images (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            public_id VARCHAR(255) NOT NULL,
            url VARCHAR(500) NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Images table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,

            password VARCHAR(255) NULL,

            role ENUM('admin','user') DEFAULT 'user',
            is_suspend BOOLEAN DEFAULT FALSE, 
            image_id INT,

            auth_provider ENUM('local','google','facebook') DEFAULT 'local',
            google_id VARCHAR(255) NULL UNIQUE,
            facebook_id VARCHAR(255) NULL UNIQUE,
            is_verified BOOLEAN DEFAULT FALSE,

            FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE SET NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Users table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS addresses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            
            user_id INT NOT NULL,
            
            line1 VARCHAR(250) NOT NULL,
            line2 VARCHAR(250),
            landmark VARCHAR(250),
            
            city VARCHAR(200) NOT NULL,
            state VARCHAR(200) NOT NULL,
            
            pincode VARCHAR(10) NOT NULL,
            
            is_default BOOLEAN DEFAULT FALSE,

            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log("Address table ready");

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS collections (
            id INT AUTO_INCREMENT PRIMARY KEY,

            title VARCHAR(200) NOT NULL,

            description TEXT,

            image_id INT,

            meta_title VARCHAR(200) NOT NULL,
            meta_description TEXT,

            slug VARCHAR(250) UNIQUE,

            status BOOLEAN DEFAULT TRUE,

            FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE SET NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )  
    `);
    console.log('Collections table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,

            collection_id INT,

            title VARCHAR(250) NOT NULL,

            description TEXT,

            meta_title VARCHAR(250) NOT NULL,
            meta_description TEXT,

            slug VARCHAR(250) NOT NULL UNIQUE,

            status BOOLEAN DEFAULT TRUE,

            FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Products table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS product_images (
            product_id INT,
            image_id INT,

            PRIMARY KEY (product_id, image_id),

            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Product image table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS package_info (
            id INT AUTO_INCREMENT PRIMARY KEY,
            
            package_name VARCHAR(200) NOT NULL,
            
            package_type ENUM('box','envelop','soft') DEFAULT 'box',
            
            length DECIMAL(10,2),
            width DECIMAL(10,2),
            height DECIMAL(10,2),
            
            dimension_unit ENUM('cm','inch') DEFAULT 'cm',
            
            weight DECIMAL(10,2),
            weight_unit ENUM('g','kg','oz','lb') DEFAULT 'g',
            
            is_default BOOLEAN DEFAULT FALSE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Package info table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS product_variants (
            id INT AUTO_INCREMENT PRIMARY KEY,

            product_id INT NOT NULL,

            sku VARCHAR(100) UNIQUE NOT NULL,

            price DECIMAL(10,2) NOT NULL,

            stock INT DEFAULT 0,

            package_id INT,

            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (package_id) REFERENCES package_info(id) ON DELETE SET NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Product variant table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS variant_attributes (
            id INT AUTO_INCREMENT PRIMARY KEY,

            name VARCHAR(100) NOT NULL UNIQUE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Variant attribute table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS variant_attribute_values(
            id INT AUTO_INCREMENT PRIMARY KEY,

            variant_id INT NOT NULL,

            attribute_id INT NOT NULL,

            value VARCHAR(100) NOT NULL,

            FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
            FOREIGN KEY (attribute_id) REFERENCES variant_attributes(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Variant attribute value table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS tags (
            id INT AUTO_INCREMENT PRIMARY KEY,

            name VARCHAR(100) NOT NULL,

            slug VARCHAR(150) UNIQUE NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Tags table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS product_tags (
            product_id INT,
            tag_id INT,

            PRIMARY KEY (product_id, tag_id),

            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Product tags table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,

            star TINYINT(1) NOT NULL CHECK (star BETWEEN 1 AND 5),

            title VARCHAR(250),

            description TEXT,

            product_id INT NOT NULL,

            user_id INT NOT NULL,

            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Review table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS review_images (
            review_id INT,
            image_id INT,

            PRIMARY KEY (review_id, image_id),

            FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
            FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

        )    
    `);
    console.log('Review image table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS carts (
            id INT AUTO_INCREMENT PRIMARY KEY,

            user_id INT NOT NULL UNIQUE,
            
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Cart table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS cart_items (
            id INT AUTO_INCREMENT PRIMARY KEY,

            cart_id INT NOT NULL,

            product_variant_id INT NOT NULL,

            qty INT DEFAULT 1,

            FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
            FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    console.log('Cart item table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            total_amount DECIMAL(10,2) NOT NULL,
            order_status ENUM('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',

            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Orders table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,

            order_id INT NOT NULL,

            product_variant_id INT,

            product_name VARCHAR(255) NOT NULL,

            sku VARCHAR(100),

            qty INT NOT NULL,
            
            price DECIMAL(10,2) NOT NULL,

            FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE SET NULL,

            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )    
    `);
    console.log('Order Item table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS payments (
            id INT AUTO_INCREMENT PRIMARY KEY,

            order_id INT NOT NULL,

            gateway VARCHAR(100) NOT NULL,

            transaction_id VARCHAR(255),

            payment_status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',

            total_amount DECIMAL(10,2) NOT NULL,

            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )        
    `);
    console.log('Payments table ready');

    await connectDB.execute(`
        CREATE TABLE IF NOT EXISTS blacklist_token (
            id INT AUTO_INCREMENT PRIMARY KEY,
            token TEXT NOT NULL,
            UNIQUE (token),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `)
    console.log("Blacklist token table ready");
}
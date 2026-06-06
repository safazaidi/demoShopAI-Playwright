// tests/front/utils/dbManager.js
const Database = require('better-sqlite3');
const path = require('path');

class DBManager {
  constructor() {
    // Create database in the project root or temp directory
    const dbPath = path.join(__dirname, '../../..', 'test-data.db');
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    this.initializeDatabase();
  }

  /**
   * Initialize database and create tables
   */
  initializeDatabase() {
    try {
      // Create Users table for login/registration tests
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Products table for search tests
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          category TEXT,
          stock INTEGER DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Cart table for cart quantity tests
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          productId INTEGER NOT NULL,
          quantity INTEGER NOT NULL CHECK(quantity > 0),
          unitPrice REAL NOT NULL,
          totalPrice REAL NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(userId) REFERENCES users(id),
          FOREIGN KEY(productId) REFERENCES products(id),
          UNIQUE(userId, productId)
        )
      `);

      // Create PasswordResetTokens table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS passwordResetTokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          token TEXT UNIQUE NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          expiresAt DATETIME NOT NULL,
          used BOOLEAN DEFAULT 0
        )
      `);

      // Create PasswordResetRequests table for tracking
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS passwordResetRequests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          requestedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          completedAt DATETIME
        )
      `);

      // Create TestData table for test tracking
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS testData (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          testName TEXT NOT NULL,
          dataKey TEXT NOT NULL,
          dataValue TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  // ==================== USER OPERATIONS ====================

  /**
   * Create a new user
   */
  createUser(email, password, firstName, lastName) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO users (email, password, firstName, lastName)
        VALUES (?, ?, ?, ?)
      `);
      const result = stmt.run(email, password, firstName, lastName);
      console.log(`User created: ${email}`);
      return this.getUserById(result.lastInsertRowid);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  getUserByEmail(email) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM users WHERE email = ?
      `);
      return stmt.get(email);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  getUserById(id) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM users WHERE id = ?
      `);
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  /**
   * Update user
   */
  updateUser(id, updateData) {
    try {
      const { email, password, firstName, lastName } = updateData;
      const stmt = this.db.prepare(`
        UPDATE users 
        SET email = COALESCE(?, email),
            password = COALESCE(?, password),
            firstName = COALESCE(?, firstName),
            lastName = COALESCE(?, lastName),
            updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      stmt.run(email || null, password || null, firstName || null, lastName || null, id);
      return this.getUserById(id);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete user by email
   */
  deleteUserByEmail(email) {
    try {
      const stmt = this.db.prepare(`
        DELETE FROM users WHERE email = ?
      `);
      const result = stmt.run(email);
      console.log(`User deleted: ${email}`);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Get all users
   */
  getAllUsers() {
    try {
      const stmt = this.db.prepare(`SELECT * FROM users`);
      return stmt.all();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  /**
   * Check if user exists
   */
  userExists(email) {
    return this.getUserByEmail(email) !== undefined;
  }

  // ==================== PRODUCT OPERATIONS ====================

  /**
   * Create a new product
   */
  createProduct(name, description, price, category, stock = 10) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO products (name, description, price, category, stock)
        VALUES (?, ?, ?, ?, ?)
      `);
      const result = stmt.run(name, description, price, category, stock);
      console.log(`Product created: ${name}`);
      return this.getProductById(result.lastInsertRowid);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Get product by name
   */
  getProductByName(name) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM products WHERE name = ?
      `);
      return stmt.get(name);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Get product by ID
   */
  getProductById(id) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM products WHERE id = ?
      `);
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Search products by partial name (for search tests)
   */
  searchProducts(searchTerm) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM products WHERE name LIKE ?
      `);
      return stmt.all(`%${searchTerm}%`);
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM products WHERE category = ?
      `);
      return stmt.all(category);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  /**
   * Update product
   */
  updateProduct(id, updateData) {
    try {
      const { name, description, price, category, stock } = updateData;
      const stmt = this.db.prepare(`
        UPDATE products 
        SET name = COALESCE(?, name),
            description = COALESCE(?, description),
            price = COALESCE(?, price),
            category = COALESCE(?, category),
            stock = COALESCE(?, stock)
        WHERE id = ?
      `);
      stmt.run(name || null, description || null, price || null, category || null, stock || null, id);
      return this.getProductById(id);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Delete product by name
   */
  deleteProductByName(name) {
    try {
      const stmt = this.db.prepare(`
        DELETE FROM products WHERE name = ?
      `);
      const result = stmt.run(name);
      console.log(`Product deleted: ${name}`);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  /**
   * Get all products
   */
  getAllProducts() {
    try {
      const stmt = this.db.prepare(`SELECT * FROM products`);
      return stmt.all();
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }

  /**
   * Check if product exists
   */
  productExists(name) {
    return this.getProductByName(name) !== undefined;
  }

  // ==================== PASSWORD RESET OPERATIONS ====================

  /**
   * Create password reset token
   */
  createPasswordResetToken(email, tokenLength = 32) {
    try {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
      
      const stmt = this.db.prepare(`
        INSERT INTO passwordResetTokens (email, token, expiresAt)
        VALUES (?, ?, ?)
      `);
      const result = stmt.run(email, token, expiresAt);
      console.log(`Password reset token created for: ${email}`);
      return this.getPasswordResetTokenById(result.lastInsertRowid);
    } catch (error) {
      console.error('Error creating password reset token:', error);
      throw error;
    }
  }

  /**
   * Get password reset token by email
   */
  getPasswordResetTokenByEmail(email) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM passwordResetTokens WHERE email = ? AND used = 0 AND expiresAt > CURRENT_TIMESTAMP
      `);
      return stmt.get(email);
    } catch (error) {
      console.error('Error fetching password reset token:', error);
      throw error;
    }
  }

  /**
   * Get password reset token by ID
   */
  getPasswordResetTokenById(id) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM passwordResetTokens WHERE id = ?
      `);
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching password reset token:', error);
      throw error;
    }
  }

  /**
   * Mark token as used
   */
  markTokenAsUsed(token) {
    try {
      const stmt = this.db.prepare(`
        UPDATE passwordResetTokens SET used = 1 WHERE token = ?
      `);
      stmt.run(token);
      console.log('Password reset token marked as used');
      return true;
    } catch (error) {
      console.error('Error marking token as used:', error);
      throw error;
    }
  }

  /**
   * Create password reset request
   */
  createPasswordResetRequest(email) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO passwordResetRequests (email, status)
        VALUES (?, 'pending')
      `);
      const result = stmt.run(email);
      console.log(`Password reset request created for: ${email}`);
      return this.getPasswordResetRequestById(result.lastInsertRowid);
    } catch (error) {
      console.error('Error creating password reset request:', error);
      throw error;
    }
  }

  /**
   * Get password reset request by ID
   */
  getPasswordResetRequestById(id) {
    try {
      const stmt = this.db.prepare(`
        SELECT * FROM passwordResetRequests WHERE id = ?
      `);
      return stmt.get(id);
    } catch (error) {
      console.error('Error fetching password reset request:', error);
      throw error;
    }
  }

  /**
   * Update password reset request status
   */
  updatePasswordResetRequestStatus(email, status) {
    try {
      const stmt = this.db.prepare(`
        UPDATE passwordResetRequests 
        SET status = ?, completedAt = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completedAt END
        WHERE email = ?
      `);
      stmt.run(status, status, email);
      console.log(`Password reset request updated for: ${email} - Status: ${status}`);
      return true;
    } catch (error) {
      console.error('Error updating password reset request:', error);
      throw error;
    }
  }

  // ==================== TEST DATA OPERATIONS ====================

  /**
   * Store test data for reference
   */
  storeTestData(testName, dataKey, dataValue) {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO testData (testName, dataKey, dataValue)
        VALUES (?, ?, ?)
      `);
      stmt.run(testName, dataKey, dataValue);
      console.log(`Test data stored: ${testName} - ${dataKey}: ${dataValue}`);
      return true;
    } catch (error) {
      console.error('Error storing test data:', error);
      throw error;
    }
  }

  /**
   * Get test data by test name and key
   */
  getTestData(testName, dataKey) {
    try {
      const stmt = this.db.prepare(`
        SELECT dataValue FROM testData WHERE testName = ? AND dataKey = ? ORDER BY createdAt DESC LIMIT 1
      `);
      const result = stmt.get(testName, dataKey);
      return result ? result.dataValue : null;
    } catch (error) {
      console.error('Error fetching test data:', error);
      throw error;
    }
  }

  // ==================== DATABASE MANAGEMENT ====================

  /**
   * Clear all data (useful for test cleanup)
   */
  clearAllData() {
    try {
      this.db.exec(`
        DELETE FROM users;
        DELETE FROM products;
        DELETE FROM passwordResetTokens;
        DELETE FROM passwordResetRequests;
        DELETE FROM testData;
      `);
      console.log('All data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }

  /**
   * Clear specific table
   */
  clearTable(tableName) {
    try {
      const validTables = ['users', 'products', 'passwordResetTokens', 'passwordResetRequests', 'testData'];
      if (!validTables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      this.db.exec(`DELETE FROM ${tableName}`);
      console.log(`Table ${tableName} cleared`);
      return true;
    } catch (error) {
      console.error('Error clearing table:', error);
      throw error;
    }
  }

  /**
   * Get database statistics
   */
  getStats() {
    try {
      return {
        totalUsers: this.db.prepare('SELECT COUNT(*) as count FROM users').get().count,
        totalProducts: this.db.prepare('SELECT COUNT(*) as count FROM products').get().count,
        totalPasswordResets: this.db.prepare('SELECT COUNT(*) as count FROM passwordResetRequests').get().count,
        totalTestData: this.db.prepare('SELECT COUNT(*) as count FROM testData').get().count,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  close() {
    try {
      this.db.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database:', error);
      throw error;
    }
  }

  /**
   * Close and backup database
   */
  backup(backupPath) {
    try {
      this.db.backup(backupPath);
      console.log(`Database backed up to: ${backupPath}`);
      return true;
    } catch (error) {
      console.error('Error backing up database:', error);
      throw error;
    }
  }

  /**
   * Seed test data into the database
   */
  seedTestData() {
    try {
      console.log('📦 Seeding test data...');

      const testProducts = [
        {
          name: 'Apple iPhone 13',
          description: 'Latest Apple smartphone with advanced features',
          price: 999.99,
          category: 'Electronics',
          stock: 50
        },
        {
          name: 'Samsung Galaxy S21',
          description: 'Premium Samsung smartphone',
          price: 899.99,
          category: 'Electronics',
          stock: 30
        },
        {
          name: 'MacBook Pro',
          description: 'Professional laptop by Apple',
          price: 2499.99,
          category: 'Computers',
          stock: 20
        }
      ];

      // Create products if they don't exist
      testProducts.forEach(product => {
        try {
          const existing = this.getProductByName(product.name);
          if (!existing) {
            this.createProduct(
              product.name,
              product.description,
              product.price,
              product.category,
              product.stock
            );
            console.log(`✅ Seeded product: ${product.name}`);
          } else {
            console.log(`ℹ️ Product already exists: ${product.name}`);
          }
        } catch (error) {
          console.log(`ℹ️ Product already exists: ${product.name}`);
        }
      });

      console.log('✅ Test data seeded successfully');
    } catch (error) {
      console.error('Error seeding test data:', error);
      throw error;
    }
  }
}

// Export singleton instance
module.exports = new DBManager();
-- =========================================================================
-- LIANASOLAR DATABASE SCHEMA & SEED DATA (MYSQL)
-- Compatible with MySQL 5.7, 8.0, MariaDB, phpMyAdmin, MySQL Workbench
-- =========================================================================

CREATE DATABASE IF NOT EXISTS `lianasolar` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lianasolar`;

-- -------------------------------------------------------------------------
-- 1. USERS & ADMIN AUTHENTICATION TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(30) DEFAULT '',
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 2. SITE CONTENT CMS STORAGE TABLE (FAST NEXT.JS JSON STORE)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_content` (
  `section_key` VARCHAR(100) PRIMARY KEY,
  `content_data` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 3. LEADS & QUOTE INQUIRIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT '',
  `city` VARCHAR(100) DEFAULT '',
  `property_type` VARCHAR(50) DEFAULT '',
  `capacity` VARCHAR(50) DEFAULT '',
  `bill` VARCHAR(50) DEFAULT '',
  `status` VARCHAR(50) DEFAULT 'New Lead',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 4. SOLAR SOLUTIONS CATALOG TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `solutions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `subtitle` VARCHAR(255) DEFAULT '',
  `description` TEXT,
  `image` TEXT,
  `capacity_range` VARCHAR(50) DEFAULT '',
  `ideal_for` VARCHAR(150) DEFAULT '',
  `features` JSON,
  `specs` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 5. PRODUCTS & TIER-1 HARDWARE TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `tagline` VARCHAR(255) DEFAULT '',
  `description` TEXT,
  `image` TEXT,
  `key_features` JSON,
  `warranty` VARCHAR(100) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 6. GALLERY & COMMISSIONED PROJECTS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `capacity` VARCHAR(50) DEFAULT '',
  `capacity_kw` INT DEFAULT 10,
  `location` VARCHAR(150) DEFAULT '',
  `image` TEXT,
  `annual_savings` VARCHAR(100) DEFAULT '',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 7. BRAND PARTNERS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `partners` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `tagline` VARCHAR(150) DEFAULT '',
  `color` VARCHAR(50) DEFAULT '#f97316',
  `image_url` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 8. TRUST DELIVERED & FIELD PHOTOS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `trust_photos` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `tag` VARCHAR(100) DEFAULT '',
  `image` TEXT NOT NULL,
  `category` VARCHAR(50) DEFAULT 'Installation',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- SEED INITIAL DATA
-- -------------------------------------------------------------------------

-- 1. Default Master Admin User (Password: admin123)
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `is_active`) 
VALUES (
  'admin-master-001', 
  'Liana Master Admin', 
  'admin@lianasolar.com', 
  '+91 91603 42240', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'admin', 
  1
) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 2. Solutions Data
INSERT INTO `solutions` (`id`, `slug`, `title`, `subtitle`, `description`, `image`, `capacity_range`, `ideal_for`)
VALUES 
('residential', 'residential-solar', 'Residential Rooftop Solar', 'Cut home electricity bills by up to 90%', 'Turn your roof into an independent clean energy generator with direct PM Surya Ghar subsidy support.', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95', '2 kW to 15 kW', 'Villas & Homes'),
('commercial', 'commercial-solar', 'Commercial Rooftop Solar', 'Hedge operating costs & claim 40% depreciation', 'High-yield rooftop solar solutions for offices, schools, hospitals, and commercial complexes.', 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95', '20 kW to 250 kW', 'Offices & Schools'),
('industrial', 'industrial-solar', 'Industrial Solar Plants', 'Megawatt-scale clean energy for factories & warehouses', 'Heavy-duty solar installations on metal sheds, engineered for continuous manufacturing loads.', 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=95', '100 kW to 2 MW+', 'Factories & Sheds'),
('agricultural', 'agricultural-solar', 'Agricultural Solar Systems', 'Daylight irrigation with zero fuel expenses', 'High-efficiency solar water pumps and microgrids under PM KUSUM initiative.', 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95', '3 HP to 25 HP Pumps', 'Farms & Drip Irrigation')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 3. Leads Data
INSERT INTO `leads` (`id`, `name`, `phone`, `email`, `city`, `property_type`, `capacity`, `bill`, `status`)
VALUES 
('LD-101', 'Ramesh Sharma', '+91 91603 42240', 'ramesh@example.com', 'Noida', 'Residential', '5 kW', '650 units/mo', 'New Lead'),
('LD-102', 'Pooja Agarwal', '+91 95500 01418', 'pooja@agri.com', 'Greater Noida', 'Commercial', '15 kW', '1,800 units/mo', 'Site Survey Scheduled')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

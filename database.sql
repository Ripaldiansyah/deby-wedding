-- Database initialized externally

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  setting_value TEXT
);

CREATE TABLE IF NOT EXISTS couple_profiles (
  role ENUM('bride', 'groom') PRIMARY KEY,
  full_name VARCHAR(100),
  nickname VARCHAR(50),
  short_profile TEXT,
  father_name VARCHAR(100),
  mother_name VARCHAR(100),
  instagram_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS event_details (
  type ENUM('akad', 'reception') PRIMARY KEY,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  location_name VARCHAR(255),
  address TEXT,
  map_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS story_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  story_order INT,
  story_date VARCHAR(50),
  title VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_order INT,
  image_url VARCHAR(255),
  span_type ENUM('normal', 'wide', 'tall', 'large') DEFAULT 'normal'
);

CREATE TABLE IF NOT EXISTS gift_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bank_name VARCHAR(100),
  account_number VARCHAR(100),
  account_name VARCHAR(100),
  is_address BOOLEAN DEFAULT FALSE,
  text_content TEXT
);

CREATE TABLE IF NOT EXISTS rsvp_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guest_name VARCHAR(100) NOT NULL,
  attendance ENUM('attending', 'not_attending') NOT NULL,
  num_guests INT DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed
INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
('hero_greeting', 'The Wedding Of'),
('hero_date', '2026-08-15'),
('quote_text', 'And among His signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquility with them, and He has put love and mercy between your (hearts).'),
('quote_author', 'Surah Ar-Rum : 21'),
('intro_text', 'With the grace and blessing of God Almighty, we cordially invite you to our wedding celebration.');

INSERT IGNORE INTO couple_profiles (role, full_name, nickname, short_profile, father_name, mother_name, instagram_url) VALUES
('bride', 'Nawangwulan Sekar, S.Ds', 'Sekar', 'Daughter of', 'Bapak Sudjarwo', 'Ibu Ratna', 'https://instagram.com/sekar'),
('groom', 'Bima Aryasena, S.T', 'Bima', 'Son of', 'Bapak Haryanto', 'Ibu Siti', 'https://instagram.com/bima');

INSERT IGNORE INTO event_details (type, event_date, start_time, end_time, location_name, address, map_url) VALUES
('akad', '2026-08-15', '08:00:00', '10:00:00', 'Pendopo Royal', 'Jl. Mataram No 1, Yogyakarta', 'https://maps.google.com'),
('reception', '2026-08-15', '11:00:00', '14:00:00', 'Pendopo Royal', 'Jl. Mataram No 1, Yogyakarta', 'https://maps.google.com');

INSERT IGNORE INTO rsvp_messages (guest_name, attendance, num_guests, message) VALUES 
('Rahma & Family', 'attending', 2, 'Happy wedding Sekar & Bima! Wishing you a lifetime of happiness.'),
('Dimas Arya', 'not_attending', 0, 'Sorry I cannot make it. Congratulations!'),
('Sari', 'attending', 1, 'Beautiful invitation! See you on the big day.');

CREATE TABLE IF NOT EXISTS guests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  guest_name VARCHAR(200) NOT NULL,
  max_guests INT DEFAULT 2,
  has_opened BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
('photo_hero', ''),
('photo_bride', ''),
('photo_groom', ''),
('photo_story', ''),
('video_url', 'https://www.youtube.com/embed/dQw4w9WgXcQ'); /* Placeholder video */


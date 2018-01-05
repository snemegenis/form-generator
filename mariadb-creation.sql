CREATE DATABASE IF NOT EXISTS disabilitymanager;
USE disabilitymanager;
CREATE USER 'admin'@'%' IDENTIFIED BY PASSWORD 'admin123';
SET PASSWORD FOR 'admin'@'%' = PASSWORD('admin123');
GRANT ALL PRIVILEGES ON disabilitymanager.* TO 'admin'@'%' WITH GRANT OPTION;
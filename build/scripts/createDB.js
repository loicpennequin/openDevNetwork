'use strict'

const mysql = require('mysql'),
      database = mysql.createConnection({
          host : "localhost",
          user : "root",
          password : "",
          multipleStatements: true
});

database.connect((error)=>{
    if (error) throw error;
    console.log('Connection to MySQL successful...')
    console.log('Creating DB...');

    let sql = `START TRANSACTION;
    SET time_zone = "+00:00";
    CREATE DATABASE IF NOT EXISTS maestris_cambrai DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
    USE maestris_cambrai;
    DROP TABLE IF EXISTS categories;
    CREATE TABLE IF NOT EXISTS categories (
      id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      slug varchar(255) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
    DROP TABLE IF EXISTS comments;
    CREATE TABLE IF NOT EXISTS comments (
      id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
      author varchar(255) NOT NULL,
      body text NOT NULL,
      email varchar(255) DEFAULT NULL,
      post_id int(11) UNSIGNED NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
    DROP TABLE IF EXISTS messages;
    CREATE TABLE IF NOT EXISTS messages (
      id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      body text NOT NULL,
      subject varchar(255) NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    DROP TABLE IF EXISTS posts;
    CREATE TABLE IF NOT EXISTS posts (
      id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
      title varchar(255) NOT NULL,
      summary varchar(255) NOT NULL,
      body text NOT NULL,
      slug varchar(255) NOT NULL,
      category_id int(11) UNSIGNED NOT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY slug (slug)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
    DROP TABLE IF EXISTS settings;
    CREATE TABLE IF NOT EXISTS settings (
      id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      about_text text,
      PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
    COMMIT;

    ;`
    database.query(sql, (err, result) =>{
        if (err) throw err ;
        console.log('Database created.')
        process.exit();
    })
})

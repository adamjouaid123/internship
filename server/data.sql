CREATE TABLE form (
    form_id INTEGER PRIMARY KEY,
    data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE form_relationship (
  relationship TEXT,
  form_id1 INTEGER,
  form_id2 INTEGER,
  FOREIGN KEY (form_id1) REFERENCES form(form_id),
  FOREIGN KEY (form_id2) REFERENCES form(form_id),
  PRIMARY KEY (form_id1, form_id2)
);

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
    --token TEXT
);

CREATE TABLE IF NOT EXISTS roles (
  role_id INTEGER PRIMARY KEY,
  role_name TEXT
);

CREATE TABLE IF NOT EXISTS permissions (
  permission_id INTEGER PRIMARY KEY,
  permission_name TEXT
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INTEGER,
  permission_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
  PRIMARY KEY (role_id, permission_id)
);

INSERT INTO roles (role_id, role_name) VALUES
  (1, 'admin'),
  (2, 'manager'),
  (3, 'user'),
  (4, 'it');

INSERT INTO permissions (permission_id, permission_name) VALUES
  (1, 'create_form'),
  (2, 'read_form'),
  (3, 'update_form'),
  (4, 'delete_form'),
  (5, 'get_stats');

INSERT INTO role_permissions (role_id, permission_id) VALUES
  (1, 1), -- admin can create_form
  (1, 2), -- admin can read_form
  (1, 3), -- admin can update_form
  (1, 4), -- admin can delete_form
  (1, 5), -- admin can get_stats


  (2, 2), -- manager can read_form
  (2, 3), -- manager can update_form

  
  (3, 2); -- user can read_form

INSERT INTO users VALUES (1, 'admin', 'admin', 1);  -- admin
INSERT INTO users VALUES (2, 'adam', 'adam', 2);  -- manager
INSERT INTO users VALUES (3, 'ali', 'ali', 3);  --user


-- CREATE TABLE individual {
--     individual_id
--     first_name
--     date_of_birth
--     bla bla
-- }
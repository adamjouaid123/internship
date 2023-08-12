import db from "../db";
import { Request, Response, NextFunction } from 'express';

export interface Form {
  form_id: number
  data: any
}

export interface FormRelationship {
  form_id1: number;
  form_id2: number;
  relationship: string;
}

export interface User {
  user_id: number;
  username: string;
  password: string;
  role_id: number;
}


export interface UserData {
  user_id: number;
  username: string;
  role_name: string;
  permissions: string;
}

export function getForm(formId: number): Promise<Form> {
  return new Promise((resolve, reject) => {
    var forms: Form[] = []
    db.get("SELECT * FROM form WHERE form_id = ?", [formId], (err: Error | null, row: any) => {
      if (err != null) return reject(err)
      console.log("in getForm : " + formId)
      //console.log(row)
      row.data = JSON.parse(row.data)
      resolve(row as Form)
    })
  })
}

export function getForms(): Promise<Form[]> {
  return new Promise((resolve, reject) => {
    var forms: Form[] = []
    db.each("SELECT * FROM form ORDER BY form_id DESC", (err, row: any) => {
      if (err != null) return reject(err)
      row.data = JSON.parse(row.data)
      forms.push(row as Form)
    }, (err) => {
      if (err != null) return reject(err)
      resolve(forms)
    })
  })
}

export function addForm(data: any): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO form (data) VALUES (?)", [JSON.stringify(data)], function (err: any) {
      if (err != null) return reject(err)
      resolve(this.lastID)
    })
  })
}

export function getRelationshipTable(): Promise<FormRelationship[]> {
  return new Promise((resolve, reject) => {
    var relations: FormRelationship[] = []
    db.each("SELECT * FROM form_relationship ", (err, row: any) => {
      if (err != null) return reject(err)
      relations.push(row as FormRelationship)
    }, (err) => {
      if (err != null) return reject(err)
      resolve(relations)
    })
  })
}

export function getRelationships(form_id: number): Promise<FormRelationship[]> {
  return new Promise((resolve, reject) => {
    var rels: FormRelationship[] = []
    db.each("SELECT * FROM form_relationship WHERE form_id1 = ? OR (relationship = 'marriage' AND form_id2 = ?)", [form_id, form_id], (err, row: any) => {
      if (err != null) return reject(err)
      rels.push(row as FormRelationship)
    }, (err) => {
      if (err != null) return reject(err)
      resolve(rels)
    })
  })
}

export async function getFormWithRelationships(formId: number): Promise<Form> {

  const form = await getForm(formId)
  const formData = form.data;

  const relationships: FormRelationship[] = await new Promise((resolve, reject) => {
    var rels: FormRelationship[] = []
    db.each("SELECT * FROM form_relationship WHERE form_id1 = ? OR (relationship = 'marriage' AND form_id2 = ?)", [formId, formId], (err, row: any) => {
      if (err != null) return reject(err)
      rels.push(row as FormRelationship)
    }, (err) => {
      if (err != null) return reject(err)
      resolve(rels)
    })
  })

  for (let rel of relationships) {
    if (rel.relationship === "marriage") {
      const otherId = rel.form_id1 === formId ? rel.form_id2 : rel.form_id1
      
      const relForm = await getForm(otherId)
      const relFormData = relForm.data
      relFormData.form_id = relForm.form_id

      if (Array.isArray(formData.marriages)){
        formData.marriages.push(relFormData)
      } else {
        formData.marriages = [relFormData]
      }

    } else if (rel.relationship === "child") {

      const relForm = await getForm(rel.form_id2)
      const relFormData = relForm.data
      relFormData.form_id = relForm.form_id

      if (Array.isArray(formData.childrens)) {
        formData.childrens.push(relFormData)
      } else {
        formData.childrens = [relFormData]
      }
    }
  }

  return form
}

export function getAllRelationships(form_id: number): Promise<FormRelationship[]> {
  return new Promise((resolve, reject) => {
    var rels: FormRelationship[] = []
    db.each("SELECT * FROM form_relationship WHERE form_id1 = ? OR form_id2 = ?", [form_id, form_id], (err, row: any) => {
      if (err != null) return reject(err)
      rels.push(row as FormRelationship)
    }, (err) => {
      if (err != null) return reject(err)
      resolve(rels)
    })
  })
}

export function addFormRelationship(form_id1: number, form_id2: number, relationship: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO form_relationship (form_id1, form_id2, relationship) VALUES (?, ?, ?)", [form_id1, form_id2, relationship], function (err: any) {
      if (err != null) return reject(err)
      resolve(this.lastID)
    })
  })
}

export function getChild(form_id: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    db.all("SELECT form_id2 AS child_form_id FROM form_relationship WHERE form_id1 = ? AND relationship = 'child' ", [form_id], function (err: any, rows: any[]) {
      if (err != null) return reject(err)
      const childFormIds = rows.map((row) => row.child_form_id);
      resolve(childFormIds)
    })
  })
}

export function deleteRelationshipRow(form_id1: number, form_id2: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.run("DELETE FROM form_relationship WHERE form_id1 = ? AND form_id2 = ?", [form_id1, form_id2], function (err: any) {
      if (err != null) return reject(err)
      resolve()
    });
  })
}

export function deleteRelationshipId(form_id1: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.run("DELETE FROM form_relationship WHERE form_id1 = ? OR form_id2 = ?", [form_id1, form_id1], function (err: any) {
      if (err != null) return reject(err)
      resolve()
    });
  })
}

export function deleteRelationsTable(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.run("DELETE FROM form_relationship", (err: any) => {
      if (err != null) return reject(err)
      resolve()
    })
  })
}

export function updateForm(id: number, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run("UPDATE form SET data = ? WHERE form_id = ?", [JSON.stringify(data), id], (err: any) => {
      if (err != null) return reject(err);
      resolve();
    });
  });
}

export function clearFormTable(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM form", (err: any) => {
      if (err != null) return reject(err);
      resolve();
    });
  });
}

export function deleteFormById(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM form WHERE form_id = ?", [id], (err: any) => {
      if (err != null) return reject(err);
      resolve();
    });
  });
}

export function validateFormFieldValues(data: any): string {
  let requiredFields: any = {
    first_name: { type: "string", min_length: 1, required: true },
    last_name: { type: "string", min_length: 1, required: true },
    sex: { type: "string", options: ["male", "female", "other"], required: true },
  }

  for (let key of Object.keys(requiredFields)) {
    // check if it exists
    const fieldDetails = requiredFields[key];
    const value = data[key]
    if (value === undefined && fieldDetails.required) {
      return `field: ${key} is missing`
    }

    const fType = fieldDetails.type;
    if (fType && typeof value !== fType) {
      return `field: ${key} is not of type: ${fType}`
    }

    if (fieldDetails.min_length && value.length < fieldDetails.min_length) {
      return `string: ${key} should at be at least ${fieldDetails.min_length} characters long`
    }

    if (fieldDetails.options && !fieldDetails.options.includes(value)) {
      return `field: ${key} should be one of ${JSON.stringify(fieldDetails.options)}`
    }
  }

  return ""
}

export function validateUser(data: any): Promise<string> {
  const requiredFields: any = {
    username: { type: 'string', min_length: 1, required: true },
    password: { type: 'string', min_length: 1, required: true },
  }

  for (const key of Object.keys(requiredFields)) {
    const fieldDetails = requiredFields[key];
    const value = data[key]
    if (value === undefined && fieldDetails.required) {
      return Promise.reject(`Field: ${key} is missing`)
    }

    const fType = fieldDetails.type;
    if (fType && typeof value !== fType) {
      return Promise.reject(`Field: ${key} is not of type: ${fType}`)
    }

    if (fieldDetails.min_length && value.length < fieldDetails.min_length) {
      return Promise.reject(`Field: ${key} should be at least ${fieldDetails.min_length} characters long`)
    }
  }

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?'
    const values = [data.username]

    db.get(query, values, (err: Error | null, row: any) => {
      if (err) {
        return reject("Error: " + err.message)
      }

      if (!row) {
        return resolve("Invalid username")
      }

      if (row.password !== data.password) {
        return resolve("Wrong password")
      }

      return resolve('')
    });
  });
}

export function getUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const users: User[] = []

    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject(err)
        return
      }

      rows.forEach((row: any) => {
        const user: User = {
          user_id: row.user_id,
          username: row.username,
          password: row.password,
          role_id: row.role_id,
        };
        users.push(user);
      });
      resolve(users)

    })
  })
}

export function getUserByUsername(username: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const users: User[] = []
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row: any) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        resolve(null);
        return;
      }
      const user: User = {
        user_id: row.user_id,
        username: row.username,
        password: "hidden",
        role_id: row.role_id,
      };

      resolve(user);
    });
  });
}

export function getUserDataByUsername(username: string): Promise<UserData | null> {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        u.user_id,
        u.username,
        r.role_name,
        json_group_array(p.permission_name) AS permissions
      FROM
        users AS u
      JOIN
        roles AS r ON u.role_id = r.role_id
      LEFT JOIN
        role_permissions AS rp ON u.role_id = rp.role_id
      LEFT JOIN
        permissions AS p ON rp.permission_id = p.permission_id
      WHERE
        u.username = ?
      GROUP BY
        u.user_id, u.username, r.role_name;
    `;

    db.get(query, [username], (err, row: UserData) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        resolve(null);
        return;
      }

      row.permissions = JSON.parse(row.permissions);

      resolve(row);
    });
  });
}
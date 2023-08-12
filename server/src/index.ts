import express, { NextFunction, RequestHandler } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import jwt from 'jsonwebtoken';
import { Form, addForm, clearFormTable, getForm, getForms, validateFormFieldValues, deleteFormById, updateForm, getUsers, validateUser, getUserByUsername, getUserDataByUsername, UserData, addFormRelationship, getRelationships, deleteRelationshipRow, deleteRelationshipId, deleteRelationsTable, getAllRelationships, getRelationshipTable, getChild, getFormWithRelationships } from "./model/form";
const { spawn } = require('child_process')
const secretKey = 'secret'

interface decodedToken {
  user_id: number;
  username: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserData;
  }
}

const authorizeUser: RequestHandler = async (req, res, next) => {
  // if endpoint regex /user <- hayde ma bada auth fa mare2a (in case 3am testa3mel app.use(authorizeUser))
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).end("Unauthorized: Token not provided");
    }
    if (typeof token === "string") {
      const decodedToken = jwt.verify(token, secretKey) as decodedToken
      const { username } = decodedToken;
      const userData = await getUserDataByUsername(username)
      if (userData !== null) {
        req.user = userData;
      }
    } else {
      console.log(token)
    }
    

    // get the user form the database by username or user_id  --------------------done
    // join with role and permission and add the permissions as json to 
    // the request ---------------------done 

    // now what?

    next();
  } catch (error: any) {
    console.error(error)
    res.status(403).end("Unauthorized");
  }
};

app.get('/form', async (req, res) => {
  // if user.permissions["get_form"] does not exist:
  // dont let the user get the forms
  try {
    const forms = await getForms();
    res.json(forms);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.post('/form', authorizeUser, async (req, res) => {
  const data = req.body;

  // bten3amal function hay
  for (let marriage of (data.marriages) || []) {
    let validateResult = validateFormFieldValues(marriage)
      if (validateResult !== "") {
        res.status(500).send(validateResult)
        return
      }
    for (let child of (marriage.childrens || [])) {
      let validateResult = validateFormFieldValues(child)
      if (validateResult !== "") {
        res.status(500).send(validateResult)
        return
      }
    }
  }

  let validateResult = validateFormFieldValues(data)
  if (validateResult !== "") {
    res.status(500).send(validateResult)
    return
  }

  const formId = data.form_id;

  const userData = req.user
  try {
    if (formId) {
      // mna3mel get lal form metel fo2 w menshuf shu tghayar w menzid li tghayar
      // mnemro2 3al li mesh mawjoud 

      const formData = { ...data }
      const formDataWithoutMarriages = { ...data }
      delete formDataWithoutMarriages.marriages
      const form_id1 = formId
      for (let marriage of (formData.marriages || [])) {
        if(!marriage.form_id) {
          const marriageWithoutChildren = { ...marriage }
          delete marriageWithoutChildren.childrens
          const form_id2 = await addForm(marriageWithoutChildren)
          await addFormRelationship(form_id1, form_id2, "marriage") // add marriage status
          for (let child of (marriage.childrens || [])) {
            const form_id3 = await addForm(child)
            await addFormRelationship(form_id1, form_id3, "child") // hayde lal main subject 
            await addFormRelationship(form_id2, form_id3, "child") // badna wehde tenye lal marriage 
          }
        } else {
          for (let child of (marriage.childrens || [])) {
            if(child.form_id) continue
            const form_id3 = await addForm(child)
            await addFormRelationship(form_id1, form_id3, "child") // hayde lal main subject 
            await addFormRelationship(marriage.form_id, form_id3, "child") // badna wehde tenye lal marriage 
          }
        }
      }

      if (!userData?.permissions.includes('update_form')) {
        return res.status(403).end("Unauthorized")
      }
      
      await updateForm(formId, formDataWithoutMarriages)
      res.status(200).send("successfully updated")
      return
    } else {
      if (!userData?.permissions.includes('create_form')) {
        return res.status(403).end("Unauthorized")
      }

      // lezem nhot lot more logic here 
      // nemro2 3al fields w nshuf eza common aw exclusive w nna2elon 3a zaw2na
      // house mna3 
      const formData = { ...data }
      const formDataWithoutMarriages = { ...data }
      delete formDataWithoutMarriages.marriages
      const form_id1 = await addForm(formDataWithoutMarriages)
      for (let marriage of (formData.marriages || [])) {
        const marriageWithoutChildren = { ...marriage }
        delete marriageWithoutChildren.childrens
        const form_id2 = await addForm(marriageWithoutChildren)
        await addFormRelationship(form_id1, form_id2, "marriage") // add marriage status
        for (let child of (marriage.childrens || [])) {
          const form_id3 = await addForm(child)
          await addFormRelationship(form_id1, form_id3, "child") // hayde lal main subject 
          await addFormRelationship(form_id2, form_id3, "child") // badna wehde tenye lal marriage 
        }
      }

      res.status(201).send("sucessfully added")
      return
    }
  } catch (e) {
    console.error(e)
    res.status(500).end();
    return;
  }

  // res.status(200).end()
  // return;
});

app.get('/form/:formId', authorizeUser, async (req, res) => {
  const userData = req.user
  if (!userData?.permissions.includes('read_form')) {
    return res.status(403).end("Unauthorized")
  }

  let formId = 0;
  try {
    formId = parseInt(req.params.formId);
  } catch (e) {
    console.error(e);
    res.status(400).end("invalid formId");
    return
  }

  try {
    const formWithRelationships = await getFormWithRelationships(formId)

    res.send(formWithRelationships);
    return
  } catch (e) {
    console.error(e);
    res.status(500).end();
    return
  }
})

app.delete('/form/:formId', authorizeUser, async (req, res) => {
  // If child we just delete the child form
  // If marriage we delete it and his children too
  const userData = req.user
  if (!userData?.permissions.includes('delete_form')) {
    return res.status(403).end("Unauthorized")
  }
  let formId = 0
  try {
    formId = parseInt(req.params.formId)
  } catch (err) {
    console.log(err)
    res.status(500).end("Invalid formId")
    return
  }

  try {
    //************CASE WHERE CHILD IS JUST THAT *****************//
    //await deleteFormById(formId)
    //await deleteRelationshipId(formId)

    //************CASE WHERE ITS A PARENT THAT HAS A CHILD *********************//

    const childIds = await getChild(formId)

    for (const child of childIds) {
      if (child) {
        await deleteFormById(child)
        await deleteRelationshipId(child)
        res.status(200).send("Successfully cleared form with id: " + child);
      }
    }
    await deleteFormById(formId)
    await deleteRelationshipId(formId)
    res.status(200).send("Successfully cleared form with id: " + formId);

    return res.status(200).end();


  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get("/relationships", async (req, res) => {
  try {
    const users = await getRelationshipTable()
    res.send(users)
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

app.post('/clear', async (req, res) => {
  try {
    await clearFormTable();
    res.status(200).send("Successfully cleared");
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.get("/users", authorizeUser, async (req, res) => {

  // just for the interface to check whether the token is valid

  try {
    const users = await getUsers()
    res.send(users)
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

app.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(404).end();
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).end();
    }

    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationError = await validateUser({ username, password });
    if (validationError) {
      return res.status(400).send(validationError);
    }

    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const token = jwt.sign({ user_id: user.user_id, username: user.username }, secretKey);
      res.json({ token });
      return;
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

app.post('/script/:scriptName/run', authorizeUser, async (req, res) => {
  const { scriptName } = req.params;
  const userData = req.user
  if (!userData?.permissions.includes('get_stats')) {
    return res.status(403).end("Unauthorized")
  }

  let forms: Form[] = [];
  try {
    forms = await getForms();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }

  const pythonScript = spawn('python3', [`./src/${scriptName}.py`, JSON.stringify(forms)]);
  let outputData = '';

  pythonScript.stdout.on('data', (data: Buffer) => {
    outputData += data.toString();
  });

  pythonScript.on('close', () => {
    console.log('Output:', outputData);
    res.download('./src/data.xlsx', 'data.xlsx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).end();
      }
    });
  });

  pythonScript.on('error', (err: Error) => {
    console.error('Error executing Python script:', err);
    res.status(500).end();
  });
});

app.post("/clear/relations", async (req, res) => {
  try {
    await deleteRelationsTable();
    res.status(200).send("Successfully cleared");
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


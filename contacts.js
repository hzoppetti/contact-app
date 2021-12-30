/**
*  @swagger
*  tags:
*    name: Contacts
*    description: API to manage your contacts.
*/

/**
*  @swagger
*  /users/:
*    get:
*      summary: List Contacts
*      tags: [Contacts]
*      responses:
*        "200":
*          description: The list of all contacts. Sortable and paginated in the UX.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Contact'
*        "500":
*          description: Internal Server Error
*    post:
*      summary: Create Contact
*      description: Create a new contact using a Contact payload.
*      tags: [Contacts]
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Contact'
*      responses:
*        "201":
*          description: Contact added.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Contact'
*        "500":
*          description: Internal Server Error
*    delete:
*      summary: Delete Contacts
*      description: Delete all contacts.
*      tags: [Contacts]
*      responses:
*        "204":
*          description: Deletes all the contacts from the list.
*        "500":
*          description: Internal Server Error
*/

/**
*  @swagger
*  /users/{id}:
*    get:
*      summary: Get Contact by Id
*      description: Get a single Contact by specified identifier.
*      tags: [Contacts]
*      parameters:
*        - in: path
*          name: id
*          required: true
*          description: Identifier of the contact to retrieve.
*          schema:
*            type: number
*      responses:
*        "200":
*          description: Returns the contact matching the passed in Id.
*          content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Contact'
*        "500":
*          description: Internal Server Error
*    put:
*      summary: Update Contact
*      description: Update a contact using a Contact payload.
*      tags: [Contacts]
*      parameters:
*        - in: path
*          name: id
*          required: true
*          description: Identifier of the contact to retrieve.
*          schema:
*            type: number
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Contact'
*      responses:
*        "200":
*          description: Contact modified.
*        "500":
*          description: Internal Server Error
*    delete:
*      summary: Delete Contact by Id
*      description: Delete a contact by specified identifier.
*      tags: [Contacts]
*      parameters:
*        - in: path
*          name: id
*          required: true
*          description: Identifier of the contact to retrieve.
*          schema:
*            type: number
*      responses:
*        "200":
*          description: User deleted.
*        "500":
*          description: Internal Server Error
*/

/**
*  @swagger
*  components:
*    schemas:
*      Contact:
*        type: object
*        required:
*          - name
*          - email
*          - phone
*        properties:
*          name:
*            type: string
*            description: The contact's first and last name.
*          email:
*            type: string
*            description: The contact's email address. No format is enforced.
*          phone:
*            type: string
*            description: Theh contact's phone number. No format is enforced.
*        example:
*          name: Heather Zoppetti
*          email: heather@example.com
*          phone: 555-555-1212
*/
require('dotenv').config();
const express = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.API_PG_USER,
    host: process.env.API_PG_HOST,
    database: process.env.API_PG_DATABASE,
    password: process.env.API_PG_PASSWORD,
    port: process.env.API_PG_PORT
});

// List Contacts
// GET /users
const getUsers = (req, res) => {
    pool.query(
        'SELECT * FROM users ORDER BY id ASC',
        (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(results.rows);
            console.log(res);
        }
    });
};

// Get Contact by Id
// GET /users/{id}
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id],
        (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(results.rows[0]);
            console.log(res);
        }
    });
};

// Create Contact
// POST /users
const createUser = (req, res) => {
    const { name, email, phone } = req.body;

    pool.query(
        'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING id',
        [name, email, phone],
        (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(`User added with ID: ${results.rows[0].id}`);
            console.log(res);
        }
    });
};

// Update Contact
// PUT /users
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4',
        [name, email, phone, id],
        (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(`User modified with ID: ${id}`);
                console.log(res);
            }
    });
};

// Delete Contact by Id
// DELETE /users/{id}
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(`User deleted with ID: ${id}`);
            console.log(res);
        }
    });
};

// Delete Contacts
// DELETE /users
const deleteAllUsers = (req, res) => {
    pool.query('TRUNCATE users', (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(204).send(`All users deleted`);
            console.log(res);
        }
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers
};

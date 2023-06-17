const express = require("express");
const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes
const dataFilePath = path.join(__dirname, "data.json");

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Data API",
      version: "1.0.0",
      description: "API for managing data",
    },
    components: {
      schemas: {
        Data: {
          type: "object",
          properties: {
            textValues: {
              type: "array",
              items: {
                type: "string",
              },
            },
            checkboxValues: {
              type: "array",
              items: {
                type: "boolean",
              },
            },
          },
          required: ["textValues", "checkboxValues"],
        },
      },
    },
  },
  apis: ["server.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json());

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get the data
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 */
app.get("/data", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read data:", err);
      return res.sendStatus(500);
    }

    try {
      const jsonData = JSON.parse(data);
      return res.json(jsonData);
    } catch (err) {
      console.error("Failed to parse data:", err);
      return res.sendStatus(500);
    }
  });
});

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Save the data
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Data'
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/data", (req, res) => {
  const { textValues, checkboxValues } = req.body;
  const data = { textValues, checkboxValues };

  const jsonData = JSON.stringify(data);

  fs.writeFile(dataFilePath, jsonData, "utf8", (err) => {
    if (err) {
      console.error("Failed to save data:", err);
      return res.sendStatus(500);
    }

    console.log("Data saved successfully");
    return res.sendStatus(200);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

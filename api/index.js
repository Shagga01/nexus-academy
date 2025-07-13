import express from 'express'
import pg from 'pg'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

app.get('/subjects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM subjects')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

app.listen(3001, () => console.log('🚀 API running on port 3001'))

import express, { Request, Response } from 'express'
import axios from 'axios'
import { validateRequestBody } from './middlewares'
import { bodySchema } from './schemas'
import { RequestBody, PaymentInfo } from './interfaces'
import { responseMessage } from './utils'
import { pool } from './db'

const app = express()
const port = process.env.PORT || 8000

// Middleware para poder recibir JSON
app.use(express.json())

// Endpoint POST que permite enviar un pago en GeneralPayment
app.post('/', validateRequestBody(bodySchema), async (req: Request, res: Response) => {
  const { transferCode, amount } = req.body as RequestBody
  const API_URL: string = process.env.DEV_URL
  const TOKEN_URL: string = `${API_URL}/token?email=${transferCode}`
  const PAYMENT_URL: string = `${API_URL}/payment?email=${transferCode}&transferCode=${transferCode}`

  try {
    // Obtiene el token de la API
    const token = await axios.get<string>(TOKEN_URL)
    const headers = { 'Authorization': token.data }

    try {
      // Se busca información de pago
      const paymentInfo = await axios.get<PaymentInfo | string>(PAYMENT_URL, { headers })
      // Si existe la transferencia, no se debe realizar
      if (paymentInfo.data === 'TRANSFER_NOT_FOUND') {
        try {
          // Se guarda la transferencia en la base de datos
          await pool.query(`INSERT INTO payments (transfer_code, amount) VALUES ('${transferCode}', ${amount})`)
          // Se envía el pago en GeneralPayment
          await axios.post<RequestBody>(PAYMENT_URL, { transferCode, amount }, { headers })
          responseMessage(res, 200, `Se transfirió exitosamente una cantidad de ${amount} a ${transferCode}.`)
        } catch (e) {
          responseMessage(res, 500, 'Error al hacer la transferencia.')
        }
      }
      // Si ya existía una transferencia, no se realiza
      else {
        responseMessage(res, 400, 'Ya se hizo una transferencia con este código.')
      }
    } catch (e) {
      responseMessage(res, 500, 'Error al obtener datos de pago. Intenta nuevamente más tarde.')
    }
  } catch (e) {
    responseMessage(res, 500, 'Error al obtener datos de pago. Intenta nuevamente más tarde.')
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
});

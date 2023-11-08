# GeneralPayment API

API que permite registrar pagos en el sistema de GeneralPayment.

## Endpoints

### Registrar un pago en GeneralPayment

- URL: http://localhost:8000/
- Método: POST
- Envía un pago al sistema GeneralPayment
- Request body:
```json
{
  "transferCode": email,
  "amount": int
}
```
Ejemplo:
- Request body:
```json
{
  "transferCode": "tu_correo@tu_correo.com",
  "amount": 5000
}
```
- Respuesta exitosa:
```json
{
  "message": "Se transfirió exitosamente una cantidad de 5000 a tu_correo@tu_correo.com."
}
```

## ¿Cómo levantar el proyecto en Windows?

1. Tener instalado Docker Desktop, idealmente la última versión.
2. En la terminal, escribir el siguiente comando: `docker-compose up`

Con ello, ya se pueden realizar peticiones a la API.

## Nota importante

Para testear la API, se utilizó la URL de prueba. Sin embargo, ya que se debe hacer la evaluación, en la línea 18, donde se define API_URL, basta cambiar DEV_URL por PROD_URL.
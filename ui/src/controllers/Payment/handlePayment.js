import axios from "axios"
import { paymentHandler } from "./paymentHandler"

const hadlePayment = async ({formData, products}) => {
    const res = await Promise.all([paymentHandler()])
}
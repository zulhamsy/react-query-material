export type Header = {
  id: string
  CustomerName: string
  OrderDate: string | Date
  TotalAmount: number
  OrderStatus: "Pending" | "Shipped"
}

export type SalesOrder = Header & {
  OrderItemsId: string
  Notes: string
  ShippingAddress: Address
  BillingAddress?: Address
  PaymentMethod: CreditCardPayment | PaypalPayment | BankPayment | CashPayment
}

export type OrderItems = {
  id: string
  Items: ProductItem[]
}

type Address = {
  Street: string
  City: string
  State: string
  ZipCode: string
  Country: string
}

type CreditCardPayment = {
  MethodType: "Credit Card"
  CardNumber: string
  ExpiryDate: Date | string
  CVV: number
  BillingAddress: Address
}

type PaypalPayment = {
  MethodType: "Paypal"
  Email: string
}

type BankPayment = {
  MethodType: "Bank Transfer"
  AccountNumber: string
  RoutingNumber: string
}

type CashPayment = {
  MethodType: "Cash"
}

type ProductItem = {
  id: string
  ProductName: string
  Quantity: number
  UnitPrice: number
  LineTotal: number
}

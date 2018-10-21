export interface CustomerType {
  id: { type: Number; unique: true };
  type: { type: String };
  email: { type: String; unique: true };
  phone: { type: String; unique: true };
  password: { type: String; default: 0 };
}

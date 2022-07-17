interface UserProps {
  id: number,
  name: string
  email: string
  password: string
  role: string
}

export class User {
  id: number
  name: string
  email: string
  password: string
  role: string
  constructor({ name, email, password, role, id }: UserProps) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.role = role
  }
}
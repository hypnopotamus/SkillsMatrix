variable "tags" {
  type = map(string)
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "vnet_access_subnet_id" {
  type = string
}

variable "principal_access_id" {
  type = string
}

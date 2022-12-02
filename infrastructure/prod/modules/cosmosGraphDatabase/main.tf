terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
}

resource "azurerm_cosmosdb_account" "skillsmatrix" {
  name                = "skillsmatrix"
  location            = var.location
  resource_group_name = var.resource_group_name
  tags                = var.tags

  capabilities {
    name = "EnableGremlin"
  }

  identity {
    type = "SystemAssigned"
  }

  offer_type       = "Standard"
  enable_free_tier = true
  capacity {
    total_throughput_limit = 1000
  }

  public_network_access_enabled     = false
  is_virtual_network_filter_enabled = true
  virtual_network_rule {
    id                                   = var.vnet_access_subnet_id
    ignore_missing_vnet_service_endpoint = true
  }

  consistency_policy {
    consistency_level = "Eventual"
  }
  geo_location {
    location          = var.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_gremlin_database" "skillsmatrix" {
  name                = "skillsmatrix"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.skillsmatrix.name

  throughput = 400
}

resource "azurerm_cosmosdb_gremlin_graph" "skillsmatrix" {
  name                = "skillsmatrix"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.skillsmatrix.name
  database_name       = azurerm_cosmosdb_gremlin_database.skillsmatrix.name

  throughput         = 400
  partition_key_path = "/pk"
  index_policy {
    indexing_mode = "lazy"
  }
}

# todo RBAC to the database

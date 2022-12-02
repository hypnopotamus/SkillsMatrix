#todo output connection and use it to publish images / charts then install using this registry
resource "azurerm_container_registry" "skillsmatrix" {
  name                = "techshowcaseskillsmatrix"
  location            = var.location
  resource_group_name = var.resource_group_name
  tags                = var.tags

  sku = "Basic"
}

resource "azurerm_role_assignment" "skillsmatrix_cluster_containerregistry" {
  principal_id                     = var.pull_principal_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.skillsmatrix.id
  skip_service_principal_aad_check = true
}

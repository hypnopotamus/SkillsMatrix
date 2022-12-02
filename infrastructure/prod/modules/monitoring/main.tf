terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
}

resource "azurerm_log_analytics_workspace" "skillsmatrix" {
  name                   = "skillsmatrix-loganalyticsworkspace"
  location               = var.location
  resource_group_name    = var.resource_group_name
  retention_in_days      = 30
  internet_query_enabled = true
  tags                   = var.tags
}

resource "azurerm_application_insights" "skillsmatrix_api" {
  name                   = "skillsmatrix-applicationinsights-api"
  location               = var.location
  resource_group_name    = var.resource_group_name
  workspace_id           = azurerm_log_analytics_workspace.skillsmatrix.id
  application_type       = "Node.JS"
  internet_query_enabled = true
  tags                   = var.tags
}

resource "azurerm_application_insights" "skillsmatrix_ui_container" {
  name                   = "skillsmatrix-applicationinsights-ui-container"
  location               = var.location
  resource_group_name    = var.resource_group_name
  workspace_id           = azurerm_log_analytics_workspace.skillsmatrix.id
  application_type       = "other"
  internet_query_enabled = true
  tags                   = var.tags
}

resource "azurerm_application_insights" "skillsmatrix_ui_comparison" {
  name                   = "skillsmatrix-applicationinsights-ui-comparison"
  location               = var.location
  resource_group_name    = var.resource_group_name
  workspace_id           = azurerm_log_analytics_workspace.skillsmatrix.id
  application_type       = "other"
  internet_query_enabled = true
  tags                   = var.tags
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_api_connectionstring" {
  metadata {
    name   = "application-insights-api"
    labels = var.tags
  }
  immutable = true
  type      = "Opaque"

  data = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = azurerm_application_insights.skillsmatrix_api.connection_string
  }
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_uicontainer_connectionstring" {
  metadata {
    name   = "application-insights-uicontainer"
    labels = var.tags
  }
  immutable = true
  type      = "Opaque"

  data = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = azurerm_application_insights.skillsmatrix_ui_container.connection_string
  }
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_uicomparison_connectionstring" {
  metadata {
    name   = "application-insights-uicomparison"
    labels = var.tags
  }
  immutable = true
  type      = "Opaque"

  data = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = azurerm_application_insights.skillsmatrix_ui_comparison.connection_string
  }
}

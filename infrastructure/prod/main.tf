terraform {
  required_providers {
    helm = {
      source = "hashicorp/helm"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }

  backend "azurerm" {
    resource_group_name  = "skillsmatrix"
    storage_account_name = "skillsmatrix"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

provider "azurerm" {
  features {}
}

locals {
  tags = {
    project     = "tech-showcase"
    application = "skillsmatrix"
  }
}

resource "azurerm_resource_group" "skillsmatrix" {
  name     = "skillsmatrix-techshowcase"
  location = "North Central US"
  tags     = local.tags
}

resource "azurerm_log_analytics_workspace" "skillsmatrix" {
  name                   = "skillsmatrix-loganalyticsworkspace"
  location               = azurerm_resource_group.skillsmatrix.location
  resource_group_name    = azurerm_resource_group.skillsmatrix.name
  retention_in_days      = 30
  internet_query_enabled = true
  tags                   = local.tags
}

resource "azurerm_application_insights" "skillsmatrix_api" {
  name                   = "skillsmatrix-applicationinsights-api"
  location               = azurerm_resource_group.skillsmatrix.location
  resource_group_name    = azurerm_resource_group.skillsmatrix.name
  workspace_id           = azurerm_log_analytics_workspace.skillsmatrix.id
  application_type       = "Node.JS"
  internet_query_enabled = true
  tags                   = local.tags
}

resource "azurerm_application_insights" "skillsmatrix_ui_container" {
  name                   = "skillsmatrix-applicationinsights-ui-container"
  location               = azurerm_resource_group.skillsmatrix.location
  resource_group_name    = azurerm_resource_group.skillsmatrix.name
  workspace_id           = azurerm_log_analytics_workspace.skillsmatrix.id
  application_type       = "other"
  internet_query_enabled = true
  tags                   = local.tags
}

resource "azurerm_application_insights" "skillsmatrix_ui_comparison" {
  name                   = "skillsmatrix-applicationinsights-ui-comparison"
  location               = azurerm_resource_group.skillsmatrix.location
  resource_group_name    = azurerm_resource_group.skillsmatrix.name
  workspace_id           = azurerm_log_analytics_workspace.skillsmatrix.id
  application_type       = "other"
  internet_query_enabled = true
  tags                   = local.tags
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_api_connectionstring" {
  metadata {
    name   = "application-insights-api"
    labels = local.tags
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
    labels = local.tags
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
    labels = local.tags
  }
  immutable = true
  type      = "Opaque"

  data = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = azurerm_application_insights.skillsmatrix_ui_comparison.connection_string
  }
}

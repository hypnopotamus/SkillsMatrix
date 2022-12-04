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

resource "azurerm_virtual_network" "skillsmatrix" {
  name                = "skillsmatrix"
  location            = azurerm_resource_group.skillsmatrix.location
  resource_group_name = azurerm_resource_group.skillsmatrix.name
  tags                = local.tags

  address_space = ["10.0.0.0/8"]
}

resource "azurerm_subnet" "skillsmatrix" {
  name                 = "aks-default-subnet"
  virtual_network_name = azurerm_virtual_network.skillsmatrix.name
  resource_group_name  = azurerm_resource_group.skillsmatrix.name

  address_prefixes = ["10.240.0.0/16"]
}

resource "azurerm_kubernetes_cluster" "skillsmatrix" {
  name                      = "skillsmatrix"
  location                  = azurerm_resource_group.skillsmatrix.location
  resource_group_name       = azurerm_resource_group.skillsmatrix.name
  tags                      = local.tags
  sku_tier                  = "Free"
  automatic_channel_upgrade = "stable"

  identity {
    type = "SystemAssigned"
  }

  dns_prefix = "skillsmatrix"
  #ingress_application_gateway {
  #  gateway_name = "skillsmatrix"
  #  subnet_cidr  = "10.225.0.0/16"
  #}
  network_profile {
    network_plugin = "kubenet"
  }

  default_node_pool {
    name           = "default"
    node_count     = 1
    node_labels    = local.tags
    vm_size        = "standard_b4ms"
    tags           = local.tags
    vnet_subnet_id = azurerm_subnet.skillsmatrix.id
  }
}

#resource "azurerm_role_assignment" "skillsmatrix_cluster_network" {
#  principal_id                     = azurerm_kubernetes_cluster.skillsmatrix.ingress_application_gateway[0].ingress_application_gateway_identity[0].object_id
#  role_definition_name             = "Network Contributor"
#  scope                            = azurerm_virtual_network.skillsmatrix.id
#  skip_service_principal_aad_check = true
#}

module "container_registry" {
  source = "./modules/containerRegistry"

  resource_group_name = azurerm_resource_group.skillsmatrix.name
  location            = azurerm_resource_group.skillsmatrix.location
  tags                = local.tags
  pull_principal_id   = azurerm_kubernetes_cluster.skillsmatrix.kubelet_identity[0].object_id
}

provider "kubernetes" {
  host                   = azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.host
  username               = azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.username
  password               = azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.password
  client_certificate     = base64decode(azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.client_certificate)
  client_key             = base64decode(azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.cluster_ca_certificate)
}

provider "helm" {
  kubernetes {
    host                   = azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.host
    username               = azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.username
    password               = azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.password
    client_certificate     = base64decode(azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.client_certificate)
    client_key             = base64decode(azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.client_key)
    cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.skillsmatrix.kube_config.0.cluster_ca_certificate)
  }
}

resource "helm_release" "ingress" {
  name       = "skillsmatrix-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "4.3.0"

  values = [
    file("${path.module}/values/ingress.yaml"),
  ]
}

module "monitoring" {
  source = "./modules/monitoring"

  resource_group_name = azurerm_resource_group.skillsmatrix.name
  location            = azurerm_resource_group.skillsmatrix.location
  tags                = local.tags
}

#cosmosdb doesn't ACTUALLY have a gremlin api, it has a partial
#it doesn't support bytecode therefore it cannot support the fluent API
#and there are no plans to fix the problem either
#would have to use the legacy api which involves string-typed queries
#... the bad typing on the fluent API is already bad enough'

#module "database" {
#  source = "./modules/cosmosGraphDatabase"

#  resource_group_name   = azurerm_resource_group.skillsmatrix.name
#  location              = azurerm_resource_group.skillsmatrix.location
#  tags                  = local.tags
#  vnet_access_subnet_id = azurerm_subnet.skillsmatrix.id
#  principal_access_id   = azurerm_kubernetes_cluster.skillsmatrix.kubelet_identity[0].object_id
#}

module "database" {
  source = "./modules/tinkerpopGraphDatabase"

  tags = local.tags
}

#--------------------------------------------------------
#todo seed the DB
# - external name service to the db service isn't working
# - add seed job to the deployment, at least for now
#todo automate pushing to prod environment... manually trying to keep with this shit isn't working, shock!
# - then execute
#todo update the index.ejs and ingresses and deploy the UI and the comparison page
#todo add rewrite rules to ingress
# - then annotate the ingress with them... of fucking course I can't just put the rewrite rule in an annotation it needs to be in the gateway

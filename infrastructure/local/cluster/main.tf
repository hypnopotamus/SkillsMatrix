terraform {
  required_providers {
    helm = {
      source = "hashicorp/helm"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }

  backend "kubernetes" {
    secret_suffix = "skillsmatrix"
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

resource "helm_release" "ingress" {
  name       = "skillsmatrix-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "4.3.0"

  values = [
    file("${path.module}/values/ingress.yaml"),
  ]
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_api_connectionstring" {
  metadata {
    name = "application-insights-api"
  }
  immutable = true
  type      = "Opaque"

  data = {
  }
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_uicontainer_connectionstring" {
  metadata {
    name = "application-insights-uicontainer"
  }
  immutable = true
  type      = "Opaque"

  data = {
  }
}

resource "kubernetes_secret" "skillsmatrix_applicationinsights_uicomparison_connectionstring" {
  metadata {
    name = "application-insights-uicomparison"
  }
  immutable = true
  type      = "Opaque"

  data = {
  }
}

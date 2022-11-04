terraform {
  required_providers {
    helm = {
      source = "hashicorp/helm"
    }
  }

  backend "kubernetes" {
    secret_suffix = "webapplication"
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
  name             = "webapplication-ingress"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = "4.3.0"

  values = [
    file("${path.module}/values/ingress.yaml"),
  ]
}
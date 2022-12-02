terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

locals {
  labels = merge(var.tags, { db-id = "skillsmatrix-db" })
}

resource "kubernetes_deployment" "skillsmatrix_database" {
  metadata {
    name   = "skillsmatrix-database"
    labels = local.labels
  }

  spec {
    selector {
      match_labels = local.labels
    }

    template {
      metadata {
        name   = "skillsmatrix-database"
        labels = local.labels
      }

      spec {
        container {
          name              = "skillsmatrix-database"
          image             = "tinkerpop/gremlin-server:3.6.1"
          image_pull_policy = "IfNotPresent"
          port {
            container_port = 8182
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "skillsmatrix_database" {
  metadata {
    name   = "skillsmatrix-database"
    labels = local.labels
  }

  spec {
    port {
      port        = 8182
      target_port = 8182
    }
    selector = local.labels
  }
}

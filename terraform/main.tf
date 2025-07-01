terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.38"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
    helm = {
      source = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

# 🔥 GCP Provider
provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

# 🔥 Azure Provider
provider "azurerm" {
  features {}
}

# 🔥 Cloudflare Provider
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# ⚙ GKE Module
module "gke" {
  source     = "terraform-google-modules/kubernetes-engine/google"
  project_id = var.gcp_project
  name       = "nexus-cluster"
  region     = var.gcp_region
}

# ⚙ AKS Module
module "aks" {
  source              = "Azure/aks/azurerm"
  resource_group_name = "nexus-rg"
  cluster_name        = "nexus-aks"
  location            = var.azure_region
}

# 🌍 Cloudflare DNS
resource "cloudflare_record" "app" {
  zone_id = var.cloudflare_zone_id
  name    = "app"
  value   = module.gke.endpoint
  type    = "A"
  ttl     = 120
  proxied = true
}

# 🚀 Helm Release
resource "helm_release" "nexus" {
  name       = "nexus-academy"
  repository = "./helm"

  set {
    name  = "domain"
    value = var.domain_name
  }

  set {
    name  = "region"
    value = var.gcp_region
  }

  depends_on = [
    module.gke,
    module.aks
  ]
}

# 📤 Outputs for future integrations
output "gke_endpoint" {
  value = module.gke.endpoint
}

output "aks_kube_config" {
  value = module.aks.kube_config_raw
}

output "cloudflare_record" {
  value = cloudflare_record.app.hostname
}
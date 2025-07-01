variable "domain_name" {
  description = "The primary domain name"
  default     = "mydomain.com"
}

variable "gcp_project" {
  description = "Google Cloud project ID"
  default     = "my-gcp-project"
}

variable "gcp_region" {
  description = "Google region"
  default     = "europe-west4"
}

variable "azure_region" {
  description = "Azure region"
  default     = "northeurope"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
}

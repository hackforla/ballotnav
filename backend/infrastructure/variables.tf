variable vpc_id {}
variable region {}
variable tags {
  default = {}
  type    = map
}
variable stage {}
variable namespace {}

variable cluster_name {}

variable container_cpu {
  type    = number
  default = 256
}

variable container_memory {
  type    = number
  default = 512
}

variable task_name {}

variable project_name {}

variable container_name {}
variable container_port {}
variable image_tag {}

variable account_id {}

variable public_subnet_ids {
  default = []
  type    = list(string)
}
variable private_subnet_ids {
  default = []
  type    = list(string)
}
variable db_security_group_id {}

variable desired_count {}

variable acm_certificate_arn {}
#
variable bastion_security_group_id {}
variable task_memory {}
variable task_cpu {}

variable attributes {
  default = ["0"]
}
variable delimiter {
  default = "-"
}

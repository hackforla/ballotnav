output "cluster_name" {
  value = aws_ecs_cluster.cluster.name
}

output "ecs_service_security_group_id" {
  value = aws_security_group.svc_sg.id
}

output lb_dns_name {
  value = aws_lb.alb.dns_name
}

output lb_arn {
  value = aws_lb.alb.arn
}

output service_id {
  value = aws_ecs_service.svc.id
}

output service_name {
  value = aws_ecs_service.svc.name
}

output service_iam_role {
  value = aws_ecs_service.svc.iam_role
}

output service_desired_count {
  value = aws_ecs_service.svc.desired_count
}

output prd_ecs_service_id {
  value = aws_ecs_service.svc_prd.id
}

output prd_ecs_service_name {
  description = "The name of the prd ECS service"
  value       = aws_ecs_service.svc_prd.name
}

output default_target_group_name {
  description = "target group name for the default deployment (dev)"
  value       = aws_lb_target_group.default.name
}

output default_target_group_arn {
  description = "target group ARN for the default deployment (dev)"
  value       = aws_lb_target_group.default.arn
}

output prd_target_group_name {
  description = "target group name for the prd deployment (prd)"
  value       = aws_lb_target_group.prd_target_group.name
}

output prd_target_group_arn {
  description = "target group ARN for the prd deployment (prd)"
  value       = aws_lb_target_group.prd_target_group.arn
}

output prd_acm_cert_arn {
  description = "the TLS cert used for routing requests to the prod target group"
  value       = data.aws_acm_certificate.prd_cert.arn
}

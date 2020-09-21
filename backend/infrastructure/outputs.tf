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

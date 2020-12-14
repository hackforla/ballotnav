# application load balancer 
locals {
  name = "${var.stage}-${var.task_name}"
}

resource "aws_lb" "alb" {
  name               = "${local.name}-lb"
  load_balancer_type = "application"
  subnets            = var.public_subnet_ids
  security_groups    = [aws_security_group.alb.id]
  tags               = merge({ Name = local.name }, var.tags)
}

resource "aws_security_group" "alb" {
  name_prefix = substr(local.name, 0, 6)
  description = "load balancer sg for ingress and egress to ${var.task_name}"
  vpc_id      = var.vpc_id

  tags = merge({ Name = local.name }, var.tags)


  ingress {
    description = "HTTP from world"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from world"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "allow outbound traffic to the world"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    self        = true
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
    target_group_arn = aws_lb_target_group.default.arn
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.default.arn
  }
}

data "aws_acm_certificate" "prd_cert" {
  domain      = "ballotnav.org"
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}
# add additional cert for prd 
resource "aws_lb_listener_certificate" "prd_cert" {
  listener_arn    = aws_lb_listener.https.arn
  certificate_arn = data.aws_acm_certificate.prd_cert.arn
}

resource "aws_lb_listener_rule" "host_based_weighted_routing" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 99

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.prd_target_group.arn
  }

  condition {
    host_header {
      values = var.prd_host_header_values
    }
  }
}

resource "aws_lb_target_group" "default" {
  name_prefix          = substr(local.name, 0, 6)
  port                 = var.container_port
  protocol             = "HTTP"
  deregistration_delay = 100
  target_type          = "ip"
  vpc_id               = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    path                = "/status"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 10
    unhealthy_threshold = 3
  }
}

# add a target group for production app running on shared cluster
resource "aws_lb_target_group" "prd_target_group" {
  name_prefix          = "prd-bn"
  port                 = var.container_port
  protocol             = "HTTP"
  deregistration_delay = 100
  target_type          = "ip"
  vpc_id               = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    path                = "/status"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 10
    unhealthy_threshold = 3
  }
  tags = merge({ Stage = "prd", Name = "prd-target-group" }, var.tags)
}

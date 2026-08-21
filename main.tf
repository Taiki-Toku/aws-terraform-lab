terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet" "default" {
  vpc_id            = data.aws_vpc.default.id
  availability_zone = "ap-northeast-1d"
}

data "aws_security_group" "lab" {
  name   = "aws-lab-ec2-sg"
  vpc_id = data.aws_vpc.default.id
}

data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_iam_instance_profile" "ssm" {
  name = "aws-lab-ec2-ssm-profile"
}

resource "aws_cloudwatch_log_group" "lab" {
  name              = "/aws-lab/day1"
  retention_in_days = 14

  tags = {
    Name = "aws-lab-day1"
  }
}

resource "aws_instance" "lab" {
  ami                    = "ami-0f7e90d3283d2e250"
  instance_type          = var.instance_type
  subnet_id              = data.aws_subnet.default.id
  vpc_security_group_ids = [data.aws_security_group.lab.id]
  iam_instance_profile   = data.aws_iam_instance_profile.ssm.name

  tags = {
    Name = "aws-lab-ec2"
  }
}

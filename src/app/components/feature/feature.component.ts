import { Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  features: any[] = [
    {
      title: "Multi-Cloud Cost Analysis",
      description:
        "Get a unified view of your spending across AWS, Azure, Google Cloud, and more. Understand your costs at a glance with our intuitive dashboard.",
      icon: "fas fa-cloud",
    },
    {
      title: "Real-Time Budget Alerts",
      description:
        "Set custom budget thresholds and receive instant notifications when your spending approaches or exceeds limits. Stay in control of your cloud expenses.",
      icon: "fas fa-credit-card",
    },
    {
      title: "AI-Powered Optimization",
      description:
        "Leverage our advanced AI algorithms to receive personalized recommendations for reducing waste and optimizing your cloud resource allocation.",
      icon: "fas fa-bolt",
    },
    {
      title: "Detailed Cost Reports",
      description:
        "Generate comprehensive reports to track spending trends, forecast future costs, and identify saving opportunities across all your cloud services.",
      icon: "fas fa-chart-bar",
    },
    {
      title: "Resource Utilization Insights",
      description:
        "Gain deep insights into your resource utilization. Identify idle or underutilized resources to cut unnecessary costs and improve efficiency.",
      icon: "fas fa-chart-pie",
    },
    {
      title: "Custom Tagging and Allocation",
      description:
        "Implement custom tagging strategies to accurately allocate costs to specific projects, teams, or departments. Enhance your financial governance.",
      icon: "fas fa-sliders-h",
    },
  ];
}

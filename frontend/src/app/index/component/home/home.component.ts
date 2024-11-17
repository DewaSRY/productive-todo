import { Component, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

const PROBLE_DATA = [
  "Simplify and organize your daily to-do list to make tackling tasks less overwhelming and more manageable.",
  "Prioritize what truly matters and stay on track with a clear, distraction-free interface.",
  "Build consistent habits by setting achievable goals and monitoring your daily progress.",
  "Break big tasks into smaller, actionable steps to keep moving forward without feeling stuck."
]

const WHY_US_DATA = [
  {
    title: "Simplify Your Task Management",
    description: "Productive TODO makes organizing your tasks effortless with a clean and intuitive design, so you can focus on getting things done instead of feeling overwhelmed."
  },
  {
    title: "Stay Consistent and Track Progress",
    description: "Build productive habits by breaking tasks into manageable steps and seeing your achievements clearly, helping you stay motivated every day."
  },
  {
    title: "Boost Efficiency Without Distractions",
    description: "With no unnecessary features or clutter, Productive TODO helps you stay focused on what truly matters, making your productivity journey smoother and stress-free."
  },
]

const HOW_TO_USE = [
  {
    title: "Register and Log In",
    description: "Start by signing up with your email and creating a password. After registering, log in to your account to access your personal task management dashboard."
  },
  {
    title: "Add a To-Do",
    description: "To create a new task, simply click the Add Task button. Enter a clear title for the task, add a detailed description if necessary, set a due date, and click Save to add it to your to-do list."
  },
  {
    title: "View and Update Task Details",
    description: "Click on any task to view its full details, such as the description and due date. You can update, edit, or make changes as needed to ensure it stays accurate and relevant."
  },
  {
    title: "Mark Task as Completed",
    description: "Once you’ve finished a task, mark it as Completed by toggling the status. This will help you track your progress and keep your to-do list organized and up-to-date."
  },
]


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly service = {
    authServices: inject(AuthService)
  }

  $user = this.service.authServices.user$.asObservable()
  problems = PROBLE_DATA;
  whyUs = WHY_US_DATA
  howToUse= HOW_TO_USE

  
}

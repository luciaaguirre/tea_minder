import { Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./auth/login/login/login.component";
import { RegisterComponent } from "./auth/register/register/register.component";
import { HomeComponent } from "./pages/home.component";
import { authGuard } from "./guards/auth.guard";
import { TeaResolver } from "./guards/tea.resolver";
import { isSignIn } from "./guards/is-sign-in.guard";
import { TeaListComponent } from "./pages/tea-list/tea-list.component";
import { TeaDetailComponent } from "./pages/tea-detail/tea-detail.component";

export const APP_ROUTES: Routes = [
  {
    path: "teas",
    loadComponent: () =>
      import("./pages/home.component").then((c) => c.HomeComponent),
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/tea-list/tea-list.component").then(
            (c) => c.TeaListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: ":id",
        loadComponent: () =>
          import("./pages/tea-detail/tea-detail.component").then(
            (c) => c.TeaDetailComponent
          ),
        canActivate: [authGuard],
        resolve: { tea: TeaResolver },
      },
    ],
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
    canActivate: [isSignIn],
  },
  {
    path: "**",
    redirectTo: "teas",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "teas",
    pathMatch: "full",
  },
];

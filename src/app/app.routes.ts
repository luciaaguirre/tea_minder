import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { isSignIn } from "./guards/is-sign-in.guard";

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
    loadChildren: () => import("./auth/auth.routes").then((m) => m.routes),
    canActivate: [isSignIn],
  },
  {
    path: "**",
    redirectTo: "teas",
    pathMatch: "full",
  },
];

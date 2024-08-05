import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { TeaModel } from "../models/tea.model";
import { TeaService } from "../services/tea.service";
import { MatSnackBar } from "@angular/material/snack-bar";

export const TeaResolver: ResolveFn<TeaModel> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<TeaModel> => {
  const teaService = inject(TeaService);
  const snackBar = inject(MatSnackBar);
  const teaSelected = teaService.teaSelected;

  if (!teaSelected) {
    const id = route.params["id"];
    return teaService.getTea(id).pipe(
      tap((tea) => {
        if (!tea) {
          snackBar.open(`Error loading tea: No tea with id ${id}`, "Close", {
            duration: 3000,
          });
        }
      })
    );
  }

  return of<TeaModel>(teaSelected);
};

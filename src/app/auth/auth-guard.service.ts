import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    //id: string;

    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {

        // this.route.params
        //     .subscribe(
        //         (params: Params) => {
        //             this.id = params['id'];
        //             console.log(this.id);
        //             return this.authService.isAuthenticated();
        //         }
        //     );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let authenticated = this.authService.isAuthenticated();
        if (!authenticated) {
            // this.router.navigate(['.'], { relativeTo: this.route });
            console.log(this.route.snapshot.queryParams['returnUrl'] || '/');
            this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/');
        } else {
            return authenticated;
        }
        
        //console.log(this.id);
        //return this.authService.isAuthenticated();
    }

    // Criar outros guards, um para cada tipo de rota, se quiser comportamento diferente de redirect de cada um...
    // Por exemplo, AuthGuardNewRecipe(Manda para /recipes), AuthGuardEditRecipe(Manda para /recipes/X), etc...



}
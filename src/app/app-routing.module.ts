import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), 
    // canActivate: [ValidarTokenGuard],
    // canLoad: [ValidarTokenGuard],
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
      // canActivate: [ValidarTokenGuard],
      // canLoad: [ValidarTokenGuard],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
      // canActivate: [ValidarTokenGuard],
      // canLoad: [ValidarTokenGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

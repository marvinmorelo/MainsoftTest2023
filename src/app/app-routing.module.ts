import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
];
// Agrega aquí más rutas para otras páginas de tu aplicación
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

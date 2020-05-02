import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
//import 'angular-material/modules/js/icon';

import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { OrdersComponent} from '../../pages/orders/orders.component';
import { AuthguardGuard } from '../../guard/authguard.guard';
import { AddressComponent } from '../../pages/address/address.component';
import { PaymentsComponent } from '../../pages/payments/payments.component';
import { InvoiceComponent } from '../../pages/invoice/invoice.component';
import { EditComponent } from '../../pages/user-profile/edit/edit.component';
import { AssetComponent} from '../../pages/asset/asset.component';
import {DetailComponent} from '../../pages/asset/detail/detail.component';
import{ EditAddressComponent } from '../../pages/address/edit-address/edit-address.component';
import{OrderDetailComponent} from '../../pages/orders/order-detail/order-detail.component';
import { CartComponent } from '../../pages/orders/cart/cart.component';
import { CreateComponent } from '../../pages/orders/create/create.component';
import { FillAddressComponent } from '../../pages/orders/create/fill-address/fill-address.component';
import {EmployeesComponent} from '../../pages/user-profile/employees/employees.component'
import { EditContactPersonComponent } from '../../pages/user-profile/employees/edit-contact-person/edit-contact-person.component';
import { LegalEntitiesComponent } from '../../pages/legal-entities/legal-entities.component';
import { EntityDetailComponent } from '../../pages/legal-entities/entity-detail/entity-detail.component';
import { RequestInvoiceComponent } from '../../pages/invoice/request-invoice/request-invoice.component';
import { CreateAssetComponent } from '../../pages/asset/create-asset/create-asset.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthguardGuard] },
    {path: 'employees/edit', component: EditContactPersonComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    {path: 'legal-entities', component: LegalEntitiesComponent},
    {path : 'legal-entity/:id', component: EntityDetailComponent},
    { path: 'employees',   component: EmployeesComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'orders',         component:OrdersComponent},
    {path: 'orders/detail/:id', component: OrderDetailComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'address',           component: AddressComponent },
    { path: 'payments', component: PaymentsComponent},
    { path: 'orders/:id/invoices', component: InvoiceComponent},
    {path: 'asset', component: AssetComponent },
    {path: 'asset/create', component: CreateAssetComponent},
    {path: 'request-invoice', component:RequestInvoiceComponent},
    { path: 'asset/:id', component: DetailComponent },
    {path: 'address/edit/:id', component: EditAddressComponent},
    { path: 'user-profile/edit', component: EditComponent},
    {path: 'cart', component: CartComponent},
    {path: 'order/create', component: CreateComponent},
    {path: 'order/fill-address', component:FillAddressComponent}
];
